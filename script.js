const firebaseConfig = {
    apiKey: "AIzaSyBOxfzPjRsFppx6pb4GHk4oXPWVYBcUYFI",
    authDomain: "parkingsystem-ba6c9.firebaseapp.com",
    projectId: "parkingsystem-ba6c9",
    storageBucket: "parkingsystem-ba6c9.firebasestorage.app",
    messagingSenderId: "66941381544",
    appId: "1:66941381544:web:d3fc5ad960d0d97eb54b9d"
  };
  
  const app = firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const db = firebase.firestore();
  
  // Redirect to login if not authenticated
  auth.onAuthStateChanged((user) => {
    if (!user) {
      window.location.href = "index.html";
    }
  });