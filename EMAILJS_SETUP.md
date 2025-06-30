# EmailJS Setup Instructions for GitHub Pages

## Overview
This setup allows your GitHub Pages website to send emails directly from the frontend using EmailJS, eliminating the need for any backend server.

## Step-by-Step Setup

### 1. Create EmailJS Account
1. Go to [EmailJS](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address
4. Log into your EmailJS dashboard

### 2. Add Email Service
1. In your EmailJS dashboard, go to **"Email Services"**
2. Click **"Add New Service"**
3. Choose your email provider:
   - **Gmail** (recommended for beginners)
   - **Outlook/Hotmail**
   - **Yahoo**
   - **Custom SMTP** (for your own mail server)
4. Follow the authentication steps
5. **Note your Service ID** (e.g., `service_abc123`)

### 3. Create Email Template
1. Go to **"Email Templates"**
2. Click **"Create New Template"**
3. Use this template content:

**Template Name:** Quote Request Template

**Subject:** New Quote Request - {{from_name}}

**HTML Content:**
```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            max-width: 600px; 
            margin: 0 auto; 
        }
        .header { 
            background: linear-gradient(135deg, #2563eb, #1d4ed8); 
            color: white; 
            padding: 30px; 
            text-align: center; 
            border-radius: 10px 10px 0 0;
        }
        .content { 
            padding: 30px; 
            background: #f8fafc; 
            border-radius: 0 0 10px 10px;
        }
        .field { 
            margin-bottom: 20px; 
            padding: 15px; 
            background: white; 
            border-radius: 8px; 
            border-left: 4px solid #2563eb;
        }
        .label { 
            font-weight: bold; 
            color: #2563eb; 
            display: block; 
            margin-bottom: 5px;
        }
        .value { 
            color: #374151; 
        }
        .footer { 
            background: #e2e8f0; 
            padding: 20px; 
            text-align: center; 
            font-size: 12px; 
            color: #64748b; 
            border-radius: 8px;
            margin-top: 20px;
        }
        .company-info {
            background: #2563eb;
            color: white;
            padding: 15px;
            border-radius: 8px;
            margin-bottom: 20px;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1>🎯 New Quote Request</h1>
        <p>Infotech International</p>
    </div>
    
    <div class="content">
        <div class="company-info">
            <strong>Infotech International</strong><br>
            Professional IT & Design Services
        </div>
        
        <div class="field">
            <span class="label">👤 Contact Name:</span>
            <span class="value">{{from_name}}</span>
        </div>
        
        <div class="field">
            <span class="label">📧 Email Address:</span>
            <span class="value">{{from_email}}</span>
        </div>
        
        <div class="field">
            <span class="label">📞 Phone Number:</span>
            <span class="value">{{phone}}</span>
        </div>
        
        <div class="field">
            <span class="label">🛠️ Requested Service:</span>
            <span class="value">{{service}}</span>
        </div>
        
        <div class="field">
            <span class="label">📞 Preferred Contact Method:</span>
            <span class="value">{{contact_method}}</span>
        </div>
        
        <div class="field">
            <span class="label">📍 Address:</span>
            <span class="value">{{address}}</span>
        </div>
        
        <div class="field">
            <span class="label">💬 Additional Comments:</span>
            <span class="value">{{comments}}</span>
        </div>
        
        <div class="field">
            <span class="label">⏰ Submitted:</span>
            <span class="value">{{timestamp}}</span>
        </div>
    </div>
    
    <div class="footer">
        <p>📧 This email was sent from your website contact form</p>
        <p>🌐 Infotech International - Professional IT & Design Services</p>
    </div>
</body>
</html>
```

4. **Save the template** and note your **Template ID** (e.g., `template_xyz789`)

### 4. Get Your User ID
1. Go to **"Account"** > **"API Keys"**
2. Copy your **Public Key** (User ID) - looks like `user_abc123def456`

### 5. Update Your Website Code
1. Open `script.js`
2. Replace these placeholder values:

```javascript
// Line 4: Replace with your Public Key
emailjs.init('YOUR_EMAILJS_USER_ID');

// Line 185: Replace with your Service ID and Template ID
const response = await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', templateParams);
```

**Example with real values:**
```javascript
emailjs.init('user_abc123def456');
const response = await emailjs.send('service_xyz789', 'template_abc123', templateParams);
```

### 6. Test the Setup
1. Save your changes
2. Deploy to GitHub Pages
3. Fill out the contact form on your website
4. Submit the form
5. Check your email for the notification

## Configuration Summary

You need to replace these 3 values in `script.js`:

| Placeholder | What to Replace | Example |
|-------------|----------------|---------|
| `YOUR_EMAILJS_USER_ID` | Your Public Key | `user_abc123def456` |
| `YOUR_SERVICE_ID` | Your Email Service ID | `service_xyz789` |
| `YOUR_TEMPLATE_ID` | Your Template ID | `template_abc123` |

## Features
- ✅ Sends emails directly from frontend
- ✅ Works perfectly with GitHub Pages
- ✅ Professional email templates
- ✅ Real-time form validation
- ✅ Success/error notifications
- ✅ Loading states during submission
- ✅ No backend required

## Free Plan Limits
- **200 emails per month** (generous free tier)
- Professional email templates
- Multiple email services
- Standard support

## Paid Plans
- **Personal:** $15/month - 1,000 emails
- **Business:** $35/month - 10,000 emails
- **Enterprise:** Custom pricing

## Troubleshooting

### Common Issues:
1. **"EmailJS is not defined"**: Make sure the EmailJS library is loaded in your HTML
2. **"Service not found"**: Check your Service ID is correct
3. **"Template not found"**: Verify your Template ID is correct
4. **"User ID invalid"**: Check your Public Key is correct

### Testing Steps:
1. Check browser console for errors
2. Verify all 3 IDs are correct
3. Test with a simple template first
4. Check your email spam folder

### Debug Mode:
Add this to see detailed logs:
```javascript
emailjs.init('YOUR_USER_ID', undefined, {
    useGlobal: false,
    debug: true
});
```

## Security Notes
- EmailJS public key is safe to expose in frontend code
- Service credentials are stored securely on EmailJS servers
- Consider rate limiting for production use

## Customization Options
You can modify the email template to:
- Change colors and styling
- Add your company logo
- Include additional fields
- Create different templates for different services
- Add custom branding

## Support
If you encounter issues:
1. Check EmailJS documentation
2. Review browser console for errors
3. Verify all configuration values
4. Contact EmailJS support if needed

## Next Steps
After setup:
1. Test thoroughly with different form data
2. Customize the email template to match your brand
3. Consider setting up email notifications for different team members
4. Monitor your email usage in the EmailJS dashboard 