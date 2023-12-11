import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useStore } from 'vuex'
import {IS_USER_AUTHENTICATED, GET_USERNAME } from "../store/storeconstants";
import loginView from "../components/Login.vue";
import axios from 'axios'
import VueAxios from 'vue-axios'
const routes = [
  {
    path: '/',
    name: 'root',
    component: HomeView,
    props: true,
  },
  {
    path: '/anlagen',
    name: 'anlagen',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/Anlagen/Anlagen.vue')
  },
  {
    path: '/register',
    name: 'register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/Register.vue')
  },
  {
    path: '/anlage/raum/details/:id/',
    name: 'raumdetails',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../components/Rooms/RoomDetails.vue'),
    props: true,
  },
  {
    path: '/anlagen/details/:id/',
    name: 'anlagendetails',
    component: () => import(/* webpackChunkName: "about" */ '../components/Anlagen/AnlagenDetails.vue'),
    props: true,
  },
  {
    path: '/anlagen/details/:id/edit',
    name: 'EditAnlage',
    component: () => import(/* webpackChunkName: "about" */ '../components/Anlagen/EditAnlage.vue'),
    props: true,
  },
  {
    path: '/anlagen/neu',
    name: 'createanlage',
    component: () => import(/* webpackChunkName: "about" */ '../components/Anlagen/CreateAnlage.vue'),
    // props: true,
  },
  {
    path: '/anlagen/details/:id/create-room',
    name: 'createRoom',
    component: () => import(/* webpackChunkName: "about" */ '../components/Rooms/CreateRoom.vue'),
    props: true,
  },
  {
    path: '/einstellungen/:userid',
    name: 'Einstellungen',
    component: () => import(/* webpackChunkName: "about" */ '../components/User/Einstellungen.vue'),
    props: true,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from) => {
  const token = $cookies.get("token");
  const id = $cookies.get("id");
  const user = {"id": id, "token": token}
  // console.log("TEST",token, id, to.name, user);
  if (to.name != 'register' && to.name != 'login' && to.name != 'root') {
    axios.post("http://localhost:3001/users/auth", user)
        .then(response => {
          if ( response.message != 200 )
          {
            // redirect the user to the login page
            return {name: 'root'}
          }
        })

  }
})


export default router
