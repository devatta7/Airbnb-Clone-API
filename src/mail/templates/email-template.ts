import { SendEmailDto } from '../dtos/send-email.dto';

const escapeHtml = (value: string): string =>
  value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
    };
    return entities[character];
  });

/** Builds a self-contained, email-client-friendly HTML version of a message. */
export const createEmailHtml = ({ subject, text }: SendEmailDto): string => {
  const safeSubject = escapeHtml(subject);
  const otpMatch = text.match(/\b\d{6}\b/);
  const code = otpMatch?.[0];
  const message = code
    ? `${escapeHtml(text.slice(0, otpMatch.index))}${escapeHtml(text.slice((otpMatch.index ?? 0) + code.length))}`
    : escapeHtml(text);
  const body = message.replace(/\n/g, '<br>');

  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${safeSubject}</title>
  </head>
  <body style="margin:0;padding:0;background-color:#f5f5f5;font-family:Arial,Helvetica,sans-serif;color:#222;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="background-color:#f5f5f5;">
      <tr><td align="center" style="padding:44px 16px;">
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="max-width:560px;background-color:#ffffff;border:1px solid #e8e8e8;border-radius:18px;overflow:hidden;">
          <tr><td style="padding:26px 38px;border-bottom:1px solid #f0f0f0;">
            <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0"><tr>
              <td style="color:#ff385c;font-size:25px;font-weight:700;letter-spacing:-1.5px;">airbnb</td>
              <td align="right" style="color:#777;font-size:11px;font-weight:700;letter-spacing:1px;text-transform:uppercase;">Account security</td>
            </tr></table>
          </td></tr>
          <tr><td style="padding:38px 38px 34px;">
            <div style="margin-bottom:12px;color:#ff385c;font-size:12px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;">A quick check</div>
            <h1 style="margin:0 0 16px;color:#222;font-size:28px;line-height:1.25;font-weight:700;">${safeSubject}</h1>
            <p style="margin:0;color:#595959;font-size:16px;line-height:1.75;">${body}</p>
            ${code ? `<table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="margin:26px 0 22px;"><tr><td align="center" style="padding:23px 12px;background-color:#fff5f6;border:1px solid #ffe1e5;border-radius:14px;"><div style="margin-bottom:8px;color:#777;font-size:11px;font-weight:700;letter-spacing:1.4px;text-transform:uppercase;">Your one-time code</div><div style="color:#e31c5f;font-size:34px;font-weight:700;letter-spacing:9px;">${code}</div></td></tr></table>` : ''}
            <p style="margin:0;color:#777;font-size:13px;line-height:1.65;">If you didn't request this, you can safely ignore this email.</p>
          </td></tr>
          <tr><td style="padding:21px 38px;background-color:#fafafa;border-top:1px solid #eeeeee;color:#888;font-size:12px;line-height:1.7;">
            <strong style="color:#555;">Airbnb</strong><br>This is an automated message. Please don't reply to this email.
          </td></tr>
        </table>
        <div style="padding:18px 10px 0;color:#999;font-size:11px;line-height:1.6;text-align:center;">Keeping your account secure is important to us.</div>
      </td></tr>
    </table>
  </body>
</html>`;
};
