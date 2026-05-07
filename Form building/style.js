const form = document.getElementById("form");

const showPass = document.getElementById("showPass");
const password = document.getElementById("password");
const confirm = document.getElementById("confirm");

const file = document.getElementById("file");
const fileName = document.querySelector(".file-name");

// Show Password
showPass.addEventListener("change", () => {
    if (showPass.checked) {
        password.type = "text";
        confirm.type = "text";
    } else {
        password.type = "password";
        confirm.type = "password";
    }
});

// File name preview
file.addEventListener("change", () => {
    fileName.textContent = file.files[0] ? file.files[0].name : "";
});

form.addEventListener("submit", function(e) {
    e.preventDefault();

    let valid = true;

    document.querySelectorAll(".error").forEach(el => el.textContent = "");
    document.querySelector(".success").textContent = "";

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();

    // Name
    if (name === "") {
        document.querySelector("#name + .error").textContent = "Name required";
        valid = false;
    }

    
    const pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    if (email === "") {
        document.querySelector("#email + .error").textContent = "Email required";
        valid = false;
    } else if (!pattern.test(email)) {
        document.querySelector("#email + .error").textContent = "Invalid email";
        valid = false;
    }

    // Password
    if (password.value.length < 6) {
        document.querySelector("#password + .error").textContent = "Min 6 characters";
        valid = false;
    }

    // Confirm Password
    if (confirm.value !== password.value) {
        document.querySelector("#confirm + .error").textContent = "Password not match";
        valid = false;
    }

    // Gender
    const gender = document.querySelector('input[name="gender"]:checked');
    if (!gender) {
        document.getElementById("genderError").textContent = "Select gender";
        valid = false;
    }

    // Skills
    const skills = document.querySelectorAll('input[name="skills"]:checked');
    if (skills.length === 0) {
        document.getElementById("skillsError").textContent = "Select at least one skill";
        valid = false;
    }

    // Success
    if (valid) {
        document.querySelector(".success").textContent = "Registration Successful ✅";
        form.reset();
        fileName.textContent = "";
    }
});