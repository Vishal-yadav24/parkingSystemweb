import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore, doc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBOxfzPjRsFppx6pb4GHk4oXPWVYBcUYFI",
    authDomain: "parkingsystem-ba6c9.firebaseapp.com",
    projectId: "parkingsystem-ba6c9",
    storageBucket: "parkingsystem-ba6c9.firebasestorage.app",
    messagingSenderId: "66941381544",
    appId: "1:66941381544:web:d3fc5ad960d0d97eb54b9d"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Redirect to login if not authenticated
auth.onAuthStateChanged((user) => {
  if (user) {
    // User is signed in
    getUserRole(user.uid).then((role) => {
      if (role === "admin") {
        window.location.href = "admin.html";
      } else if (role === "user") {
        window.location.href = "user.html";
      }
    });
  } else {
    // User is not signed in
    window.location.href = "index.html";
  }
});

// Get user role from Firestore
async function getUserRole(uid) {
  const roleDoc = await getDoc(doc(db, "Roles", uid));
  if (roleDoc.exists()) {
    return roleDoc.data().role;
  } else {
    return null;
  }
}

// Login functionality
document.getElementById("loginFormFields").addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("User logged in:", user);
    })
    .catch((error) => {
      console.error("Login error:", error.message);
      alert("Login failed: " + error.message);
    });
});

// Signup functionality
document.getElementById("signupFormFields").addEventListener("submit", (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const contact = document.getElementById("contact").value;
  const carNumber = document.getElementById("carNumber").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      console.log("User created:", user);

      // Save user details to Firestore
      setDoc(doc(db, "Users", user.uid), {
        Name: name,
        Contact: contact,
        CarNumber: carNumber,
        Email: email,
        WalletBalance: 0 // Default wallet balance
      })
      .then(() => {
        console.log("User details saved to Firestore");

        // Add user role to Firestore
        setDoc(doc(db, "Roles", user.uid), {
          role: "user" // Default role
        })
        .then(() => {
          console.log("User role added to Firestore");
          alert("Signup successful!");

          // Reset the form
          document.getElementById("signupFormFields").reset();
        })
        .catch((error) => {
          console.error("Error adding user role: ", error);
        });
      })
      .catch((error) => {
        console.error("Error saving user details: ", error);
      });
    })
    .catch((error) => {
      console.error("Signup error:", error.message);
      alert("Signup failed: " + error.message);
    });
});

// Toggle between login and signup forms
document.getElementById("showSignup").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("loginForm").style.display = "none";
  document.getElementById("signupForm").style.display = "block";
});

document.getElementById("showLogin").addEventListener("click", (e) => {
  e.preventDefault();
  document.getElementById("signupForm").style.display = "none";
  document.getElementById("loginForm").style.display = "block";
});
// xyz