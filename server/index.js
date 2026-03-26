/**
 * Innovat Bharat — Express API Server
 * Deployed as a Render Web Service.
 * Routes:
 *   POST /api/contact    — college invite form
 *   POST /api/partner    — partner/mentor interest + community message
 *   POST /api/newsletter — newsletter subscription
 */

const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');

const app = express();
const PORT = process.env.PORT || 3000;

const resend = new Resend(process.env.RESEND_API_KEY);
const TEAM_EMAIL = process.env.IB_TEAM_EMAIL || 'info@innovatbharat.org';
const FROM_EMAIL = process.env.IB_FROM_EMAIL || 'noreply@innovatbharat.org';
const ALLOWED_ORIGIN = process.env.ALLOWED_ORIGIN || '*';

// ── Middleware ────────────────────────────────────────────────────────────────
app.use(express.json());
app.use(cors({
  origin: ALLOWED_ORIGIN,
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => res.json({ status: 'ok' }));

// ── POST /api/contact ─────────────────────────────────────────────────────────
app.post('/api/contact', async (req, res) => {
  const {
    name, designation, collegeName, location,
    email, phone, preferredDateTime, message,
  } = req.body || {};

  if (!name || !email || !collegeName || !phone) {
    return res.status(400).json({ error: 'Missing required fields: name, email, collegeName, phone' });
  }

  try {
    // Notify team
    await resend.emails.send({
      from: `Innovat Bharat Forms <${FROM_EMAIL}>`,
      to: [TEAM_EMAIL],
      replyTo: email,
      subject: `🎓 New College Invite Request — ${collegeName}`,
      html: `
        <div style="font-family:-apple-system,sans-serif;max-width:600px;margin:0 auto;background:#f7fafc;padding:24px;border-radius:12px;">
          <div style="background:linear-gradient(135deg,#1a365d,#2d3748);padding:24px;border-radius:8px;margin-bottom:24px;">
            <h1 style="color:#fff;margin:0;font-size:20px;">New College Invitation Request</h1>
            <p style="color:#a0aec0;margin:8px 0 0;">Submitted via innovatbharat.org</p>
          </div>
          <table style="width:100%;border-collapse:collapse;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.06);">
            ${row('Name', name)}
            ${row('Designation', designation || '—')}
            ${row('College', `<strong>${collegeName}</strong>`)}
            ${row('Location', location || '—')}
            ${row('Email', `<a href="mailto:${email}" style="color:#e67e22;">${email}</a>`)}
            ${row('Phone', phone)}
            ${row('Preferred Date/Time', preferredDateTime || '—')}
            ${row('Message', message || '—', true)}
          </table>
          <div style="margin-top:20px;padding:14px;background:#fff3cd;border-radius:8px;border-left:4px solid #e67e22;">
            <strong style="color:#744210;">Action needed:</strong>
            <span style="color:#744210;"> Respond within 48 hours — reply to this email to reach ${name}.</span>
          </div>
        </div>`,
    });

    // Acknowledge submitter
    await resend.emails.send({
      from: `Innovat Bharat <${FROM_EMAIL}>`,
      to: [email],
      subject: `We received your request — Innovat Bharat`,
      html: ackEmail(name, `
        <p style="color:#2d3748;font-size:16px;line-height:1.7;">
          Thank you for reaching out from <strong>${collegeName}</strong>. Our team will contact you
          within <strong>48 hours</strong> to schedule the introduction session.
        </p>
        <p style="color:#2d3748;font-size:16px;line-height:1.7;">
          In the meantime, explore our ecosystem at
          <a href="https://innovatbharat.org/ecosystem" style="color:#e67e22;">innovatbharat.org/ecosystem</a>.
        </p>
        <div style="background:white;border-radius:8px;padding:20px;margin:24px 0;border:1px solid #e2e8f0;">
          <p style="margin:0;color:#4a5568;font-weight:600;">What happens next?</p>
          <ol style="color:#4a5568;line-height:2;margin-top:12px;">
            <li>We review your request and confirm availability</li>
            <li>Our team calls or emails you to schedule the session</li>
            <li>45-minute introduction session with your team</li>
            <li>We discuss the right engagement model together</li>
          </ol>
        </div>`),
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Contact error:', err);
    return res.status(500).json({ error: 'Failed to send. Please email us directly.' });
  }
});

// ── POST /api/partner ─────────────────────────────────────────────────────────
const ROLE_LABELS = {
  mentor: 'Individual Mentor', industry: 'Industry Partner',
  institutional: 'Institutional Partner', student: 'Student',
  parent: 'Parent', other: 'Other',
};

app.post('/api/partner', async (req, res) => {
  const { name, email, phone, type, role, expertise, message } = req.body || {};

  if (!name || !email) {
    return res.status(400).json({ error: 'Name and email are required' });
  }

  const formType = type ? 'partner' : 'community';
  const roleLabel = ROLE_LABELS[type || role] || type || role || '—';

  try {
    await resend.emails.send({
      from: `Innovat Bharat Forms <${FROM_EMAIL}>`,
      to: [TEAM_EMAIL],
      replyTo: email,
      subject: formType === 'partner'
        ? `🤝 New Partner/Mentor Interest — ${roleLabel} (${name})`
        : `💬 New Community Message from ${name}`,
      html: `
        <div style="font-family:-apple-system,sans-serif;max-width:600px;margin:0 auto;background:#f7fafc;padding:24px;border-radius:12px;">
          <div style="background:linear-gradient(135deg,#1a365d,#2d3748);padding:24px;border-radius:8px;margin-bottom:24px;">
            <h1 style="color:#fff;margin:0;font-size:20px;">
              ${formType === 'partner' ? 'New Partner / Mentor Interest' : 'New Community Message'}
            </h1>
            <p style="color:#a0aec0;margin:8px 0 0;">Submitted via innovatbharat.org</p>
          </div>
          <table style="width:100%;border-collapse:collapse;background:#fff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,.06);">
            ${row('Name', name)}
            ${row('Email', `<a href="mailto:${email}" style="color:#e67e22;">${email}</a>`)}
            ${phone ? row('Phone', phone) : ''}
            ${row(formType === 'partner' ? 'Role Type' : 'I am a', `<strong>${roleLabel}</strong>`)}
            ${expertise ? row('Domain / Expertise', expertise) : ''}
            ${row('Message', message || '—', true)}
          </table>
          <p style="margin-top:16px;color:#718096;font-size:14px;">Reply to this email to reach ${name}.</p>
        </div>`,
    });

    await resend.emails.send({
      from: `Innovat Bharat <${FROM_EMAIL}>`,
      to: [email],
      subject: formType === 'partner'
        ? `Thank you for your interest — Innovat Bharat`
        : `We received your message — Innovat Bharat`,
      html: ackEmail(name, `
        <p style="color:#2d3748;font-size:16px;line-height:1.7;">
          ${formType === 'partner'
            ? `Thank you for expressing interest in joining Innovat Bharat as a <strong>${roleLabel}</strong>. We're excited to connect and will be in touch soon.`
            : `Thank you for reaching out. We've received your message and will get back to you shortly.`
          }
        </p>`),
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Partner error:', err);
    return res.status(500).json({ error: 'Failed to send. Please email us directly.' });
  }
});

// ── POST /api/newsletter ──────────────────────────────────────────────────────
app.post('/api/newsletter', async (req, res) => {
  const { email } = req.body || {};

  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'A valid email address is required' });
  }

  try {
    await resend.emails.send({
      from: `Innovat Bharat Forms <${FROM_EMAIL}>`,
      to: [TEAM_EMAIL],
      subject: `📩 New Newsletter Subscriber — ${email}`,
      html: `<div style="font-family:-apple-system,sans-serif;max-width:480px;margin:0 auto;padding:24px;background:#f7fafc;border-radius:12px;">
        <p style="color:#2d3748;font-size:16px;">New subscriber:</p>
        <p style="font-size:20px;font-weight:700;color:#1a365d;padding:16px;background:white;border-radius:8px;border-left:4px solid #e67e22;">${email}</p>
        <p style="color:#718096;font-size:14px;">Add to your mailing list / CRM.</p>
      </div>`,
    });

    await resend.emails.send({
      from: `Innovat Bharat <${FROM_EMAIL}>`,
      to: [email],
      subject: `Welcome to Innovat Bharat — you're subscribed`,
      html: ackEmail('there', `
        <p style="color:#2d3748;font-size:16px;line-height:1.7;">
          Thank you for subscribing. You'll receive our latest articles, resources, and program
          updates — no spam, just useful content for students, educators, and changemakers.
        </p>
        <div style="background:white;border-radius:8px;padding:20px;margin:24px 0;border:1px solid #e2e8f0;">
          <p style="margin:0 0 12px;font-weight:600;color:#1a365d;">Explore while you wait:</p>
          <ul style="color:#4a5568;line-height:2.2;margin:0;padding-left:20px;">
            <li><a href="https://innovatbharat.org/ecosystem" style="color:#e67e22;">The Innovat Bharat Ecosystem</a></li>
            <li><a href="https://innovatbharat.org/programs" style="color:#e67e22;">Our Programs</a></li>
            <li><a href="https://innovatbharat.org/contact" style="color:#e67e22;">Invite Us To Your College</a></li>
          </ul>
        </div>`),
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Newsletter error:', err);
    return res.status(500).json({ error: 'Subscription failed. Please try again.' });
  }
});

// ── Helpers ───────────────────────────────────────────────────────────────────
function row(label, value, last = false) {
  return `<tr style="${last ? '' : 'border-bottom:1px solid #e2e8f0;'}">
    <td style="padding:14px 20px;font-weight:600;color:#4a5568;width:40%;background:#f7fafc;">${label}</td>
    <td style="padding:14px 20px;color:#1a202c;">${value}</td>
  </tr>`;
}

function ackEmail(name, bodyHtml) {
  return `
    <div style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;max-width:600px;margin:0 auto;background:#f7fafc;padding:24px;border-radius:12px;">
      <div style="background:linear-gradient(135deg,#1a365d,#2d3748);padding:24px;border-radius:8px;margin-bottom:24px;">
        <h1 style="color:#fff;margin:0;font-size:22px;">Innovat Bharat</h1>
        <p style="color:#a0aec0;margin:8px 0 0;">Bridging education and industry in rural India</p>
      </div>
      <p style="color:#2d3748;font-size:16px;">Hi ${name},</p>
      ${bodyHtml}
      <p style="color:#718096;font-size:14px;margin-top:24px;border-top:1px solid #e2e8f0;padding-top:16px;">
        Innovat Bharat · <a href="mailto:${TEAM_EMAIL}" style="color:#e67e22;">${TEAM_EMAIL}</a>
      </p>
    </div>`;
}

// ── Start ─────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`Innovat Bharat API server running on port ${PORT}`);
});
