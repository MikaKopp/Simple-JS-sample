
let laatikko = document.querySelector(".laatikko");
let etusukubox = document.querySelector(".etusukubox");
let lisaabtn = document.querySelector(".lisaabtn");
let listaus = document.querySelector(".listaus");
let lista = [];

/*Kuuntelija Lisää nappulalle, lisää input boxin sisällön, 
muuttaa sisällön liikuteltavaksi ja tyhjentää input boxin
*/
lisaabtn.addEventListener("click", ()=>{

    if(etusukubox != ""){
        lista.push(etusukubox.value);
        console.log(lista);
        let uusiyksilo = document.createElement("div");
        uusiyksilo.className = "yksilo";
        uusiyksilo.draggable = true;

        uusiyksilo.addEventListener("dragstart",()=>{
            uusiyksilo.classList.add("raahaus");
        });

        uusiyksilo.addEventListener("dragend",()=>{
            uusiyksilo.classList.remove("raahaus");
        });


        
        for(let i = 0; i < lista.length;i++){
            uusiyksilo.innerHTML = etusukubox.value;
            listaus.appendChild(uusiyksilo);
        }
        etusukubox.value = "";
    }

})

/*
Kuuntelija nimilistalle, muuttaa halutun liikuteltavan järjestystä
*/
listaus.addEventListener("dragover",e=>{
    e.preventDefault();
    const jalkeen = getYliRaahaus(listaus,e.clientY);
    const raahattava = document.querySelector(".raahaus");
    if(jalkeen == null){
        listaus.appendChild(raahattava);
    }
    else {
        listaus.insertBefore(raahattava,jalkeen);
    }
   

});

/*
Katselee missä liikutaan
*/
function getYliRaahaus(listaus,y){
    const raahattavat =  [...listaus.querySelectorAll(".yksilo:not(.raahaus)")];
    
    return raahattavat.reduce((closest,child) =>{
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height/2;
        if (offset <0 && offset > closest.offset){
            return {offset: offset, element: child}
            }
            else{
                return closest;
            }
        
    },{ offset: Number.NEGATIVE_INFINITY}).element;
}