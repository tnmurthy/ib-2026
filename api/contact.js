/**
 * POST /api/contact
 * Handles college invitation form submissions.
 * Sends a notification email to the Innovat Bharat team
 * and an acknowledgement email to the submitter.
 */

const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);
const TEAM_EMAIL = process.env.IB_TEAM_EMAIL || 'info@innovatbharat.org';
const FROM_EMAIL = process.env.IB_FROM_EMAIL || 'noreply@innovatbharat.org';

module.exports = async function handler(req, res) {
  // CORS preflight
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const {
    name,
    designation,
    collegeName,
    location,
    email,
    phone,
    preferredDateTime,
    message,
  } = req.body || {};

  // Basic validation
  if (!name || !email || !collegeName || !phone) {
    return res.status(400).json({ error: 'Missing required fields: name, email, collegeName, phone' });
  }

  try {
    // 1. Notify the IB team
    await resend.emails.send({
      from: `Innovat Bharat Forms <${FROM_EMAIL}>`,
      to: [TEAM_EMAIL],
      replyTo: email,
      subject: `🎓 New College Invite Request — ${collegeName}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #f7fafc; padding: 24px; border-radius: 12px;">
          <div style="background: linear-gradient(135deg, #1a365d, #2d3748); padding: 24px; border-radius: 8px; margin-bottom: 24px;">
            <h1 style="color: #ffffff; margin: 0; font-size: 22px;">New College Invitation Request</h1>
            <p style="color: #a0aec0; margin: 8px 0 0;">Submitted via innovatbharat.org</p>
          </div>

          <table style="width: 100%; border-collapse: collapse; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 14px 20px; font-weight: 600; color: #4a5568; width: 40%; background: #f7fafc;">Name</td>
              <td style="padding: 14px 20px; color: #1a202c;">${name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 14px 20px; font-weight: 600; color: #4a5568; background: #f7fafc;">Designation</td>
              <td style="padding: 14px 20px; color: #1a202c;">${designation || '—'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 14px 20px; font-weight: 600; color: #4a5568; background: #f7fafc;">College</td>
              <td style="padding: 14px 20px; color: #1a202c; font-weight: 600;">${collegeName}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 14px 20px; font-weight: 600; color: #4a5568; background: #f7fafc;">Location</td>
              <td style="padding: 14px 20px; color: #1a202c;">${location || '—'}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 14px 20px; font-weight: 600; color: #4a5568; background: #f7fafc;">Email</td>
              <td style="padding: 14px 20px;"><a href="mailto:${email}" style="color: #e67e22;">${email}</a></td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 14px 20px; font-weight: 600; color: #4a5568; background: #f7fafc;">Phone</td>
              <td style="padding: 14px 20px; color: #1a202c;">${phone}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 14px 20px; font-weight: 600; color: #4a5568; background: #f7fafc;">Preferred Date/Time</td>
              <td style="padding: 14px 20px; color: #1a202c;">${preferredDateTime || '—'}</td>
            </tr>
            <tr>
              <td style="padding: 14px 20px; font-weight: 600; color: #4a5568; background: #f7fafc; vertical-align: top;">Message</td>
              <td style="padding: 14px 20px; color: #1a202c;">${message || '—'}</td>
            </tr>
          </table>

          <div style="margin-top: 24px; padding: 16px; background: #fff3cd; border-radius: 8px; border-left: 4px solid #e67e22;">
            <strong style="color: #744210;">Action needed:</strong>
            <span style="color: #744210;"> Respond within 48 hours. Reply directly to this email to reach ${name}.</span>
          </div>
        </div>
      `,
    });

    // 2. Send acknowledgement to the submitter
    await resend.emails.send({
      from: `Innovat Bharat <${FROM_EMAIL}>`,
      to: [email],
      subject: `We received your request — Innovat Bharat`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #f7fafc; padding: 24px; border-radius: 12px;">
          <div style="background: linear-gradient(135deg, #1a365d, #2d3748); padding: 24px; border-radius: 8px; margin-bottom: 24px;">
            <h1 style="color: #ffffff; margin: 0; font-size: 22px;">Innovat Bharat</h1>
            <p style="color: #a0aec0; margin: 8px 0 0;">Bridging education and industry in rural India</p>
          </div>

          <p style="color: #2d3748; font-size: 16px;">Hi ${name},</p>
          <p style="color: #2d3748; font-size: 16px; line-height: 1.7;">
            Thank you for reaching out from <strong>${collegeName}</strong>. We've received your invitation request
            and our team will contact you within <strong>48 hours</strong> to schedule the introduction session.
          </p>
          <p style="color: #2d3748; font-size: 16px; line-height: 1.7;">
            In the meantime, feel free to explore our ecosystem overview at
            <a href="https://innovatbharat.org/ecosystem" style="color: #e67e22;">innovatbharat.org/ecosystem</a>.
          </p>

          <div style="background: white; border-radius: 8px; padding: 20px; margin: 24px 0; border: 1px solid #e2e8f0;">
            <p style="margin: 0; color: #4a5568; font-weight: 600;">What happens next?</p>
            <ol style="color: #4a5568; line-height: 2; margin-top: 12px;">
              <li>We review your request and confirm availability</li>
              <li>Our team calls or emails you to schedule the session</li>
              <li>45-minute introduction session with your team</li>
              <li>We discuss the right engagement model together</li>
            </ol>
          </div>

          <p style="color: #718096; font-size: 14px; margin-top: 24px; border-top: 1px solid #e2e8f0; padding-top: 16px;">
            Innovat Bharat · <a href="mailto:${TEAM_EMAIL}" style="color: #e67e22;">${TEAM_EMAIL}</a>
          </p>
        </div>
      `,
    });

    return res.status(200).json({ success: true, message: 'Request submitted successfully' });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ error: 'Failed to send email. Please try again or contact us directly.' });
  }
};
