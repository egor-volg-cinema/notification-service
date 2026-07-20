import { Injectable, Logger } from '@nestjs/common'
import { RmqContext } from '@nestjs/microservices'
import type { Channel, ConsumeMessage } from 'amqplib'

@Injectable()
export class RmqService {
	private readonly logger = new Logger(RmqService.name)

	public ack(context: RmqContext): void {
		const channel = context.getChannelRef() as Channel
		const message = context.getMessage() as ConsumeMessage
		const tag = message?.fields?.deliveryTag

		if (!tag) return

		channel.ack(message)

		this.logger.log(`ACK (pattern: ${context.getPattern()}, tag: ${tag})`)
	}

	public nack(context: RmqContext, requeue = false): void {
		const channel = context.getChannelRef() as Channel
		const message = context.getMessage() as ConsumeMessage
		const tag = message?.fields?.deliveryTag

		if (!tag) return

		channel.nack(message, false, requeue)

		if (requeue)
			this.logger.warn(
				`NACK response (pattern: ${context.getPattern()}, tag: ${tag})`
			)
		else
			this.logger.error(
				`NACK drop (pattern: ${context.getPattern()}, tag: ${tag})`
			)
	}
}
