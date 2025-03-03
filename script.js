import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { 
  getFirestore, 
  doc, 
  setDoc, 
  getDoc,
  updateDoc,
  increment
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyBOxfzPjRsFppx6pb4GHk4oXPWVYBcUYFI",
    authDomain: "parkingsystem-ba6c9.firebaseapp.com",
    projectId: "parkingsystem-ba6c9",
    storageBucket: "parkingsystem-ba6c9.firebasestorage.app",
    messagingSenderId: "66941381544",
    appId: "1:66941381544:web:d3fc5ad960d0d97eb54b9d"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Auth State Listener
onAuthStateChanged(auth, (user) => {
  if (user) {
    getDoc(doc(db, "Roles", user.uid)).then((docSnap) => {
      if (docSnap.exists()) {
        const role = docSnap.data().role;
        window.location.href = role === "admin" ? "admin.html" : "user.html";
      }
    });
  } else {
    // Stay on login page if not authenticated
    if (window.location.pathname !== "/index.html") {
      window.location.href = "index.html";
    }
  }
});

// Login
document.getElementById("loginFormFields").addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    alert("Login failed: " + error.message);
  }
});

// Signup
document.getElementById("signupFormFields").addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = document.getElementById("name").value;
  const contact = document.getElementById("contact").value;
  const carNumber = document.getElementById("carNumber").value;
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save user details
    await setDoc(doc(db, "Users", user.uid), {
      name,
      contact,
      carNumber,
      email,
      walletBalance: 0
    });

    // Assign role
    await setDoc(doc(db, "Roles", user.uid), {
      role: "user"
    });

    alert("Signup successful!");
    document.getElementById("signupFormFields").reset();
  } catch (error) {
    alert("Signup failed: " + error.message);
  }
});

// Toggle Forms
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
// dsfsdfd