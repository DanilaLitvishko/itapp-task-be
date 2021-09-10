import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Op } from 'sequelize';
import { v4 as uuidv4 } from 'uuid';

import { User } from '../../entities/users/user.entity';
import { CreateUserDto } from 'src/modules/common/dto/users/create-user.dto';
import { FindUserDto } from 'src/modules/common/dto/users/find-user.dto';
import { createPasswordHash } from 'src/utils/user.utils';
import { UserResponseDto } from 'src/modules/common/dto/users/user-response.dto';
import { BaseService } from '../../base/service/base.service';
import { USER_NOT_FOUND } from '../../../../../constants/messages';
import { checkIsMobile } from 'src/utils/request.utils';
import { UserTasksService } from 'src/modules/common/services/users/user-tasks.service';
import { UsersRepository } from '../../repositories/users/users.repository';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService extends BaseService<User, UserResponseDto> {
  constructor(
    @InjectRepository(UsersRepository) private usersRepository: UsersRepository,
    private readonly userTasksService: UserTasksService,
  ) {
    super(usersRepository);
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
    const passwordHash = await createPasswordHash(createUserDto.password);
    const user: User = await super.createRecord({
      ...createUserDto,
      password: passwordHash,
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

      console.log('Hi from send activation link');

      await this.userTasksService.sendActivationLink(
        userData.email,
        activationCode,
      );
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
