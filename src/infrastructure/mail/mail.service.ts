import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { buildOtpEmail } from './otp-email.template';
import { MailType } from './entities/mail.entity';

@Injectable()
export class MailService {
  public constructor(private readonly transporter: MailerService) { }
  public async sendOtp(email: string, code: string, type: MailType = 'sign-in') {
    await this.transporter.sendMail({
      to: email,
      subject: 'Your OTP code for EgorColgCinema',
      html: buildOtpEmail(code, 10, type),
    });
  }
}
