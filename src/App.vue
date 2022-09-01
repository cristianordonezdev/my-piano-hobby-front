<template>
  <div id="app">
      <HeaderComponent class="mt-10"></HeaderComponent>
      <router-view></router-view>
      <FooterComponent></FooterComponent>
  </div>
</template>

<script>
import HeaderComponent from '@/components/layout/HeaderComponent.vue';
import FooterComponent from '@/components/layout/FooterComponent.vue';

export default {
  name: 'App',
  components: {
    HeaderComponent,
    FooterComponent
  }
}
</script>

<style>
@import 'css/tailwind.css';

body{
    background-image: url("assets/background.jpg");
    background-position-x: -200px;
    background-position-y: -200px;
    background-attachment: fixed;
}
</style>
