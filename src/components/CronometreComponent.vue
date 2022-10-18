<template>
  <div
    class=" home container mx-auto my-10 text-white p-7 md:p-10 rounded shadow-2xl"
  >
    <div class="flex justify-center cronometre">
      {{ checkCeroz(minutes) }} : {{ checkCeroz(seconds) }}
    </div>
    <div class="flex justify-center">
      <button
        class="px-5 py-3 text-white rounded bg-green-500 mx-5 hover:bg-green-400"
        @click="cronometre"
        v-if="(minutes === 0 && seconds === 0 && hours === 0) || !is_not_paused"
      >
        <font-awesome-icon icon="fa-play" class="text-xl cursor-pointer" />
      </button>
      <button
        class="px-5 py-3 text-white rounded bg-blue-500 mx-5 hover:bg-blue-400"
        @click="pause"
        v-if="minutes !== 0 || seconds !== 0 || hours !== 0"
      >
        <font-awesome-icon icon="fa-pause" class="text-xl cursor-pointer" />
      </button>
      <button
        class="px-5 py-3 text-white rounded bg-red-500 mx-5"
        @click="stop"
      >
        <font-awesome-icon icon="fa-stop" class="text-xl cursor-pointer" />
      </button>
    </div>
  </div>
</template>

<script>
import swal from "sweetalert2";
import mainServices from "@/services/main";

export default {
  name: "CronometreComponent",
  data() {
    return {
      seconds: 0,
      minutes: 0,
      hours: 0,
      interval: null,
      is_not_paused: true,
    };
  },
  created() {},
  methods: {
    cronometre() {
      if (this.is_not_paused) {
        this.start();
        this.interval = setInterval(this.start, 1000);
      }
      this.is_not_paused = true;
    },
    start() {
      if (this.is_not_paused) {
        this.seconds += 1;
        if (this.seconds > 59) {
          this.minutes++;
          this.seconds = 0;
        }
        if (this.minutes > 59) {
          this.hours++;
          this.minutes = 0;
        }
        if (this.hours > 24) this.hours = 0;
      }
    },
    checkCeroz(number) {
      if (number === 0) return "00";
      if (number > 0 && number < 10) return "0" + number;
      else return number;
    },
    pause() {
      this.is_not_paused = false;
    },
    stop() {
      swal
        .fire({
          title: "¿Quieres guardar tu progreso?",
          showCancelButton: true,
          confirmButtonText: "Guardar",
          cancelButtonText: "Cancelar",
          cancelButtonColor: "red",
          confirmButtonColor: "green",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.stadistic();
            swal.fire({
            title: `Felicidades has tocado piano por ${this.getTotalMinutes()} minutos`,
            width: 600,
            padding: '3em',
            color: '#716add',
            background: '#fff url(/images/trees.png)',
            backdrop: `
                rgba(0,0,123,0.4)
                url("/images/nyan-cat.gif")
                left top
                no-repeat
            `
            })
            clearInterval(this.interval);
            this.is_not_paused = false;
            localStorage.clear();
            this.seconds = 0;
            this.minutes = 0;
            this.hours = 0;
          }
        });
    },
    stadistic() {
      const obj = {
        minutes: this.getTotalMinutes(),
      };
      mainServices.stadistic(obj).then(() => {
        this.$vToastify.success({
          canPause: false,
          title: "Guardado",
          body: "Los datos han sido guardados",
        });
      });
    },
    getTotalMinutes() {
      return (this.hours * 60) + this.minutes
    },
  },
};
</script>

<style>
.cronometre {
  font-family: "Times New Roman", Times, serif;
  font-size: 10em;
}
</style>
