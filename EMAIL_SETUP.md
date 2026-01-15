# 📧 Email Setup Guide

## Quick Start - Get CV Request Emails

Your portfolio is configured to send CV request emails to: **gideonsammysen@gmail.com**

### Option 1: Resend (Recommended - 5 minutes)

1. **Sign up at Resend**
   - Go to https://resend.com/signup
   - Sign up with your GitHub or email

2. **Get your API Key**
   - After signup, go to "API Keys" in dashboard
   - Click "Create API Key"
   - Give it a name like "Portfolio CV Requests"
   - Copy the API key (starts with `re_...`)

3. **Add to Vercel**
   - Go to your Vercel dashboard
   - Select your portfolio project
   - Go to Settings → Environment Variables
   - Add new variable:
     - **Name:** `RESEND_API_KEY`
     - **Value:** Paste your Resend API key
   - Save and redeploy

4. **Test it**
   - Visit your portfolio
   - Click "Request CV"
   - Fill the form and submit
   - Check gideonsammysen@gmail.com for the email

### Current Status

✅ CV request form is working
✅ All data is being logged to console
⏳ Email delivery requires RESEND_API_KEY

### What Happens Without API Key

- Form submissions work perfectly
- Data is logged to console (visible in Vercel logs)
- No email is sent (emailSent: false)

### What Happens With API Key

- Form submissions work
- Beautiful formatted email sent to gideonsammysen@gmail.com
- Includes all request details
- Professional HTML template

### Viewing Request Logs

Even without email setup, you can see all CV requests:

1. Go to Vercel Dashboard
2. Select your project
3. Click on "Deployments"
4. Click on your latest deployment
5. Click "View Function Logs"
6. Look for entries with `📧 CV Request received:`

---

**Need help?** The API endpoint `/api/request-cv` is fully functional and ready to send emails once you add the API key.
