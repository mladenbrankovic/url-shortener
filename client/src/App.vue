<template>
  <main id="app">
    <url-shortener></url-shortener>
  </main>
</template>

<script>
import UrlShortener from './components/UrlShortener.vue';

export default {
  name: 'App',
  components: {
    UrlShortener,
  },
};
</script>

<style lang="scss">
@import url('assets/scss/_reset.scss');

html,
body {
  height: 100%;
}

main {
  font-family: sans-serif;
  min-height: 100%;
  background: white;
  color: black;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
