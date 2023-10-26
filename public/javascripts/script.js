let options = document.querySelector('#options'),
bachiller = document.querySelector('#bac'),
universitario = document.querySelector('#uni'),
student = document.querySelector('#student'),
season = document.querySelector('.form-select'),
label = document.querySelector('.form-label');

const createOptions = async (num)=>{
    if(season.children[0] != undefined){
        season.childNodes.forEach((node)=>{
            node.parentNode.removeChild(node);
        })
    }
      for(let i = 0; i < num; i++){
        console.log(i);
        let option = document.createElement('OPTION');
        option.value = i + 1;
        option.textContent = i + 1;
        label.textContent = num == 5 ? "Bachiller" : "Universitario";
        season.appendChild(option);
        }  
}

bachiller.addEventListener('click', ()=>{
        (async() => {
            await createOptions(5);
        })();
        student.value = "Bachiller";
});

universitario.addEventListener('click', ()=>{
    (async() => {
            await createOptions(10);
        })();
        student.value = "Universitario";
});

    if (typeof(Storage) !== "undefined") {
        console.log("Sí tiene localstorage");
        localStorage.setItem("student", "Curso de Angular avanzado - Víctor Robles");
    } else {
        console.log("No tiene localstorage");
    }