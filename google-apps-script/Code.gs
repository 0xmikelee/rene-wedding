/**
 * Wedding RSVP receiver.
 *
 * 1. Create a Google Sheet.
 * 2. Extensions → Apps Script, replace the default file with this script, and save.
 * 3. Deploy → New deployment → Web app.
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 4. Copy the web app URL (it ends in /exec) into .env.local:
 *    GOOGLE_SHEETS_WEBHOOK_URL=https://script.google.com/macros/s/.../exec
 * 5. Restart the Next.js server.
 *
 * The first submission creates a tab named "RSVPs" and a header row.
 */

var SHEET_NAME = "RSVPs";
var HEADERS = [
  "Submitted At",
  "First Name",
  "Last Name",
  "Email",
  "Attending",
  "Food Allergies",
  "Menu Preference",
];

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = getSheet_();
    sheet.appendRow([
      data.submittedAt || new Date().toISOString(),
      data.firstName || "",
      data.lastName || "",
      data.email || "",
      data.attending || "",
      data.dietary || "",
      data.menu || "",
    ]);
    return json_({ ok: true });
  } catch (error) {
    return json_({ ok: false, error: String(error) });
  }
}

function doGet() {
  return json_({ ok: true });
}

function getSheet_() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(HEADERS);
    sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function json_(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload)).setMimeType(
    ContentService.MimeType.JSON,
  );
}
