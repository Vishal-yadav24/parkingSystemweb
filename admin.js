const usersCollection = db.collection("Users");

// Load users and display in table
function loadUsers() {
  const userTableBody = document.getElementById("userTable").getElementsByTagName("tbody")[0];
  userTableBody.innerHTML = "";

  usersCollection.get().then((querySnapshot) => {
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
  });
}

// Assign RFID to user
function assignRFID(userId) {
  // Logic to assign RFID (e.g., send UserID to ESP32)
  alert(`Assigning RFID to user: ${userId}`);
}

// Load users when the page loads
window.onload = loadUsers;