import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

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

// Load users and display in table
async function loadUsers() {
  const userTableBody = document.getElementById("userTable").getElementsByTagName("tbody")[0];
  userTableBody.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "Users"));
  querySnapshot.forEach((doc) => {
    const user = doc.data();
    const row = userTableBody.insertRow();
    row.insertCell().textContent = doc.id;
    row.insertCell().textContent = user.Name;
    row.insertCell().textContent = user.Contact;
    row.insertCell().textContent = user.CarNumber;
    row.insertCell().textContent = user.WalletBalance;

    // Add button to assign RFID
    const assignCell = row.insertCell();
    const assignButton = document.createElement("button");
    assignButton.textContent = "Assign RFID";
    assignButton.addEventListener("click", () => assignRFID(doc.id));
    assignCell.appendChild(assignButton);
  });
}

// Assign RFID to user
function assignRFID(userId) {
  alert(`Assigning RFID to user: ${userId}`);
}

// Load users when the page loads
window.onload = loadUsers;
// xyz