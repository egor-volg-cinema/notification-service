import { RmqService } from '@infrastructure/rmq/rmq.service'
import { Controller } from '@nestjs/common'
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices'

import { NotificationsService } from './notifications.service'

@Controller()
export class NotificationsController {
	public constructor(
		private readonly rmqService: RmqService,
		private readonly notificationsService: NotificationsService
	) {}

	@EventPattern('auth.otp.requested')
	public async otpRequested(
		@Payload() data: any,
		@Ctx() ctx: RmqContext
	): Promise<void> {
		try {
			console.log(`OTP event received: ${JSON.stringify(data)}`)

			this.rmqService.ack(ctx)
		} catch (error) {
			console.log('OTP processing error: ', error.message ?? error)

			this.rmqService.nack(ctx)
		}
	}
}
