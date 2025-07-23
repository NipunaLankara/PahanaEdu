document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirmPassword");

    form.addEventListener("submit", function (e) {
        if (password.value !== confirmPassword.value) {
            e.preventDefault();
            alert("Passwords do not match. Please try again.");
            confirmPassword.focus();
        }
    });
});
