<template>
  <div class="hello" vertical="center" align-center>
    <v-row justify="center">
      <!-- 申し訳程度のカレンダー -->
      <v-date-picker v-model="picker" color=blue></v-date-picker>
    </v-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {
  // めんどくさいからタイムゾーンは考えない
  picker = new Date().toISOString().substr(0, 10);
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
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
