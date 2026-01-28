# CV Request Email & AI Chatbot Setup Guide

## Overview
Your portfolio now has two powerful interactive features:
1. **CV Request Form** - Sends you email notifications when someone requests your CV
2. **AI Chatbot** - Answers questions about your experience, skills, and background

---

## 🚀 Quick Start

### 1. Email Notifications Setup (Resend)

**Get your FREE API key:**
1. Go to [https://resend.com](https://resend.com)
2. Sign up (free tier: 3,000 emails/month, 100/day)
3. Verify your email
4. Get your API key from [https://resend.com/api-keys](https://resend.com/api-keys)

**Add to your project:**
1. Create `.env.local` file in your project root:
   ```bash
   touch .env.local
   ```

2. Add your API key:
   ```
   RESEND_API_KEY=re_123456789_your_actual_key_here
   ```

3. **Deploy to Vercel:**
   - Go to your Vercel project dashboard
   - Settings → Environment Variables
   - Add: `RESEND_API_KEY` = `your_key_here`
   - Redeploy your site

**Configure sender email:**
- For testing: Use `onboarding@resend.dev` (default)
- For production: Add your domain at [https://resend.com/domains](https://resend.com/domains)
- Update line 12 in `app/api/request-cv/route.js`:
  ```javascript
  from: 'CV Requests <cv@yourdomain.com>',
  ```

---

## 📧 How Email Notifications Work

When someone fills out the CV request form, you'll receive a beautiful email with:

**Email includes:**
- ✅ Full Name
- ✅ Email address (clickable to reply)
- ✅ Company name
- ✅ Job Title
- ✅ Job Description (if provided)
- ✅ Additional Message (if provided)
- ✅ Timestamp

**Email goes to:** `gideonsammysen@gmail.com`

**To change recipient:**
Edit line 13 in `app/api/request-cv/route.js`:
```javascript
to: ['your-new-email@example.com'],
```

---

## 🤖 AI Chatbot Features

### What It Can Answer
The chatbot responds to questions about:

✅ **Skills & Competencies**
- "What are your skills?"
- "Tell me about your technical abilities"
- "What tools do you use?"

✅ **Experience & Work History**
- "What's your experience?"
- "Tell me about your work"
- "What jobs have you had?"

✅ **Education**
- "Where did you study?"
- "What's your education?"
- "Tell me about your degrees"

✅ **Certifications**
- "What certifications do you have?"
- "Tell me about your training"

✅ **Portfolio & Projects**
- "Show me your projects"
- "What have you built?"
- "Tell me about your portfolio"

✅ **Languages**
- "What languages do you speak?"
- "Do you speak German?"

✅ **Contact Information**
- "How can I contact you?"
- "What's your email?"
- "Where are you located?"

✅ **Availability**
- "Are you available?"
- "When can you start?"

✅ **Personal Attributes**
- "Tell me about yourself"
- "What are your hobbies?"

### How It Works

**Current Implementation:**
- ✅ Keyword-based responses (fast, free, no API needed)
- ✅ Answers strictly based on CV data provided
- ✅ Bilingual support (EN/DE)
- ✅ Works offline
- ✅ No usage limits

**Upgrade Options (Optional):**

You can enhance the chatbot with AI APIs:

**Option 1: OpenAI (GPT)**
```javascript
// In app/api/chat/route.js
const response = await fetch('https://api.openai.com/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'gpt-3.5-turbo',
    messages: [
      { role: 'system', content: `You are Samuel's assistant. Answer questions based on: ${cvData}` },
      { role: 'user', content: message }
    ],
  }),
});
```

**Option 2: Anthropic (Claude)**
```javascript
const response = await fetch('https://api.anthropic.com/v1/messages', {
  method: 'POST',
  headers: {
    'x-api-key': process.env.ANTHROPIC_API_KEY,
    'anthropic-version': '2023-06-01',
    'content-type': 'application/json',
  },
  body: JSON.stringify({
    model: 'claude-3-haiku-20240307',
    max_tokens: 500,
    messages: [{ role: 'user', content: `Based on this CV: ${cvData}\n\nAnswer: ${message}` }],
  }),
});
```

---

## 🎨 UI Features

### CV Request Button
- **Location:** Hero section, next to "Get In Touch" and "Ask AI"
- **Color:** Blue theme
- **Icon:** FileText
- **Opens:** Professional modal form with validation

### AI Chatbot Button
- **Location:** Hero section, between "Get In Touch" and "Request CV"
- **Color:** Green theme
- **Icon:** MessageCircle
- **Opens:** Full-screen chat interface (mobile) or modal (desktop)

### Chatbot Interface
- ✅ Clean, modern chat UI
- ✅ User messages: Blue bubbles (right-aligned)
- ✅ Bot messages: White/gray bubbles (left-aligned)
- ✅ Typing indicator while loading
- ✅ Auto-scroll to latest message
- ✅ Responsive design (mobile & desktop)
- ✅ Dark/light theme support

---

## 🧪 Testing

### Test CV Request Form
1. Click "Request CV" button
2. Fill out form:
   - Name: Test User
   - Email: test@example.com
   - Company: Test Corp
   - Job Title: Digital Learning Designer
3. Submit
4. Check your email (gideonsammysen@gmail.com)

### Test AI Chatbot
1. Click "Ask AI" button
2. Try these questions:
   - "What are your skills?"
   - "Tell me about your experience"
   - "What languages do you speak?"
   - "How can I contact you?"
3. Verify responses are accurate

---

## 🔒 Security Best Practices

### Environment Variables
✅ **DO:**
- Keep API keys in `.env.local`
- Add `.env.local` to `.gitignore`
- Use Vercel environment variables for production
  - `OPENAI_API_KEY` – (optional) portfolio AI fallback
  - `GENERAL_AI_URL` – (optional) URL of your General AI `/api/chat` endpoint  
    - Default: `https://general-ai-wheat.vercel.app/api/chat`  
    - Set this if you deploy General AI under a different domain/path

❌ **DON'T:**
- Commit `.env.local` to Git
- Share API keys publicly
- Hardcode sensitive data

### Rate Limiting (Optional)
Add to prevent abuse:

```javascript
// app/api/chat/route.js
const rateLimit = new Map();

export async function POST(request) {
  const ip = request.headers.get('x-forwarded-for') || 'unknown';
  const now = Date.now();
  
  // Allow 10 requests per minute
  if (rateLimit.has(ip)) {
    const { count, timestamp } = rateLimit.get(ip);
    if (now - timestamp < 60000 && count >= 10) {
      return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
    }
  }
  
  rateLimit.set(ip, { count: (rateLimit.get(ip)?.count || 0) + 1, timestamp: now });
  
  // ... rest of your code
}
```

---

## 📊 Analytics (Optional)

Track usage with Google Analytics or Vercel Analytics:

```javascript
// Track CV requests
fetch('/api/request-cv', {
  method: 'POST',
  body: JSON.stringify(data),
}).then(() => {
  gtag('event', 'cv_request', {
    event_category: 'engagement',
    event_label: data.company
  });
});

// Track chatbot questions
fetch('/api/chat', {
  method: 'POST',
  body: JSON.stringify({ message }),
}).then(() => {
  gtag('event', 'chatbot_query', {
    event_category: 'engagement',
    event_label: message.substring(0, 50)
  });
});
```

---

## 🚀 Deployment Checklist

Before going live:

- [ ] Get Resend API key
- [ ] Add `RESEND_API_KEY` to Vercel environment variables
- [ ] Test CV request form (send test email)
- [ ] Test chatbot with various questions
- [ ] Verify email goes to correct address
- [ ] Update sender email (optional: use custom domain)
- [ ] Test on mobile and desktop
- [ ] Test dark and light themes
- [ ] Check both English and German language

---

## 🆘 Troubleshooting

### "Failed to send email"
**Problem:** CV request not sending
**Solutions:**
1. Check `RESEND_API_KEY` is set in `.env.local`
2. Verify API key is valid at resend.com
3. Check Vercel environment variables
4. Redeploy after adding env variables

### Chatbot not responding
**Problem:** Chat returns error
**Solutions:**
1. Check browser console for errors
2. Verify `/api/chat/route.js` exists
3. Test API directly: `curl -X POST http://localhost:3000/api/chat -d '{"message":"test"}'`
4. Rebuild and restart dev server

### Email not arriving
**Problem:** Email sent but not received
**Solutions:**
1. Check spam folder
2. Verify recipient email in `app/api/request-cv/route.js`
3. Check Resend dashboard for delivery status
4. Test with different email provider

---

## 📱 User Flow

### CV Request Flow
1. User clicks "Request CV"
2. Modal opens with form
3. User fills required fields (name, email, company, job title)
4. User clicks "Submit Request"
5. Loading state shows "Sending..."
6. Success message: "Request Submitted!"
7. **You receive email notification**
8. You reply with CV attached

### Chatbot Flow
1. User clicks "Ask AI"
2. Chat modal opens
3. Bot greets: "Hello! I'm Samuel's AI assistant..."
4. User types question
5. User presses Enter or clicks Send
6. Typing indicator shows (3 dots)
7. Bot responds with accurate information
8. Conversation continues...

---

## 🎯 Next Steps

### Immediate (Required)
1. ✅ Get Resend API key
2. ✅ Add to `.env.local`
3. ✅ Deploy to Vercel
4. ✅ Test both features

### Optional Enhancements
- [ ] Add custom domain to Resend
- [ ] Integrate OpenAI for smarter chatbot
- [ ] Add conversation history storage
- [ ] Email templates customization
- [ ] Analytics tracking
- [ ] Rate limiting
- [ ] Spam protection (reCAPTCHA)

---

## 📞 Support

If you need help:
- Check `.env.example` for reference
- Review API documentation: [Resend Docs](https://resend.com/docs)
- Test locally first: `npm run dev`
- Check Vercel deployment logs

**Features are ready to use!** Just add your Resend API key and deploy. 🚀
