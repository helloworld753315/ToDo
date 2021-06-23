<template>
  <div class="container">
    <div class="text-right">
      <button class='btn btn-info ' @click='signOut'>Sign out</button>
    </div>
    <h1>ようこそ{{ name }}さん</h1>
    <input type="text" v-model="newToDo">
    <button class="btn btn-info" @click="addTodo">追加</button>
    <table class="todo">
      <tr v-for="(item,index) in todo_items" :key = "item.id" class="card-body">
        <td>{{index}} : {{item}}</td>
        <td class="button-el"><button class="btn btn-danger" @click="deleteTodo(index)">削除</button></td>
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
      msg: 'あなたのやるべきことをまとめましょう',
      name: firebase.auth().currentUser.email,
      newToDo: '',
      todo_items: []
    }
  },
  created: function () {
    db.collection('users').doc(this.name)
      .onSnapshot((doc) => {
        console.log('Current data: ', doc.get('contents'))
        // console.log('test:', doc.get('contents[1]'))
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
      console.log(firebase.auth().currentUser.email)
      db.collection('users').doc(this.name).update({
        contents: firebase.firestore.FieldValue.arrayUnion(this.newToDo)
      })
      this.newToDo = ''
    },
    deleteTodo: function (id) {
      console.log(this.todo_items[id])
      db.collection('users').doc(this.name).update({
        contents: firebase.firestore.FieldValue.arrayRemove(this.todo_items[id])
      })
    }
  }
}
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped>
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
  width: 800px;
}

.container table .button-el{
  width: 60px;
}

</style>
