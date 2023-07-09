<template>
  <v-layout
      column
      justify-center
      align-center
  >
    <v-snackbar timeout="4000" v-model="showSnackbar" :top="true">
      {{ snackbarMessage }}
        <v-btn color="pink" text @click="showSnackbar = false">Close</v-btn>
    </v-snackbar>
    <v-row class="mx-6">
      <v-col class="col-auto">
        <v-card min-width="200" max-width="400" class="px-4 pb-4">
          <v-card-title>
              商品検索
          </v-card-title>
          <v-text-field
            class="mb-8"
            label="商品名"
            hide-details="auto"
            v-model="productName"
          />
          <v-autocomplete
            class="ma-0 my-2"
            :items="productCategoryList"
            item-text="name"
            item-value="id"
            v-model="searchProductCategory"
            label="商品カテゴリ"
          />
          <v-autocomplete
          class="ma-0 my-2"
            :items="brandList"
            item-text="name"
            item-value="id"
            v-model="searchBrand"
            label="ブランド"
          />
          <v-row justify="center">
            <v-btn @click="seartch"  color="blue" class="my-2">検索</v-btn>
          </v-row>
        </v-card>
      </v-col>
      <v-col>
        <v-card min-width="800" class="px-4 pb-4">
          <v-card-title>
              検索結果
              <v-spacer />
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="検索"
                  sigle-line
                />
                <v-row class="col-auto mx-2" justify="end">
                  <v-btn @click="openAddProductDaialog"  color="blue" class="my-2">商品追加</v-btn>
                </v-row>
          </v-card-title>
          <vue-loading 
            v-show="showLoading"
            type="spiningDubbles"
            color="#2196F3"
            :size="{ width: '80px', height: '80px' }"
          />
          <v-data-table
            v-show="!showLoading"
            :headers="headers"
            :items="productList"
            :items-per-page="5"
            :search="search"
            sort-by="publication_on"
            :sort-desc="true"
            class="elevation-1 mb-4"
          >
            <template #[`item.category_id`]="{item}">
              <v-select 
                v-model="item.category_id" 
                :items="productCategoryList" 
                solo flat hide-details 
                item-text="name"
                item-value="id"
                @change="editItem(item)"
              />
            </template>
            <template #[`item.name`]="{item}">
              <v-text-field 
                v-model="item.name" 
                solo hide-details flat
                @change="editItem(item)"
              />
            </template>
            <template #[`item.amount`]="{item}">
              <v-text-field 
                v-model="item.amount" 
                solo hide-details flat
                @change="editItem(item)"
              />
            </template>
            <template #[`item.brand_id`]="{item}">
              <v-select 
                v-model="item.brand_id" 
                :items="brandList" 
                solo flat hide-details 
                item-text="name"
                item-value="id"
                @change="editItem(item)"
              />
            </template>
            <template #[`item.delete`]="{item}">
              <v-icon small @click="deleteItem(item)">
                mdi-delete
              </v-icon>
            </template>
          </v-data-table>
          <v-row justify="end" class="ma-0">
            <v-btn @click="save"  color="blue" class="ma-0">変更を保存</v-btn>
          </v-row>
          <v-dialog
            v-model="showAddProductDialog"
            max-width="500"
          >
            <v-card>
              <v-card-title>
                商品追加
              </v-card-title>
              <v-card-text>
                <v-container>
                  <v-form ref="addProduct">
                    <v-row>
                      <v-text-field
                        class="mb-8"
                        label="商品名"
                        hide-details="auto"
                        v-model="addProduct.name"
                        max="50"
                        :rules="[rules.required, rules.maxLength]"
                      />
                    </v-row>
                    <v-row>
                      <v-text-field
                        type="number"
                        class="mb-8"
                        label="仕入れ価格"
                        hide-details="auto"
                        v-model="addProduct.amount"
                        :rules="[rules.required, rules.maxAmount]"
                      />
                    </v-row>
                    <v-row>
                      <v-autocomplete
                        class="ma-0 my-2"
                        :items="productCategoryList"
                        item-text="name"
                        item-value="id"
                        v-model="addProduct.category_id"
                        label="商品カテゴリ"
                        :rules="[rules.required]"
                      />
                    </v-row>
                    <v-row>
                      <v-autocomplete
                      class="ma-0 my-2"
                        :items="brandList"
                        item-text="name"
                        item-value="id"
                        v-model="addProduct.brand_id"
                        label="ブランド"
                        :rules="[rules.required]"
                      />
                    </v-row>
                  </v-form>
                </v-container>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn @click="closeAddProductDialog">閉じる</v-btn>
                <v-btn class="primary" @click="saveAddProduct">保存</v-btn>
                <v-spacer />
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-card>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script lang="ts">
import ProductList from './ProductList';
export default ProductList;
</script>

<style scoped>
</style>