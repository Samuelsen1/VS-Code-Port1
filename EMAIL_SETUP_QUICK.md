# QUICK EMAIL SETUP - Get Notifications in 2 Minutes! 

You have CV request notifications ready to go. Just pick ONE method below:

---

## ✅ METHOD 1: Resend (Recommended - Most Reliable)

**Steps:**
1. Go to https://resend.com
2. Sign up (Free: 3,000 emails/month)
3. Verify your email
4. Get API key: https://resend.com/api-keys
5. In **Vercel Dashboard**:
   - Go to your project → Settings → Environment Variables
   - Add: `RESEND_API_KEY` = `your_key_here`
   - Redeploy
6. **DONE!** Emails will arrive at gideonsammysen@gmail.com

---

## ✅ METHOD 2: Web3Forms (100% Free, No Signup Needed)

**Steps:**
1. Go to https://web3forms.com
2. Enter your email: **gideonsammysen@gmail.com**
3. Click "Create Access Key"
4. Copy the access key (starts with something like `abc123...`)
5. Open `app/api/request-cv/route.js`
6. Find line 123: `access_key: 'YOUR_WEB3FORMS_ACCESS_KEY'`
7. Replace with: `access_key: 'your_actual_key_here'`
8. Commit and push to GitHub
9. **DONE!** Emails will arrive immediately

**Web3Forms Benefits:**
- ✅ Completely free forever
- ✅ No account needed
- ✅ No API limits
- ✅ Works instantly
- ✅ Simplest setup (5 minutes)

---

## 📧 What You'll Receive

When someone requests your CV, you'll get an email with:

```
🎯 New CV Request

Full Name: John Doe
Email: john@company.com
Company: Tech Corp
Job Title: Senior Digital Learning Designer

Job Description:
We're looking for a Digital Learning Designer...

Additional Message:
Your portfolio looks great! Would love to discuss...

Timestamp: January 15, 2026, 10:30 AM
```

---

## 🧪 Testing

**After setup:**
1. Visit your live portfolio
2. Click "Request CV"
3. Fill out form with YOUR email
4. Submit
5. Check your inbox! 📬

---

## 🚀 Current Status (Without Setup)

**Right now:**
- ✅ CV request form works perfectly
- ✅ Users see success message
- ✅ Data is logged to Vercel console
- ❌ No email notifications (yet)

**After setup (5 min):**
- ✅ Everything above
- ✅ **Email notifications arrive instantly**

---

## 💡 Which One Should You Choose?

### Choose **Web3Forms** if:
- ✅ You want the fastest setup (5 minutes)
- ✅ You don't want to create an account
- ✅ You want 100% free forever
- ✅ You're okay editing one line of code

### Choose **Resend** if:
- ✅ You want the most professional solution
- ✅ You might send custom emails later
- ✅ You prefer environment variables (cleaner)
- ✅ You want detailed email analytics

**Both work great!** Web3Forms is easier, Resend is more professional.

---

## 🔧 Quick Command (Web3Forms)

```bash
# 1. Get your key from https://web3forms.com
# 2. Edit the file
code app/api/request-cv/route.js

# 3. Find line 123 and replace YOUR_WEB3FORMS_ACCESS_KEY
# 4. Commit and push
git add app/api/request-cv/route.js
git commit -m "Add Web3Forms access key for email notifications"
git push origin main

# DONE! Emails work immediately!
```

---

## ❓ Help

**No email arriving?**
- Check spam folder
- Verify API key/access key is correct
- Check Vercel deployment logs
- Test with your own email first

**Need help?**
- Web3Forms: https://web3forms.com/docs
- Resend: https://resend.com/docs

---

**Pick one method and set it up now! Takes 5 minutes.** 🚀
