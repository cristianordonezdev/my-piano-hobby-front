<template>
  <div class="back text-white container mx-auto my-10 px-10 pb-10 rounded-lg">
    <div class="flex items-center flex-wrap lg:justify-between">
      <div class="w-full lg:w-0">
        <h2 class="block text-4xl text-center mb-10"><strong class="font-black">Buscas:</strong> <span class="font-thin">{{search}}</span></h2>
      </div>
      <div class="w-full lg:w-1/4">
        <form action="">
            <input type="text" placeholder="Busca un Autor o Canción" class="block text-gray-500 w-full sm:w-3/4 mx-auto lg:w-full h-14 my-5 px-5 py-3 rounded bg-gray-200 text-lg" v-model="newSearch" required>
            <button v-on:click="searchButton"  class="mx-auto text-white font-bold bg-pink-500 hover:bg-pink-700 transition-all transform hover:scale-105 px-8 py-5 mb-10 flex rounded-xl">Buscar</button>
        </form>
      </div>
    </div>
   <table class="w-full text-center hidden lg:block" v-if="rep.length >=1">
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
        <td class="p-2 md:p-5  ">{{ reper.start }}</td>
        <td class="p-2 md:p-5  " v-if="reper.end"> {{}} </td>
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
    <div v-else class="text-5xl text-center hidden lg:block">No existe ninguna coincidencia con "{{search}}"</div>

    <div v-if="rep.length>=1">
      <div class="w-full grid grid-cols-2 text-center lg:hidden text-sm sm:text-base"  v-for="reper in rep" :key="reper._id" >
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
    <div v-else class="text-5xl text-center lg:hidden">No existe ninguna coincidencia con "{{search}}"</div>

  </div>
</template>



<script>
import axios from 'axios';
import global from '../global';
import swal from 'sweetalert2';

export default {
    name :"Buscar",
    data(){
        return {
            search: this.$route.params.id,
            rep:[],
            newSearch:""
        }
    },
    mounted(){
        this.getSearched();
    },

    methods:{
        getSearched(){
            axios.get(global.url+"search/"+this.search)
                .then(res=>{
                    if(res.data.status =='ok'){
                        this.rep = res.data.searched
                    }
                })
                .catch(err =>{
                    console.log(err);
                });
        },

        searchButton(){
            if(this.newSearch ==""){
                swal.fire('El campo de busqueda no puede estar vacio')
            }else{
                this.$router.push('/middlewareRedirectSearch/'+this.newSearch)
            }

    },
    }
    
}
</script>
