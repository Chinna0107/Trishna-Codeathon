// Email template for notifications
const createEmailTemplate = (title, message) => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>${title}</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
              <!-- Header -->
              <tr>
                <td style="background: linear-gradient(135deg, #00eaff 0%, #0099cc 100%); padding: 30px; text-align: center;">
                  <h1 style="margin: 0; color: #ffffff; font-size: 28px; font-weight: bold;">TRISHNA 2K25</h1>
                  <p style="margin: 10px 0 0 0; color: #ffffff; font-size: 14px;">Technical Fest Notification</p>
                </td>
              </tr>
              
              <!-- Title -->
              <tr>
                <td style="padding: 30px 40px 20px 40px;">
                  <h2 style="margin: 0; color: #333333; font-size: 24px; font-weight: bold;">${title}</h2>
                </td>
              </tr>
              
              <!-- Message Content -->
              <tr>
                <td style="padding: 0 40px 30px 40px;">
                  <div style="color: #555555; font-size: 16px; line-height: 1.6;">
                    ${message.replace(/\n/g, '<br>')}
                  </div>
                </td>
              </tr>
              
              <!-- Divider -->
              <tr>
                <td style="padding: 0 40px;">
                  <div style="border-top: 2px solid #00eaff; margin: 20px 0;"></div>
                </td>
              </tr>
              
              <!-- Footer -->
              <tr>
                <td style="padding: 20px 40px 30px 40px; text-align: center;">
                  <p style="margin: 0 0 10px 0; color: #888888; font-size: 14px;">
                    This is an official notification from TRISHNA 2K25
                  </p>
                  <p style="margin: 0; color: #888888; font-size: 12px;">
                    © ${new Date().getFullYear()} TRISHNA 2K25. All rights reserved.
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};

module.exports = { createEmailTemplate };
