document.addEventListener("DOMContentLoaded", function() {
    var usernameInput = document.getElementById("username");
    var emailInput = document.getElementById("user-email");
    var passwordInput = document.getElementById("password");
    var descriptionInput = document.getElementById("description");
    var profileImageInput = document.getElementById("profile-image");

    var savedData = {}; // Object to store the saved data

    function openNav() {
        document.getElementById("mySidenav").style.width = "250px";
    }

    function closeNav() {
        document.getElementById("mySidenav").style.width = "0";
    }

    function validateForm(event) {
        console.log("Form submitted"); // Check if the form submission is being captured
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
            // Save the values in the savedData object
            savedData.username = usernameInput.value;
            savedData.email = emailInput.value;
            savedData.description = descriptionInput.value;

            // Save the image file
            var file = profileImageInput.files[0];
            if (file) {
                var reader = new FileReader();
                reader.onload = function(event) {
                    savedData.image = event.target.result; // Save image data as base64
                    // Save the data to local storage for later use
                    localStorage.setItem('savedData', JSON.stringify(savedData));
                };
                reader.readAsDataURL(file);
            }

            alert("You are successfully signed in!");
            window.location.href = "index.html"; // Redirect
            return false; // Prevent further bubbling of the event
        }
    }

    function validateEmail(email) {
        // Simple email validation regex
        var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
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
