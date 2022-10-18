<template>
  <div class="back text-white text-base md:container w-full md:mx-auto my-10 px-10 pb-10 rounded-lg">
    <div class="flex lg:justify-between flex-wrap">
      <div class="lg:w-auto w-full">
        <h2 class="block text-4xl font-bold mb-5 text-center">Repertorio</h2>
        <button v-on:click="addSong"  class="mx-auto lg:m-auto block text-white font-bold bg-green-500 hover:bg-green-700 transition-all transform hover:scale-105 px-8 py-5 mb-5 lg:mb-10 flex rounded-xl">Agrega nueva cancion</button>
        <button @click="sortList"  class="mx-auto lg:m-auto block text-white font-bold bg-blue-500 hover:bg-blue-700 transition-all transform hover:scale-105 px-8 py-5 mb-5 lg:mb-10 flex rounded-xl">Sortear lista</button>
      </div>
      <div class="w-full lg:w-1/4">

         <form >
            <input type="text" placeholder="Busca un Autor o Canción" class="block text-gray-500 w-full sm:w-3/4 mx-auto lg:w-full h-14 my-5 px-5 py-3 rounded bg-gray-200 text-lg" v-model="search" required>
            <button v-on:click="searchButton"  class="mx-auto text-white font-bold bg-pink-500 hover:bg-pink-700 transition-all transform hover:scale-105 px-8 py-5 mb-10 flex rounded-xl">Buscar</button>
        </form>

      </div>
    </div>
    <table class="w-full text-center hidden lg:block">
      <th class="p-2 md:px-5 pb-5">#</th>
      <th class="p-2 md:px-5 pb-5">Titulo</th>
      <th class="p-2 md:px-5 pb-5">Autor</th>
      <th class="p-2 md:px-5 pb-5">Inicio de aprender</th>
      <th class="p-2 md:px-5 pb-5">Fin de aprender</th>
      <th class="p-2 md:px-5 pb-5">Link</th>
      <th class="p-2 md:px-5 pb-5">Editar</th>
      <th class="p-2 md:px-5 pb-5">Borrar</th>

      <tr v-for="(reper, index) in repertoire" :key="reper.uuid">
        <td>{{index + 1}}</td>
        <td class="p-2 md:p-5">{{ reper.name }}</td>
        <td class="p-2 md:p-5">{{ reper.author }}</td>
        <td class="p-2 md:p-5">{{ (reper.start_learning) ? reper.start_learnign : '-'}}</td> 
        <!-- <td class="p-2 md:p-5"> {{reper.end_learning}} dsdas</td> -->
        <td class="p-2 md:p-5"> 
          <button v-on:click="finishButton(reper.uuid)" class="p-2 text-white font-bold text-center bg-blue-500 rounded-3xl transition-all transform hover:scale-105">Terminar</button>
        </td>

        <td class="p-2 md:p-5 ">
          <a :href="reper.url" target="_blank">
            <font-awesome-icon icon="fa-solid fa-external-link-alt" class="text-xl cursor-pointer"/>          
          </a>
        </td>
        <td class="p-2 md:p-5">
          <font-awesome-icon 
            icon="fa-solid fa-edit" 
            class="text-xl cursor-pointer hover:text-yellow-500 transition-all transform hover:scale-125"
            @click="editOne(reper)"
          />          
        </td >
        <td class="p-2 md:p-5">
          <font-awesome-icon 
            icon="fa-solid fa-trash" 
            class="text-xl hover:text-red-500 cursor-pointer transition-all transform hover:scale-125"
            @click="deleteOne(reper.uuid)"/>        
        </td>
      </tr>
    </table>
    <modal-add-song :show="show_modal" @closeModal="updateTable" :song_to_edit="song_to_edit" :key="show_modal"/>
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
      show_modal: false,
      song_to_edit: {}
    };
  },
  components: {
    modalAddSong,
  },
  methods:{
    sortList() {
      this.repertoire.sort(() => { return Math.random() - 0.5});
    },
    getRepertoire(){
      service.getRepertoire().then((response) => {
        this.repertoire = response;
      })
    },
    editOne(song) {
      this.song_to_edit = song;
      this.show_modal = !this.show_modal;
    },
    addSong(){
      this.show_modal = !this.show_modal;
    },
    searchButton(){
      if(this.search ==""){
        swal.fire('El campo de busqueda no puede estar vacio')
      }else{
        this.$router.push('/buscar/'+this.search)
      }
    },
    updateTable(data, updated) {
      this.song_to_edit = {};
      this.show_modal = false;
      if (data.uuid && !updated) {
        this.repertoire.unshift(data)
      } else if (data.uuid && updated) {
        const updated_repertoire = this.repertoire.map((item) => {
          if (item.uuid === data.uuid) item = data;
          return item
        });
        this.repertoire = updated_repertoire;
      }

    },
    deleteOne(uuid){
      swal.fire({
        title: '¿Estás seguro de elimnar?',
        text: "Los cambios no podrán ser revertidos",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminalo'
      }).then((result) => {
        if (result.isConfirmed) {
          service.deleteOne(uuid).then((response) => {
            if (response.status <= 400) {
              this.repertoire = this.repertoire.filter((item) => item.uuid !== uuid);
              this.$vToastify.success({
                canPause: false,
                title: 'Eliminada',
                body: 'La canción ha sido eliminada con éxito',
              });  
            } else {
              this.$vToastify.error({
                canPause: false,
                title: 'Error',
                body: 'Ha ocurrido un error al tratar de eliminar la canción',
              });
            }
          });
        }
      });
    },
  },
  created() {
    this.getRepertoire();
  }
};
</script>



<style>
.back {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>