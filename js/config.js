const c = console,
    d = document,
    $ = a => d.querySelector(a),
    $all = a => d.querySelectorAll(a),
    JSON = `https://raw.githubusercontent.com/Francisco-pixel/cv-lisbeth/main/data/data.json`,
    intervalTime = 3*1000;

const OBTENER_API = async () => {
    try{
        const RES = await fetch(JSON + `?${Date.now()}`),
            DATA = await RES.json();
            if(!RES.ok)throw {status:RES.status,statusText:RES.statusText};
            
            return DATA;

    }catch(error){
        c.log(`Error ${error.status}`);
    }
}
const HEAD_TITLE=(titulo="CV")=>$('title').innerText=`CV ${titulo}`;


//setInterval(mostrarInfoLeft, intervalTime);
mostrarInfoLeft();
async function mostrarInfoLeft() {
    const DATA = await OBTENER_API();
    const TITULOS = Object.keys(splitJson(4,9));
    HEAD_TITLE(DATA.nombre);
    mostrarTitulos(TITULOS);
    const INFO_PRINCIPAL=splitJson(0,3);
    const INFO_ACADEMICO_Y_PROFESIONAL=splitJson(4,7);
    const EXPERIENCIA_LABORAL=splitJson(8,8);
    const HABILIDADES_PROFESIONALES=splitJson(9,9);
    function splitJson(desde,hasta){
        if(hasta<desde){
            c.log(`%cEl índice ${hasta} debe ser mayor o igual a ${desde}`,'color:red; font-size:1rem;');
        }
        const NUEVO_OBJ={},
        KEYS=Object.keys(DATA);        
        for(let i=desde;i<=hasta;i++){
            const KEY=KEYS[i];
            if(KEY && DATA.hasOwnProperty(KEY)){
                NUEVO_OBJ[KEY]=DATA[KEY];
            }
        }
        return NUEVO_OBJ;
    }
    function buscarIndex(text){
       return Object.keys(DATA).indexOf(text);
    }
    

    for(const KEY in INFO_PRINCIPAL){
        mostrarInfoPrincipal(`.${KEY}`,INFO_PRINCIPAL[KEY])
    }
    for(const KEY in INFO_ACADEMICO_Y_PROFESIONAL){
        mostrarInfoAcademicoYPersonal(`.${KEY}`,INFO_ACADEMICO_Y_PROFESIONAL[KEY])
    }
    for(const KEY in HABILIDADES_PROFESIONALES){
        mostrarInfoAcademicoYPersonal(`.${KEY}`,HABILIDADES_PROFESIONALES[KEY])
    }
    for(const KEY in EXPERIENCIA_LABORAL){
        mostrarExperienciaLaboral(`.${KEY}`,EXPERIENCIA_LABORAL[KEY])
    }

}
function mostrarInfoPrincipal(tag, valor) {
    if (!$(tag)) return;
    const EXT = /png|jpg/;
    if (EXT.test(valor)) {
        $(tag).src = valor;
    } else {
        $(tag).innerText = valor;
    }
}

function mostrarInfoAcademicoYPersonal(tag,array) {
    if (!$(tag)) return;   
    $(tag).innerHTML=``;         
        array.forEach((item,i) => {
        $(tag).innerHTML += `<li>${item}</li>`;
    })
}

function mostrarTitulos(titulos) {
    let $titulo = $all('.titulo');
    titulos.forEach((item, i) => {
        let titulo = /_/.test(item) ? item.replace(/_/g, " ") : item;
        if (!$titulo[i]) return;
        $titulo[i].innerHTML = titulo;
    })
}

function mostrarExperienciaLaboral(tag,experiencia){
    if (!$(tag)) return;   
    $(tag).innerHTML=``;  
    experiencia.forEach(({empresa,anio,cargo,desc})=>{
        $(tag).innerHTML+=`
        <div class="col--2 grid gap--1">
            <div class="centrar--item">
                <p>${empresa}, ${anio}</p>
            </div>
            <div>
                <p class="cargo">${cargo}</p>
                <p>${desc}</p>
            </div>
        </div>
        `
    })
}
d.addEventListener("click",e=>{
    if(e.target.matches('.img')){
        print();
    }
})
$('.img').addEventListener("mouseover",()=>{
    $('.cv__right').style.height="100vh";
})
$('.img').addEventListener("mouseout",()=>{
    $('.cv__right').style.height="100%";
})
