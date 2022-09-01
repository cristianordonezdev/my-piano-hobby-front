<template>
  <div class="flex justify-center items-center" v-if="show">
    <div class="background-black h-full top-0 left-0 w-full fixed" @click="closeModal"></div>
    <div class="bg-gray-200 top-36 rounded-xl text-black fixed" v-if="show">
      <font-awesome-icon icon="fa-times-circle" class="text-black float-right p-1 text-2xl cursor-pointer transition-all transform hover:scale-125" @click="closeModal"/>      

      <div class="w-2/3 mx-auto py-10">
        <form class="form-add-song flex flex-col">
          <ul v-if="errors.length >= 1">
            <li class="m-2" v-for="(e, index) in errors" :key="index">
              <span class="bg-red-500 p-1 font-bold text-white w-auto rounded">{{e}}</span>
            </li>
          </ul>
          <input type="text" placeholder="Nombre de la canción" v-model="song.name">
          <input type="text" placeholder="Nombre del autor" v-model="song.author">
          <input type="url" placeholder="Youtube Link" v-model="song.url">
          <input type="file" placehol="Partiture" accept="application/pdf" @change="hasUploaded">

          <button class="p-2 bg-green-500 text-white font-bold rounded-lg" @click.prevent="checkForm"> Agregar cancion</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import service from '@/services/main';

export default {
  name: 'modal',
  data() {
    return {
      song: {
        name: null,
        author: null,
        partiture: null,
        url: null
      },
      errors: []
    }
  },
  props: {
    show: {
     type: Boolean,
     dafault: true
    },
  },
  methods: {
    closeModal(new_song) {
      this.errors = []
      this.$emit('closeModal', new_song);
      this.song = {
        name: null,
        author: null,
        partiture: null,
        url: null
      } 
    },
    hasUploaded(file) {
      this.song.partiture = file.target.files[0]
    },
    onSubmit() {
      service.addOne(this.song).then((response) => {
        if (response === undefined) {
          this.$vToastify.error({
            canPause: false,
            title: 'Error',
            body: 'Ha ocurrido un error al tratar de guardar la canción',
          });
        } else {
          this.$vToastify.success({
            canPause: false,
            title: 'Guardado',
            body: 'La canción ha sido guardada con éxito',
          });      
          this.closeModal(response.new_song);
        }
      })
    },
    checkForm() {
      this.errors = []
      if (this.song.name && this.song.author && this.song.url) {
        this.onSubmit()
      } else {
        if (!this.song.name) {
          this.errors.push('Es requerido el nombre')
        } if (!this.song.author) {
          this.errors.push('Es requerido el autor')
        } if (!this.song.url) {
          this.errors.push('Es requerida la url')
        }
      }
    }
  }
}
</script>

<style>
.background-black {
  background-color: rgba(0, 0, 0, 0.555);
}
.form-add-song input[type="text"], input[type="url"], input[type="file"]{
  display: block;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 10px;
  margin: 1em;
}
</style>