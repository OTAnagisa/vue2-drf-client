import { Component, Vue, Watch} from 'vue-property-decorator';
import { AxiosResponse } from "axios";
import {HttpStatusCode} from "@/common/const"
import { VueLoading } from 'vue-loading-template'

interface ProductObj {
    id: string;
    no: string;
    category_name: string;
    category_id: string;
    name: string;
    amount: number;
    brand_name: string;
    brand_id: string;
}

interface addProductObj {
    category_id: string;
    name: string;
    amount: number;
    brand_id: string;
}

@Component({
    components: {
        VueLoading,
    }
})
export default class ProductList extends Vue {
    // グリッド上での検索用
    public search = '';
    // グリッドヘッダ
    public headers = [
        { text: 'No', value: 'no', width: "10%"},
        { text: 'カテゴリ', value: 'category_id', width: "15%"},
        { text: '商品名', value: 'name', width: "30%"},
        { text: '仕入れ価格', value: 'amount', width: "15%"},
        { text: 'ブランド', value: 'brand_id', width: "20%"},
        { text: "削除", value: "delete", sortable: false, width: "10%"}
    ];
    public addProduct: addProductObj = {
        category_id: "",
        name: "",
        amount: 0,
        brand_id: "",
    };
    public rules = {
        required: ((value: string | number) => !!value || '入力してください'),
        maxLength: ((value: string)  => (value && value.length <= 100) || '100文字以下で入力してください'),
        maxAmount: ((value: number)  => (value <= 2147483647) || '2,147,483,647以下で入力してください'),
      }
    public showAddProductDialog = false;
    // スナックバーに表示するメッセージ
    public snackbarMessage = '';
    public showSnackbar = false;
    
    public showLoading = false;
    // 検索項目
    // 商品名
    public productName = '';
    // 商品カテゴリ
    public searchProductCategory = '';
    // ブランド
    public searchBrand = '';
    
    // 商品カテゴリリスト
    public productCategoryList = [];
    // ブランドリスト
    public brandList = [];
    // 商品検索結果
    public productList: ProductObj[] = [];
    // 変更のあった商品 {商品ID: 商品データ} の辞書
    public changedProductDict: {[productId: string]: ProductObj} = {};
    public deleteProductIdList: string[] = [];
    // 変更が存在するか
    public isEdited = false;
    
    
    async mounted() {
        this.isEdited = false;
        const productCategoryPromise = this.axios.get("http://127.0.0.1:8000/api/product-category/");
        const brandPromise = this.axios.get("http://127.0.0.1:8000/api/brand/");
        // 同期
        await Promise.all([productCategoryPromise, brandPromise]).then(
            ([responseProductCategory, responseBranc]) =>{
                this.productCategoryList = Object.assign(responseProductCategory.data);
                this.brandList = Object.assign(responseBranc.data);
            }
        );
    }

    async seartch() {
        if (this.isEdited) {
            const response = await confirm("変更内容を破棄して、検索を実行してよろしいですが？");
            if (!response) return;
        }
        this.showLoading = true;
        this.isEdited = false;
        const params = {
            product_category_id: this.searchProductCategory,
            brand_id: this.searchBrand,
            product_name: this.productName,
        }
        const result = await this.axios.get("http://127.0.0.1:8000/api/product/", {params: params});
        this.productList = result.data;
        this.showLoading = false;
    }

    // 商品編集時イベント
    editItem(productData: ProductObj) {
        this.isEdited = true;
        this.changedProductDict[productData.id] = productData;
    }

    // 商品削除ボタンイベント
    async deleteItem(productData: ProductObj) {
        // 削除確認
        const confirmMessage = (
            `${productData.no}: ${productData.name}\nを削除してよろしいですか？`
        )

        const response = await confirm(confirmMessage);
        if (!response) return;
        this.isEdited = true;
        // 削除
        const index = this.productList.indexOf(productData);
        this.productList.splice(index, 1);
        // 削除したIDを格納
        this.deleteProductIdList.push(productData.id);
    }

    async save() {
        if (!this.isEdited) {
            this.showAlert("変更が存在しません");
            return;
        }
        this.showLoading = true;
        const params = {
            changed_product_dict: this.changedProductDict,
            delete_product_id_list: this.deleteProductIdList,
        }
        const result: AxiosResponse = await this.axios.put("http://127.0.0.1:8000/api/product/", params);
        // TODO: エラー時に詳細なメッセージを表示する
        if (result.status === HttpStatusCode.OK) {
            this.showAlert("変更を保存しました。");

        } else {
            this.showAlert("エラーにより保存されませんでした。");
        }
        this.isEdited = false;
        this.showLoading = false;
        // 検索を再実行
        this.seartch();
    }
    showAlert(message: string) {
        this.snackbarMessage = message;
        this.showSnackbar = true;
    }

    @Watch("showSnackbar")
    switchedShowSnackbar(newVal: boolean, oldVal: boolean) {
        // 表示フラグがfalseになった際にメッセージも初期化
        if (!newVal) this.snackbarMessage = "";
    }

    closeAddProductDialog() {
        this.showAddProductDialog = false;
        this.addProduct = {
            category_id: "",
            name: "",
            amount: 0,
            brand_id: "",
        };
        // バリデーション初期化
        (this.$refs as any).form.reset();
    }
    openAddProductDaialog() {
        this.showAddProductDialog = true;
        // TODO: どうにかしたい
        this.$nextTick(() => {
            (this.$refs as any).addProduct.resetValidation();
        });
    }

    async saveAddProduct() {
        // TODO: どうにかしたい
        if (!(this.$refs as any).addProduct.validate()) {
            this.showAlert("入力値にエラーがあります。");
            return;
        }
        this.showLoading = true;
        const result: AxiosResponse = await this.axios.post("http://127.0.0.1:8000/api/product/", this.addProduct);
        // TODO: エラー時に詳細なメッセージを表示する
        if (result.status === HttpStatusCode.OK) {
            this.showAlert("保存しました。");

        } else {
            this.showAlert("エラーにより保存されませんでした。");
        }
        // 初期化
        this.showLoading = false;
        // ダイアログを閉じる
        this.closeAddProductDialog();
        // 検索を再実行
        this.seartch();
    }
}