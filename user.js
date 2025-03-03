const usersCollection = db.collection("Users");

// Load user profile
function loadUserProfile() {
  const user = auth.currentUser;
  if (user) {
    usersCollection.doc(user.uid).get().then((doc) => {
      if (doc.exists) {
        const userData = doc.data();
        document.getElementById("userName").textContent = userData.Name;
        document.getElementById("userContact").textContent = userData.Contact;
        document.getElementById("userCarNumber").textContent = userData.CarNumber;
        document.getElementById("userWalletBalance").textContent = userData.WalletBalance;
      }
    });
  }
}

// Load profile when the page loads
window.onload = loadUserProfile;