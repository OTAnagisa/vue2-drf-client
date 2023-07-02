<template>
  <div>
    <div v-for="(post, key) in newsList" :key="key">
      <hr>
      <p>カテゴリ: {{ post.category_name }}</p>
      <p>タイトル: {{ post.title }}</p>
      <p>内容: {{ post.contents }}</p>
      <p>投稿日: {{ post.publication_on}}</p>
      <hr>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

interface NewsObj {
  title: string;
  contents: string;
  publication_on: string;
  category_name: string;
  user_name: string;
  category_id: string;
}

@Component
export default class HelloWorld extends Vue {
  public newsList: NewsObj[] = [];

  async mounted() {
    const result = await this.axios.get("http://127.0.0.1:8000/api/news/");
    this.newsList = result.data;
  }
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
