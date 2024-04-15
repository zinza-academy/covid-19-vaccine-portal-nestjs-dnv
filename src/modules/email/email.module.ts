import 'dotenv/config';
import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { EmailService } from './email.service';

@Module({
  providers: [EmailService],
  imports: [
    MailerModule.forRoot({
      transport: {
        service: process.env.MAIL_SERVICE,
        auth: {
          user: process.env.MAIL_USER,
          pass: process.env.MAIL_PASSWORD,
        },
        port: 465,
        logger: true,
        secure: true,
      },
      defaults: {
        from: '"Support Team" <support-vaccineportal@gmail.com>',
      },
    }),
  ],
  exports: [EmailService],
})
export class EmailModule {}
