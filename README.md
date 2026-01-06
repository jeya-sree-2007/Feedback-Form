# Feedback-Form
A real-time feedback application built with vanilla JavaScript and Firebase Firestore. Features global average ratings calculated across all users, while maintaining private, device-based review management for individual users.

# Real-Time Feedback System 🌟

A dynamic feedback and review application that utilizes Firebase Firestore for real-time data persistence. The app features a unique dual-listener architecture: one for calculating global rating statistics and another for managing private, user-specific reviews.

## 🚀 Features

-   **Global Analytics:** Real-time calculation of the average rating across *all* users.
-   **Private Session Management:** Uses device-based indexing (`localStorage`) so users can only edit or delete their own reviews.
-   **Full CRUD:** Create, Read, Update, and Delete functionality for feedback.
-   **Visuals:** Interactive background using `particles.js` and dynamic star rendering.
-   **Validation:** Input sanitization and auto-capitalization.

## 🛠️ Tech Stack

-   **Frontend:** HTML5, CSS3, Vanilla JavaScript
-   **Backend:** Firebase Firestore (NoSQL)
-   **Libraries:** Particles.js, FontAwesome

## ⚙️ Setup

1.  Clone the repository.
2.  Open `index.html` in your browser.
3.  **Note:** You must replace the `firebaseConfig` object in the JavaScript file with your own Firebase project credentials.

## 📸 Screenshots

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




