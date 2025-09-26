import config from 'config';
import * as nodemailer from 'nodemailer';
import { onboardingMail, passwordMail } from './emaiContent';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
    user: config.get('gmailUser'),
    pass: config.get('gmailPassword'),
    },});
export async function SendOnboardingMail(email: string, name: string) {
    const from = `"${config.get('gmailName')}" <${config.get('gmailUser')}>`;

    const eContent = onboardingMail(email, name)

    try {
        const info = await transporter.sendMail({
        from: from,
        to: email,
        subject: eContent.subject,
        html: eContent.htmlContent,
        });
        console.log('Onboarding email sent successfully to:', email, );
    } catch (error:any) {
        console.error('Failed to send onboarding email to:', email, error);
        throw new Error(`Failed to send onboarding email: ${error.message}`);
    }
}

export async function SendPasswordMail(email: string, randomPassword: string) {
    const from = `"${config.get('gmailName')}" <${config.get('gmailUser')}>`;

    const pContent = passwordMail(email,randomPassword)
    try {
    const info = await transporter.sendMail({
    from: from,
    to: email,
    subject: pContent.subject,
    html: pContent.htmlContent,
    });
    console.log('Password email sent successfully to:', email);
    } catch (error:any) {
    console.error('Failed to send password email to:', email, error);
    throw new Error(`Failed to send password email: ${error.message}`);
    }
}

