/**
 * Google Apps Script for Innovat Bharat Form Collection
 * 
 * Instructions:
 * 1. Go to Google Sheets and create a new sheet named "Innovat Bharat Leads"
 * 2. Rename 'Sheet1' to 'Contact' and add column headers (Row 1): Date, Name, Designation, CollegeName, Location, Email, Phone, PreferredTime, Message
 * 3. Create another sheet (tab) named 'Partner' and add headers: Date, Name, Email, Phone, Type, Expertise, Message
 * 4. Create another sheet name 'Newsletter' and add headers: Date, Email
 * 5. Go to Extensions > Apps Script
 * 6. Paste this complete code over the default Code.gs
 * 7. Click Deploy > New deployment. Select type 'Web app'. 
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 8. Click Deploy and copy the Web App URL.
 * 9. Update the 'apiUrl' in your environment.ts to this URL.
 */

const SHEET_ID = SpreadsheetApp.getActiveSpreadsheet().getId();

function doPost(e) {
  try {
    // Enable CORS
    const headers = {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    };

    let data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (parseError) {
      return createJsonResponse({ error: 'Invalid JSON payload' }, 400, headers);
    }

    const timestamp = new Date();
    
    // Determine which form was submitted based on the payload structure
    if (data.formType === 'contact' || data.collegeName) {
      // College / Contact Form
      const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName('Contact');
      if (sheet) {
        sheet.appendRow([
          timestamp,
          data.name || '',
          data.designation || '',
          data.collegeName || '',
          data.location || '',
          data.email || '',
          data.phone || '',
          data.preferredDateTime || '',
          data.message || ''
        ]);
      }
    } 
    else if (data.formType === 'partner' || data.type === 'mentor' || data.type === 'industry' || data.type === 'institutional' || data.role) {
      // Partner / Mentor / Volunteer form
      const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName('Partner');
      if (sheet) {
        sheet.appendRow([
          timestamp,
          data.name || '',
          data.email || '',
          data.phone || '',
          data.type || data.role || '',
          data.expertise || '',
          data.message || ''
        ]);
      }
    }
    else if (data.formType === 'newsletter' || data.email && !data.name) {
      // Newsletter Form
      const sheet = SpreadsheetApp.openById(SHEET_ID).getSheetByName('Newsletter');
      if (sheet) {
        sheet.appendRow([
          timestamp,
          data.email || ''
        ]);
      }
    } else {
      // Fallback
      const sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
      sheet.appendRow([timestamp, "Unknown Form Type", JSON.stringify(data)]);
    }

    return createJsonResponse({ success: true, message: 'Form submitted successfully!' }, 200, headers);

  } catch (err) {
    Logger.log(err.toString());
    return createJsonResponse({ success: false, error: err.toString() }, 500, {
      "Access-Control-Allow-Origin": "*"
    });
  }
}

function doOptions(e) {
  // Respond to Preflight requests
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400"
  };
  return createJsonResponse({ success: true }, 200, headers);
}

function createJsonResponse(responseObject, statusCode, headers) {
  const output = ContentService.createTextOutput(JSON.stringify(responseObject));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
