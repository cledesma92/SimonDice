const color1 = document.getElementById('color1')
const color2 = document.getElementById('color2')
const color3 = document.getElementById('color3')
const color4 = document.getElementById('color4')

const btnEmpezar = document.getElementById('btnEmpezar')

const ULTIMO_NIVEL = 10


class Juego {
    constructor() {
        this.inicializar = this.inicializar.bind(this)
        this.inicializar()
        this.generarSecuencia()
        setTimeout(() => this.siguienteNivel(), 500)
        
    }

    inicializar() {
        this.siguienteNivel = this.siguienteNivel.bind(this)
        this.elegirColor = this.elegirColor.bind(this)
        this.toggleBtnEmpezar()
        
        this.nivel = 1
        this.colores = {
            color1,
            color2,
            color3,
            color4
        }
    }

    toggleBtnEmpezar(){
        if(btnEmpezar.classList.contains('hide')){
            btnEmpezar.classList.remove('hide')
        } else {
            btnEmpezar.classList.add('hide')
        }
    }

    generarSecuencia() {
        this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4))        
    }

    siguienteNivel() {
        this.subnivel = 0
        this.iluminarSecuencia()
        this.agregarEventosClick()
    }

    transformarNumerosAColor(numero) {
        switch (numero) {
            case 0:
                return 'color1'
            case 1:
                return 'color2'
            case 2:
                return 'color3'
            case 3:
                return 'color4'
        }
    }

    transformarColorANumero(color) {
        switch (color) {
            case 'color1':
                return 0
            case 'color2':
                return 1
            case 'color3':
                return 2
            case 'color4':
                return 3
        }
    }

    iluminarSecuencia() {
        for(let i = 0; i < this.nivel; i++){
            const color = this.transformarNumerosAColor(this.secuencia[i])
            setTimeout(() => this.iluminarColor(color), 1000 * i)
        }
    }

    iluminarColor(color){
        this.colores[color].classList.add('claro')
        setTimeout(()=> this.apagarColor(color), 450)
    }

    apagarColor(color){
        this.colores[color].classList.remove('claro')
    }

    agregarEventosClick() {
        this.colores.color1.addEventListener('click', this.elegirColor)
        this.colores.color2.addEventListener('click', this.elegirColor)
        this.colores.color3.addEventListener('click', this.elegirColor)
        this.colores.color4.addEventListener('click', this.elegirColor)
    }

    eliminarEventosClick() {
        this.colores.color1.removeEventListener('click', this.elegirColor)
        this.colores.color2.removeEventListener('click', this.elegirColor)
        this.colores.color3.removeEventListener('click', this.elegirColor)
        this.colores.color4.removeEventListener('click', this.elegirColor)
    }

    elegirColor(ev) {
        const nombreColor = ev.target.dataset.color
        const numeroColor = this.transformarColorANumero(nombreColor)
        this.iluminarColor(nombreColor)
        if(numeroColor === this.secuencia[this.subnivel]){
            this.subnivel++
            if(this.subnivel === this.nivel){
                this.nivel++
                this.eliminarEventosClick()
                if(this.nivel === (ULTIMO_NIVEL + 1)){
                    //Gano!
                    this.ganoJuego()
                } else {
                    setTimeout(this.siguienteNivel, 1500); 
                }
            }
        } else {
            //Perdió
            this.perdioJuego()
        }
    }

    ganoJuego(){
        swal('Felicitaciones!', 'Ganaste 😁', 'success' )
        .then(this.inicializar)
    }

    perdioJuego(){
        swal('Perdiste ☹️', 'Intentá de vuelta!', 'error' )
        .then(()=>{
            this.eliminarEventosClick()
            this.inicializar()
        })
    }

    
}
