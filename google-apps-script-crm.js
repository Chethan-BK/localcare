/**
 * ==============================================================================
 * LOCALCARE INFINITY - GOOGLE APPS SCRIPT CRM RECEIVER & MULTI-TAB BUILDER
 * ==============================================================================
 * INSTRUCTIONS FOR USE (Takes only 2 minutes):
 * 1. Open Google Sheets (https://sheets.new) and name the spreadsheet "LocalCare Infinity CRM".
 * 2. Click "Extensions" > "Apps Script".
 * 3. Delete any default code inside Code.gs and PASTE ALL THE CODE BELOW into it.
 * 4. Click the blue "Deploy" button (top right) > "New deployment".
 * 5. Select type: "Web app".
 * 6. Set Description: "LocalCare Infinity CRM Webhook v3.2".
 * 7. Set "Execute as": "Me".
 * 8. Set "Who has access": "Anyone" (crucial so your backend can securely send records).
 * 9. Click "Deploy", copy the "Web App URL" (ends in /exec).
 * 10. Open your LocalCare Central CRM (http://localhost:3000/admin-crm.html) or set
 *     GOOGLE_SHEETS_WEBHOOK_URL in your server, paste the Web App URL, and click "Save & Test".
 * ==============================================================================
 */

function doPost(e) {
  try {
    var raw = e.postData.contents;
    var payload = JSON.parse(raw);
    var ss = SpreadsheetApp.getActiveSpreadsheet();

    if (payload.type === 'BULK_SYNC_ALL') {
      var sheetsData = payload.sheets;
      for (var sheetName in sheetsData) {
        if (sheetsData.hasOwnProperty(sheetName)) {
          writeSheetData(ss, sheetName, sheetsData[sheetName]);
        }
      }
      return ContentService.createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Bulk synchronized all 9 tabs successfully',
        timestamp: new Date().toISOString()
      })).setMimeType(ContentService.MimeType.JSON);
    }

    if (payload.type === 'SINGLE_EVENT') {
      var sheetName = payload.sheet || 'Customers';
      var record = payload.data;
      var action = payload.action || 'CREATE';
      appendOrUpdateRecord(ss, sheetName, record, action);

      return ContentService.createTextOutput(JSON.stringify({
        status: 'success',
        message: 'Recorded single event to tab ' + sheetName,
        action: action
      })).setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService.createTextOutput(JSON.stringify({
      status: 'ignored',
      message: 'Unknown payload type'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: err.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'online',
    platform: 'LocalCare Infinity Google Sheets CRM Webhook',
    timestamp: new Date().toISOString(),
    sheets: ['Customers', 'Businesses', 'Bookings', 'Payments', 'Reviews', 'Enquiries', 'Complaints', 'Subscriptions', 'Analytics']
  })).setMimeType(ContentService.MimeType.JSON);
}

function writeSheetData(ss, sheetName, dataRows) {
  if (!dataRows || dataRows.length === 0) return;

  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
  } else {
    sheet.clearContents();
  }

  var headers = Object.keys(dataRows[0]);
  var rows = [headers];

  for (var i = 0; i < dataRows.length; i++) {
    var row = [];
    for (var j = 0; j < headers.length; j++) {
      var val = dataRows[i][headers[j]];
      row.push(val !== undefined && val !== null ? val : '');
    }
    rows.push(row);
  }

  sheet.getRange(1, 1, rows.length, headers.length).setValues(rows);

  // Format header row with Brand Orange / Dark Navy styling
  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setBackground('#0B192C');
  headerRange.setFontColor('#FFFFFF');
  headerRange.setFontWeight('bold');
  headerRange.setFontSize(10);
  sheet.setFrozenRows(1);

  // Auto-resize columns
  for (var c = 1; c <= headers.length; c++) {
    sheet.autoResizeColumn(c);
  }
}

function appendOrUpdateRecord(ss, sheetName, record, action) {
  var sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    writeSheetData(ss, sheetName, [record]);
    return;
  }

  var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];
  var idKey = headers[0]; // Primary ID key (e.g. "Customer ID", "Booking ID")
  var recordId = record[idKey];

  if (!recordId) {
    // Append row
    var newRow = [];
    for (var i = 0; i < headers.length; i++) {
      newRow.push(record[headers[i]] !== undefined ? record[headers[i]] : '');
    }
    sheet.appendRow(newRow);
    return;
  }

  // Look for existing row with matching ID to avoid duplicates
  var lastRow = sheet.getLastRow();
  var foundRowIdx = -1;
  if (lastRow > 1) {
    var idColVals = sheet.getRange(2, 1, lastRow - 1, 1).getValues();
    for (var r = 0; r < idColVals.length; r++) {
      if (String(idColVals[r][0]) === String(recordId)) {
        foundRowIdx = r + 2;
        break;
      }
    }
  }

  var rowVals = [];
  for (var h = 0; h < headers.length; h++) {
    rowVals.push(record[headers[h]] !== undefined ? record[headers[h]] : '');
  }

  if (foundRowIdx > 1) {
    sheet.getRange(foundRowIdx, 1, 1, headers.length).setValues([rowVals]);
  } else {
    sheet.appendRow(rowVals);
  }
}

