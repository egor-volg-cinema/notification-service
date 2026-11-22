import validationSchema from './validation.schema'

export default () => {
	const parsed = validationSchema.safeParse(process.env)
	if (!parsed.success) {
		console.error('Invalid environment variables', { cause: parsed.error })
		process.exit(1)
	}
	return {
		app: {
			env: parsed.data.NODE_ENV
		},
		rmq: {
			url: parsed.data.RMQ_URL,
			queue: parsed.data.RMQ_QUEUE
		},
		smtp: {
			host: parsed.data.SMTP_HOST,
			token: parsed.data.SMTP_TOKEN,
			port: parsed.data.SMTP_PORT,
			username: parsed.data.SMTP_USERNAME,
			password: parsed.data.SMTP_PASSWORD,
			fromAddress: parsed.data.SMTP_FROM_ADDRESS,
			secure: parsed.data.SMTP_SECURE
		}
	}
}
