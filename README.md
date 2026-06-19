# AEM Dashboard Interview Test

## Overview

This project was developed as part of the **AEM Energy Solutions Technical Assessment**.

It consists of:

* **Task 1:** Angular Dashboard Web Application
* **Task 2:** Electron Desktop Application

The application implements user authentication, protected routing, dashboard visualization, and desktop support using Electron.

---

# Technologies Used

* Angular 14
* Angular CLI
* TypeScript
* HTML5
* SCSS (Sass)
* Electron
* PouchDB
* Chart.js
* Git
* Node.js
* NPM

---

# Features

## Sign In Module

* User authentication through Login API
* Email and password validation
* Reactive Forms validation
* Disabled submit button when form is invalid
* JWT/Bearer Token authentication
* Authentication token stored locally
* Automatic token attachment using HTTP Interceptor

## Dashboard Module

* Protected route using Angular Auth Guard
* Doughnut chart displaying task status distribution
* Bar chart displaying monthly performance overview
* User information table
* Logout functionality
* Responsive layout built with custom SCSS styling

## Electron Desktop Application

* Desktop application built with Electron
* Same functionality as the Angular web application
* User authentication required before accessing Dashboard
* Attempts authentication using the Login API
* Falls back to local PouchDB credential validation if API authentication is unavailable or fails

---

# Test Credentials

Use the following credentials to log in:

**Email**

```
user@aemenersol.com
```

**Password**

```
Test@123
```

---

# Project Structure

```
aem-dashboard/
│
├── src/
│   ├── app/
│   │   ├── guards/
│   │   ├── interceptors/
│   │   ├── pages/
│   │   │   ├── login/
│   │   │   └── dashboard/
│   │   ├── services/
│   │   └── ...
│   │
│   └── assets/
│
├── main.js
├── package.json
├── angular.json
└── README.md
```

---

# Running the Angular Web Application

## 1. Install dependencies

```bash
npm install
```

## 2. Start the Angular development server

```bash
ng serve
```

## 3. Open in browser

```
http://localhost:4200
```

---

# Running the Electron Desktop Application

## 1. Install dependencies

```bash
npm install
```

## 2. Launch Electron

```bash
npm run electron
```

---

# Authentication Flow

1. User enters email and password.
2. Application attempts authentication through the Login API.
3. Upon successful authentication:

   * JWT/Bearer Token is stored.
   * User is redirected to the Dashboard.
4. Protected API requests automatically include the Bearer Token through an HTTP Interceptor.
5. If API authentication is unavailable in the Electron application, credentials are validated using PouchDB as a fallback.

---

# Security Features

* Form validation using Angular Reactive Forms
* Protected routes with Angular Auth Guard
* JWT/Bearer Token authentication
* Automatic Authorization header injection using HTTP Interceptor
* Logout clears stored authentication token

---

# Dashboard Components

* Task Status Distribution (Doughnut Chart)
* Monthly Performance Overview (Bar Chart)
* User Information Table
* Logout Button

---

# Notes

* The Dashboard route is protected and cannot be accessed without authentication.
* The Sign In form prevents submission when required fields are incomplete or invalid.
* Electron provides the same core functionality as the web application while supporting local credential validation through PouchDB.

---

# Author

Developed by **Nurzulaikha Binti Khamir** as part of the AEM Energy Solutions Technical Assessment.
