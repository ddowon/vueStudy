<template>
  <div id="app">
    <h1>오늘의 할 일</h1>
    <TodoInput/>
    <TodoStatus/>
    <TodoSearch/>
  </div>
</template>

<script>
import TodoInput from '@/components/TodoInput.vue'
import TodoSearch from '@/components/TodoSearch.vue'
import TodoStatus from '@/components/TodoStatus.vue'

export default {
  components: {
    TodoInput, TodoStatus, TodoSearch
  }
}
</script>

<style>
/* RESET DEFAULT ELEMENTS STYLE */
body,section,div,dl,dt,dd,ul,ol,li,h1,h2,h3,h4,h5,h6,pre,code,form,fieldset,legend,textarea,p,blockquote,th,td,input,select,textarea,button {margin:0;padding:0}
dl,ul,ol,menu,li {list-style:none}
img,fieldset,iframe {border:0 none}
img {vertical-align:top}
input,select,textarea,button {vertical-align:middle}
a {text-decoration:none}
a:hover {text-decoration:underline}
a:active {background-color:transparent}
article,aside,details,figcaption,figure,footer,header,hgroup,nav,section,main {display:block}
blockquote,q {quotes:none}
blockquote:before,blockquote:after,q:before,q:after {content:'';content:none}

html, body {width:100%;min-width:1340px;background:#f9f9f9}
.blind {display:block;overflow:hidden;visibility:hidden;text-indent:-9999px;font-size:0;height:0}

#app {
  margin-top: 60px;
}
</style>
