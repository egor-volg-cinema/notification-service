import { Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { getMailerConfig } from '@config/factories';
import { ConfigService } from '@nestjs/config';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [MailerModule.forRootAsync(
    {
      useFactory: getMailerConfig,
      inject: [ConfigService]
    }
  )],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule { }
