<template>
  

  <div  v-if="mostrarJuego" class="container">
    <h1>Juego Casino</h1>
    <div class="titulos">
      <h4>Puntaje: {{ puntaje }}</h4>
      <h4>Intento: {{ intento }}</h4>
    </div>
    <div class="casino">
      <div class="items">
        <img :src="src1" alt="No se muestra" />
        <h4>{{ name1 }}</h4>
      </div>
      <div class="items">
        <img :src="src2" alt="No se muestra" />
        <h4>{{ name2 }}</h4>
      </div>
      <div class="items">
        <img :src="src3" alt="No se muestra" />
        <h4>{{ name3 }}</h4>
      </div>
    </div>
    <div>
        <button v-on:click="jugar">Jugar</button>
    </div>
    
  </div>

  
  <div v-if="msjIntenta" class="msjFalla">
    <h4>Puntaje: {{ puntaje }}</h4>
    <h4>Haz utilizado tus 5 intentos</h4>
    <h4>El juego ha terminado, intentalo nevamente</h4>
    <button v-on:click="nuevoJuego">Nuevo Juego</button>
  </div>
  <div v-if="msjCongrats" class="msjCongra">
    <h4>Puntaje: {{ puntaje }}</h4>
    <h4>Felicidades has ganado un premio de $10.000,00</h4>
    <button v-on:click="nuevoJuego">Nuevo Juego</button>
  </div>
</template>

<script>
import cuadrado from '../assets/cuadrado.png'
import consumirApiFachada from '../helpers/PokeApi'
export default {


data(){
    return{
        puntaje: 0,
      intento: 0,
        src1:'',
        src2:'',
        src3:'',
        name1:'',
        name2:'',
        name3:'',
        listaPokes: [],
        msjIntenta: false,
      msjCongrats: false,
      mostrarJuego: true,
    }
},
mounted(){
    this.src1=cuadrado
    this.src2=cuadrado
    this.src3=cuadrado
    this.name1='xxxxxxxxxxxx'
    this.name2='xxxxxxxxxxxx'
    this.name3='xxxxxxxxxxxx'

},
methods:{
    async jugar() {
      if (this.intento <= 5) {
        this.intento += 1;
        this.obtenerPokes();
        const poke1 = await consumirApiFachada(this.listaPokes[0]);
        const poke2 = await consumirApiFachada(this.listaPokes[1]);
        const poke3 = await consumirApiFachada(this.listaPokes[2]);
        
        console.log(poke1.name);
        console.log(poke2.name);
        console.log(poke3.name);
        this.name1 = poke1.name;
        this.name2 = poke2.name;
        this.name3 = poke3.name;
        
        this.src1=this.obtenerImage(this.listaPokes[0])
        this.src2=this.obtenerImage(this.listaPokes[1])
        this.src3=this.obtenerImage(this.listaPokes[2])
        if (
          this.listaPokes[0] == this.listaPokes[1] &&
          this.listaPokes[0] == this.listaPokes[2]
        ) {
          this.puntaje += 5;
        } else if (
          this.listaPokes[0] == this.listaPokes[1] ||
          this.listaPokes[0] == this.listaPokes[2] ||
          this.listaPokes[1] == this.listaPokes[2]
        ) {
          this.puntaje += 4;
        }
        if (this.intento == 5) {
          if (this.puntaje < 10) {
            this.mostrarJuego = false;
            this.msjIntenta = true;
          } else {
            this.mostrarJuego = false;
            this.msjCongrats = true;
          }
        }
      
        
      }
    },
    obtenerPokes() {
      //array con 5 numeros aleatorios (id pokes)
      const pokes = [];
      for (let i = 0; i < 5; i++) {
        pokes[i] = this.generarAleatorio(0, 600);
      }
      console.log(pokes);
      for (let i = 0; i < 3; i++) {
        this.listaPokes[i] = pokes[this.generarAleatorio(0, 4)];
      }
      //id de los 3 pokes seleccionados
      console.log('id de 3 pokes')
      console.log(this.listaPokes);
    },
    generarAleatorio(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    obtenerImage(id) {
      return `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`;
    },

    nuevoJuego() {
      this.mostrarJuego = true;
      this.msjIntenta = false;
      this.msjCongrats = false;
      this.intento = 0;
      this.puntaje = 0;
      this.src1 = cuadrado;
      this.src2 = cuadrado;
      this.src3 = cuadrado;
      this.name1 = "xxxxxxxxx";
      this.name2 = "xxxxxxxxx";
      this.name3 = "xxxxxxxxx";
      this.listaPokes = [];
    },
}
}
</script>

<style>

</style>