<template>
    <v-layout
        column
        justify-center
        align-center
    >
        <v-card v-if="userList" width="1200">
            <v-card-title>
                ユーザー一覧
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
                :items="userList"
                :items-per-page="10"
                :search="search"
                sort-by="id"
                :sort-desc="true"
                class="elevation-1"
            >
            </v-data-table>
        </v-card>
    </v-layout>
</template>
  
<script lang="ts">
import UserList from './UserList';
export default UserList;
</script>
