# Google Apps Script Setup Instructions

## Overview
This setup allows your website's contact form to send data directly to a Google Sheet using Google Apps Script (GAS).

## Step-by-Step Setup

### 1. Create a Google Sheet
1. Go to [Google Sheets](https://sheets.google.com/)
2. Create a new spreadsheet
3. Name it "Infotech International - Contact Form Submissions"
4. Copy the Sheet ID from the URL (the long string between /d/ and /edit)

### 2. Create Google Apps Script
1. Go to [Google Apps Script](https://script.google.com/)
2. Click "New Project"
3. Replace the default code with the content from `google-apps-script.js`
4. Replace `'YOUR_SHEET_ID_HERE'` with your actual Sheet ID
5. Replace `'your-email@example.com'` with your email address (optional)

### 3. Deploy as Web App
1. Click "Deploy" > "New deployment"
2. Choose "Web app" as the type
3. Set "Execute as" to "Me"
4. Set "Who has access" to "Anyone"
5. Click "Deploy"
6. Copy the Web App URL

### 4. Update Your Website
1. Open `script.js`
2. Replace `'YOUR_GOOGLE_APPS_SCRIPT_WEBAPP_URL_HERE'` with your actual Web App URL
3. Save the file

### 5. Set Up Sheet Headers (Optional)
1. In your Google Apps Script editor, run the `setupSheet()` function once
2. This will create the column headers in your sheet

## Testing
1. Fill out the contact form on your website
2. Submit the form
3. Check your Google Sheet - a new row should appear
4. Check your email for the notification (if enabled)

## Features
- ✅ Stores all form submissions in Google Sheets
- ✅ Sends email notifications (optional)
- ✅ Includes timestamps
- ✅ Error handling and user feedback
- ✅ Loading states during submission

## Troubleshooting

### Common Issues:
1. **CORS Error**: Make sure your GAS web app is deployed with "Anyone" access
2. **Sheet Not Found**: Verify your Sheet ID is correct
3. **Email Not Sending**: Check that you've replaced the email address in the script

### Testing the Connection:
1. Visit your Web App URL directly in a browser
2. You should see: `{"status":"success","message":"Google Apps Script is running correctly"}`

## Security Notes
- The web app is set to "Anyone" access to allow form submissions
- Consider implementing additional validation in the GAS script
- Monitor your sheet for spam submissions

## Customization
You can modify the `google-apps-script.js` file to:
- Add more validation
- Change the email notification format
- Add additional processing logic
- Integrate with other Google services

## Support
If you encounter issues:
1. Check the browser console for JavaScript errors
2. Check the Google Apps Script logs
3. Verify all URLs and IDs are correct 