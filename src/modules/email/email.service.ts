import 'dotenv/config';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class EmailService {
  constructor(private readonly mailerService: MailerService) {}

  async sendResetPasswordEmail(email: string, resetToken: string) {
    try {
      const url = `${process.env.BASE_URL}/auth/reset-password/${resetToken}`;

      await this.mailerService.sendMail({
        to: email,
        subject: 'Reset your password',
        html: `<div>
                <p>We received a request to reset your password. Click on the link below to
                reset your password:</p>
                <p><a href="${url}">Reset link</a></p>
           </div>`,
      });
    } catch (error) {
      console.error('Error sending email:', error);
      throw new Error('Failed to send email');
    }
  }
}
