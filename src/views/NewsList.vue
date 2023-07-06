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
          <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              label="検索"
              sigle-line
            />
      </v-card-title>
      <v-data-table
          :headers="headers"
          :items="newsList"
          :items-per-page="5"
          :search="search"
          sort-by="publication_on"
          :sort-desc="true"
          class="elevation-1"
      >
      </v-data-table>
    </v-card>
  </v-layout>
</template>

<script lang="ts">
import NewsList from './NewsList';
export default NewsList;
</script>

<style scoped>
</style>
