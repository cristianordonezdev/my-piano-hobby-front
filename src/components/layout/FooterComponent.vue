<template>
  <div class="footer grid grid-cols-2 container mx-auto text-white">
    <div class="p-5 sep">
      <h2 class="text-xl font-bold">Contacto</h2>
      <ul class="text-left">
        <li>@lazy_cris</li>
      </ul>
    </div>

    <div class="p-5">
      <h2 class="text-xl font-bold">Clases Proximamente...</h2>
    </div>
  </div>
</template>

<script>
export default {
  name: "FooterComponent",
};
</script>

<style>
.footer {
  background-color: rgba(90, 86, 86, 0.5);
}
.sep {
  border-right: 1px solid gray;
  border-color: gray;
}
</style>