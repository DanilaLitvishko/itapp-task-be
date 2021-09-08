import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { Repository } from 'typeorm';
import * as uuidv4 from 'uuid';
import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';

import { User } from '../../entities/user.entity';
import { CreateUserDto } from 'src/modules/common/dto/users/create-user.dto';
import { UpdateUserDto } from 'src/modules/common/dto/users/update-user.dto';
import { FindUserDto } from 'src/modules/common/dto/users/find-user.dto';
import {
  checkPassword,
  checkPasswordComplexity,
  createPasswordHash,
  generateLogin,
} from 'src/utils/user.utils';
import { UserResponseDto } from 'src/modules/common/dto/users/user-response.dto';
import { BaseService } from '../../base/service/base.service';
import {
  FAILED_DUE_TO_VALIDATION_ERRORS,
  USER_NOT_FOUND,
} from '../../../../../constants/messages';
import { checkIsMobile } from 'src/utils/request.utils';
import { ValidationException } from 'src/exceptions/custom-exceptions/validation-exeption';
import { ValidationErrorDto } from 'src/validation/dto/validation-error.dto';
import {
  CURRENT_PASSWORD_IS_NOT_MATCHED,
  PASSWORD_COMPLEXITY_CHECK_FAILED,
  PASSWORD_SHOULD_NOT_BE_THE_SAME,
} from 'constants/validation-messages';
import { StripeTokenDto } from 'src/modules/common/dto/users/stripe-token.dto';
import { UserTasksService } from 'src/modules/common/services/users/user-tasks.service';

@Injectable()
export class UsersService extends BaseService<User, UserResponseDto> {
  constructor(
    @Inject() public usersRepository: Repository<User>,
    @InjectStripe() private readonly stripeClient: Stripe,
    private readonly userTasksService: UserTasksService,
  ) {
    super(usersRepository, User);
  }

  async find(findUserDto: FindUserDto): Promise<UserResponseDto[]> {
    // eslint-disable-next-line @typescript-eslint/ban-types
    let roles: object;

    if (findUserDto.roles) {
      roles = { roles: { [Op.overlap]: findUserDto.roles.split(',') } };
    }

    const condition = {
      where: { ...findUserDto, ...roles },
    };

    return super.find(findUserDto, UserResponseDto, condition);
  }

  async findOne(userId: number): Promise<UserResponseDto> {
    return super.findOne(userId, UserResponseDto);
  }

  // async createStripeCustomer(
  //   token: StripeTokenDto,
  //   id: string,
  // ): Promise<UserResponseDto> {
  //   try {
  //     const user = await this.usersRepository.findOne(id);

  //     if (!user) {
  //       throw new HttpException(USER_NOT_FOUND, HttpStatus.BAD_REQUEST);
  //     }

  //     const customerInfo: Stripe.CustomerCreateParams = {
  //       email: user.email,
  //       source: token.id,
  //     };
  //     let customer: Stripe.Customer;

  //     if (user.stripeCustomerId) {
  //       customer = await this.stripeClient.customers.update(user.stripeCustomerId, customerInfo);
  //     } else {
  //       customer = await this.stripeClient.customers.create(customerInfo);
  //     }

  //     return super.update(
  //       {
  //         stripeCustomerId: customer.id,
  //         ccLast4: token.card.last4,
  //       },
  //       user.id,
  //       UserResponseDto
  //     );
  //   } catch (err) {
  //     throw new HttpException(err, HttpStatus.BAD_REQUEST);
  //   }
  // }

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    return super.create({ ...createUserDto }, UserResponseDto);
  }

  async createRecord(createUserDto: CreateUserDto): Promise<User> {
    const vaidationErrors = [];

    const { password } = createUserDto;

    const isNewPasswordComplexityPassed = await checkPasswordComplexity(
      password,
    );

    if (!isNewPasswordComplexityPassed) {
      vaidationErrors.push(
        new ValidationErrorDto([PASSWORD_COMPLEXITY_CHECK_FAILED], 'password'),
      );
      throw new ValidationException(
        vaidationErrors,
        FAILED_DUE_TO_VALIDATION_ERRORS,
      );
    }

    const passwordHash = await createPasswordHash(createUserDto.password);
    const login = await generateLogin(
      createUserDto.email,
      this.usersRepository,
    );
    const user: User = await super.createRecord({
      ...createUserDto,
      password: passwordHash,
      login,
    });

    if (!user.isConfirm) {
      await this.sendActivationLink(user);
    }

    return user;
  }

  // async update(
  //   updateUserDto: UpdateUserDto,
  //   id: number,
  // ): Promise<UserResponseDto> {
  //   return super.update(updateUserDto, id, UserResponseDto);
  // }

  // async deactivate(id: number): Promise<boolean> {
  //   try {
  //     const user: User = await this.usersRepository.findOne(id);
  //     const updatedUser = await user.update(
  //       { isActive: !user.isActive },
  //       { where: { id } },
  //     );
  //     return updatedUser.isActive;
  //   } catch (err) {
  //     throw new HttpException(err, HttpStatus.BAD_REQUEST);
  //   }
  // }

  async sendActivationLink(user: User): Promise<void> {
    try {
      if (checkIsMobile()) {
        await this.updateRecord({ isNew: false }, user.id);
        return;
      }

      const activationCode = uuidv4({ id: user.id, createdAt: user.createdAt });
      const userData = await this.updateRecord({ activationCode }, user.id);

      await this.userTasksService.sendActivationLink(userData.username, activationCode);
    } catch (err) {
      throw new HttpException(USER_NOT_FOUND, HttpStatus.UNPROCESSABLE_ENTITY);
    }
  }

  // async checkStripeCustomerId(id: number): Promise<string> {
  //   const user: User = await super.findById(id);

  //   if (!user) {
  //     throw new HttpException(USER_NOT_FOUND, HttpStatus.BAD_REQUEST);
  //   }

  //   return user.stripeCustomerId;
  // }
}
