<template>
  <v-app>
    <v-app-bar
      app
      color="#78c800"
      dark
    >
      <div class="d-flex align-center text-center">
        <h1>My Duolingo Words</h1>
      </div>

      <v-spacer></v-spacer>
    </v-app-bar>

    <v-content>
      <HelloWorld/>
    </v-content>
  </v-app>
</template>

<script>
import HelloWorld from './components/HelloWorld';

export default {
  name: 'App',

  components: {
    HelloWorld,
  },

  data: () => ({
    //
  }),
};
</script>

<style lang='scss' scoped>
body {
    font-family: din-round,sans-serif!important;

    .v-toolbar__content {
        max-width: 1200px;
        margin: 0 auto;
    }
}
</style>
