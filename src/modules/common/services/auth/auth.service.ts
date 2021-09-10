/* eslint no-underscore-dangle: ["error", { "allow": ["_json"] }] */

import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Op } from 'sequelize';
import { User } from 'src/modules/common/entities/users/user.entity';
import { LoginDto } from 'src/modules/common/dto/auth/login.dto';
import { SignUpDto } from 'src/modules/common/dto/auth/sign-up.dto';
import { UsersService } from '../users/users.service';
import { TokenPayloadDto } from 'src/modules/common/dto/auth/token-payload.dto';
import {
  ACCOUNT_IS_ALREADY_VERIFIED,
  ACCOUNT_IS_NOT_VERIFIED,
  ACTIVATION_CODE_ERROR_MESSAGE,
  TOKEN_VERIFICATION_ERROR_MESSAGE,
  USER_NOT_FOUND,
  FAILED_DUE_TO_VALIDATION_ERRORS,
} from 'constants/messages';
import { UserResponseDto } from 'src/modules/common/dto/users/user-response.dto';
import { AuthResponseDto } from 'src/modules/common/dto/auth/auth-response.dto';
import { TokenDto } from 'src/modules/common/dto/auth/token.dto';
import { ActivationDto } from 'src/modules/common/dto/auth/activation.dto';
import { checkPassword } from '../../../../utils/user.utils';
import { ValidationException } from 'src/exceptions/custom-exceptions/validation-exeption';
import { ValidationErrorDto } from 'src/validation/dto/validation-error.dto';
import {
  PASSWORD_IS_INCORRECT,
  USER_IS_NOT_REGISTERED,
} from '../../../../../constants/validation-messages';
import { ActivationLinkDto } from 'src/modules/common/dto/auth/activation-link.dto';
import { UsersRepository } from '../../repositories/users/users.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UsersRepository) 
    private readonly usersRepository: UsersRepository,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<AuthResponseDto | boolean> {
    try {
      const user = await this.usersService.createRecord({ ...signUpDto });
      return this.sendAuthResponse(user);
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }

  async login(loginDto: LoginDto): Promise<AuthResponseDto> {
    const user = await this.usersRepository.findOne({
      where: { email: { [Op.iLike]: loginDto.email } },
    });

    if (user) {
      const isPasswordMatch = await checkPassword(
        user.password,
        loginDto.password,
      );

      if (!isPasswordMatch) {
        throw new ValidationException(
          [new ValidationErrorDto([PASSWORD_IS_INCORRECT], 'password')],
          FAILED_DUE_TO_VALIDATION_ERRORS,
        );
      }

      if (!user.isConfirm) {
        throw new HttpException(ACCOUNT_IS_NOT_VERIFIED, HttpStatus.FORBIDDEN);
      }

      return this.sendAuthResponse(user);
    }

    throw new ValidationException(
      [new ValidationErrorDto([USER_IS_NOT_REGISTERED], 'email')],
      FAILED_DUE_TO_VALIDATION_ERRORS,
    );
  }

  async checkToken(tokenDto: TokenDto): Promise<AuthResponseDto> {
    const { id } = await this.jwtService.verify(tokenDto.accessToken);

    const user = await this.usersRepository.findOne(id);

    if (!user) {
      throw new HttpException(
        TOKEN_VERIFICATION_ERROR_MESSAGE,
        HttpStatus.BAD_REQUEST,
      );
    }

    // if (
    //   !user.accessTokenCreatedAt ||
    //   !(iat * 1000 === user.accessTokenCreatedAt.getTime()) ||
    //   iat >= exp
    // ) {
    //   throw new HttpException(
    //     TOKEN_EXPIRATION_ERROR_MESSAGE,
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }

    return this.sendAuthResponse(user);
  }

  async activateAccount(activationDto: ActivationDto): Promise<boolean> {
    const condition = {
      where: { activationCode: activationDto.activationCode },
    };
    const user = await this.usersRepository.findOne(condition);

    if (!user) {
      throw new HttpException(
        ACTIVATION_CODE_ERROR_MESSAGE,
        HttpStatus.BAD_REQUEST,
      );
    }

    try {
      await this.usersService.updateRecord(
        { isNew: false, activationCode: null },
        user.id,
      );
      return true;
    } catch (err) {
      throw new HttpException(
        ACTIVATION_CODE_ERROR_MESSAGE,
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async sendActivationLink(
    activationLink: ActivationLinkDto,
  ): Promise<boolean> {
    const condition = {
      where: { email: activationLink.email },
    };
    const user = await this.usersRepository.findOne(condition);

    if (!user) {
      throw new HttpException(USER_NOT_FOUND, HttpStatus.BAD_REQUEST);
    }

    if (user.isConfirm) {
      throw new HttpException(
        ACCOUNT_IS_ALREADY_VERIFIED,
        HttpStatus.BAD_REQUEST,
      );
    }

    await this.usersService.sendActivationLink(user);
    return true;
  }

  async sendAuthResponse(
    user: User,
    status?: boolean,
  ): Promise<AuthResponseDto> {
    const { id } = user;
    const accessTokenCreatedAt = new Date();

    await this.usersService.updateRecord({ accessTokenCreatedAt }, id);

    const tokenPayload: TokenPayloadDto = {
      id,
      iat: accessTokenCreatedAt.getTime() / 1000,
    };

    const accessToken = this.jwtService.sign(tokenPayload);

    return new AuthResponseDto(accessToken, new UserResponseDto(user), status);
  }

  async logout(user: User): Promise<boolean> {
    try {
      const updatedUser = await this.usersService.updateRecord(
        { accessTokenCreatedAt: null },
        user.id,
      );

      return !!updatedUser;
    } catch (err) {
      throw new HttpException(err, HttpStatus.BAD_REQUEST);
    }
  }
}
