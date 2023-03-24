<script>
  // import min from 'winbox/src/img/min.svg'
  // import max from 'winbox/src/img/max.svg'
  // import close from 'winbox/src/img/close.svg'
  // import full from 'winbox/src/img/full.svg'
  // import restore from 'winbox/src/img/full.svg'
  // import exit from 'winbox/src/img/exit.svg'
</script>

<template>
  <div>
    <NuxtPage />
  </div>
</template>

<style lang="less">
@import 'winbox/src/css/winbox.less';
@import 'winbox/src/css/themes/modern.less';
// See https://github.com/wobsoriano/vue-winbox/blob/master/playground/src/App.vue
* {
  margin: 0;
  padding: 0;
}

html, body {
  height: 100vh;
  font-family: -apple-system, BlinkMacSystemFont, Helvetica, Arial, "Open Sans", OpenSans, Roboto, Segoe UI, sans-serif;
  background: linear-gradient(135deg, #0d1117, #131820);
}
</style>