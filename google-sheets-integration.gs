/**
 * Google Apps Script for RES-VA Application Form
 * 
 * This script receives form submissions and writes them to a Google Sheet.
 * 
 * SETUP INSTRUCTIONS:
 * 1. Open Google Sheets and create a new spreadsheet
 * 2. Name the first sheet "Applications" (or update the sheet name in the script)
 * 3. Add headers in row 1: Timestamp, Full Name, Email, Phone, Location, Experience, Audio Recording URL, Recording Duration
 * 4. Go to Extensions > Apps Script
 * 5. Paste this entire script
 * 6. Click "Deploy" > "New deployment"
 * 7. Select type: "Web app"
 * 8. Execute as: "Me"
 * 9. Who has access: "Anyone" (or "Anyone with Google account" for more security)
 * 10. Click "Deploy"
 * 11. Copy the Web App URL and add it to your .env file as VITE_GOOGLE_SHEETS_WEB_APP_URL
 * 12. Click "Authorize access" and grant permissions
 */

// Configuration - Update these values
const SHEET_NAME = 'Applications'; // Name of the sheet tab
const SPREADSHEET_ID = ''; // Leave empty to use the current spreadsheet, or paste your spreadsheet ID here

/**
 * Handle CORS preflight requests (OPTIONS)
 */
function doOptions() {
  return ContentService
    .createTextOutput('')
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders({
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Max-Age': '3600'
    });
}

/**
 * Main function to handle POST requests
 */
function doPost(e) {
  try {
    // Log the incoming request for debugging
    Logger.log('=== doPost called ===');
    Logger.log('postData.type: ' + (e.postData ? e.postData.type : 'null'));
    Logger.log('postData.contents: ' + (e.postData ? e.postData.contents : 'null'));
    Logger.log('parameters: ' + JSON.stringify(e.parameter));
    
    // Handle both JSON and form-encoded data
    let data;
    if (e.postData && e.postData.type === 'application/json') {
      // Direct JSON data
      Logger.log('Parsing as JSON');
      data = JSON.parse(e.postData.contents);
    } else if (e.parameter && e.parameter.data) {
      // Form-encoded data with JSON string in 'data' parameter
      Logger.log('Parsing form-encoded data from parameter');
      data = JSON.parse(e.parameter.data);
    } else if (e.postData && e.postData.contents) {
      // Try to parse as JSON anyway (fallback)
      Logger.log('Trying to parse postData.contents as JSON');
      try {
        data = JSON.parse(e.postData.contents);
      } catch (parseError) {
        // If that fails, try parsing as form data
        Logger.log('JSON parse failed, trying form data parsing');
        if (e.parameter) {
          // Extract data from form parameters
          data = {
            fullName: e.parameter.fullName || '',
            email: e.parameter.email || '',
            phone: e.parameter.phone || '',
            location: e.parameter.location || '',
            experience: e.parameter.experience || '',
            audioRecording: e.parameter.audioRecording || '',
            recordingDuration: e.parameter.recordingDuration || ''
          };
        } else {
          throw new Error('Could not parse request data');
        }
      }
    } else if (e.parameter) {
      // Direct form parameters
      Logger.log('Using direct form parameters');
      data = {
        fullName: e.parameter.fullName || '',
        email: e.parameter.email || '',
        phone: e.parameter.phone || '',
        location: e.parameter.location || '',
        experience: e.parameter.experience || '',
        audioRecording: e.parameter.audioRecording || '',
        recordingDuration: e.parameter.recordingDuration || ''
      };
    } else {
      throw new Error('No data received in request');
    }
    
    Logger.log('Parsed data: ' + JSON.stringify(data));
    
    // Get the spreadsheet
    const ss = SPREADSHEET_ID 
      ? SpreadsheetApp.openById(SPREADSHEET_ID)
      : SpreadsheetApp.getActiveSpreadsheet();
    
    // Get or create the sheet
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      // Add headers if this is a new sheet
      sheet.getRange(1, 1, 1, 8).setValues([[
        'Timestamp',
        'Full Name',
        'Email',
        'Phone',
        'Location',
        'Experience',
        'Audio Recording URL',
        'Recording Duration'
      ]]);
      // Format header row
      const headerRange = sheet.getRange(1, 1, 1, 8);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#31a9df');
      headerRange.setFontColor('#ffffff');
    }
    
    // Prepare the row data
    const timestamp = new Date();
    const rowData = [
      timestamp,
      data.fullName || '',
      data.email || '',
      data.phone || '',
      data.location || '',
      data.experience || '',
      data.audioRecording || '',
      data.recordingDuration || ''
    ];
    
    // Append the data to the sheet
    sheet.appendRow(rowData);
    Logger.log('Row appended to sheet');
    
    // Format the new row (optional styling)
    const lastRow = sheet.getLastRow();
    Logger.log('Last row: ' + lastRow);
    const newRowRange = sheet.getRange(lastRow, 1, 1, 8);
    
    // Set timestamp format
    sheet.getRange(lastRow, 1).setNumberFormat('yyyy-mm-dd hh:mm:ss');
    
    // Auto-resize columns
    sheet.autoResizeColumns(1, 8);
    
    Logger.log('=== Successfully saved to sheet ===');
    
    // Return success response with CORS headers
    return ContentService
      .createTextOutput(JSON.stringify({
        success: true,
        message: 'Application submitted successfully',
        row: lastRow
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders({
        'Access-Control-Allow-Origin': '*'
      });
      
  } catch (error) {
    // Log the error
    Logger.log('=== ERROR ===');
    Logger.log('Error message: ' + error.toString());
    Logger.log('Error stack: ' + (error.stack || 'No stack trace'));
    
    // Return error response with CORS headers
    return ContentService
      .createTextOutput(JSON.stringify({
        success: false,
        error: error.toString()
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders({
        'Access-Control-Allow-Origin': '*'
      });
  }
}

/**
 * Handle GET requests (alternative method for testing)
 */
function doGet(e) {
  try {
    Logger.log('=== doGet called ===');
    Logger.log('parameters: ' + JSON.stringify(e.parameter));
    
    // Extract data from query parameters
    const data = {
      fullName: e.parameter.fullName || '',
      email: e.parameter.email || '',
      phone: e.parameter.phone || '',
      location: e.parameter.location || '',
      experience: e.parameter.experience || '',
      audioRecording: e.parameter.audioRecording || '',
      recordingDuration: e.parameter.recordingDuration || ''
    };
    
    // Get the spreadsheet
    const ss = SPREADSHEET_ID 
      ? SpreadsheetApp.openById(SPREADSHEET_ID)
      : SpreadsheetApp.getActiveSpreadsheet();
    
    // Get or create the sheet
    let sheet = ss.getSheetByName(SHEET_NAME);
    if (!sheet) {
      sheet = ss.insertSheet(SHEET_NAME);
      sheet.getRange(1, 1, 1, 8).setValues([[
        'Timestamp', 'Full Name', 'Email', 'Phone', 'Location', 'Experience', 'Audio Recording URL', 'Recording Duration'
      ]]);
      const headerRange = sheet.getRange(1, 1, 1, 8);
      headerRange.setFontWeight('bold');
      headerRange.setBackground('#31a9df');
      headerRange.setFontColor('#ffffff');
    }
    
    // Prepare and append row data
    const timestamp = new Date();
    const rowData = [
      timestamp,
      data.fullName || '',
      data.email || '',
      data.phone || '',
      data.location || '',
      data.experience || '',
      data.audioRecording || '',
      data.recordingDuration || ''
    ];
    
    sheet.appendRow(rowData);
    const lastRow = sheet.getLastRow();
    sheet.getRange(lastRow, 1).setNumberFormat('yyyy-mm-dd hh:mm:ss');
    sheet.autoResizeColumns(1, 8);
    
    Logger.log('=== Successfully saved via GET ===');
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, row: lastRow }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders({ 'Access-Control-Allow-Origin': '*' });
      
  } catch (error) {
    Logger.log('=== GET ERROR ===');
    Logger.log('Error: ' + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders({ 'Access-Control-Allow-Origin': '*' });
  }
}

/**
 * Test function - you can run this manually to test the script
 */
function testSubmission() {
  const testData = {
    fullName: 'Test User',
    email: 'test@example.com',
    phone: '+20 100 123 4567',
    location: 'Cairo, Egypt',
    experience: '3-5',
    audioRecording: 'https://example.com/audio.webm',
    recordingDuration: '1:30'
  };
  
  const mockEvent = {
    postData: {
      contents: JSON.stringify(testData)
    }
  };
  
  const result = doPost(mockEvent);
  Logger.log(result.getContent());
}

