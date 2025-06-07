import { NEXT_PUBLIC_RESEND_API_KEY } from "@/lib/constant";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

interface ContactUsBody {
  email: string,
  fullname: string,
  company?: string;
  phoneNumber: string;
  subject: string;
  message: string
}

export async function POST(request: NextRequest) {
  const { email, fullname, company, phoneNumber, subject, message }: ContactUsBody =
    await request.json();

  const resend = new Resend(NEXT_PUBLIC_RESEND_API_KEY);
  const emailData = {
    from: "GigaSend <no-reply@transfer.gigasend.us>",
    to: "info@gigasend.us",
    subject: "Your files are ready for download",
    html: createContactEmailTemplate({ email, fullname, company, phoneNumber, subject, message }),
  };

  const { error } = await resend.emails.send(emailData);
  if (error) {
    console.error("Resend API error:", error);
    return NextResponse.json(
      { error: "Failed to send email" },
      { status: 500 },
    );
  }

  return NextResponse.json({ message: "Inquiry Sent" });
}


// Email template function for contact form
export const createContactEmailTemplate = (data: ContactUsBody) => {
  const { fullname, email, company, phoneNumber, subject, message } = data;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission - GigaSend</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      line-height: 1.6;
      color: #374151;
      background-color: #f8fafc;
    }
    
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 24px;
      overflow: hidden;
      box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
    }
    
    .header {
      background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
      padding: 40px 30px;
      text-align: center;
      color: white;
    }
    
    .header h1 {
      font-size: 28px;
      font-weight: 700;
      margin-bottom: 8px;
    }
    
    .header p {
      font-size: 16px;
      opacity: 0.9;
    }
    
    .content {
      padding: 40px 30px;
    }
    
    .alert {
      background: linear-gradient(135deg, #dbeafe 0%, #e0e7ff 100%);
      border: 2px solid #3b82f6;
      border-radius: 16px;
      padding: 20px;
      margin-bottom: 30px;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    
    .alert-icon {
      width: 24px;
      height: 24px;
      background-color: #3b82f6;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      flex-shrink: 0;
    }
    
    .alert-text {
      color: #1e40af;
      font-weight: 600;
    }
    
    .info-grid {
      display: grid;
      gap: 24px;
      margin-bottom: 30px;
    }
    
    .info-card {
      background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
      border-radius: 16px;
      padding: 20px;
      border: 1px solid #e2e8f0;
    }
    
    .info-label {
      font-size: 14px;
      font-weight: 600;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 8px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    
    .info-value {
      font-size: 16px;
      color: #1e293b;
      font-weight: 500;
      word-break: break-word;
    }
    
    .message-card {
      background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
      border: 2px solid #f59e0b;
      border-radius: 16px;
      padding: 24px;
      margin-bottom: 30px;
    }
    
    .message-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 16px;
    }
    
    .message-icon {
      width: 20px;
      height: 20px;
      background-color: #f59e0b;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 12px;
    }
    
    .message-title {
      font-weight: 600;
      color: #92400e;
    }
    
    .message-content {
      color: #78350f;
      line-height: 1.7;
      white-space: pre-wrap;
    }
    
    .footer {
      background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
      padding: 30px;
      text-align: center;
      border-top: 1px solid #e2e8f0;
    }
    
    .footer-logo {
      font-size: 24px;
      font-weight: 700;
      background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 8px;
    }
    
    .footer-text {
      color: #64748b;
      font-size: 14px;
      margin-bottom: 16px;
    }
    
    .cta-button {
      display: inline-block;
      background: linear-gradient(135deg, #2563eb 0%, #7c3aed 100%);
      color: white;
      text-decoration: none;
      padding: 12px 24px;
      border-radius: 12px;
      font-weight: 600;
      transition: transform 0.2s;
    }
    
    .cta-button:hover {
      transform: translateY(-2px);
    }
    
    .divider {
      height: 2px;
      background: linear-gradient(90deg, #e2e8f0 0%, #cbd5e1 50%, #e2e8f0 100%);
      margin: 30px 0;
      border-radius: 1px;
    }
    
    @media (max-width: 600px) {
      .container {
        margin: 0 10px;
        border-radius: 16px;
      }
      
      .header, .content, .footer {
        padding: 20px;
      }
      
      .header h1 {
        font-size: 24px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <!-- Header -->
    <div class="header">
      <h1>New Contact Inquiry</h1>
      <p>Someone has reached out through your website</p>
    </div>
    
    <!-- Content -->
    <div class="content">
      <!-- Alert -->
      <div class="alert">
        <div class="alert-icon">!</div>
        <div class="alert-text">New contact form submission received</div>
      </div>
      
      <!-- Contact Information -->
      <div class="info-grid">
        <div class="info-card">
          <div class="info-label">
            👤 Full Name
          </div>
          <div class="info-value">${fullname}</div>
        </div>
        
        <div class="info-card">
          <div class="info-label">
            ✉️ Email Address
          </div>
          <div class="info-value">
            <a href="mailto:${email}" style="color: #2563eb; text-decoration: none;">${email}</a>
          </div>
        </div>
        
        ${company ? `
        <div class="info-card">
          <div class="info-label">
            🏢 Company
          </div>
          <div class="info-value">${company}</div>
        </div>
        ` : ''}
        
        ${phoneNumber ? `
        <div class="info-card">
          <div class="info-label">
            📞 Phone Number
          </div>
          <div class="info-value">
            <a href="tel:${phoneNumber}" style="color: #2563eb; text-decoration: none;">${phoneNumber}</a>
          </div>
        </div>
        ` : ''}
        
        <div class="info-card">
          <div class="info-label">
            📋 Subject
          </div>
          <div class="info-value">${subject}</div>
        </div>
      </div>
      
      <!-- Message -->
      <div class="message-card">
        <div class="message-header">
          <div class="message-icon">💬</div>
          <div class="message-title">Message</div>
        </div>
        <div class="message-content">${message}</div>
      </div>
      
      <div class="divider"></div>
      
      <!-- Quick Actions -->
      <div style="text-align: center; margin-bottom: 20px;">
        <p style="color: #64748b; margin-bottom: 16px;">Quick Actions</p>
        <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
          <a href="mailto:${email}?subject=Re: ${subject}" class="cta-button">Reply via Email</a>
          ${phoneNumber ? `<a href="tel:${phoneNumber}" class="cta-button">Call Now</a>` : ''}
        </div>
      </div>
    </div>
    
    <!-- Footer -->
    <div class="footer">
      <div class="footer-logo">GigaSend</div>
      <p class="footer-text">Secure file sharing made simple</p>
      <p style="color: #94a3b8; font-size: 12px;">
        This email was sent from your website contact form.<br>
        Received on ${new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })}
      </p>
    </div>
  </div>
</body>
</html>
  `;
};
