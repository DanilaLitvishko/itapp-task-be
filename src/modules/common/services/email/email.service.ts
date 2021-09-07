import { Injectable, Logger } from '@nestjs/common';
import * as Mailgun from 'mailgun-js';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailService {
  private readonly logger: Logger = new Logger(EmailService.name);

  constructor(private readonly configService: ConfigService) {}

  async sendEmail(to: string, subject: string, html: string, text = ''): Promise<void> {
    const from = this.configService.get('mailgun.from');
    const apiKey = this.configService.get('mailgun.apiKey');
    const domain = this.configService.get('mailgun.domain');
    const host = this.configService.get('mailgun.host');
    const testMode = this.configService.get('mailgun.testMode');
    const mailgun = new Mailgun({ apiKey, domain, host });

    mailgun
      .messages()
      .send({ from, to, subject, text, html, 'o:testmode': testMode }, (error, body) => {
        this.logger.error('error: ', error);
        this.logger.log('subject: ', subject);
        this.logger.log('text: ', text);
        this.logger.log('body: ', body);
        this.logger.log('html: ', html);
      });
  }
}
