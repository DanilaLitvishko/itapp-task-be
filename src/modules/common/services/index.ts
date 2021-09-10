import { AuthService } from 'src/modules/common/services/auth/auth.service';
import { EmailService } from 'src/modules/common/services/email/email.service';
import { EmailTemplateService } from 'src/modules/common/services/email/email-template.service';
import { UsersService } from 'src/modules/common/services/users/users.service';
import { UserTasksService } from 'src/modules/common/services/users/user-tasks.service';

export const services = [
  AuthService,
  EmailService,
  EmailTemplateService,
  UsersService,
  UserTasksService,
];
