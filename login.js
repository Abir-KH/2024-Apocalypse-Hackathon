document.addEventListener("DOMContentLoaded", function() {
    var usernameInput = document.getElementById("username");
    var passwordInput = document.getElementById("password");
    var emailInput = document.getElementById("user-email");

    function openNav() {
        document.getElementById("mySidenav").style.width = "250px";
    }

    function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
    }

    function validateForm(event) {
        event.preventDefault(); // Prevent the form from submitting the traditional way

        if (usernameInput.value.length < 6) {
            alert("Username must be at least 6 characters long.");
            return false; 
        } else if (passwordInput.value.length < 12) {
            alert("Password must be at least 12 characters long.");
            return false; 
        } else if (!validateEmail(emailInput.value)) {
            alert("Please enter a valid email address.");
            return false; 
        } else {
            alert("You are successfully signed in!");
            window.location.href = "index.html"; // Redirect to index.html
            return true; 
        }
    }

function showInfo() {
    var infoBox = document.getElementById("infoBox");
    if (infoBox.style.display === "none") {
        infoBox.style.display = "block";  
    } else {
        infoBox.style.display = "none";
    }
}

function myFunction() {
    window.open("https://cfs.nrcan.gc.ca/statsprofile/");
}

    document.getElementById("sign-up-form").addEventListener("submit", validateForm);
});

function test(){
    console.log("la;jlskd");
}