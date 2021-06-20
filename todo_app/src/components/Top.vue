<template>
  <div class="container">
    <div class="text-right">
      <button class='btn btn-info ' @click='signOut'>Sign out</button>
    </div>
    <h1>ようこそ{{ name }}さん</h1>
    <h1>{{ msg }}</h1>
    <input type="text" v-model="newToDo">
    <button class="btn btn-info" @click="addTodo">追加</button>
    <ul class="card">
      <li v-for="item in todo_items" :key = "item.id" class="card-body">
        {{item}}
      </li>
    </ul>
  </div>
</template>

<script>
import firebase from 'firebase'
// const db = firebase.firestore()

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
      this.todo_items.push(this.newToDo)
    /*
      db.collection('users').doc(this.name).update({
        contents: db.FieldValue.arrayUnion('hoge')
      })
    */
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

</style>
