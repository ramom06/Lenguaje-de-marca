const btn = document.querySelector(".btn");

btn.addEventListener("click", buscaPalabra);

async function buscaPalabra(){
    //En esta variable guardamos la palabra introducido
    const palabraIntroducida = document.querySelector(".input").value;

    //Creamos la url con el nombre del pokemon introducido
    const url = `https://rae-api.com/api/words/${palabraIntroducida}`;

    const palabra = document.querySelector(".palabra");
    const definicion  = document.querySelector(".definicion");
    const select = document.querySelector(".select");
    const origen = document.querySelector(".origen");  

    definicion.innerHTML ='';
    try{
        //Obtenemos la respuesta
        const respuesta = await fetch(url);
        //Procesa la respuesta
        const data = await respuesta.json();
        //Mostramos cada dato en su casilla
        palabra.innerHTML = `<h3>${data.data.word}</h3>`;
        palabra.classList.remove("rojo");
        palabra.classList.add("green");
        origen.innerHTML=`<h3>(${data.data.meanings[0].origin.raw})</h3>`;
        origen.classList.add("green");
        //definicion.innerHTML=`<p>(${data.data.meanings[0].senses[0].raw})</p>`;
        

        data.data.meanings[0].senses.forEach(element => {
            let option = document.createElement("option");
            option.value = element.Value;
            option.textContent = `Definición: ${element.raw}`;
            select.appendChild(option);
        });

        const opcion = document.querySelector(".select").value;
        definicion.textContent = `${data.data.meanings[0].senses[opcion].raw}`;
    
    }catch (error){
        //Lo mostramos 
        palabra.classList.remove("green");
        palabra.classList.add("rojo");
        origen.innerHTML='';
        definicion.innerHTML='';
        palabra.innerHTML='Palabra no encontrada';
        console.error("Error al obtener datos", error);
    }
}