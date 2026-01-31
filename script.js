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
// Load Team Function
// ---------------------------
async function loadTeam() {
  const code = document.getElementById("teamCodeInput").value.trim();
  const output = document.getElementById("output");

  if (!code) {
    output.textContent = "Enter a team code.";
    return;
  }

  try {
    const snap = await db.collection("teams").doc(code).get();

    if (!snap.exists) {
      output.textContent = "Team not found.";
      return;
    }

    output.textContent = JSON.stringify(snap.data(), null, 2);
  } catch (err) {
    output.textContent = "Error loading team: " + err.message;
  }
}

// ---------------------------
// Button Listener
// ---------------------------
document.getElementById("loadBtn").addEventListener("click", loadTeam);
