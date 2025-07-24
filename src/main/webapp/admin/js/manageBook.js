window.onload = function () {
    const success = document.getElementById("successMessage");
    const error = document.getElementById("errorMessage");
    if (success && success.value.trim() !== "") {
        alert(success.value);
    }

    if (error && error.value.trim() !== "") {
        alert(error.value);
    }
};

function confirmDelete() {
    return confirm("Are you sure you want to delete this book?");
}