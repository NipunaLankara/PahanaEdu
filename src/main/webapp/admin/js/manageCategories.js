window.onload = function () {
    const success = document.getElementById("successMessage");
    const error = document.getElementById("errorMessage");

    if (success && success.value.trim() !== "") {
        alert(success.value);
    }

    if (error && error.value.trim() !== "") {
        alert(error.value);
    }

    // Add confirmation to all delete forms
    const deleteForms = document.querySelectorAll("form[action='manageCategory'][method='post']");
    deleteForms.forEach(form => {
        const actionInput = form.querySelector("input[name='action']");
        if (actionInput && actionInput.value === "delete") {
            form.addEventListener("submit", function (e) {
                const confirmed = confirm("Are you sure you want to delete this category?");
                if (!confirmed) {
                    e.preventDefault();
                }
            });
        }
    });
};
