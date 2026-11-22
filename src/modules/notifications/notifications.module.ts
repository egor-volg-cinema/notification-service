import { MailService } from '@infrastructure/mail/mail.service'
import { RmqModule } from '@infrastructure/rmq/rmq.module'
import { Module } from '@nestjs/common'

import { NotificationsController } from './notifications.controller'
import { NotificationsService } from './notifications.service'

@Module({
	imports: [RmqModule],
	controllers: [NotificationsController],
	providers: [NotificationsService, MailService]
})
export class NotificationsModule {}
