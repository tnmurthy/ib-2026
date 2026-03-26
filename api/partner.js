/**
 * POST /api/partner
 * Handles Partner/Mentor expression-of-interest form
 * and community quick-message form submissions.
 */

const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);
const TEAM_EMAIL = process.env.IB_TEAM_EMAIL || 'info@innovatbharat.org';
const FROM_EMAIL = process.env.IB_FROM_EMAIL || 'noreply@innovatbharat.org';

const ROLE_LABELS = {
  mentor: 'Individual Mentor',
  industry: 'Industry Partner',
  institutional: 'Institutional Partner',
  student: 'Student',
  parent: 'Parent',
  other: 'Other',
};

module.exports = async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { name, email, phone, type, role, expertise, message } = req.body || {};

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  // Determine form type: partner/mentor interest OR community quick message
  const formType = type ? 'partner' : 'community';
  const roleLabel = ROLE_LABELS[type || role] || type || role || '—';

  try {
    // Notify team
    await resend.emails.send({
      from: `Innovat Bharat Forms <${FROM_EMAIL}>`,
      to: [TEAM_EMAIL],
      replyTo: email,
      subject: formType === 'partner'
        ? `🤝 New Partner/Mentor Interest — ${roleLabel} (${name})`
        : `💬 New Community Message from ${name}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #f7fafc; padding: 24px; border-radius: 12px;">
          <div style="background: linear-gradient(135deg, #1a365d, #2d3748); padding: 24px; border-radius: 8px; margin-bottom: 24px;">
            <h1 style="color: #ffffff; margin: 0; font-size: 20px;">
              ${formType === 'partner' ? 'New Partner / Mentor Interest' : 'New Community Message'}
            </h1>
            <p style="color: #a0aec0; margin: 8px 0 0;">Submitted via innovatbharat.org</p>
          </div>

          <table style="width: 100%; border-collapse: collapse; background: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.06);">
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 14px 20px; font-weight: 600; color: #4a5568; width: 40%; background: #f7fafc;">Name</td>
              <td style="padding: 14px 20px; color: #1a202c;">${name}</td>
            </tr>
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 14px 20px; font-weight: 600; color: #4a5568; background: #f7fafc;">Email</td>
              <td style="padding: 14px 20px;"><a href="mailto:${email}" style="color: #e67e22;">${email}</a></td>
            </tr>
            ${phone ? `
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 14px 20px; font-weight: 600; color: #4a5568; background: #f7fafc;">Phone</td>
              <td style="padding: 14px 20px; color: #1a202c;">${phone}</td>
            </tr>` : ''}
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 14px 20px; font-weight: 600; color: #4a5568; background: #f7fafc;">${formType === 'partner' ? 'Role Type' : 'I am a'}</td>
              <td style="padding: 14px 20px; color: #1a202c; font-weight: 600;">${roleLabel}</td>
            </tr>
            ${expertise ? `
            <tr style="border-bottom: 1px solid #e2e8f0;">
              <td style="padding: 14px 20px; font-weight: 600; color: #4a5568; background: #f7fafc;">Domain / Expertise</td>
              <td style="padding: 14px 20px; color: #1a202c;">${expertise}</td>
            </tr>` : ''}
            <tr>
              <td style="padding: 14px 20px; font-weight: 600; color: #4a5568; background: #f7fafc; vertical-align: top;">Message</td>
              <td style="padding: 14px 20px; color: #1a202c;">${message || '—'}</td>
            </tr>
          </table>

          <p style="margin-top: 20px; color: #718096; font-size: 14px;">
            Reply directly to this email to reach ${name} at ${email}.
          </p>
        </div>
      `,
    });

    // Acknowledgement to submitter
    await resend.emails.send({
      from: `Innovat Bharat <${FROM_EMAIL}>`,
      to: [email],
      subject: formType === 'partner'
        ? `Thank you for your interest — Innovat Bharat`
        : `We received your message — Innovat Bharat`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto; background: #f7fafc; padding: 24px; border-radius: 12px;">
          <div style="background: linear-gradient(135deg, #1a365d, #2d3748); padding: 24px; border-radius: 8px; margin-bottom: 24px;">
            <h1 style="color: #ffffff; margin: 0; font-size: 22px;">Innovat Bharat</h1>
            <p style="color: #a0aec0; margin: 8px 0 0;">Bridging education and industry in rural India</p>
          </div>
          <p style="color: #2d3748; font-size: 16px;">Hi ${name},</p>
          <p style="color: #2d3748; font-size: 16px; line-height: 1.7;">
            ${formType === 'partner'
              ? `Thank you for expressing interest in joining Innovat Bharat as a <strong>${roleLabel}</strong>. We're excited to connect and will be in touch soon.`
              : `Thank you for reaching out. We've received your message and will get back to you shortly.`
            }
          </p>
          <p style="color: #718096; font-size: 14px; margin-top: 24px; border-top: 1px solid #e2e8f0; padding-top: 16px;">
            Innovat Bharat · <a href="mailto:${TEAM_EMAIL}" style="color: #e67e22;">${TEAM_EMAIL}</a>
          </p>
        </div>
      `,
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Partner form error:', error);
    return res.status(500).json({ error: 'Failed to send. Please email us directly.' });
  }
};
