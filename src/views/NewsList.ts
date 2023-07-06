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
  public search = '';
  public headers = [
    { text: 'カテゴリ', value: 'category_name', width: "10%"},
    { text: 'タイトル', value: 'title', width: "30%"},
    { text: '投稿日', value: 'publication_on', width: "10%"},
    { text: '内容', value: 'contents', width: "50%"},
  ];
  
  async mounted() {
    const result = await this.axios.get("http://127.0.0.1:8000/api/news-list/");
    this.newsList = result.data;
  }
}