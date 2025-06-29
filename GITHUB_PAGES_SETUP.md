# GitHub Pages Setup Guide

## Step 1: Create GitHub Repository
1. Go to [GitHub.com](https://github.com) and sign in
2. Click the "+" icon → "New repository"
3. Name it: `infotech-website` (or any name you prefer)
4. Make it **Public** (required for free GitHub Pages)
5. Click "Create repository"

## Step 2: Upload Your Files
### Method A: Using GitHub Web Interface
1. In your new repository, click "uploading an existing file"
2. Drag and drop all your website files:
   - `index.html`
   - `styles.css`
   - `script.js`
   - `images/` folder
   - `google-apps-script.js`
   - `GAS_SETUP_INSTRUCTIONS.md`
3. Add a commit message: "Initial website upload"
4. Click "Commit changes"

### Method B: Using Git (if you have Git installed)
```bash
# In your project folder
git init
git add .
git commit -m "Initial website upload"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/infotech-website.git
git push -u origin main
```

## Step 3: Enable GitHub Pages
1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "Pages" section
4. Under "Source", select "Deploy from a branch"
5. Select "main" branch and "/ (root)" folder
6. Click "Save"

## Step 4: Access Your Website
- Your site will be available at: `https://YOUR_USERNAME.github.io/infotech-website`
- It may take a few minutes to deploy

## Step 5: Custom Domain (Optional)
1. In the Pages settings, enter your custom domain
2. Update your DNS settings with your domain provider
3. Check "Enforce HTTPS"

## Step 6: Update Google Apps Script
Since you're now hosting on a real domain, update your GAS deployment:
1. Go to your Google Apps Script
2. Create a new deployment
3. Set "Who has access" to "Anyone"
4. Update the URL in your `script.js` if needed

## Benefits of GitHub Pages
- ✅ Completely free
- ✅ Custom domain support
- ✅ Automatic HTTPS
- ✅ Version control
- ✅ Easy updates
- ✅ Professional URLs
- ✅ No CORS issues (real domain)

## Troubleshooting
- **Site not loading:** Wait 5-10 minutes for deployment
- **Images not showing:** Check file paths are correct
- **Form not working:** Verify GAS URL is correct
- **Custom domain not working:** Check DNS settings 