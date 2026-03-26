/**
 * POST /api/newsletter
 * Handles newsletter subscription from the Resources page.
 * Sends a welcome email to the subscriber and notifies the team.
 */

const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);
const TEAM_EMAIL = process.env.IB_TEAM_EMAIL || 'info@innovatbharat.org';
const FROM_EMAIL = process.env.IB_FROM_EMAIL || 'noreply@innovatbharat.org';

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { email } = req.body || {};

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'A valid email address is required' });
  }

  try {
    // Notify team of new subscriber
    await resend.emails.send({
      from: `Innovat Bharat Forms <${FROM_EMAIL}>`,
      to: [TEAM_EMAIL],
      subject: `📩 New Newsletter Subscriber — ${email}`,
      html: `
        <div style="font-family: -apple-system, sans-serif; max-width: 480px; margin: 0 auto; padding: 24px; background: #f7fafc; border-radius: 12px;">
          <p style="color: #2d3748; font-size: 16px;">
            A new subscriber joined the Innovat Bharat newsletter:
          </p>
          <p style="font-size: 20px; font-weight: 700; color: #1a365d; padding: 16px; background: white; border-radius: 8px; border-left: 4px solid #e67e22;">
            ${email}
          </p>
          <p style="color: #718096; font-size: 14px;">Add to your mailing list / CRM.</p>
        </div>
      `,
    });

    // Welcome email to subscriber
    await resend.emails.send({
      from: `Innovat Bharat <${FROM_EMAIL}>`,
      to: [email],
      subject: `Welcome to Innovat Bharat — you're subscribed`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #f7fafc; padding: 24px; border-radius: 12px;">
          <div style="background: linear-gradient(135deg, #e67e22, #d35400); padding: 24px; border-radius: 8px; margin-bottom: 24px;">
            <h1 style="color: #ffffff; margin: 0; font-size: 22px;">You're subscribed!</h1>
            <p style="color: rgba(255,255,255,0.85); margin: 8px 0 0;">Innovat Bharat Knowledge Hub</p>
          </div>

          <p style="color: #2d3748; font-size: 16px; line-height: 1.7;">
            Thank you for subscribing. You'll receive our latest articles, resources, and program updates
            — no spam, just useful content for students, educators, and changemakers building India's future.
          </p>

          <div style="background: white; border-radius: 8px; padding: 20px; margin: 24px 0; border: 1px solid #e2e8f0;">
            <p style="margin: 0 0 12px; font-weight: 600; color: #1a365d;">Explore while you wait:</p>
            <ul style="color: #4a5568; line-height: 2.2; margin: 0; padding-left: 20px;">
              <li><a href="https://innovatbharat.org/ecosystem" style="color: #e67e22;">The Innovat Bharat Ecosystem</a></li>
              <li><a href="https://innovatbharat.org/programs" style="color: #e67e22;">Our Programs</a></li>
              <li><a href="https://innovatbharat.org/contact" style="color: #e67e22;">Invite Us To Your College</a></li>
            </ul>
          </div>

          <p style="color: #718096; font-size: 13px; margin-top: 24px; border-top: 1px solid #e2e8f0; padding-top: 16px;">
            You subscribed at innovatbharat.org. To unsubscribe, reply with "unsubscribe" in the subject.
            <br>Innovat Bharat · <a href="mailto:${TEAM_EMAIL}" style="color: #e67e22;">${TEAM_EMAIL}</a>
          </p>
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Newsletter error:', error);
    return res.status(500).json({ error: 'Subscription failed. Please try again.' });
  }
};
