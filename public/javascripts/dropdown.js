let close = document.querySelector(".btn-close");
const btnNav = document.querySelector("#btn-nav"),
  collapse = document.querySelector("#navbarColor02");

btnNav.addEventListener("click", () => {
  collapse.classList.toggle("show");
});
