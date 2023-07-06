
<template>
    <div>
      <v-app-bar color="grey lighten-5" class="mb-8">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>Vue2 DRF</v-toolbar-title>
        <v-spacer></v-spacer>
      </v-app-bar>
      <v-navigation-drawer v-model="drawer" absolute temporary>
        <v-list nav dense class="mt-4">
          <v-list-item-group>
            <v-list-item v-for="menuItem in menuItems" :key=menuItem.key :to="menuItem.link">
              <v-list-item-icon>
                <v-icon>{{ menuItem.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ menuItem.name }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-navigation-drawer>
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class AppBar extends Vue {
  public drawer = false;
  public menuItems = [
    {
      icon: "mdi-home",
      name: "Home",
      key: "home",
      link: "/",
    },
    {
      icon: "mdi-bulletin-board",
      name: "News",
      key: "newsList",
      link: "/NewsList",
    },
    {
      icon: "mdi-account",
      name: "User",
      key: "userList",
      link: "/UserList",
    },
  ]
}
</script>
  