# Google Sheets Integration Setup Guide

This guide will help you connect your form submissions to a Google Sheet.

## Prerequisites

- A Google account
- Access to Google Sheets
- Your form is already set up and working

## Step-by-Step Setup

### Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it something like "RES-VA Applications" or "Job Applications"
4. In the first sheet (tab), rename it to "Applications" (or keep the default name and update the script)
5. Add the following headers in row 1:
   - Column A: `Timestamp`
   - Column B: `Full Name`
   - Column C: `Email`
   - Column D: `Phone`
   - Column E: `Location`
   - Column F: `Experience`
   - Column G: `Audio Recording URL`
   - Column H: `Recording Duration`

### Step 2: Set Up Google Apps Script

1. In your Google Sheet, go to **Extensions** > **Apps Script**
2. Delete any default code in the editor
3. Copy the entire contents of `google-sheets-integration.gs` from your project root
4. Paste it into the Apps Script editor
5. (Optional) If you want to use a specific spreadsheet ID instead of the current one:
   - Find your spreadsheet ID in the URL: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`
   - Update the `SPREADSHEET_ID` constant in the script

### Step 3: Deploy as Web App

1. Click the **Deploy** button (top right)
2. Select **New deployment**
3. Click the gear icon (⚙️) next to "Select type"
4. Choose **Web app**
5. Configure the deployment:
   - **Description**: "RES-VA Form Integration" (optional)
   - **Execute as**: Select **Me** (your email)
   - **Who has access**: Select **Anyone** (or "Anyone with Google account" for more security)
6. Click **Deploy**
7. **IMPORTANT**: Copy the **Web App URL** - you'll need this in the next step
8. Click **Authorize access**
9. Review the permissions and click **Allow**

**Note**: If you update the script later, you need to create a new deployment version:
- Click **Deploy** > **Manage deployments**
- Click the pencil icon (✏️) next to your deployment
- Select "New version" or update the version number
- Click **Deploy**

### Step 4: Add Environment Variable

1. Create a `.env` file in your project root (if it doesn't exist)
2. Add the following line:
   ```
   VITE_GOOGLE_SHEETS_WEB_APP_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```
   Replace `YOUR_SCRIPT_ID` with the actual Web App URL you copied in Step 3

3. Your `.env` file should now look something like this:
   ```
   VITE_FIREBASE_API_KEY=your_firebase_key
   VITE_FIREBASE_AUTH_DOMAIN=your_domain
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   VITE_FORMSPREE_ENDPOINT=your_formspree_endpoint
   VITE_GOOGLE_SHEETS_WEB_APP_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   ```

4. **Restart your development server** for the changes to take effect:
   ```bash
   # Stop the server (Ctrl+C) and restart
   npm run dev
   ```

### Step 5: Test the Integration

1. Submit a test application through your form
2. Check your Google Sheet - you should see a new row with the submission data
3. Verify all fields are populated correctly

## Troubleshooting

### CORS Errors (Most Common Issue)

If you see CORS errors like "Access-Control-Allow-Origin header is not present":

1. **Make sure you've updated the script**: The latest version includes CORS handling
2. **Redeploy the Web App**: After updating the script, you MUST create a new deployment:
   - Go to **Deploy** > **Manage deployments**
   - Click the pencil icon (✏️) next to your deployment
   - Select "New version"
   - Click **Deploy**
3. **The code uses `no-cors` mode**: This bypasses CORS restrictions but means we can't verify the response. The data will still be saved to your sheet.

### No data appearing in Google Sheet

- **Check the Web App URL**: Make sure it's correct in your `.env` file
- **Check permissions**: Ensure the Web App is set to "Anyone" or "Anyone with Google account"
- **Check browser console**: Look for any error messages when submitting the form
- **Test the script manually**: In Apps Script, run the `testSubmission()` function to verify the script works
- **Check Apps Script execution log**: Go to **Executions** in Apps Script to see if requests are being received

### "Script function not found" error

- Make sure the `doPost` function exists in your Apps Script
- Make sure you've saved the script before deploying
- Redeploy the Web App after making changes to the script

### Data not formatting correctly

- The script automatically formats the timestamp column
- If you need different formatting, modify the script's formatting section

## Security Notes

- The Web App URL is public, but only your script can write to your sheet
- For additional security, you can:
  - Set "Who has access" to "Anyone with Google account"
  - Add validation in the script to check for a secret token
  - Use Google Sheets API with OAuth instead (more complex setup)

## Updating the Script

If you need to modify the script:

1. Make changes in Apps Script editor
2. Click **Deploy** > **Manage deployments**
3. Click the pencil icon (✏️) next to your deployment
4. Update the version (or create a new version)
5. Click **Deploy**
6. The Web App URL remains the same - no need to update your `.env` file

## Optional: Add More Columns

If you want to track additional information:

1. Add new columns to your Google Sheet
2. Update the script's `rowData` array to include the new fields
3. Update the header row creation in the script
4. Redeploy the Web App

## Support

If you encounter issues:
1. Check the Apps Script execution log: **Executions** (left sidebar in Apps Script)
2. Check browser console for client-side errors
3. Verify all environment variables are set correctly

