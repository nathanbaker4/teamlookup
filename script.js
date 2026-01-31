// ---------------------------
// Firebase Initialization
// ---------------------------
const firebaseConfig = {
      apiKey: "AIzaSyDVId5l4TinAp06bZA8gId1kZ88ittf8c0",
      authDomain: "splitstorm1.firebaseapp.com",
      projectId: "splitstorm1",
      storageBucket: "splitstorm1.firebasestorage.app",
      messagingSenderId: "1020688870854",
      appId: "1:1020688870854:web:123fef34436238b9b056c7",
      measurementId: "G-VKB2V4KZ12"
    };

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// ---------------------------
// Utility: Show Error
// ---------------------------
function showError(msg) {
  const box = document.getElementById("errorBox");
  box.textContent = msg;
  box.classList.remove("hidden");
}

// Utility: Clear Error
function clearError() {
  const box = document.getElementById("errorBox");
  box.textContent = "";
  box.classList.add("hidden");
}

// ---------------------------
// Load Team Function
// ---------------------------
async function loadTeam() {
  clearError();
  const code = document.getElementById("teamCodeInput").value.trim();
  const output = document.getElementById("output");
  output.textContent = "";

  // Empty input
  if (!code) {
    showError("Please enter a team code.");
    return;
  }

  try {
    const docRef = db.collection("teams").doc(code);
    const snap = await docRef.get();

    // Invalid code
    if (!snap.exists) {
      showError(`No team found with code "${code}".`);
      return;
    }

    // Success
    output.textContent = JSON.stringify(snap.data(), null, 2);

  } catch (err) {
    // Firestore or network error
    showError("Failed to load team data. " + err.message);
  }
}

// ---------------------------
// Button Listener
// ---------------------------
document.getElementById("loadBtn").addEventListener("click", loadTeam);

