import Vue from 'vue';
import VueRouter from 'vue-router';
import VueAxios from 'vue-axios';
import axios from 'axios';
import Vuetify from 'vuetify';
import App from './App.vue';

//////// EJECUTAR IMPORTACIONES  //////

Vue.use(VueRouter);
Vue.use(VueAxios, axios);
Vue.use(Vuetify)


////////// IMPORTACION DE COMPONENTE //////////

import DisplayItem from './components/DisplayItem.vue';

////////// GENERACION DE RUTAS  ////////

 const routes = [

    {
        name: 'DisplayItem',
        path: '/',
        component: DisplayItem
    }

];

//////////// INICIAR APP Y RUTAS  //////////

const router = new VueRouter({routes: routes });
new Vue(Vue.util.extend({ router }, App)).$mount('#app');






