import Mail = require('nodemailer/lib/mailer');
import * as nodemailer from 'nodemailer';

import { Injectable } from '@nestjs/common';

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

@Injectable()
export class EmailService {
  private transporter: Mail;

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: 'iamtk00007@gmail.com',
        pass: 'yvkrtkcpusuncetu',
      },
    });
  }

  async sendMemberJoinEmail(email: string, signupVerifyToken: string) {
    const baseUrl = 'http://localhost:3000';

    const url = `${baseUrl}/users/verify-email?token=${signupVerifyToken}`;
    const mailOptions: EmailOptions = {
      to: 'neworld.kim@gmail.com',
      subject: '가입 인증 메일',
      html: `
        가입확인 버튼을 누르시면 가입 인증이 완료됩니다. <br />
        <form action="${url}" method="POST">
          <button>가입확인</button>
        </form>
      `,
    };
    return await this.transporter.sendMail(mailOptions);
  }
}
