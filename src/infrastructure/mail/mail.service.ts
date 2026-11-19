import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { buildOtpEmail } from './otp-email.template';

@Injectable()
export class MailService {
  public constructor(private readonly transporter: MailerService) { }
  public async sendOtp(email: string, code: string) {
    await this.transporter.sendMail({
      to: email,
      subject: 'Your OTP code for EgorColgCinema',
      html: buildOtpEmail(code),
    });
  }
}
