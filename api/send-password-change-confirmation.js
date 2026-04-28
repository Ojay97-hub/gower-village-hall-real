const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp-relay.brevo.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.BREVO_SMTP_USER,
    pass: process.env.BREVO_SMTP_PASS,
  },
});

module.exports = async (req, res) => {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, name } = req.body || {};

  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const fromEmail = process.env.BREVO_FROM_EMAIL;

  if (!fromEmail) {
    console.error('Missing BREVO_FROM_EMAIL env var');
    return res.status(500).json({ error: 'Server configuration error' });
  }

  const displayName = name ? escapeHtml(name) : 'there';
  const changedAt = new Date().toLocaleString('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  const html = `
    <div style="font-family:sans-serif;font-size:15px;color:#222;max-width:560px;">
      <h2 style="color:#6b7564;">Your password was changed successfully</h2>
      <p>Hello ${displayName},</p>
      <p>This is a confirmation that the password for your Penmaen &amp; Nicholaston Village Hall administrator account was updated successfully.</p>
      <p><strong>Time of change:</strong> ${escapeHtml(changedAt)}</p>
      <p>If you made this change, no further action is required.</p>
      <p>If you did not change your password, please contact a Master Admin as soon as possible.</p>
      <p style="margin-top:24px;">Kind regards,<br><strong>Penmaen &amp; Nicholaston Village Hall</strong></p>
    </div>
  `;

  try {
    await transporter.sendMail({
      from: `"Penmaen & Nicholaston Village Hall" <${fromEmail}>`,
      to: email,
      subject: 'Your admin password was changed',
      html,
    });

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error('Failed to send password change confirmation email:', err.message);
    return res.status(500).json({ error: 'Failed to send email' });
  }
};

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
