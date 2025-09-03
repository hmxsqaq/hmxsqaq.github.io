document.addEventListener("DOMContentLoaded", () => {
    const imageLinks = document.querySelectorAll(".lightbox-trigger");

    imageLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();

            const imageUrl = link.getAttribute("href");
            basicLightbox.create(`<img src="${imageUrl}">`).show();
        });
    })
})