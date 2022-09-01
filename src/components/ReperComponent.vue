<template>
  <div class="back text-white text-base md:container w-full md:mx-auto my-10 px-10 pb-10 rounded-lg">
    <div class="flex lg:justify-between flex-wrap">
      <div class="lg:w-auto w-full">
        <h2 class="block text-4xl font-bold mb-5 text-center">Repertorio</h2>
        <button v-on:click="addSong"  class="mx-auto lg:m-auto block text-white font-bold bg-green-500 hover:bg-green-700 transition-all transform hover:scale-105 px-8 py-5 mb-5 lg:mb-10 flex rounded-xl">Agrega nueva cancion</button>
      </div>
      <div class="w-full lg:w-1/4">

         <form >
            <input type="text" placeholder="Busca un Autor o Canción" class="block text-gray-500 w-full sm:w-3/4 mx-auto lg:w-full h-14 my-5 px-5 py-3 rounded bg-gray-200 text-lg" v-model="search" required>
            <button v-on:click="searchButton"  class="mx-auto text-white font-bold bg-pink-500 hover:bg-pink-700 transition-all transform hover:scale-105 px-8 py-5 mb-10 flex rounded-xl">Buscar</button>
        </form>

      </div>
    </div>
    <table class="w-full text-center hidden lg:block">
      <th class="p-2 md:px-5 pb-5">Titulo</th>
      <th class="p-2 md:px-5 pb-5">Autor</th>
      <th class="p-2 md:px-5 pb-5">Inicio de aprender</th>
      <th class="p-2 md:px-5 pb-5">Fin de aprender</th>
      <th class="p-2 md:px-5 pb-5">Youtube link</th>
      <th class="p-2 md:px-5 pb-5">Editar</th>
      <th class="p-2 md:px-5 pb-5">Borrar</th>

      <tr v-for="reper in repertoire" :key="reper.uuid">
        <td class="p-2 md:p-5">{{ reper.name }}</td>
        <td class="p-2 md:p-5">{{ reper.author }}</td>
        <td class="p-2 md:p-5">{{ (reper.start_learning) ? reper.start_learnign : '-'}}</td> 
        <!-- <td class="p-2 md:p-5"> {{reper.end_learning}} dsdas</td> -->
        <td class="p-2 md:p-5"> <button v-on:click="finishButton(reper.uuid)" class="p-2 text-white font-bold text-center bg-blue-500 rounded-3xl transition-all transform hover:scale-105">Terminar</button></td>

        <td class="p-2 md:p-5 ">
          <a :href="reper.link" target="_blank">{{ reper.url }}</a>
        </td>
        <td class="p-2 md:p-5">
          <!-- <router-link :to="/edita-cancion/+reper._id"> <font-awesome-icon :icon="['fas', 'edit']" class="text-4xl text-yellow-500 cursor-pointer transition-all transform hover:scale-125"/></router-link> -->
        </td >
        <td class="p-2 md:p-5">
          <!-- <font-awesome-icon v-on:click="deleteButton(reper.title, reper._id)" :icon="['fa', 'trash']" class="text-4xl text-red-500 cursor-pointer transition-all transform hover:scale-125"/> -->
        </td>
      </tr>
    </table>


    <!-- <div class="w-full grid grid-cols-2 text-center lg:hidden text-sm sm:text-base" v-for="reper in rep" :key="reper._id">
      <div class="font-bold">
        <hr>

        <div class="p-5 ">Titulo</div>
         <div class="p-5 ">Autor</div>
        <div class="p-5  ">Inicio de aprender</div>
        <div class="p-5  	">Fin de aprender</div>
        <div class="p-5  	">Youtube link</div>
        <div class="p-5 ">Editar</div>
        <div class="p-5 ">Borrar</div>
      </div>
      <div>
        <hr>
        <div class="p-5">{{ reper.title }}</div>
        <div class="p-5">{{ reper.author }}</div>
        <div class="p-5  ">{{ reper.start | moment("DD/MM/YYYY") }}</div>
        <div class="p-5  " v-if="reper.end"> {{reper.end | moment("DD/MM/YYYY")}} </div>
        <div class="p-5 " v-else> <button v-on:click="finishButton(reper._id)" class="p-1 tex-sm text-white font-bold text-center bg-blue-500 rounded-3xl transition-all transform hover:scale-105">Terminar</button></div>

        <div class="p-5 ">
          <a :href="reper.link" target="_blank">{{ reper.link }}</a>
        </div>
        <div class="p-5">
          <router-link :to="/edita-cancion/+reper._id"> <font-awesome-icon :icon="['fas', 'edit']" class="text-3xl -mb-6 text-yellow-500 cursor-pointer transition-all transform hover:scale-125"/></router-link>
        </div >
        <div class="p-5">
          <font-awesome-icon v-on:click="deleteButton(reper.title, reper._id)" :icon="['fas', 'trash']" class="text-3xl -mb-6 text-red-500 cursor-pointer transition-all transform hover:scale-125"/>
        </div>
      </div>
  
    </div> -->
    <modal-add-song :show="show_modal" v-on:closeModal="updateTable"/>
  </div>
</template>


<script>
// import global from '../global';
import swal from 'sweetalert2';
import reper from '../models/reper';
import service from '@/services/main';
import modalAddSong from '@/components/components/modalAddSong.vue';

export default {
  name: "ReperComponent",
  data() {
    return {
      repertoire: [],
      myOnlyRep: new reper("","","","",""),
      search: "",
      show_modal: false
    };
  },
  components: {
    modalAddSong,
  },
  methods:{
    getRepertoire(){
      service.getRepertoire().then((response) => {
        console.log(response)
        this.repertoire = response;
      })
    },

    addSong(){
      this.show_modal = !this.show_modal;
      // this.$router.push('/agregar-cancion');
    },
    searchButton(){
      if(this.search ==""){
        swal.fire('El campo de busqueda no puede estar vacio')
      }else{
        this.$router.push('/buscar/'+this.search)
      }
    },
    updateTable(data) {
      this.show_modal = false;
      this.repertoire.push(data)
      console.log(data);
    },
    deleteButton(title,id){
      console.log(title, id)
  
     
    },

  },
  created() {
    console.log('hello')
    this.getRepertoire();
  }
};
</script>



<style>
.back {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>