import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getAuth, signOut } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-auth.js";
import { 
  getFirestore, 
  doc, 
  getDoc, 
  collection, 
  getDocs,
  updateDoc
} from "https://www.gstatic.com/firebasejs/9.6.1/firebase-firestore.js";

const firebaseConfig = { /* Same as script.js */ };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Load User Data
async function loadUserData() {
  const user = auth.currentUser;
  if (!user) return;

  // Profile Data
  const userDoc = await getDoc(doc(db, "Users", user.uid));
  if (userDoc.exists()) {
    const data = userDoc.data();
    document.getElementById("userName").textContent = data.name;
    document.getElementById("userContact").textContent = data.contact;
    document.getElementById("userCarNumber").textContent = data.carNumber;
    document.getElementById("userWalletBalance").textContent = data.walletBalance;
  }

  // Parking History
  const parkingHistory = await getDocs(collection(db, "Users", user.uid, "ParkingHistory"));
  const tbody = document.querySelector("#parkingHistory tbody");
  tbody.innerHTML = "";
  
  parkingHistory.forEach((doc) => {
    const history = doc.data();
    const row = tbody.insertRow();
    row.insertCell().textContent = history.date;
    row.insertCell().textContent = history.location;
    row.insertCell().textContent = history.duration;
    row.insertCell().textContent = "₹" + history.cost;
  });
}

// Add Funds
document.getElementById("addFundsForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const amount = parseFloat(document.getElementById("amount").value);
  if (isNaN(amount) || amount <= 0) return;

  try {
    const userRef = doc(db, "Users", auth.currentUser.uid);
    await updateDoc(userRef, {
      walletBalance: firebase.firestore.FieldValue.increment(amount)
    });
    alert("Funds added successfully!");
    loadUserData(); // Refresh data
  } catch (error) {
    alert("Error adding funds: " + error.message);
  }
});

// Logout
document.getElementById("logoutButton").addEventListener("click", () => {
  signOut(auth);
});

// Initialize
window.onload = loadUserData;
// asdad