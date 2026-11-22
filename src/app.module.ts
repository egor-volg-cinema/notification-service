import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'

import configs from './config/configs'
import { MailModule } from './infrastructure/mail/mail.module'
import { RmqModule } from './infrastructure/rmq/rmq.module'
import { NotificationsModule } from './modules/notifications/notifications.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [configs],
			expandVariables: true
		}),
		RmqModule,
		NotificationsModule,
		MailModule
	]
})
export class AppModule {}
