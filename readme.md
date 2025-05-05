# 🧾 CrediKhaata – Networth Tracker for Shopkeepers

A Node.js + Express backend project that allows shopkeepers to manage customers, loans, repayments, and overdue alerts, with support for Razorpay integration and webhooks.

---

## 🚀 Features

- JWT-based authentication (login/signup)
- Customer management (CRUD)
- Loan management:

  - Create loans with principal, interest, and due date
  - Calculate total outstanding per customer

- MongoDB-based data storage

---

## 📦 Tech Stack

- **Backend:** Node.js, Express
- **Database:** MongoDB + Mongoose
- **Payment Gateway:** Razorpay
- **Other:** body-parser, dotenv, cors

---

## 📂 api Structure

- **"/api/auth"**, authRouter
- **"/api/customers"**, customerRouter
- **"/api/loans"**, loanRouter
- **"/api/repayments"**, repaymentRouter
- **"/api/overdue"**, getOverdues
- **"/api/summary"**, getSummary

## 📂 api sample credentoals for shopkeeper login

you can login with the sample credentoials givn below

- ## sample credentials
- **email**, "user1@gmail.com"
- **password**, "123456"
