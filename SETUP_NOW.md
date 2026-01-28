# 🚀 IMMEDIATE ACTION REQUIRED

Your portfolio now has **email notifications** and an **AI chatbot**, but you need to complete setup!

---

## ⚡ Quick Setup (5 minutes)

### 1. Get Your FREE Resend API Key

1. **Go to:** https://resend.com
2. **Sign up** (free - no credit card needed)
3. **Verify your email**
4. **Get API key:** https://resend.com/api-keys (Click "Create API Key")

### 2. Add to Vercel (Production)

1. Go to your **Vercel Dashboard**: https://vercel.com/dashboard
2. Select your project: **VS-Code-Port1**
3. Go to **Settings** → **Environment Variables**
4. Click **Add New**
   - **Name:** `RESEND_API_KEY`
   - **Value:** Paste your API key from Resend (starts with `re_`)
5. Click **Save**
6. Go to **Deployments** tab
7. Click **Redeploy** on latest deployment

### 3. Test It!

Once redeployed:
1. Visit your live site
2. Click **"Request CV"** button
3. Fill out form and submit
4. Check **gideonsammysen@gmail.com** for email! 📧
5. Click **"Ask AI"** button
6. Try: "What are your skills?" 🤖

---

## 🎯 What Happens Now

### When someone clicks "Request CV":
✅ Beautiful form opens
✅ They fill in: Name, Email, Company, Job Title
✅ They submit
✅ **YOU GET EMAIL** at gideonsammysen@gmail.com with all details
✅ You reply directly with your CV attached

### When someone clicks "Ask AI":
✅ Chat window opens
✅ They can ask about:
   - Your skills & experience
   - Education & certifications
   - Portfolio projects
   - Contact information
   - Languages you speak
   - Availability
✅ Bot answers instantly based on your CV
✅ Works in English & German

---

## 📱 Live Features

**3 Buttons in Hero Section:**

1. **"Get In Touch"** (Blue) → Scrolls to contact form
2. **"Ask AI"** (Green) → Opens chatbot 🆕
3. **"Request CV"** (Blue outline) → Opens CV request form 🆕

---

## ⚠️ Important Notes

### Resend Free Tier Limits:
- ✅ 3,000 emails per month
- ✅ 100 emails per day
- ✅ More than enough for portfolio CV requests!

### General AI (External Assistant) URL:
- Portfolio chat now proxies questions to your **General AI** (Desktop `ai-assistant` / General-AI project).
- Default endpoint: `https://general-ai-wheat.vercel.app/api/chat`
- To point to a different deployment, set **`GENERAL_AI_URL`** in your Vercel project’s Environment Variables.
- You do **not** need to change code – only this env var.

### Email Address:
- Currently sends to: **gideonsammysen@gmail.com**
- To change: Edit `app/api/request-cv/route.js` line 13

### Sender Email:
- Testing: Uses `onboarding@resend.dev` (Resend default)
- Production: Add your domain at resend.com/domains for branded emails

---

## 🔍 How to Check It's Working

### Method 1: Check Vercel Logs
1. Vercel Dashboard → Your Project
2. Click on latest deployment
3. Go to **Functions** tab
4. Click on `/api/request-cv`
5. See logs when someone submits

### Method 2: Check Resend Dashboard
1. https://resend.com/emails
2. See all emails sent (delivery status, opens, etc.)

### Method 3: Test Locally (Optional)
```bash
# Create .env.local file
echo "RESEND_API_KEY=your_key_here" > .env.local

# Run dev server
npm run dev

# Visit http://localhost:3000
# Test both features
```

---

## 📖 Complete Documentation

See **SETUP_GUIDE.md** for:
- Detailed setup instructions
- Security best practices
- Troubleshooting guide
- Optional enhancements (OpenAI integration, analytics, etc.)
- Rate limiting
- Custom email templates

---

## ✅ Checklist

- [ ] Sign up for Resend
- [ ] Get API key
- [ ] Add to Vercel environment variables
- [ ] Redeploy on Vercel
- [ ] Test "Request CV" form
- [ ] Test "Ask AI" chatbot
- [ ] Check email arrives at gideonsammysen@gmail.com
- [ ] Share portfolio with potential employers! 🎉

---

**NEXT STEP:** Get your Resend API key NOW → https://resend.com

Your portfolio is deployed and waiting! Once you add the API key, everything works automatically. 🚀
