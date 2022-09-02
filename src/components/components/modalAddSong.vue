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

          <button class="p-2 bg-green-500 text-white font-bold rounded-lg" @click.prevent="checkForm"> 
            <font-awesome-icon :icon="`fa-solid ${Object.keys(song_to_edit).length !== 0 ? 'fa-edit': 'fa-plus-circle'}`" class="mr-1"/>          
            {{ Object.keys(song_to_edit).length !== 0 ? 'Editar canción' : 'Agregar canción' }}
            </button>
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
    song_to_edit: {
      type: Object,
      required: true
    },
  },
  created() {    
    if (Object.keys(this.song_to_edit).length !== 0)
      this.song = {...this.song_to_edit};
  },
  methods: {
    closeModal(new_song, updated) {
      this.errors = []
      this.$emit('closeModal', new_song, updated);
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

      if (Object.keys(this.song_to_edit).length !== 0) {
        const form  = new FormData();
        form.append('uuid', this.song.uuid)
        form.append('name', this.song.name);
        form.append('author', this.song.author);
        form.append('status', this.song.status);
        form.append('url', this.song.url);
        service.editOne(this.song).then((response) => {
          if (response === undefined) {
            this.$vToastify.error({
              canPause: false,
              title: 'Error',
              body: 'Ha ocurrido un error al tratar de actualizar la canción',
            });
          } else {
            this.$vToastify.success({
              canPause: false,
              title: 'Actualizado',
              body: 'La canción ha sido actualizada con éxito',
            });      
            let updated = true;
            this.closeModal(this.song, updated);
          }
        });
      } else {
        const form  = new FormData();
        form.append('name', this.song.name);
        form.append('author', this.song.author);
        form.append('file', this.song.partiture);
        form.append('url', this.song.url);
        service.addOne(form).then((response) => {
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
            const updated = false;
            this.closeModal(response.new_song, updated);
          }
        });
      }
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