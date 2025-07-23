document.addEventListener("DOMContentLoaded", function () {
    const deleteLinks = document.querySelectorAll(".delete-btn");

    deleteLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            if (!confirm("Are you sure you want to delete this customer?")) {
                event.preventDefault();
            }
        });
    });
});
