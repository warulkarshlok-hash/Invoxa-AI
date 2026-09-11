# Invoice Management System 🧾 🤖

## Overview

Invoice Management System is a full-stack web application built with React and Node.js that allows users to create, manage, track, and organize invoices efficiently. The application provides secure user authentication, invoice CRUD operations, customer and business information management, invoice status tracking, and AI-powered features for generating invoices and payment reminders.

The application uses MongoDB for persistent data storage and integrates Google's Gemini API to provide intelligent invoice-related assistance.

## Features

- **User Authentication:** Secure user registration and login using JWT authentication.
- **Invoice Management:** Create, view, update, and delete invoices.
- **AI-Powered Invoice Creation:** Generate invoice data automatically by providing invoice information in natural language.
- **AI Payment Reminders:** Generate professional payment reminder messages for unpaid invoices using AI.
- **Dashboard:** View invoice statistics, recent invoices, and AI-generated insights.
- **Invoice Status Tracking:** Track invoices based on their payment status such as Paid and Unpaid.
- **Business Profile:** Manage personal and business information used to automatically pre-fill invoice details.
- **Bill From & Bill To:** Maintain separate business and customer information for every invoice.
- **Automatic Invoice Numbering:** Automatically generate sequential invoice numbers.
- **Invoice Calculations:** Automatically calculate subtotal, tax, and total invoice amounts.
- **Print & Download:** Print invoices or save them as PDF using the browser's print functionality.
- **Persistent Data:** Store users and invoices securely in MongoDB.
- **Responsive UI:** Modern and responsive interface built with Tailwind CSS.
- **Toast Notifications:** Display user-friendly success and error messages throughout the application.

## Technologies Used

- **Frontend:** React, Vite, Tailwind CSS
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, MongoDB Atlas
- **Authentication:** JSON Web Token (JWT), bcryptjs
- **AI / LLM:** Google Gemini API
- **HTTP Client:** Axios
- **Icons:** Lucide React
- **Notifications:** React Hot Toast
- **Routing:** React Router
- **Date Handling:** Moment.js
- **Deployment:** Vercel / Hostinger

## Project Structure

~~~text
Invoice-Management-System/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   ├── utils/
│   │   └── App.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── invoiceController.js
│   │   └── aiController.js
│   ├── middlewares/
│   │   └── authMiddleware.js
│   ├── models/
│   │   ├── User.js
│   │   └── Invoice.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── invoiceRoutes.js
│   │   └── aiRoutes.js
│   ├── .env
│   ├── package.json
│   └── server.js
│
└── README.md
~~~

## Usage

1. **Create an Account**
   - Register with your name, email, and password.

2. **Complete Your Profile**
   - Add your business name, address, and phone number.
   - This information is automatically used to pre-fill the "Bill From" section of invoices.

3. **Create an Invoice**
   - Enter invoice details manually.
   - Add customer information, products/services, quantities, prices, and tax percentages.

4. **Create Invoice Using AI**
   - Provide invoice information in natural language.
   - Gemini AI extracts customer and item information and automatically populates the invoice creation form.

5. **Manage Invoices**
   - View all invoices from the invoices section.
   - Edit or delete existing invoices.
   - Filter invoices based on payment status.

6. **View Invoice Details**
   - Open an invoice to view complete billing information, items, taxes, totals, and notes.

7. **Generate Payment Reminder**
   - For unpaid invoices, generate a professional AI-powered payment reminder.

8. **Print Invoice**
   - Use the print option to print the invoice or save it as a PDF.

9. **Dashboard**
   - View invoice statistics, recent invoices, and AI-generated insights.

## AI Features

The application integrates Google's Gemini API to provide intelligent invoice-related functionality.

### AI Invoice Parsing

Users can provide invoice information in natural language instead of manually entering every field.

Example:

~~~text
Invoice for AlphaWorks Ltd
15 hours of data analysis at $90/hr
Dashboard design package for $1,100
Monthly reporting software fee for $60
~~~

The AI extracts relevant information such as:

- Client name
- Client email
- Client address
- Items
- Quantity
- Unit price
- Tax information

The extracted information is then automatically populated into the invoice creation form.

### AI Payment Reminder

For unpaid invoices, the application generates a professional payment reminder based on the invoice details.

This helps users quickly create clear and professional follow-up messages for pending payments.

### AI Dashboard Insights

The dashboard can generate useful insights based on invoice data, helping users understand their invoicing activity and payment status.

## Security

- **JWT Authentication:** Protected API routes require a valid JWT token.
- **Password Hashing:** User passwords are securely hashed using bcryptjs before being stored.
- **Protected Routes:** Authentication middleware prevents unauthorized access to protected resources.
- **Invoice Ownership:** Users can access and manage only their own invoices.
- **Environment Variables:** Sensitive credentials such as MongoDB and Gemini API keys are stored in environment variables.
- **Secure Database:** MongoDB Atlas is used for persistent cloud database storage.
- **API Authorization:** Axios automatically attaches the authentication token to protected API requests.

> **Note:** Never commit your `.env` file or expose API keys in the frontend or GitHub repository.

## Acknowledgments

- **React** for providing the frontend framework.
- **Vite** for the fast frontend development environment.
- **Express.js** for building the backend REST API.
- **MongoDB** for database management and persistent storage.
- **MongoDB Atlas** for cloud database hosting.
- **Tailwind CSS** for responsive and modern UI styling.
- **Google Gemini** for AI-powered invoice functionality.
- **Axios** for frontend-backend API communication.
- **Lucide React** for the application icons.
- **React Hot Toast** for user-friendly notifications.

## Made With ❤️

Crafted with ❤️ by **Shlok Warulkar**
