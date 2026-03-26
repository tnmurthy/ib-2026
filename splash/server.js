/**
 * Innovat Bharat — Splash Page API Server
 * POST /api/notify  → appends email + timestamp to a Google Sheet via Sheets API
 * GET  /health      → health check for Render
 */

const express = require('express');
const path    = require('path');
const { google } = require('googleapis');

const app  = express();
const PORT = process.env.PORT || 3001;

/* ── Middleware ── */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* ── Serve static splash page ── */
app.use(express.static(path.join(__dirname, 'public')));

/* ── Health check (Render requires this) ── */
app.get('/health', (_, res) => res.json({ status: 'ok', service: 'ib-splash' }));

/* ──────────────────────────────────────────
   Google Sheets helpers
   Env vars needed on Render:
     GOOGLE_SERVICE_ACCOUNT_EMAIL  — service account email
     GOOGLE_PRIVATE_KEY            — service account private key (with \n)
     GOOGLE_SHEET_ID               — the spreadsheet ID to write into
────────────────────────────────────────── */
function getSheetsClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      private_key:  (process.env.GOOGLE_PRIVATE_KEY || '').replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
  return google.sheets({ version: 'v4', auth });
}

/* ── POST /api/notify ── */
app.post('/api/notify', async (req, res) => {
  const { email } = req.body;

  /* Basic validation */
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ message: 'Invalid email address.' });
  }

  const timestamp = new Date().toISOString();
  const sheetId   = process.env.GOOGLE_SHEET_ID;

  /* ── Fallback: log to console if env vars not set ── */
  if (!sheetId || !process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL) {
    console.log(`[NOTIFY] ${timestamp} | ${email} (env not configured — logged only)`);
    return res.json({ message: 'Noted — will be saved once configured.' });
  }

  try {
    const sheets = getSheetsClient();

    /* Ensure header row exists on first run */
    const check = await sheets.spreadsheets.values.get({
      spreadsheetId: sheetId,
      range: 'Sheet1!A1',
    });

    if (!check.data.values || check.data.values.length === 0) {
      await sheets.spreadsheets.values.update({
        spreadsheetId: sheetId,
        range: 'Sheet1!A1',
        valueInputOption: 'RAW',
        requestBody: { values: [['Email', 'Timestamp', 'Source']] },
      });
    }

    /* Append the new row */
    await sheets.spreadsheets.values.append({
      spreadsheetId: sheetId,
      range: 'Sheet1!A:C',
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      requestBody: {
        values: [[email, timestamp, 'splash-coming-soon']],
      },
    });

    console.log(`[NOTIFY] Saved: ${email} at ${timestamp}`);
    return res.json({ message: 'Subscribed successfully.' });

  } catch (err) {
    console.error('[NOTIFY] Google Sheets error:', err.message);
    return res.status(500).json({ message: 'Could not save — please try again.' });
  }
});

/* ── SPA fallback ── */
app.get('*', (_, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`ib-splash server running on port ${PORT}`);
});
