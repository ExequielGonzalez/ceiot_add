<template>
  <Menu />
</template>

<script>
import { defineComponent } from 'vue';
import Menu from 'layouts/MainLayout.vue';

export default defineComponent({
  name: 'App',
  components: {
    Menu,
  },
});
</script>
