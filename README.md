# ✨ FeedbackHub

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Firebase](https://img.shields.io/badge/Firebase-039BE5?style=for-the-badge&logo=Firebase&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

> **A modern, secure, and visually stunning feedback form featuring Glassmorphism UI and real-time database integration.**

---

## 🚀 About The Project

**FeedbackHub** is a full-stack React application designed to collect and display user feedback in real-time. It bridges the gap between elegant UI design and robust backend functionality.

I built this project to master **React State Management**, **Firebase Authentication**, and **Advanced CSS styling techniques**.

### 🌟 Key Features

* **🔐 Secure Authentication:**
    * Full Email/Password Login.
    * **Google Sign-In** integration (OAuth).
    * Real-time validation and error handling (e.g., "Wrong Password", "User Not Found").
* **🎨 Glassmorphism UI:**
    * Modern, frosted-glass aesthetic using `backdrop-filter`.
    * Dynamic background animations using **Particles.js**.
* **⚡ Real-Time Data:**
    * Instant feedback updates using **Firebase Firestore**.
    * Live calculation of Average Ratings and Total Reviews.
* **📱 Fully Responsive:** Optimized for Desktops, Tablets, and Mobile devices.

---

## 🛠️ Tech Stack

* **Frontend:** React.js, Context API
* **Styling:** CSS3, FontAwesome Icons, Particles.js
* **Backend as a Service (BaaS):** Firebase Authentication, Firestore Database
* **Deployment:** (Add Vercel/Netlify here if you deploy it later)

---

## 💻 Getting Started

Follow these steps to set up the project locally on your machine.

### Prerequisites

* Node.js (v14 or higher)
* npm or yarn

### Installation

1.  **Clone the repository**
    ```bash
    git clone [https://github.com/your-username/feedback-hub.git](https://github.com/your-username/feedback-hub.git)
    cd feedback-hub
    ```

2.  **Install dependencies**
    ```bash
    npm install
    ```

3.  **Configure Firebase**
    * Create a project on [Firebase Console](https://console.firebase.google.com/).
    * Enable **Authentication** (Email/Password & Google).
    * Create a **Firestore Database**.
    * Copy your Firebase config keys.
    * Update `src/config/firebase.js` with your keys:

    ```javascript
    const firebaseConfig = {
      apiKey: "YOUR_API_KEY",
      authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
      projectId: "YOUR_PROJECT_ID",
      storageBucket: "YOUR_PROJECT_ID.appspot.com",
      messagingSenderId: "YOUR_SENDER_ID",
      appId: "YOUR_APP_ID"
    };
    ```

4.  **Run the application**
    ```bash
    npm start
    ```

---

## 🤝 Contributing

Contributions are always welcome! If you have suggestions for how to make this better, please fork the repo and create a pull request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

---

## 👤 Author

**Your Name**
* LinkedIn: [Jeyasree](www.linkedin.com/in/jeyasree-s-a-7aa6a835a)

---

<p align="center">Made with ❤️ by an Aspiring SDE</p>
## 📸 Screenshots
<br>
Login Page The Login Page serves as a secure gateway that authenticates users via credentials (email/password) to grant authorized access to the application. It manages identity verification, input validation, and secure session initiation.

Core Functions:

Authentication: Verifies user identity against the database.

Validation: Ensures correct input formatting and handles errors.

Navigation: Directs successful logins to the dashboard and new users to registration.
<br>
<img width="1919" height="911" alt="image" src="https://github.com/user-attachments/assets/5eacfc27-a5df-4d12-986c-b57ed71df4e7" />
<br>
<img width="1919" height="907" alt="image" src="https://github.com/user-attachments/assets/bcc4963f-a86c-44a8-aba8-8ce43a14206f" />

<br>
A single-page view containing the global rating summary, a comprehensive submission form, and the user's personal history, set against an interactive particle background.</br>
<center>
<img width="600" height="400" alt="image" src="https://github.com/user-attachments/assets/a4dc940f-2025-4b41-bc41-ce35863029cc" />
  </center>
<br>
Includes a polished success modal that provides instant, positive feedback upon valid form submission, enhancing the overall user experience.</br>
  <center>
<img width="600" height="400" alt="image" src="https://github.com/user-attachments/assets/8e53f7eb-77c1-43a6-9447-027827fdb312" />
</center>

<br>
A preview of the custom-styled modal window that triggers when a user attempts to delete a review.</br>
<center>
<img width="600" height="400" alt="image" src="https://github.com/user-attachments/assets/683c62f9-6e54-41d6-ae38-f1b99c3f20ec" />
</center>




