import { NextResponse } from 'next/server';
import { sendSMS, sendEmail } from '@/utils/notificationHelper';

// POST /api/notifications
export async function POST(req) {
  try {
    const body = await req.json();

    const { type, to, message, subject, htmlContent } = body;

    if (!type || !to) {
      return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    let result;

    if (type === 'sms') {
      if (!message) {
        return NextResponse.json({ success: false, error: 'Message is required for SMS' }, { status: 400 });
      }

      result = await sendSMS({ to, message });
    }

    else if (type === 'email') {
      if (!subject || !htmlContent) {
        return NextResponse.json({ success: false, error: 'Subject and HTML content are required for Email' }, { status: 400 });
      }

      result = await sendEmail({ to, subject, htmlContent });
    }

    else {
      return NextResponse.json({ success: false, error: 'Invalid notification type' }, { status: 400 });
    }

    if (result.success) {
      return NextResponse.json({ success: true, data: result.data });
    } else {
      return NextResponse.json({ success: false, error: result.error }, { status: 500 });
    }

  } catch (error) {
    console.error('Notification API error:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
