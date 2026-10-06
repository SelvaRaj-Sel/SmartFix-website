# Smartfix Automation website

React frontend for the public website, enquiry chat, blog, and admin dashboard.

## Development

Run `npm install` and `npm run dev` in this directory. Run `npm install` and `npm start` in `../Backend` for the API.

Set `VITE_API_URL` in the frontend root `.env` to your backend URL including `/api`. The default is `http://localhost:5000/api`. Keep database and SMTP credentials in `Backend/.env`. See [email setup](../Backend/EMAIL_SETUP.md).

## Checks

- `npm run build`: production build in `dist/`.
- `npm run lint`: source checks.

The existing backend provides authentication, blog management, and Nodemailer enquiry delivery.
