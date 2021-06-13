<template>
  <div class="container">
    <div class="text-right">
      <button class='btn btn-info ' @click='signOut'>Sign out</button>
    </div>
    <h1>ようこそ{{ name }}さん</h1>
    <h1>{{ msg }}</h1>
    <input type="text" v-model="newToDo">
    <button class="btn btn-info" >追加</button>
    <table>
      <tbody>
      </tbody>
    </table>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Top',
  data () {
    return {
      msg: 'あなたのやるべきことをまとめましょう',
      name: firebase.auth().currentUser.email
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
