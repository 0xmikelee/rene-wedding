# Rene & Arthur

Wedding site for 12 December 2026. One page: schedule, venues, attire, and an RSVP form that appends each response to a Google Sheet.

```bash
npm install
cp .env.example .env.local
npm run dev
```

## Password

The site stays on a password screen until a guest enters the password from their invitation.

Set it in `.env.local`:

```bash
SITE_PASSWORD=your-invitation-password
```

Restart `npm run dev` after changing it, and set the same variable on your host when you deploy. Until `SITE_PASSWORD` has a value, the screen stays up and no password will work. A correct password is remembered in that browser for 30 days. Changing the password signs everyone out.

## Connect the RSVP form to Google Sheets

1. Create a Google Sheet.
2. Open **Extensions → Apps Script** and replace the default script with `google-apps-script/Code.gs`. Save.
3. **Deploy → New deployment → Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Copy the web app URL (it ends in `/exec`) into `.env.local`:

```bash
GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/.../exec
```

5. Restart `npm run dev`.

The first submission creates an **RSVPs** tab and a header row. Set the same variable in your host’s environment when you deploy.
