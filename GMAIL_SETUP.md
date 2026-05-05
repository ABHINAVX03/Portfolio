# Gmail Setup Instructions for Portfolio Contact Form

## Steps to Configure Gmail:

### 1. Enable 2-Factor Authentication (if not already enabled)
- Go to [Google Account Security](https://myaccount.google.com/security)
- Look for "2-Step Verification" and enable it if needed

### 2. Generate App Password
- Go to [Google App Passwords](https://myaccount.google.com/apppasswords)
- Select "Mail" from the dropdown
- Select "Windows Computer" (or your device type)
- Click "Generate"
- Google will show a 16-character password like: `xxxx xxxx xxxx xxxx` (with spaces)

### 3. Update .env.local File
- Open `.env.local` in your project root
- **IMPORTANT**: Copy the password from Google and **REMOVE ALL SPACES**
  - Example: Google gives you: `abcd efgh ijkl mnop`
  - You should put: `abcdefghijklmnop`
- Replace `your_16_character_app_password_here` with the password (NO SPACES)
- The file should look like:
```
GMAIL_USER=guptaabhinav697@gmail.com
GMAIL_PASSWORD=abcdefghijklmnop
```

### 4. Restart Your Development Server
```bash
npm run dev
```

## How It Works:

When someone fills out the contact form:
1. The form data is sent to `/api/send-email` endpoint
2. The backend sends two emails:
   - **Admin Email**: Sent to `guptaabhinav697@gmail.com` with the contact details
   - **Confirmation Email**: Sent to the user's email confirming you received their message
3. User sees a success message and form clears

## Testing:
1. Fill out the contact form with a test email
2. Check both your Gmail and the test email for messages
3. If you don't see emails, check:
   - `.env.local` has the correct app password
   - 2-Factor Authentication is enabled on your Gmail account
   - Check browser console for any errors (F12)

## Troubleshooting:

**Error: "Failed to send email" or "Invalid login/BadCredentials"**
- ⚠️ **CRITICAL**: You must **REMOVE ALL SPACES** from the app password
  - Google generates: `xxxx xxxx xxxx xxxx` (with spaces)
  - You should enter: `xxxxxxxxxxxxxxxx` (NO spaces)
- Verify the app password is exactly 16 characters without any spaces
- Double-check the email is correct: `guptaabhinav697@gmail.com`
- Make sure you're using an **App Password**, not your regular Gmail password
- Restart the development server after updating `.env.local`: `npm run dev`
- Check that 2-Factor Authentication is enabled on your Gmail account

**Emails not arriving:**
- Check spam/promotions folder
- Verify the Gmail user is correct in `.env.local`
- Ensure the development server was restarted after updating `.env.local`

## Security Note:
Never commit `.env.local` to version control. Make sure it's in your `.gitignore` file.
