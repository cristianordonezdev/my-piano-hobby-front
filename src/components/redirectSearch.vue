<template>
    <div><h2 class="text-white text-5xl">REDIRIGIENDO</h2></div>
</template>
<script>
export default {
    name:'redirectSearch',
    data(){
        return{
            id : this.$route.params.id
        }
    },
    mounted(){
        this.$router.push("/buscar/"+this.id);
    }

}
</script>