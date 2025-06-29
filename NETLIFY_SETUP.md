# Netlify Setup Guide (Easiest Option)

## Step 1: Prepare Your Files
Make sure all your website files are in one folder:
- `index.html`
- `styles.css`
- `script.js`
- `images/` folder
- `google-apps-script.js`
- `GAS_SETUP_INSTRUCTIONS.md`

## Step 2: Deploy to Netlify
### Method A: Drag & Drop (Easiest)
1. Go to [Netlify.com](https://netlify.com)
2. Sign up with GitHub, GitLab, or email
3. Drag and drop your entire website folder onto the Netlify dashboard
4. Wait for deployment (usually 30 seconds)
5. Your site is live! 🎉

### Method B: Connect to GitHub
1. Go to [Netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Connect your GitHub account
4. Select your repository
5. Click "Deploy site"

## Step 3: Customize Your Site
1. Click on your site in Netlify dashboard
2. Go to "Site settings" → "Change site name"
3. Choose a custom subdomain: `your-site-name.netlify.app`

## Step 4: Custom Domain (Optional)
1. In "Domain settings", click "Add custom domain"
2. Enter your domain name
3. Follow the DNS instructions
4. Enable HTTPS

## Step 5: Form Handling (Bonus!)
Netlify can handle your contact form without Google Apps Script:
1. In your form, add: `action="/"` and `data-netlify="true"`
2. Add a hidden input: `<input type="hidden" name="form-name" value="contact" />`
3. Netlify will automatically collect form submissions

## Benefits of Netlify
- ✅ Drag & drop deployment
- ✅ Automatic HTTPS
- ✅ Custom domain support
- ✅ Built-in form handling
- ✅ Great performance
- ✅ Easy updates
- ✅ No CORS issues

## Troubleshooting
- **Files not uploading:** Make sure `index.html` is in the root folder
- **Images not showing:** Check file paths
- **Form not working:** Verify GAS URL or use Netlify forms
- **Custom domain issues:** Check DNS settings

## Alternative: Netlify Forms
If you want to use Netlify's built-in form handling instead of Google Apps Script:

```html
<!-- In your form -->
<form name="contact" method="POST" data-netlify="true" action="/">
  <input type="hidden" name="form-name" value="contact" />
  <!-- Your existing form fields -->
</form>
```

This will send form submissions to your Netlify dashboard automatically! 