import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../entities/users/user.entity';
import { CronJob } from 'cron';
import { EmailTemplateService } from 'src/modules/common/services/email/email-template.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from '../../repositories/users/users.repository';

@Injectable()
export class UserTasksService {
  constructor(
    @InjectRepository(UsersRepository) 
    private readonly usersRepository: UsersRepository,
    readonly emailTemplateService: EmailTemplateService,
  ) {}

  async sendActivationLink(
    toUserEmail: string,
    activationCode: string,
  ): Promise<boolean> {
    const startTime = new Date(new Date(Date.now()).getTime() + 5000);
    const usersJob = new CronJob(startTime, async () => {
      await this.emailTemplateService.sendActivationLinkTemplate(
        toUserEmail,
        activationCode,
      );
    });

    usersJob.start();
    return true;
  }
}
