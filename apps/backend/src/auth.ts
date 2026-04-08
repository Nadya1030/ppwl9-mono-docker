import { google } from "googleapis";

export function createOAuthClient() {
  // Validasi sederhana: Jika env var kosong, kasih peringatan di console
  if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {
    console.error("❌ ERROR: Google Credentials are missing in Environment Variables!");
  }

  return new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    // Gunakan URL callback dari .env (di Vercel diisi https://api-kamu.vercel.app/auth/callback)
    process.env.GOOGLE_REDIRECT_URI || "http://localhost:3000/auth/callback"
  );
}

// Tambahkan type 'any' atau import type yang spesifik agar build tsdown tidak error
export function getAuthUrl(oauth2Client: any) {
  return oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: [
      "https://www.googleapis.com/auth/classroom.courses.readonly",
      "https://www.googleapis.com/auth/classroom.coursework.me.readonly",
      "https://www.googleapis.com/auth/classroom.student-submissions.me.readonly",
      "https://www.googleapis.com/auth/userinfo.email",
      "https://www.googleapis.com/auth/userinfo.profile",
    ],
    // 'consent' memaksa Google memunculkan pilihan akun & memberikan refresh_token
    prompt: "consent", 
  });
}