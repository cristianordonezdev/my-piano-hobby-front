<template src="./CreateReper.html"> </template>

<script>
import reper from '../models/reper';
import axios from 'axios';
import {required} from 'vuelidate/lib/validators';
import global from '../global';
import swal from 'sweetalert2';

export default {
    name: 'EditReperComponent',
    data(){
        return{
            newReper : new reper("","",null,null,""),
            submitted : false,
            id: this.$route.params.id
        }
    },
    methods:{
        onSubmit(){
            this.submitted = true;
//            console.log(this.newReper);

            this.$v.$touch();
            if(this.$v.$invalid){
                this.submitted = false;
                return false;
            }else{

                axios.put(global.url+"update/"+this.id,this.newReper)
                    .then(res =>{
                        if(res.data.status =="ok"){
                            swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'Canción actualizada',
                                showConfirmButton: false,
                                timer: 1500
                            });

                            this.$router.push('/repertorio');
                        }else{
                            swal.fire({
                                position: 'center',
                                icon: 'error',
                                title: 'Error al actualizar',
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
        },

        getReper(){
            axios.get(global.url+"getone/"+this.id)
                .then(res =>{
                    if(res.data.status =='ok'){
                        this.newReper = res.data.reper;
                    }
                })
                .catch(err=>{
                    console.log(err);
                })
        }
    },

    mounted(){
        this.getReper();
    },

    validations:{
        newReper:{
            title: {required},
            author : {required}
        }
    }
}
</script>

<style>
.back {
  background-color: rgba(0, 0, 0, 0.5);
}
</style>

