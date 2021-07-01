import * as fs from 'fs';

import { TokenType, UserType, generateToken } from '@/auth';
import {
  AUTHOR,
  CLIENT_HTTP,
  CLIENT_PORT,
  CLIENT_URL,
  CLIENT_WHOLESALER_HTTP,
  CLIENT_WHOLESALER_PORT,
  CLIENT_WHOLESALER_URL,
  DOMAIN,
  END_POINT,
  HTTP,
  ISSUER,
  NODEMAILER_PASS,
  NODEMAILER_USER,
  PORT,
} from '@/environments';
import { AdminEntity } from '@/modules/admins/entities/admin.entity';
import { BuyerEntity } from '@/modules/buyers/entities/buyer.entity';
import { WholesalerEntity } from '@/modules/wholesalers/entities/wholesaler.entity';
import { Logger } from '@nestjs/common';
import * as handlebars from 'handlebars';
import * as nodemailer from 'nodemailer';

type Type = 'verifyEmail' | 'forgotPassword';

/**
 * Returns any by send email.
 *
 * @remarks
 * This method is part of the {@link shared/mail}.
 *
 * @param type - 1st input
 * @param user - 2nd input
 * @param req - 3rd input
 * @param token - 4th input
 * @param _id - 5th input
 *
 * @returns The any mean of `type`, `user`, `req`, `token` and `_id`
 *
 * @beta
 */
export const sendMail = async (
  type: Type,
  user: AdminEntity | BuyerEntity | WholesalerEntity,
  req: any,
  userType: UserType,
  tokenType: TokenType,
  // token: string,
  // _id: string,
): Promise<any> => {
  const logger = new Logger('Util/sendMail', true);
  logger.log('sendmail');

  const token = await generateToken({
    _id: user._id,
    user: userType,
    type: tokenType,
  });

  const transporter = await nodemailer.createTransport({
    service: 'gmail',
    secure: false, // true
    host: 'smtp.gmail.com',
    port: 587, // 465
    auth: {
      user: NODEMAILER_USER!,
      pass: NODEMAILER_PASS!,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const readHTMLFile = (path, callback) => {
    fs.readFile(path, { encoding: 'utf-8' }, (err, html) => {
      if (err) {
        callback(err);
      } else {
        callback(null, html);
      }
    });
  };

  readHTMLFile('./src/assets/templates/udacity-index.html', (err, html) => {
    const template = handlebars.compile(html);

    const common = {
      author: AUTHOR!,
      issuer: ISSUER!,
      // ios: 'https://itunes.apple.com/us/app/chnirt',
      // android: 'https://play.google.com/store/apps/chnirt',
      // twitter: 'https://twitter.com/chnirt',
      // facebook: 'https://www.facebook.com/trinhchinchinn',
      // googleplus: 'https://plus.google.com/chnirt',
      // linkedin:
      // 	'https://www.linkedin.com/authwall?trk=gf&trkInfo=AQFSlEdMz0wy8AAAAW2cEMIYqabj7d0O-w7EMMY5W1BFRDacs5fcAbu4akPG8jrJQPG5-cNbLf-kaBHIfmW-f6a3WgaqAEjIG6reC_mLvY9n-mzZwZbcFf0q9XmrlkFVdVUH2I4=&originalReferer=https://www.facebook.com/&sessionRedirect=https%3A%2F%2Fwww.linkedin.com%2Fin%2Fchin-tr%25E1%25BB%258Bnh-62200215a%3Ffbclid%3DIwAR289POrXez8UY6k2RQNEnNAjrtOto8H6zhFABlQ7HHCvpIS0afgQHxGGic',
      number: '42',
      street: '상도로47가길',
      city: '서울시',
      country: '한국',
      to: '회원님에게',
      // tracking: `http://${req.headers.host}/${END_POINT}/${_id}`,
    };

    const link = `${HTTP + '://' + DOMAIN}${
      PORT === 80 ? '' : ':' + PORT
    }/verify/${userType}/${token}`;

    const clientBuyerLink =
      CLIENT_HTTP + '://' + CLIENT_URL + ':' + CLIENT_PORT;
    const clientWholesalerLink =
      CLIENT_WHOLESALER_HTTP +
      '://' +
      CLIENT_WHOLESALER_URL +
      ':' +
      CLIENT_WHOLESALER_PORT;

    const clientLink =
      userType === 'wholesaler' ? clientWholesalerLink : clientBuyerLink;

    const replacements = {
      verifyEmail: {
        link: link,
        subject: '[Dongdaemun Fashion Express] Email Verification',
        text1: 'Please verify your email to register.',
        button: 'Verify Email',
        text2: 'or click the link below.',
        ...common,
      },
      forgotPassword: {
        link: clientLink + `/resetpassword?token=${token}`,
        subject: 'Reset Your Password',
        text1:
          // tslint:disable-next-line:quotemark
          "Tap the button below to reset your customer account password. If you didn't request a new password, you can safely delete this email.",
        button: 'Set New Password',
        text2:
          // tslint:disable-next-line:quotemark
          "If that doesn't work, copy and paste the following link in your browser:",
        ...common,
      },
    };

    const htmlToSend = template(replacements[type]);
    const mailOptions = {
      from: AUTHOR + '  📮:' + NODEMAILER_USER, // sender address
      to: user.email, // list of receivers
      subject: replacements[type].subject,
      html: htmlToSend,
      attachments: [
        {
          path: './src/assets/images/logo.png',
          cid: 'unique@kreata.ee', // same cid value as in the html img src
        },
        {
          path: './src/assets/images/mail/ios.gif',
          cid: 'ios@chnirt.ee',
        },
        {
          path: './src/assets/images/mail/android.gif',
          cid: 'android@chnirt.ee',
        },
        {
          path: './src/assets/images/mail/twitter.jpg',
          cid: 'twitter@chnirt.ee',
        },
        {
          path: './src/assets/images/mail/facebook.jpg',
          cid: 'facebook@chnirt.ee',
        },
        {
          path: './src/assets/images/mail/googleplus.jpg',
          cid: 'googleplus@chnirt.ee',
        },
        {
          path: './src/assets/images/mail/linkedin.jpg',
          cid: 'linkedin@chnirt.ee',
        },
      ],
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
        // Logger.error(err.message);
        return false;
      } else {
        console.log('Message sent: ' + JSON.parse(info));
        return true;
        // Logger.debug(info.response.message, "Nodemailer");
      }
    });

    transporter.close();
  });
};
