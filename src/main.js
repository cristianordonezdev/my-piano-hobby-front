import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router';
import HomeComponent from './components/HomeComponent.vue';
import ReperComponent from './components/ReperComponent.vue';
import CreateReperComponent from './components/CreateReperComponent.vue';
import EditReperComponent from './components/EditReperComponent.vue';
import CronometreComponent from './components/CronometreComponent.vue';
import Buscar from './components/Buscar.vue';

import redirect from './components/redirect.vue';
import redirectSearch from './components/redirectSearch.vue';

import vuelidate from 'vuelidate';
import vueMoment from 'vue-moment';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faEdit,faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faEdit,faTrash)

Vue.component('font-awesome-icon', FontAwesomeIcon)


Vue.config.productionTip = false
Vue.use(VueRouter);
Vue.use(vuelidate);
Vue.use(vueMoment);

const routes =[
  {path:'/',component: HomeComponent},
  {path:'/repertorio',component: ReperComponent},
  {path:'/agregar-cancion',component:CreateReperComponent},
  {path:'/edita-cancion/:id',component: EditReperComponent},
  {path:'/cronometro',component:CronometreComponent},
  {path:'/middlewareRedirect',component:redirect},
  {path:'/middlewareRedirectSearch/:id',component:redirectSearch},

  {path:'/buscar/:id',component:Buscar}
]

const router = new VueRouter({
  routes,
  mode: 'history'
});

new Vue({
  router,

  render: h => h(App),
}).$mount('#app')
