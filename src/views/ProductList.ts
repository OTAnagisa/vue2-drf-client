import { Component, Vue } from 'vue-property-decorator';

interface ProductObj {
  title: string;
  contents: string;
  publication_on: string;
  category_name: string;
  user_name: string;
  category_id: string;
}

@Component
export default class ProductList extends Vue {
  public productList: ProductObj[] = [];
  public search = '';
  public selectedProductCategory = '';
  public headers = [
        { text: 'No', value: 'no', width: "10%"},
        { text: 'カテゴリ', value: 'category_name', width: "15%"},
        { text: '商品名', value: 'name', width: "25%"},
        { text: '金額', value: 'amount', width: "10%"},
        { text: 'ブランド', value: 'brand_name', width: "20%"},
        { text: '出品業者', value: 'vendor_name', width: "20%"},
    ];

  public productCategoryList = [];
  
  async mounted() {
    const result = await this.axios.get("http://127.0.0.1:8000/api/product-category/");
    this.productCategoryList = result.data;
  }

  async seartch() {
    const params = {
        product_category_id: this.selectedProductCategory,
    }
    const result = await this.axios.get("http://127.0.0.1:8000/api/product/", {params: params});
    this.productList = result.data;
  }
}