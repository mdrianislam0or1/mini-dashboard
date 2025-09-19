# Authentication Setup Guide

This project now includes Google OAuth authentication using NextAuth.js. Follow these steps to set up authentication:

## 1. Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret-key-here

# Google OAuth Configuration
# Get these from https://console.developers.google.com/
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

## 2. Google OAuth Setup

1. Go to the [Google Cloud Console](https://console.developers.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" and create a new OAuth 2.0 Client ID
5. Set the authorized redirect URIs to:
   - `http://localhost:3000/api/auth/callback/google` (for development)
   - `https://yourdomain.com/api/auth/callback/google` (for production)
6. Copy the Client ID and Client Secret to your `.env.local` file

## 3. Generate NextAuth Secret

Generate a random secret for NextAuth:

```bash
openssl rand -base64 32
```

Or use an online generator and add it to your `.env.local` file.

## 4. Features Included

- ✅ Google OAuth login
- ✅ Protected `/profile` page
- ✅ User session management
- ✅ Sign in/out functionality
- ✅ User profile display with Google account information
- ✅ Responsive authentication UI
- ✅ Error handling for authentication failures

## 5. Usage

- Visit `/auth/signin` to sign in with Google
- Access `/profile` to view user details (protected route)
- Use the authentication button in the header to sign in/out
- The profile link is available in the sidebar navigation

## 6. Security Notes

- Never commit your `.env.local` file to version control
- Use strong, unique secrets in production
- Configure proper redirect URIs for your domain
- Consider implementing additional security measures for production use
