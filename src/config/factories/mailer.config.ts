import { ConfigService } from "@nestjs/config";
import { MailerOptions } from "@nestjs-modules/mailer";

export function getMailerConfig(configService: ConfigService): MailerOptions {
    return {
        transport: {
            host: configService.get('smtp.host'),
            port: configService.get('smtp.port'),
            auth: {
                user: configService.get('smtp.username'),
                pass: configService.get('smtp.password')
            }
        },
        defaults: {
            from: `Cinema ${configService.get('smtp.fromAddress')}`
        }
    }
}