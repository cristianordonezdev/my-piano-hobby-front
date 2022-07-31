<template>
  <div class="back text-white text-base md:container w-full md:mx-auto my-10 px-10 pb-10 rounded-lg">
    <div class="flex lg:justify-between flex-wrap">
      <div class="lg:w-auto w-full">
        <h2 class="block text-4xl font-bold mb-5 text-center">Repertorio</h2>
        <button v-on:click="createButton"  class="mx-auto lg:m-auto block text-white font-bold bg-green-500 hover:bg-green-700 transition-all transform hover:scale-105 px-8 py-5 mb-5 lg:mb-10 flex rounded-xl">Agrega nueva cancion</button>
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
      <th class="p-2 md:px-5 pb-5 ">Inicio de aprender</th>
      <th class="p-2 md:px-5 pb-5 	">Fin de aprender</th>
      <th class="p-2 md:px-5 pb-5 	">Youtube link</th>
      <th class="p-2 md:px-5 pb-5">Editar</th>
      <th class="p-2 md:px-5 pb-5">Borrar</th>

      <tr v-for="reper in rep" :key="reper._id">
        <td class="p-2 md:p-5">{{ reper.title }}</td>
        <td class="p-2 md:p-5">{{ reper.author }}</td>
        <td class="p-2 md:p-5  ">{{ reper.start | moment("DD/MM/YYYY") }}</td>
        <td class="p-2 md:p-5  " v-if="reper.end"> {{reper.end | moment("DD/MM/YYYY")}} </td>
        <td class="p-2 md:p-5 " v-else> <button v-on:click="finishButton(reper._id)" class="p-2 text-white font-bold text-center bg-blue-500 rounded-3xl transition-all transform hover:scale-105">Terminar</button></td>

        <td class="p-2 md:p-5 ">
          <a :href="reper.link" target="_blank">{{ reper.link }}</a>
        </td>
        <td class="p-2 md:p-5">
          <router-link :to="/edita-cancion/+reper._id"> <font-awesome-icon :icon="['fas', 'edit']" class="text-4xl text-yellow-500 cursor-pointer transition-all transform hover:scale-125"/></router-link>
        </td >
        <td class="p-2 md:p-5">
          <font-awesome-icon v-on:click="deleteButton(reper.title, reper._id)" :icon="['fas', 'trash']" class="text-4xl text-red-500 cursor-pointer transition-all transform hover:scale-125"/>
        </td>
      </tr>
    </table>


    <div class="w-full grid grid-cols-2 text-center lg:hidden text-sm sm:text-base" v-for="reper in rep" :key="reper._id">
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
  
    </div>
  </div>
</template>


<script>
import axios from 'axios';
import global from '../global';
import swal from 'sweetalert2';
import reper from '../models/reper';

export default {
  name: "ReperComponent",
  data() {
    return {
      rep: [],
      myOnlyRep: new reper("","","","",""),
      search:""
    };
  },

  methods:{
    getReper(){
      axios.get(global.url+'getall')
            .then(res =>{
              if(res.data.status=="ok"){
                this.rep = res.data.repers;
              }
            })
    },

    createButton(){
      this.$router.push('/agregar-cancion');
    },
    searchButton(){
      if(this.search ==""){
        swal.fire('El campo de busqueda no puede estar vacio')

      }else{
        this.$router.push('/buscar/'+this.search)
      }
    },

    deleteButton(title,id){
      console.log(id);
        swal.fire({
          title: '¿Estás seguro de eliminar '+title+"?" ,
          text: "No podrás recuperar la canción una vez eliminada",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Si, eliminar',
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {

            axios.delete(global.url+"delete/"+id)
                .then(res =>{
                  if(res.data.status =='ok'){
                    swal.fire({
                      position: 'top',
                      icon:'success',
                      title: 'La canción ha sido eliminada',
                      showConfirmButton: false,
                      timer: 1000
                      });
                    this.$router.push('/middlewareRedirect');
              
                  }else{
                      swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: 'hubo un error al tratar de eliminar',
                            showConfirmButton: false,
                            timer: 1500
                        });   
                  }
                })
                .catch(err =>{
                          swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: err,
                            showConfirmButton: false,
                            timer: 1500
                        });   
                });
 
          }else{
              swal.fire({
                position: 'center',
                icon:'info',
                title: 'UFFFF CASIII',
                showConfirmButton: false,
                timer: 1000
                }
            );
          }
        })
    },

    finishButton(id){
       axios.get(global.url+"getone/"+id)
          .then(res=>{
            if(res.data.status =="ok"){
              
              this.myOnlyRep= res.data.reper;
              console.log(this.myOnlyRep);

                swal.fire({
                  position:'top',
                  title: '¿Estás seguro de que quieres terminar '+this.myOnlyRep.title+'?',
                  icon: 'warning',
                  showCancelButton: true,
                  confirmButtonColor: '#3085d6',
                  cancelButtonColor: '#d33',
                  confirmButtonText: 'Si, Terminar',
                  cancelButtonText: 'Cancelar'
                }).then((result) => {          
                  if(result.isConfirmed){
                    this.myOnlyRep.end = new Date();
                    axios.put(global.url+"update/"+id, this.myOnlyRep)
                      .then(res =>{
                        if(res.data.status == 'ok'){
                          this.$router.push('/middlewareRedirect');
                        }
                      });
                  }   
                });
            }
          })
          .catch(err=>{
            console.log(err);
          });
  
    },
  },
   mounted(){
      this.getReper();
    },
};
</script>



<style>
.back {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>