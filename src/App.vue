<template>
  <v-app>
    <v-app-bar
      app
      color="#78c800"
      dark
    >
      <div class="d-flex align-center text-center">
        <h2>My Duolingo Words</h2>
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

<style lang='scss' >
body, #app {
    font-family: din-round,'Lato',sans-serif!important;
    background-color: #fff;

    .v-application {
        background-color: #fff;
        a {
            color: #78c800!important;
        }
    }
    

    .v-toolbar__content {
        max-width: 1000px;
        margin: 0 auto;
        padding: 0 30px;
    }
}
</style>
