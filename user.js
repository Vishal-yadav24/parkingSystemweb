import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore, doc, getDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

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

// Load user profile and parking history
async function loadUserProfile() {
  const user = auth.currentUser;
  if (user) {
    // Fetch user details
    const userDoc = await getDoc(doc(db, "Users", user.uid));
    if (userDoc.exists()) {
      const userData = userDoc.data();
      document.getElementById("userName").textContent = userData.Name;
      document.getElementById("userContact").textContent = userData.Contact;
      document.getElementById("userCarNumber").textContent = userData.CarNumber;
      document.getElementById("userWalletBalance").textContent = userData.WalletBalance;
    }

    // Fetch parking history
    const parkingHistoryBody = document.getElementById("parkingHistory").getElementsByTagName("tbody")[0];
    parkingHistoryBody.innerHTML = "";

    const querySnapshot = await getDocs(collection(db, "Users", user.uid, "ParkingHistory"));
    querySnapshot.forEach((doc) => {
      const history = doc.data();
      const row = parkingHistoryBody.insertRow();
      row.insertCell().textContent = history.Date;
      row.insertCell().textContent = history.Location;
      row.insertCell().textContent = history.Duration;
      row.insertCell().textContent = history.Cost;
    });
  }
}

// Load profile when the page loads
window.onload = loadUserProfile;
// xyz