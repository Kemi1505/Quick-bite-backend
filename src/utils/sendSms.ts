import config from 'config';
import axios from 'axios';

const apiKey = config.get('apiKey');
const senderId = config.get('senderId');
const baseUrl = config.get('baseUrl');

export async function SendOtp(phone: string, otp: string) {
    const champNumber = formatPhoneNumber(phone);
    const message = `Your verification code is: ${otp}. Verify Now.This code will expire in 5 minutes.`;

    // Debugging

    // this.logger.debug(`Original: ${phone}, Formatted to: ${champNumber}`);
    //Console message
    if (!apiKey || !senderId) {
      console.log(`TEST SMS: Sending OTP ${otp} to ${champNumber}`);
      return;
    }

    try {
      const url = `${baseUrl}/sms/send`;
      
      const headers = {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      };

      const data = {
        to: champNumber,
        message: message,
        sender_name: senderId,
        route: 'dnd', // dnd for otps
      };

      const response = await axios.post(url, data, { headers });
      

      console.log(`OTP sent successfully to ${champNumber}. Status: ${response.data.status}`);
      //this.logger.debug('SendChamp response:', response.data);

    } catch (error) {
      console.log(`Failed to send OTP to ${champNumber}:`)
    }
}

function formatPhoneNumber(phonenumber: string): string {
    let sendchampNumber = phonenumber

    if (sendchampNumber.startsWith('234') && sendchampNumber.length === 13) {
        return sendchampNumber; // SendChamp wants 2348012345678
    } else if (sendchampNumber.startsWith('0') && sendchampNumber.length === 11) {
        return '234' + sendchampNumber.substring(1);
    } else if (sendchampNumber.startsWith('+234') && sendchampNumber.length === 14) {
        return sendchampNumber.substring(1);
    }

    console.log(`Unrecognized phone number format: ${phonenumber}`);
    return sendchampNumber;
}
