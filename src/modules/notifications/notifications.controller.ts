import { RmqService } from '@infrastructure/rmq/rmq.service'
import { Controller } from '@nestjs/common'
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices'
import type { EmailChangedEvent, OtpRequestedEvent } from '@teacinema/contracts'

import { NotificationsService } from './notifications.service'

@Controller()
export class NotificationsController {
	public constructor(
		private readonly rmqService: RmqService,
		private readonly notificationsService: NotificationsService
	) {}

	@EventPattern('auth.otp.requested')
	public async otpRequested(
		@Payload() data: OtpRequestedEvent,
		@Ctx() ctx: RmqContext
	): Promise<void> {
		try {
			await this.notificationsService.sendOtp(data)

			this.rmqService.ack(ctx)
		} catch (error: unknown) {
			console.log(
				'OTP processing error: ',
				(error as Error).message ?? error
			)

			this.rmqService.nack(ctx)
		}
	}

	@EventPattern('account.email.changed')
	public async emailChanged(
		@Payload() data: EmailChangedEvent,
		@Ctx() ctx: RmqContext
	): Promise<void> {
		try {
			await this.notificationsService.sendEmailChanged(data)

			this.rmqService.ack(ctx)
		} catch (error: unknown) {
			console.log(
				'OTP processing error: ',
				(error as Error).message ?? error
			)

			this.rmqService.nack(ctx)
		}
	}
}
