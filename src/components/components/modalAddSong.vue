<template>
  <div class="flex justify-center items-center" v-if="show">
    <div class="background-black h-full top-0 left-0 w-full fixed" @click="closeModal"></div>
    <div class="bg-gray-200 top-36 rounded-xl text-black fixed modal-white" v-if="show">
      <font-awesome-icon icon="fa-times-circle" class="text-black float-right p-1 text-2xl cursor-pointer transition-all transform hover:scale-125" @click="closeModal"/>      

      <div class="w-2/3 mx-auto py-10">
        <form class="form-add-song flex flex-wrap justify-between">
          <div class="w-1/2">
            <ul v-if="errors.length >= 1">
              <li class="m-2" v-for="(e, index) in errors" :key="index">
                <span class="bg-red-500 p-1 font-bold text-white w-auto rounded">{{e}}</span>
              </li>
            </ul>
            
            <div class="">
              <span>Nombre de la canción</span>
              <input type="text" placeholder="Nombre de la canción" v-model="song.name">
            </div>

            <div class="mt-5">
              <span>Autor de la canción</span>
              <input type="text" placeholder="Nombre del autor" v-model="song.author">
            </div>

            <div class="mt-5">
              <span>Url de Youtube</span>
              <input type="url" placeholder="Youtube Link" v-model="song.url">
            </div>

            <div class="mt-5">
              <span>Partitura</span>
              <input type="file" placehol="Partiture" accept="application/pdf" @change="hasUploaded">
            </div>
          </div>

          <div class="w-1/2 flex flex-col	items-end ">
            <div class="">
              <span>Inicio de aprender</span>
              <datepicker class="w-full block"></datepicker>
            </div>

            <div class="mt-5">
              <span>Fin de aprender</span>
              <datepicker class="w-full block"></datepicker>
            </div>

            <div class="mt-5">
              <span>Estatus</span>
              <v-select :options="options" class="style-chooser"></v-select>
            </div>
          </div>



          <button class="p-2 bg-green-500 text-white font-bold rounded-lg w-full" @click.prevent="checkForm"> 
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
import Datepicker from 'vuejs-datepicker';

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
      errors: [],
      options: [
        'foo',
        'bar',
        'baz'
      ]
    }
  },
  components: {
    Datepicker
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
.modal-white {
  width: 700px;
}
.background-black {
  background-color: rgba(0, 0, 0, 0.555);
}
.form-add-song input[type="text"], input[type="url"], input[type="file"] {
  width: 200px;
  display: block;
  border: 1px solid #ccc;
  padding: 10px;
  border-radius: 10px;
  margin: 0.2em 0 0 0;
}
.form-add-song span {
  color: #444;
}
.style-chooser .vs__search::placeholder,
.style-chooser .vs__dropdown-toggle {
  background: #ffffff;
  width: 200px;
  border-radius: 10px;
  color: #394066;
  padding: 6px;
  margin: 0.2em 0 0 0;
}
</style>