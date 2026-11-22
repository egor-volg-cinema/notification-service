import { MailService } from '@infrastructure/mail/mail.service'
import { Injectable } from '@nestjs/common'
import { EmailChangedEvent, OtpRequestedEvent } from '@teacinema/contracts'

@Injectable()
export class NotificationsService {
	public constructor(private readonly mailService: MailService) {}

	public async sendOtp(data: OtpRequestedEvent) {
		const { identifier, code, type } = data

		console.log(`OTP event received: ${JSON.stringify(data)}`)

		if (type === 'email') await this.mailService.sendOtp(identifier, code)
		else console.log(`Sending SMS with OTP code: ${code}`)
	}

	public async sendEmailChanged(data: EmailChangedEvent) {
		const { email, code } = data

		await this.mailService.sendOtp(email, code, 'email-change')
	}
}
