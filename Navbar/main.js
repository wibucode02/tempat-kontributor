const icon = document.querySelector(".icon");
const nav = document.querySelector("nav");

icon.addEventListener("click", () => {
    icon.classList.toggle("close");
    icon.classList.toggle("show");
    nav.classList.toggle("show");
})