const escapeHtml = (value: string): string =>
  value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');

export function buildOtpEmail(code: string, ttlMinutes = 10, type: 'sign-in' | 'email-change' | 'phone-change'): string {
  const safeCode = escapeHtml(code);
  const year = new Date().getFullYear();

  return `<!DOCTYPE html>
<html lang="ru" xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="color-scheme" content="light dark" />
  <meta name="supported-color-schemes" content="light dark" />
  <title>Код подтверждения EgorColgCinema</title>
  <style>
    body { margin: 0; padding: 0; width: 100% !important; -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
    table { border-collapse: collapse; }
    img { border: 0; line-height: 100%; outline: none; text-decoration: none; }

    @media only screen and (max-width: 620px) {
      .container { width: 100% !important; }
      .px { padding-left: 24px !important; padding-right: 24px !important; }
      .title { font-size: 24px !important; line-height: 30px !important; }
      .code { font-size: 32px !important; letter-spacing: 8px !important; padding: 18px 8px !important; }
      .outer { padding: 16px 12px !important; }
    }

    @media (prefers-color-scheme: dark) {
      .bg-page { background-color: #000000 !important; }
      .bg-card { background-color: #1c1c1e !important; }
      .bg-code { background-color: #2c2c2e !important; }
      .text-main { color: #f5f5f7 !important; }
      .text-sub { color: #98989d !important; }
      .divider { border-top-color: #38383a !important; }
      .logo-badge { background-color: #f5f5f7 !important; color: #1c1c1e !important; }
    }
  </style>
</head>
<body class="bg-page" style="margin:0;padding:0;background-color:#f5f5f7;">
  <!-- Прехедер (текст в списке писем) -->
  <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;mso-hide:all;">
    Ваш код: ${safeCode}. 
  </div>

  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" class="bg-page" style="background-color:#f5f5f7;">
    <tr>
      <td align="center" class="outer" style="padding:40px 16px;">

        <table role="presentation" class="container" width="560" cellpadding="0" cellspacing="0" border="0" style="width:560px;max-width:560px;">

          <!-- Логотип -->
          <tr>
            <td align="center" style="padding:0 0 24px 0;">
              <table role="presentation" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td class="logo-badge" align="center" width="32" height="32" style="width:32px;height:32px;background-color:#1d1d1f;color:#ffffff;border-radius:9px;font-family:-apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',Arial,sans-serif;font-size:13px;line-height:32px;">
                    &#9654;
                  </td>
                  <td class="text-main" style="padding-left:10px;font-family:-apple-system,BlinkMacSystemFont,'SF Pro Display','Helvetica Neue',Arial,sans-serif;font-size:18px;font-weight:600;letter-spacing:-0.2px;color:#1d1d1f;">
                    EgorColgCinema
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Карточка -->
          <tr>
            <td class="bg-card" style="background-color:#ffffff;border-radius:20px;">
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">

                <tr>
                  <td class="px" align="center" style="padding:44px 48px 8px 48px;">
                    <h1 class="title text-main" style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'SF Pro Display','Helvetica Neue',Arial,sans-serif;font-size:28px;line-height:34px;font-weight:600;letter-spacing:-0.4px;color:#1d1d1f;">
                      Код подтверждения
                    </h1>
                  </td>
                </tr>

                <tr>
                  <td class="px" align="center" style="padding:8px 48px 28px 48px;">
                    <p class="text-sub" style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',Arial,sans-serif;font-size:16px;line-height:24px;color:#6e6e73;">
                      Введите этот код, чтобы ${type === 'sign-in' ? 'войти в аккаунт' : type === 'email-change' ? 'изменить email' : 'изменить номер телефона'}
                    </p>
                  </td>
                </tr>

                <!-- Код -->
                <tr>
                  <td class="px" align="center" style="padding:0 48px 28px 48px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td class="bg-code code text-main" align="center" style="background-color:#f5f5f7;border-radius:14px;padding:22px 12px;font-family:ui-monospace,'SF Mono',SFMono-Regular,Menlo,Consolas,'Courier New',monospace;font-size:38px;line-height:44px;font-weight:600;letter-spacing:12px;color:#1d1d1f;">
                          ${safeCode}
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <tr>
                  <td class="px" align="center" style="padding:0 48px 40px 48px;">
                    <p class="text-sub" style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',Arial,sans-serif;font-size:14px;line-height:21px;color:#86868b;">
                      Код действителен ${ttlMinutes} минут.<br />
                      Никому не сообщайте его — даже сотрудникам EgorColgCinema.
                    </p>
                  </td>
                </tr>

                <!-- Разделитель -->
                <tr>
                  <td class="px" style="padding:0 48px;">
                    <div class="divider" style="border-top:1px solid #e5e5ea;font-size:0;line-height:0;height:0;">&nbsp;</div>
                  </td>
                </tr>

                <tr>
                  <td class="px" align="center" style="padding:24px 48px 36px 48px;">
                    <p class="text-sub" style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',Arial,sans-serif;font-size:13px;line-height:19px;color:#86868b;">
                      Если вы не запрашивали код, просто проигнорируйте это письмо — ваш аккаунт в безопасности.
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- Футер -->
          <tr>
            <td align="center" style="padding:28px 16px 0 16px;">
              <p class="text-sub" style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'SF Pro Text','Helvetica Neue',Arial,sans-serif;font-size:12px;line-height:18px;color:#86868b;">
                &copy; ${year} EgorColgCinema. Все права защищены.<br />
                Это автоматическое письмо, отвечать на него не нужно.
              </p>
            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>
</body>
</html>`;
}

