import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import { RmqModule } from './infrastructure/rmq/rmq.module'
import { NotificationsModule } from './modules/notifications/notifications.module'
import { MailModule } from './infrastructure/mail/mail.module';
import configs from './config/configs'

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true, load: [configs], expandVariables: true }),
		RmqModule,
		NotificationsModule,
		MailModule
	]
})
export class AppModule { }
