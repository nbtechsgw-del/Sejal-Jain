
function register() {
  let name = document.getElementById("regName").value;
  let email = document.getElementById("regEmail").value;
  let password = document.getElementById("regPassword").value;

  if (name === "" || email === "" || password === "") {
    alert("Please fill all fields");
    return;
  }

  // Save user
  localStorage.setItem("email", email);
  localStorage.setItem("password", password);

  alert("Registration Successful!");
  window.location.href = "login.html";
}



function login() {
  let email = document.getElementById("loginEmail").value;
  let password = document.getElementById("loginPassword").value;

  let storedEmail = localStorage.getItem("email");
  let storedPassword = localStorage.getItem("password");

  if (email === storedEmail && password === storedPassword) {
    localStorage.setItem("isLoggedIn", "true"); // session
    alert("Login Successful!");
    window.location.href = "index.html";
  } else {
    alert("Invalid Email or Password");
  }
}


//  LOGOUT
function logout() {
  localStorage.removeItem("isLoggedIn");
  alert("Logged out!");
  window.location.href = "login.html";
}


//  CHECK LOGIN 
function checkLogin() {
  let isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn !== "true") {
    alert("Please login first!");
    window.location.href = "login.html";
  }
}


// ADD EVENT
function addEvent() {
  let name = document.getElementById("eventName").value;
  let date = document.getElementById("eventDate").value;
  let venue = document.getElementById("eventVenue").value;
  let price = document.getElementById("eventPrice").value;

  fetch("http://localhost:5000/addEvent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ name, date, venue, price })
  })
  .then(res => res.text())
  .then(data => {
    alert(data);
    loadEvents();
  });
}


// DISPLAY EVENTS 
function displayEvents() {
  let container = document.getElementById("eventContainer");
  if (!container) return;

  let events = JSON.parse(localStorage.getItem("events")) || [];

  
  let html = "";

  // Defaul events
  html += `
    <div class="card">
      <img src="https://picsum.photos/400/300?1">
      <div class="card-content">
        <h3>Music Concert</h3>
        <p>25 April | Delhi</p>
        <p class="price">₹999</p>
        <button onclick="bookTicket('Music Concert')">Book Now</button>
      </div>
    </div>

    <div class="card">
      <img src="https://picsum.photos/400/300?2">
      <div class="card-content">
        <h3>Tech Conference</h3>
        <p>30 April | Bangalore</p>
        <p class="price">₹1499</p>
        <button onclick="bookTicket('Tech Conference')">Book Now</button>
      </div>
    </div>
  `;

  // Add user events
  events.forEach((e) => {
    html += `
      <div class="card">
        <img src="https://picsum.photos/400/300?random=${Math.random()}">
        <div class="card-content">
          <h3>${e.name}</h3>
          <p>${e.date} | ${e.venue}</p>
          <p class="price">₹${e.price}</p>
          <button onclick="bookTicket('${e.name}')">Book Now</button>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;
}


//  BOOK TICKET 
function bookTicket(eventName) {
  let userName = prompt("Enter your name:");

  if (!userName) {
    alert("Name required!");
    return;
  }

  let ticketId = "TICKET_" + Math.floor(Math.random() * 100000);

  let attendees = JSON.parse(localStorage.getItem("attendees")) || [];

  attendees.push({
    name: userName,
    event: eventName,
    ticketId: ticketId
  });

  localStorage.setItem("attendees", JSON.stringify(attendees));

  alert("Ticket Booked!\nID: " + ticketId);

  displayAttendees(); // update UI
}


//  PAGE LOAD 
window.onload = function () {
  // run only if eventContainer exists (means index.html)
  if (document.getElementById("eventContainer")) {
    checkLogin();
    displayEvents();
  }
};

function displayAttendees() {
  let list = document.getElementById("attendeeList");
  if (!list) return;

  let attendees = JSON.parse(localStorage.getItem("attendees")) || [];

  let html = "";

  attendees.forEach((a) => {
    html += `
      <div class="attendee-card">
        <h3>${a.name}</h3>
        <p>Event: ${a.event}</p>
        <p>ID: ${a.ticketId}</p>
      </div>
    `;
  });

  list.innerHTML = html;
}

function loadEvents() {
  fetch("http://localhost:5000/events")
    .then(res => res.json())
    .then(data => {
      let container = document.getElementById("eventContainer");
      container.innerHTML = "";

      data.forEach(e => {
        container.innerHTML += `
          <div class="card">
            <img src="https://picsum.photos/400/300?random=${Math.random()}">
            <div class="card-content">
              <h3>${e.name}</h3>
              <p>${e.date} | ${e.venue}</p>
              <p class="price">₹${e.price}</p>
              <button onclick="bookTicket('${e.name}')">Book</button>
            </div>
          </div>
        `;
      });
    });
}