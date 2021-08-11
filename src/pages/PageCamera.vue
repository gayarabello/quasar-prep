<template>
  <q-page class="constrain-more q-pa-md">
    <div class="camera-frame q-pa-md">
      <img
        class="full-width"
        src="https://images.unsplash.com/photo-1554792998-80c29ca41cfb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=916&q=80"
        alt=""
      />
    </div>

    <div class="text-center q-pa-md">
      <q-btn color="grey-10" icon="eva-camera" round size="lg" />

      <div class="justify-center q-ma-md">
        <q-input
          v-model="post.caption"
          class="col col-sm-6"
          label="caption"
          dense
        />
        <q-input
          v-model="post.location"
          class="col col-sm-6"
          label="location"
          dense
        >
          <template v-slot:append>
            <q-btn rounded dense flat icon="eva-navigation-2-outline" />
          </template>
        </q-input>
      </div>
      <div class="column justify-center q-mt-lg">
        <q-btn
          @click="publishPost()"
          unelevated
          rounded
          color="primary"
          icon="eva-navigation-2-outline"
        >
          Publish
        </q-btn>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { uid } from 'quasar';
import { Meta } from 'components/models';
/* import ExampleComponent from 'components/CompositionComponent.vue'; */
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'PageIndex',
  components: {},
  data() {
    return {
      post: {
        id: uid(),
        caption: '',
        location: '',
        photo: null,
        date: Date.now(),
      },
    };
  },
  methods: {
    publishPost() {
      console.log(this.post);
    },
  },
  setup() {
    const meta = ref<Meta>({
      totalCount: 1200,
    });
    return { meta };
  },
});
</script>
<style lang="scss" scoped>
.camera-frame {
  border: 2px solid $grey-10;
  border-radius: 10px;
}
</style>
