# 📧 EmailJS Setup - 5 Minutes, Zero Coding

Get CV request emails sent to **gideonsammysen@gmail.com** automatically.

## Step 1: Create Free Account (2 min)

1. Go to **https://emailjs.com/sign-up**
2. Sign up (100% free - 200 emails/month)
3. Verify your email

## Step 2: Get Your Keys (2 min)

### A. Service ID
1. In EmailJS dashboard, click **"Email Services"**
2. Click **"Add New Service"**
3. Choose **Gmail** (or any email provider)
4. Connect your Gmail: **gideonsammysen@gmail.com**
5. Copy the **Service ID** (looks like: `service_abc123`)

### B. Template ID
1. Click **"Email Templates"**
2. Click **"Create New Template"**
3. Use this template:

```
Subject: 🎯 CV Request from {{from_name}} - {{company}}

From: {{from_name}}
Email: {{from_email}}
Company: {{company}}
Job Title: {{job_title}}

Job Description:
{{job_description}}

Message:
{{message}}

Reply to: {{from_email}}
```

4. Save and copy the **Template ID** (looks like: `template_xyz789`)

### C. Public Key
1. Click your **profile icon** (top right)
2. Go to **"Account"** → **"API Keys"**
3. Copy your **Public Key** (looks like: `a1b2c3d4e5f6g7h8`)

## Step 3: Add to Vercel (1 min)

1. Go to **Vercel Dashboard**
2. Select your portfolio project
3. **Settings** → **Environment Variables**
4. Add these 3 variables:

```
NEXT_PUBLIC_EMAILJS_SERVICE_ID = service_abc123
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID = template_xyz789
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY = a1b2c3d4e5f6g7h8
```

5. Click **Redeploy** (or it auto-deploys)

## ✅ Done!

Now when someone clicks "Request CV" on your site, you'll instantly get an email at **gideonsammysen@gmail.com** with all their details.

---

**Free Plan:** 200 emails/month (perfect for CV requests)  
**No credit card needed**  
**Works forever**
