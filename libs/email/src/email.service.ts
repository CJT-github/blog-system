import { Injectable } from '@nestjs/common';
import { createTransport, Transporter } from 'nodemailer';

@Injectable()
export class EmailService {
  transporter: Transporter;

  constructor() {
    this.transporter = createTransport({
      host: 'smtp.qq.com',
      port: 587,
      secure: false,
      auth: {
        user: '2283830825@qq.com',
        pass: 'uoikydyqcqshebji',
      },
    });
  }

  async sendMail({ to, subject, html }) {
    await this.transporter.sendMail({
      from: {
        name: 'CHEN Blog',
        address: '2283830825@qq.com',
      },
      to,
      subject,
      html,
    });
  }
}
