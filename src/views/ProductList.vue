<template>
  <v-layout
      column
      justify-center
      align-center
  >
    <v-row class="mx-6">
      <v-col>
        <v-card min-width="200" class="px-4 pb-4">
          <v-card-title>
              商品検索
          </v-card-title>
          <v-text-field
            label="商品名"
            hide-details="auto"
          />
          <v-select
            :items="productCategoryList"
            item-text="name"
            item-value="id"
            v-model="selectedProductCategory"
            label="商品カテゴリ"
          />
          <v-btn @click="seartch"  color="blue">検索</v-btn>
        </v-card>
      </v-col>
      <v-col>
        <v-card min-width="800">
          <v-card-title>
              検索結果
              <v-spacer />
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="検索"
                    sigle-line
                />
          </v-card-title>
          <v-data-table
              :headers="headers"
              :items="productList"
              :items-per-page="5"
              :search="search"
              sort-by="publication_on"
              :sort-desc="true"
              class="elevation-1"
          >
          </v-data-table>
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