import firebase from 'firebase'

// Initialize Firebase
if (!firebase.apps.length) {
  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: 'AIzaSyBGuDQnMoJkWrgXHLyZOd4y57vfqWKVho0',
    authDomain: 'todo-e3407.firebaseapp.com',
    projectId: 'todo-e3407',
    storageBucket: 'todo-e3407.appspot.com',
    messagingSenderId: '50675655522',
    appId: '1:50675655522:web:f6197dea7e441bd80f023b'
  }
  firebase.initializeApp(firebaseConfig)
}

export default firebase
