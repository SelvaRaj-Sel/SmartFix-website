# Website enquiry email

The contact form and enquiry chat send `POST /api/contact`. The backend sends the enquiry using Nodemailer over SMTP.

1. Add the variables in `.env.example` to your existing `Backend/.env`. Keep your database and admin settings.
2. Set `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, and `SMTP_PASS` to your provider's SMTP settings. Use port 465 for implicit TLS or 587 for STARTTLS. If your provider requires an app password, use that as `SMTP_PASS`.
3. Set `SMTP_FROM` to a sender your provider permits. `CONTACT_EMAIL` is the destination inbox and defaults to `info@smartfixautomation.com`. Replies go to the visitor's email address.
4. Set the frontend's `VITE_API_URL` to your backend API URL, including `/api` (for example `https://api.example.com/api`). Its local default is `http://localhost:5000/api`. Rebuild the frontend after changing this variable.
5. Restart the backend with `npm start` from `Backend` and submit a test enquiry.

Keep SMTP credentials on the backend. The old `VITE_EMAILJS_*` variables are no longer used and may be removed.

The endpoint allows five requests per IP per 15 minutes using an in-memory limiter. If deploying behind a reverse proxy, configure Express `trust proxy` for your actual trusted proxy topology so visitors are identified correctly. Multiple backend instances require a shared limiter store.

A successful response means the SMTP server accepted the message; inbox delivery still depends on the mail provider.
