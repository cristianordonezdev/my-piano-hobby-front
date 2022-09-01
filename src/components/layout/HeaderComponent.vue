<template>
  <div class="container header mx-auto flex text-white justify-between items-center h-20 rounded-xl ">
    <div class="px-10 text-5xl"><router-link to="/" active-class=""><img src="@/assets/header.png" class="w-52 transform hover:scale-125 transition duration-500" alt="imf"></router-link></div>
    <div>
      <ul class="flex text-xl">
        <li class="px-5"><router-link to='/repertorio' active-class="active" class="xd py-1 px-2 block transition duration-400">Repertorio</router-link></li>
        <li class="px-10"><router-link to="/cronometro" active-class="active" class="xd py-1 block transition-all transition duration-400" >Cronometro</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "HeaderComponent",
  props: {
    msg: String,
  }
  
};
</script>

<style>
.header{
  background-color: rgba(90, 86, 86, 0.5);
}

.active{
  border-bottom: 2px solid;
    border-radius: 5px;

}

.xd:hover{
  /* border:1px solid white ; */
  transform: translate(0px,-5px);
  transform: scale(1.05);
}
</style>

