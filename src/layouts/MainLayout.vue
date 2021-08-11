<template>
  <q-layout view="lHh Lpr lFf">
    <q-header bordered class="bg-white text-grey-10">
      <q-toolbar class="constrain">
        <q-btn
          class="large-screen-only q-mr-sm"
          size="16px"
          to="camera"
          dense
          icon="eva-camera-outline"
          flat
          round
        ></q-btn>
        <q-separator class="large-screen-only" spaced vertical />
        <q-toolbar-title class="text-grand-hotel"> Quasargram </q-toolbar-title>
        <q-btn
          class="large-screen-only"
          size="16px"
          to="/"
          dense
          icon="eva-home-outline"
          flat
          round
        ></q-btn>
      </q-toolbar>
    </q-header>

    <q-footer bordered class="bg-white small-screen-only">
      <q-tabs
        active-color="primary"
        indicator-color="transparent"
        class="text-grey-10"
      >
        <q-route-tab to="/" icon="eva-home-outline" label="Home" />
        <q-route-tab to="/camera" icon="eva-camera-outline" label="Camera" />
      </q-tabs>
    </q-footer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'MainLayout',

  components: {},

  setup() {
    const leftDrawerOpen = ref(false);

    return {
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
<style lang="scss">
.q-toolbar__title {
  @media (max-width: $breakpoint-xs-max) {
    text-align: center;
  }
  text-align: left;
  font-size: 30px;
}
.q-footer {
  .q-tab__icon {
    font-size: 30px;
  }
}
.q-toolbar {
  @media (min-width: $breakpoint-sm-min) {
    height: 72px;
  }
}
</style>
