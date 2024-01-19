let options = document.querySelector("#options"),
  bachiller = document.querySelector("#bac"),
  universitario = document.querySelector("#uni"),
  student = document.querySelector("#student"),
  season = document.querySelector(".form-select"),
  label = document.querySelector(".form-label");

const removeOptions = () => {
  season.innerHTML = "";
};

const createOptions = (num) => {
  for (let i = 0; i < num; i++) {
    console.log(i);
    let option = document.createElement("OPTION");
    option.value = i + 1;
    option.textContent = i + 1;

    season.appendChild(option);
  }
};

bachiller.addEventListener("click", () => {
  removeOptions();
  createOptions(5);

  student.value = "Bachiller";
});

universitario.addEventListener("click", () => {
  removeOptions();
  createOptions(10);
  student.value = "Universitario";
});

if (typeof Storage !== "undefined") {
  console.log("Sí tiene localstorage");
  localStorage.setItem("student", "Curso de Angular avanzado - Víctor Robles");
} else {
  console.log("No tiene localstorage");
}
