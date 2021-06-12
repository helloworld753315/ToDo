// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import firebase from 'firebase'

Vue.config.productionTip = false

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyBGuDQnMoJkWrgXHLyZOd4y57vfqWKVho0',
  authDomain: 'todo-e3407.firebaseapp.com',
  projectId: 'todo-e3407',
  storageBucket: 'todo-e3407.appspot.com',
  messagingSenderId: '50675655522',
  appId: '1:50675655522:web:f6197dea7e441bd80f023b'
}
// Initialize Firebase
firebase.initializeApp(firebaseConfig)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
