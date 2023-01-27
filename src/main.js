import Vue from 'vue'
import App from './App.vue'
import Vuex from 'vuex'
import VueRouter from 'vue-router'
import VueMaterial from 'vue-material'

import List from './components/List.vue';
import Login from "./components/Login.vue";

import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'

Vue.use(VueMaterial)

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {path: "/", name:"List", component: List, meta:{requiresAuth: true} },
        // {path: "/list", name:"List", component: List, meta:{requiresAuth: true} },
        {path: "/login", name:"Login", component: Login },
        
    ]
})

router.beforeEach((to, from, next) => {
  if(to.matched.some((record) => record.meta.requiresAuth)) {
    if(!localStorage.getItem('id')) {
      next({ name: 'Login'})
    } else {
      next();
    }
  } else {
    next()
  }
})

const listModule = {
  state: {
    list: []
  },
  mutations: { 
    addList(state, payload) {
      state.list.push(payload);
    },
    updateList(state, paylad) {
      const foundIndex = state.list.findIndex(({id}) => id === paylad.id);

      if (foundIndex > -1) {
        state.list[foundIndex] = paylad
      }
    },
    deleteList(state, payload) {
      const foundIndex = state.list.findIndex(({id}) => id === payload.id);
      if (foundIndex > -1) {
        state.list.splice(foundIndex,1)
      }
    },
   },
  actions: { 
    addList(context, data) {
      context.commit('addList', data)
    },
    updateList(context, data) {
      context.commit('updateList',data)
    },
    deleteList(context, data) {
      context.commit('deleteList',data)
    },
   },
  getters: {     
    list: state => state.list
  }
}

const userModule = {
  state: {
    user: [{
      email: "",
      password: ""
    }],
  },
  getters: {
    user: state => state.user,
  },
  mutations: {    
    addUser(state,payload) {
      state.user.push(payload)
    },
  },
  actions: {
    addUser(context, data) {
      context.commit('addUser',data);
    }
  }
}

const store = new Vuex.Store({
  modules: { listModule, userModule },
  
})

new Vue({
  el: "#app",
  store: store,
  router: router,
  render: h => h(App),
}).$mount('#app')
