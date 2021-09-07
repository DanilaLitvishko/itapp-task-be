import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { EmailService } from 'src/modules/common/services/email/email.service';
import { checkIsMobile } from 'src/utils/request.utils';

import * as dotenv from 'dotenv';

@Injectable()
export class EmailTemplateService {
  constructor(
    private readonly emailService: EmailService,
    private readonly configService: ConfigService
  ) {}

  async sendActivationLinkTemplate(toUserEmail: string, activationCode: string): Promise<void> {
    const subject = 'Account confirmation';
    const activationLink = `${this.configService.get('frontendDomain')}/activate/${activationCode}`;
    const html = `<p>Please confirm your email address by clicking on the link below. <br> <a href="${activationLink}">Click to confirm</a></p>`;

    await this.emailService.sendEmail(toUserEmail, subject, html);
  }

  async sendPasswordTemplate(toUserEmail: string, password: string): Promise<void> {
    const subject = 'Password account';
    const html = `<p>Hello, you created account on Elpaca. Take your password - ${password}. You can login by email and password or use social network</p>`;

    await this.emailService.sendEmail(toUserEmail, subject, html);
  }

  async sendPasswordRecoveryTemplate(
    firstName: string,
    lastName: string,
    toUserEmail: string,
    recoveryCode: string
  ): Promise<boolean> {
    const subject = 'Password recovery';
    const recoveryLink = `${this.configService.get(
      'frontendDomain'
    )}/passwordRecovery/${recoveryCode}`;
    let html: string;

    if (checkIsMobile()) {
      html = `<p>${firstName} ${lastName}, to recover your password use this code below. <br><b>${recoveryCode}</b></p>`;
    } else {
      html = `<p>${firstName} ${lastName}, to recover your password click on the link below. <br> <a href="${recoveryLink}">Click to recover the password</a></p>`;
    }

    await this.emailService.sendEmail(toUserEmail, subject, html);
    return true;
  }

  async sendSubscriptionHasExpired(toUserEmail: string): Promise<void> {
    const subject = 'Subscription has expired';
    const html = `<p>Hello, your Elpaca subscription has expired.</p>`;

    await this.emailService.sendEmail(toUserEmail, subject, html);
  }

  async sendContactUs(topic: string, fromEmail: string, message: string): Promise<void> {
    dotenv.config();

    const subject = topic;
    const html = `<p>Message from ${fromEmail}:</p><p>${message}</p>`;

    await this.emailService.sendEmail(
      process.env.CONTACT_US_EMAIL || 'ita91projects@gmail.com',
      subject,
      html
    );
  }
}
