import axios from 'axios';

const BREVO_API_KEY = process.env.BREVO_API_KEY;  // Put this in your `.env.local`
const BREVO_SMS_SENDER = process.env.BREVO_SMS_SENDER || 'TestYukti'; // Sender ID
const BREVO_EMAIL_SENDER = process.env.BREVO_EMAIL_SENDER || 'your@email.com'; // Verified sender email

// SEND SMS FUNCTION
export const sendSMS = async ({ to, message }) => {
  try {
    const response = await axios.post(
      'https://api.brevo.com/v3/transactionalSMS/sms',
      {
        sender: BREVO_SMS_SENDER,
        recipient: to,
        content: message,
        type: 'transactional'
      },
      {
        headers: {
          'api-key': BREVO_API_KEY,
          'Content-Type': 'application/json'
        }
      }
    );

    return { success: true, data: response.data };
  } catch (error) {
    console.error('SMS sending failed:', error.response?.data || error.message);
    return { success: false, error: error.response?.data || error.message };
  }
};

// SEND EMAIL FUNCTION
export const sendEmail = async ({ to, subject, htmlContent }) => {
  try {
    const response = await axios.post(
      'https://api.brevo.com/v3/smtp/email',
      {
        sender: { email: BREVO_EMAIL_SENDER, name: 'TestYukti' },
        to: [{ email: to }],
        subject,
        htmlContent
      },
      {
        headers: {
          'api-key': BREVO_API_KEY,
          'Content-Type': 'application/json'
        }
      }
    );

    return { success: true, data: response.data };
  } catch (error) {
    console.error('Email sending failed:', error.response?.data || error.message);
    return { success: false, error: error.response?.data || error.message };
  }
};
