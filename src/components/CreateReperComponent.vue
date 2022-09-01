<template src="./CreateReper.html"> </template>

<script>
import reper from '../models/reper';
import axios from 'axios';
import global from '../global';
import swal from 'sweetalert2';

export default {
    name: 'CreateReperComponent',
    data(){
        return{
            newReper : new reper("","",null,null,""),
            submitted : false
        }
    },
    methods:{
        onSubmit(){
            this.submitted = true;
            console.log(this.newReper);

            this.$v.$touch();
            if(this.$v.$invalid){
                this.submitted = false;
                return false;
            }else{

                axios.post(global.url+"save",this.newReper)
                    .then(res =>{
                        if(res.data.status =="ok"){
                            swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'Canción agregada',
                                showConfirmButton: false,
                                timer: 1500
                            });

                            this.$router.push('/repertorio');
                        }else{
                            swal.fire({
                                position: 'center',
                                icon: 'error',
                                title: 'Error al guardar',
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                      
                    }) 
                    .catch(err =>{
                        swal.fire({
                            position: 'center',
                            icon: 'error',
                            title: err,
                            showConfirmButton: false,
                            timer: 1500
                        });                    })

            }
        },

        getNewLink(link){
            var split = link.split('watch?v=');
            var newLink= 'https://www.youtube.com/embed/'+split[1];
            return newLink;
        }
    },

}
</script>

<style>
.back {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>

