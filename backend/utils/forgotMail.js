const forgotPasswordTemplate = (token, email) => {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Reset Your Password</title>
      <style>
        body {
        margin: 0;
        padding: 0;
        font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
        color: #333;
        background-color: #fff;
      }

      .container {
        margin: 0 auto;
        width: 100%;
        max-width: 600px;
        padding: 0 0px;
        padding-bottom: 10px;
        border-radius: 5px;
        line-height: 1.8;
      }

      .header {
        border-bottom: 1px solid #eee;
      }

      .header a {
        font-size: 1.4em;
        color: #000;
        text-decoration: none;
        font-weight: 600;
      }

      .content {
        min-width: 700px;
        overflow: auto;
        line-height: 2;
      }

      .button {
        display: inline-block;
        margin: 20px 0;
        padding: 10px 20px;
        font-size: 16px;
        font-weight: bold;
        color: #ffffff;
        background: linear-gradient(to right, #00bc69 0, #00bc88 50%, #00bca8 100%);
        text-decoration: none;
        border-radius: 4px;
      }

      .content a {
        color: #ffffff;
      }

      .button:hover {
        opacity: 0.9;
      }

      .footer {
        color: #aaa;
        font-size: 0.8em;
        line-height: 1;
        font-weight: 300;
      }

      .email-info {
        color: #666666;
        font-weight: 400;
        font-size: 13px;
        line-height: 18px;
        padding-bottom: 6px;
      }

      .email-info a {
        text-decoration: none;
        color: #00bc69;
      }
      </style>
    </head>
  
    <body>
      <div class="container">
        <div class="header">
          <a>CodeHive – Your Classroom, Compiler, and Community in One Place.</a>
        </div>
        <div class="content">
          <p>Hi,</p>
          <p>
            We received a request to reset the password for your CodeHive account.
            Click the button below to reset your password:
          </p>
          <a
            class="button"
            href="https://codehive-editor.vercel.app/reset-password?token=${token}"
            target="_blank"
          >
            Reset Password
          </a>
          <p>
            If you did not request a password reset, please ignore this email or contact support if you have concerns.
          </p>
          <p>
            <strong>Note:</strong> This link will expire in 15 minutes.
          </p>
          <p>Thank you for using CodeHive.</p>
          <p>Best regards,<br /><strong>CodeHive Team</strong></p>
        </div>
        <hr />
        <div class="footer">
          <p>This email cannot receive replies.</p>
          <p class="email-info">
            This email was sent to
            <a href="mailto:${email}">${email}</a>
          </p>
          <p class="email-info">
            <a href="https://codehive-editor.vercel.app/">CodeHive</a> | Siliguri, West Bengal - 734001, INDIA
          </p>
          <p class="email-info">&copy; 2024 CodeHive. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
    `;
  };
  
  export default forgotPasswordTemplate;  