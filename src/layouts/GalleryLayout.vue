<template>
  <q-layout view="hHh lpR fFf">
    <q-page-container>
      <router-view />

      <q-page-sticky position="top-left" :offset="[25, 25]">
        <div class="q-gutter-sm">
          <q-btn color="primary" no-caps to="/" class="action-button">
            <q-icon left name="arrow_back_ios_new" />
            <div>Start</div>
          </q-btn>
        </div>
      </q-page-sticky>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from "vue";

export default defineComponent({
  name: "GalleryLayout",

  components: {},
  computed: {},
  setup() {},
});
</script>
