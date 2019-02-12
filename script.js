let ligacao = {
    plano: null,
    origem: null,
    destino: null,
    minutos: null,
    tarifas: {
        '1116': 1.9,
        '1611': 2.9,
        '1117' : 1.7,
        '1711' : 2.7,
        '1118' : 0.9,
        '1811' : 1.9
    }
}


let selectOrigem = document.getElementById("Origem")
let selectDestino = document.getElementById("Destino")
let selectPlano = document.getElementById('Plano')
let selectMinutos =document.getElementById('Minutos')
let selectBotao = document.getElementById('Calcular')

let validaBotao = () =>{
    if(ligacao.destino && ligacao.origem && ligacao.plano && ligacao.minutos){
        selectBotao.removeAttribute('disabled')
    } else {
        selectBotao.setAttribute('disabled','disabled')
    }
}

selectOrigem.addEventListener('change', (event) =>{
    ligacao.origem = event.target.value
    selectDestino.innerHTML = ''
    selectDestino.innerHTML += '<option value="" disabled selected>DDD Destino</option>'
    
    if( !ligacao.origem){
        selectDestino.setAttribute('disabled','disabled')
    } else if (ligacao.origem == 11){
        selectDestino.innerHTML += '<option value="16">016</option>'
        selectDestino.innerHTML += '<option value="17">017</option>'
        selectDestino.innerHTML += '<option value="18">018</option>'
        selectDestino.removeAttribute('disabled')
    } else{
        selectDestino.innerHTML += '<option value="11">011</option>'
        selectDestino.removeAttribute('disabled')
    }
    validaBotao()
})

selectDestino.addEventListener('change',(event) =>{
    ligacao.destino = event.target.value
    validaBotao()
})

selectPlano.addEventListener('change',(event) => {
    ligacao.plano = event.target.value
    validaBotao()
})

selectMinutos.addEventListener('input',(event) => {
    ligacao.minutos = event.target.value
    console.log(ligacao.minutos)
    validaBotao()
})

const parseFloat = (valor) => valor.toFixed(2).replace('.', ',')
const concatenaDdd = (ddd1, ddd2) => `${ddd1}${ddd2}`
const calcularSemPlano = (minutos,tarifa) => parseFloat(minutos * tarifa)
const calcularComPlano = (minutos,tarifa,tipoPlano) => {
        tipoPlano = tipoPlano || 0
        let dif = minutos - Number(tipoPlano)
        dif = dif < 0 ? 0 : dif 
        return parseFloat((dif * tarifa) * 1.1)
    }

let exibirResultados = () => {
    let codTarifa = concatenaDdd(ligacao.origem,ligacao.destino)
    let resultadoSemPlano = calcularSemPlano(ligacao.minutos, ligacao.tarifas[codTarifa])
    let resultadoComPlano = calcularComPlano(ligacao.minutos, ligacao.tarifas[codTarifa], ligacao.plano)
    console.log(resultadoSemPlano, resultadoComPlano)
} 