# 📝 Feedback Hub

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Firebase](https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)

A modern, secure, and user-friendly web application designed to collect, manage, and analyze user feedback efficiently. Built with React for the frontend and powered by Firebase for secure authentication and real-time database management.

---

## 🚀 Key Features

* **🔐 Secure Authentication:** User login and registration powered by Firebase Auth.
* **✨ Modern UI:** Clean, responsive interface using modern CSS techniques (Glassmorphism).
* **📱 Responsive Design:** Fully optimized for desktop, tablet, and mobile devices.
* **⚡ Real-time Data:** Instant feedback submission and retrieval.
* **🛡️ Data Security:** Protected API keys and secure environment setup.

---

## 🛠️ Tech Stack

* **Frontend:** React.js, CSS3
* **Backend / Database:** Firebase (Authentication & Firestore)
* **Version Control:** Git & GitHub

---

## ⚙️ Installation & Setup

Follow these steps to set up the project locally on your machine.

### 1. Clone the Repository

    git clone https://github.com/jeya-sree-2007/Feedback-Form.git
    cd Feedback-Form

### 2. Install Dependencies

    npm install

### 3. Environment Variables (Crucial Step)

This project uses **Firebase** and requires API keys to function. These keys are not stored in the repository for security reasons.

1.  Create a file named `.env` in the root directory.
2.  Add your Firebase credentials inside the file like this:

    REACT_APP_API_KEY=your_api_key_here
    REACT_APP_AUTH_DOMAIN=your_project_id.firebaseapp.com
    REACT_APP_PROJECT_ID=your_project_id
    REACT_APP_STORAGE_BUCKET=your_project_id.appspot.com
    REACT_APP_MESSAGING_SENDER_ID=your_sender_id
    REACT_APP_APP_ID=your_app_id

*(Note: If using Vite, replace `REACT_APP_` with `VITE_`)*

### 4. Run the Application

    npm start

The app should now be running on `http://localhost:3000`.

---

## 📂 Project Structure

    feedback-hub/
    ├── public/            # Static files (images, favicon)
    ├── src/
    │   ├── components/    # Reusable UI components (Buttons, Inputs)
    │   ├── pages/         # Full pages (Login, Dashboard, Form)
    │   ├── App.js         # Main application logic
    │   └── index.js       # Entry point
    ├── .env               # Environment variables (Hidden)
    └── README.md          # Project documentation

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:
1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/YourFeature`).
3.  Commit your changes (`git commit -m 'Add some feature'`).
4.  Push to the branch (`git push origin feature/YourFeature`).
5.  Open a Pull Request.

---

## 📞 Contact

**Jeyasree S A** [LinkedIn Profile](https://www.linkedin.com/in/jeyasree-s-a-7aa6a835a/)

---
*This project is for educational purposes.*
