<template>
  <v-layout
      column
      justify-center
      align-center
  >
      <v-card v-if="newsList" width="1200">
          <v-card-title>
              News 一覧
              <v-spacer />
          </v-card-title>
          <v-data-table
              :headers="headers"
              :items="newsList"
              :items-per-page="10"
              sort-by="id"
              :sort-desc="true"
              class="elevation-1"
          >
          </v-data-table>
      </v-card>
  </v-layout>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

interface NewsObj {
  title: string;
  contents: string;
  publication_on: string;
  category_name: string;
  user_name: string;
  category_id: string;
}

@Component
export default class NewsList extends Vue {
  public newsList: NewsObj[] = [];

  public headers = [
        { text: 'カテゴリ', value: 'category_name' },
        { text: 'タイトル', value: 'title' },
        { text: '投稿日', value: 'publication_on' },
        { text: '内容', value: 'contents' },
    ];
  async mounted() {
    const result = await this.axios.get("http://127.0.0.1:8000/api/news-list/");
    this.newsList = result.data;
  }
}
</script>

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
