// Google Apps Script for Infotech International Contact Form
// Instructions:
// 1. Go to https://script.google.com/
// 2. Create a new project
// 3. Replace the default code with this code
// 4. Create a Google Sheet and note its ID from the URL
// 5. Replace 'YOUR_SHEET_ID_HERE' with your actual sheet ID
// 6. Deploy as a web app (set access to "Anyone")

function doPost(e) {
  try {
    // Parse the incoming data
    const data = JSON.parse(e.postData.contents);
    
    // Get the active spreadsheet (replace with your sheet ID)
    const sheet = SpreadsheetApp.openById('YOUR_SHEET_ID_HERE').getActiveSheet();
    
    // Prepare the row data
    const rowData = [
      data.timestamp || new Date().toISOString(),
      data.firstName || '',
      data.lastName || '',
      data.phone || '',
      data.email || '',
      data.service || '',
      data.contactMethod || '',
      data.address1 || '',
      data.address2 || '',
      data.city || '',
      data.state || '',
      data.zipCode || '',
      data.country || '',
      data.comments || '',
      new Date().toISOString() // Server timestamp
    ];
    
    // Append the data to the sheet
    sheet.appendRow(rowData);
    
    // Optional: Send an email notification
    sendEmailNotification(data);
    
    // Return success response
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success', message: 'Form submitted successfully' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    console.error('Error processing form submission:', error);
    
    // Return error response
    return ContentService
      .createTextOutput(JSON.stringify({ 
        status: 'error', 
        message: 'Error processing form submission' 
      }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Optional: Function to send email notification
function sendEmailNotification(data) {
  try {
    const recipientEmail = 'your-email@example.com'; // Replace with your email
    const subject = 'New Quote Request - Infotech International';
    
    const message = `
      New quote request received:
      
      Name: ${data.firstName} ${data.lastName}
      Email: ${data.email}
      Phone: ${data.phone}
      Service: ${data.service}
      Preferred Contact: ${data.contactMethod}
      
      Address:
      ${data.address1}
      ${data.address2}
      ${data.city}, ${data.state} ${data.zipCode}
      ${data.country}
      
      Comments: ${data.comments}
      
      Submitted: ${data.timestamp}
    `;
    
    MailApp.sendEmail(recipientEmail, subject, message);
    
  } catch (error) {
    console.error('Error sending email notification:', error);
  }
}

// Optional: Function to set up the sheet headers
function setupSheet() {
  const sheet = SpreadsheetApp.openById('YOUR_SHEET_ID_HERE').getActiveSheet();
  
  const headers = [
    'Timestamp (Client)',
    'First Name',
    'Last Name', 
    'Phone',
    'Email',
    'Service',
    'Contact Method',
    'Address Line 1',
    'Address Line 2',
    'City',
    'State',
    'Zip Code',
    'Country',
    'Comments',
    'Timestamp (Server)'
  ];
  
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setFontWeight('bold');
}

// Test function to verify the script is working
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ 
      status: 'success', 
      message: 'Google Apps Script is running correctly' 
    }))
    .setMimeType(ContentService.MimeType.JSON);
} 