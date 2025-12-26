# Contact Form Backend Setup

The contact form is now set up to submit to `/api/contact`, but you need to configure an email service to actually send emails.

## Quick Setup Options

### Option 1: Resend (Recommended - Easiest)

1. **Sign up** at [resend.com](https://resend.com)
2. **Get your API key** from the dashboard
3. **Add to `.env.local`**:
   ```
   RESEND_API_KEY=re_xxxxxxxxxxxxx
   ```
4. **Install Resend**:
   ```bash
   npm install resend
   ```
5. **Update `/src/app/api/contact/route.ts`** - uncomment and use the Resend example code

### Option 2: SendGrid

1. **Sign up** at [sendgrid.com](https://sendgrid.com)
2. **Create an API key** in Settings > API Keys
3. **Add to `.env.local`**:
   ```
   SENDGRID_API_KEY=SG.xxxxxxxxxxxxx
   ```
4. **Install SendGrid**:
   ```bash
   npm install @sendgrid/mail
   ```
5. **Update the API route** to use SendGrid:
   ```typescript
   import sgMail from '@sendgrid/mail';
   
   sgMail.setApiKey(process.env.SENDGRID_API_KEY!);
   
   await sgMail.send({
     to: personalInfo.contact.email,
     from: 'contact@yourdomain.com', // Must be verified in SendGrid
     subject: `Contact Form: ${name}`,
     text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
     replyTo: email,
   });
   ```

### Option 3: Nodemailer with Gmail/SMTP

1. **Install Nodemailer**:
   ```bash
   npm install nodemailer
   ```
2. **Add to `.env.local`**:
   ```
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   ```
3. **Update the API route**:
   ```typescript
   import nodemailer from 'nodemailer';
   
   const transporter = nodemailer.createTransport({
     host: process.env.SMTP_HOST,
     port: Number(process.env.SMTP_PORT),
     secure: false,
     auth: {
       user: process.env.SMTP_USER,
       pass: process.env.SMTP_PASS,
     },
   });
   
   await transporter.sendMail({
     from: process.env.SMTP_USER,
     to: personalInfo.contact.email,
     subject: `Contact Form: ${name}`,
     text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
     replyTo: email,
   });
   ```

### Option 4: AWS SES

1. **Set up AWS SES** and verify your domain/email
2. **Install AWS SDK**:
   ```bash
   npm install @aws-sdk/client-ses
   ```
3. **Add to `.env.local`**:
   ```
   AWS_REGION=us-east-1
   AWS_ACCESS_KEY_ID=xxxxx
   AWS_SECRET_ACCESS_KEY=xxxxx
   ```
4. **Update the API route** to use AWS SES SDK

## Security Notes

- **Rate Limiting**: Consider adding rate limiting to prevent spam (e.g., using `@upstash/ratelimit`)
- **Honeypot Field**: Add a hidden field to catch bots
- **reCAPTCHA**: Add Google reCAPTCHA for additional protection
- **CORS**: The API route is already protected by Next.js, but ensure your deployment has proper CORS settings

## Testing

1. Start your dev server: `npm run dev`
2. Navigate to `/contact`
3. Fill out and submit the form
4. Check your email inbox (or console logs if using placeholder)

## Current Status

The form currently **logs submissions to the console** for testing. You need to implement one of the email services above to actually send emails.

