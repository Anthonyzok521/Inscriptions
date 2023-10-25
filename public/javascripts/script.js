let options = document.querySelector('#options'),
bachiller = document.querySelector('#bachiller'),
student = document.querySelector('#student'),
season = document.querySelector('.form-select'),
label = document.querySelector('.form-label');

const createOptions = async (num)=>{
    
      for(let i = 0; i < num; i++){
        console.log(i);
        let option = document.createElement('OPTION');
        option.value = i + 1;
        option.textContent = i + 1;
        label.textContent = num == 5 ? "Bachiller" : "Universitario";
        season.appendChild(option);
        }  
}

options.addEventListener('click', ()=>{
    if(bachiller.checked){
        (async() => {
            await createOptions(5);
        })();
        student.value = "Bachiller";
    }else{
        (async() => {
            await createOptions(10);
        })();
        student.value = "Universitario";
    }
});

    if (typeof(Storage) !== "undefined") {
        console.log("Sí tiene localstorage");
        localStorage.setItem("student", "Curso de Angular avanzado - Víctor Robles");
    } else {
        console.log("No tiene localstorage");
    }

