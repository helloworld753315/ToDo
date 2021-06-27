<template>
  <div class="container">
    <div class="text-right">
      <button class='btn btn-info ' @click='signOut'>Sign out</button>
    </div>
    <h1>{{ name }}さんのTODOリスト</h1>
    <input type="text" v-model="newToDo">
    <button class="btn btn-info" @click="addTodo">追加</button>
    <table class="todo">
      <tr v-for="(item,index) in todo_items" :key = "item.id" class="card-body">
        <td>{{item}}</td>
        <td class="button-el" ><button class="btn btn-danger" @click="deleteTodo(index)">削除</button></td>
      </tr>
    </table>
  </div>
</template>

<script>
import firebase from '@/firebase/firestore'
const db = firebase.firestore()

export default {
  name: 'Top',
  data () {
    return {
      user_id: firebase.auth().currentUser.uid,
      name: firebase.auth().currentUser.email,
      newToDo: '',
      todo_items: []
    }
  },
  created: function () {
    console.log(this.user_id)
    const docRef = db.collection('users').doc(this.user_id)

    docRef.get().then((doc) => {
      if (doc.exists) {
        console.log('Document data:', doc.data())
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!')
        db.collection('users').doc(this.user_id).set({ title: [], contents: [] })
      }
    }).catch((error) => {
      console.log('Error getting document:', error)
    })
    docRef
      .onSnapshot((doc) => {
        console.log('Current data: ', doc.get('contents'))
        this.todo_items = doc.get('contents')
      })
  },
  methods: {
    signOut: function () {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.push('/signin')
        })
    },
    addTodo: function () {
      // this.todo_items.push(this.newToDo)
      db.collection('users').doc(this.user_id).update({
        contents: firebase.firestore.FieldValue.arrayUnion(this.newToDo)
      })
      this.newToDo = ''
    },
    deleteTodo: function (id) {
      console.log(this.todo_items[id])
      db.collection('users').doc(this.user_id).update({
        contents: firebase.firestore.FieldValue.arrayRemove(this.todo_items[id])
      })
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
html {
  font-size: 62.5%;
}

@media screen and (max-width: 896px){
  h1{
    font-size: 1rem;

  }

}

h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.container h1{
  margin: 30px;
}

.container input{
  width: 200px;
  height: 38px;
}

.container .card{
  margin: 20px auto;
}

.container .todo{
  margin: 20px auto;
}

.container table{
  width: 80%;
}

.container table .button-el{
  width: 60px;
}

</style>
