<template>
  <div
    class="
      home container mx-auto my-10 text-white grid md:grid-cols-3 p-7 md:p-10 rounded shadow-2xl  ">
    <div class="md:col-span-2 px-3 md:px-14">
      <h2 class="text-3xl mb-7 font-bold text-center">
        Bienvenido al Repertorio del Programador
      </h2>
      <p class="text-justify text-lg">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex debitis
        optio architecto odit suscipit veniam voluptatem totam, ab saepe illum
        eaque placeat neque omnis, dolorum voluptatum cupiditate? Cupiditate,
        expedita beatae? Lorem ipsum dolor sit amet consectetur adipisicing
        elit. Accusantium eligendi, similique sed, nam eius perferendis
        cupiditate sit quo placeat amet at eum voluptate veniam cumque obcaecati
        nulla repellat ea quae! Lorem, ipsum dolor sit amet consectetur
        adipisicing elit. Voluptates assumenda dolorum eum inventore? Illo
        cumque id, qui eligendi reprehenderit ex voluptate eius ea dolorem,
        excepturi earum dignissimos similique, laudantium ut? Lorem ipsum dolor
        sit, amet consectetur adipisicing elit. Magni dolor, mollitia est
        recusandae beatae fugit animi ex excepturi voluptates dignissimos totam
        odit iure quae minima esse quibusdam, eveniet a cumque.
      </p>
    </div>
    <div class="px-2 sm:px-4 pt-5 md:px-0 md:pt-0">
      <h3 class="text-xl mb-5 font-bold">Mi ultimo video</h3>

      <iframe
        class="w-full rounded-lg"
        height="315"
        src="https://www.youtube.com/embed/e7ffFsgPYDc"
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeComponent",
};
</script>

<style >
.home {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>