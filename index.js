function validateIDNumber(idNumber) {
    return idNumber.length === 10;
}

document.getElementById("registerForm").addEventListener("submit", function(event) {
    event.preventDefault(); 

    var idNumber = document.getElementById("idNumber").value;

    if (!validateIDNumber(idNumber)) {
        alert("Please enter a valid 10-character ID number.");
        return; 
    }

    var firstName = document.getElementById("firstName").value;
    var lastName = document.getElementById("lastName").value;
    var course = document.getElementById("course").value;
    var year = document.getElementById("year").value;
    var section = document.getElementById("section").value;
    var phoneNumber = document.getElementById("phoneNumber").value;

    var account = {
        idNumber: idNumber,
        firstName: firstName,
        lastName: lastName,
        course: course,
        year: year,
        section: section,
        phoneNumber: phoneNumber
    };

    var existingAccounts = JSON.parse(localStorage.getItem("registeredAccounts")) || [];

    existingAccounts.push(account);

    localStorage.setItem("registeredAccounts", JSON.stringify(existingAccounts));

    alert("Registration successful!");

    document.getElementById("registerForm").reset();
});

document.getElementById("loginForm").addEventListener("submit", function(event) {
    event.preventDefault(); 

    var loginIDNumber = document.getElementById("loginIDNumber").value;

    var savedAccountsJSON = localStorage.getItem("registeredAccounts");

    if (savedAccountsJSON) {
        var savedAccounts = JSON.parse(savedAccountsJSON);

        var matchedAccount = savedAccounts.find(function(account) {
            return account.idNumber === loginIDNumber;
        });

        if (matchedAccount) {
            alert("Login successful!");
            setTimeout(function() {
                window.location.href = "homepage.html";
            }, 2000); // 2 seconds delay
        } else {
            alert("Invalid ID number. Please try again.");
        }
    } else {
        alert("No accounts registered. Please register first.");
    }
});
