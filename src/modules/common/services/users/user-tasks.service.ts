import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../entities/user.entity';
import { createESUser } from 'src/modules/common/elastic-search/users/user';
import { CronJob } from 'cron';
import { EmailTemplateService } from 'src/modules/common/services/email/email-template.service';
import { Repository } from 'typeorm';

@Injectable()
export class UserTasksService {
  constructor(
    @Inject() private readonly usersRepository: Repository<User>,
    readonly emailTemplateService: EmailTemplateService,
  ) {}

  // async addUsersToElasticSearch(): Promise<User[]> {
  //   const users: User[] = await this.usersRepository.find();
  //   users.map(async (user) => {
  //     await createESUser(user);
  //     return user;
  //   });
  //   return users;
  // }

  // async runUsersElasticSearchUpdate(): Promise<boolean> {
  //   const startTime = new Date(new Date(Date.now()).getTime() + 5000);
  //   const usersJob = new CronJob(startTime, async () => {
  //     await this.addUsersToElasticSearch();
  //   });

  //   usersJob.start();
  //   return true;
  // }

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
