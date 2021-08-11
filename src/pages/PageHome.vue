<template>
  <q-page class="constrain q-pa-md">
    <div class="row q-col-gutter-lg">
      <div class="col-12 col-md-8">
        <q-card
          v-for="post in posts"
          :key="post.id"
          class="card-post q-mb-md"
          flat
          bordered
        >
          <q-item>
            <q-item-section avatar>
              <q-avatar>
                <img :src="profilePic" />
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label>Gaya Rabello</q-item-label>
              <q-item-label caption> {{ post.location }} </q-item-label>
            </q-item-section>
          </q-item>
          <q-separator />
          <q-img :src="post.imageUrl"></q-img>
          <q-card-section>
            <div class="text-h6">{{ post.caption }}</div>
            <div class="text-caption text-grey">{{ niceDate(post.date) }}</div>
          </q-card-section>
        </q-card>
      </div>
      <div class="col-4 large-screen-only">
        <q-item class="fixed">
          <q-item-section avatar>
            <q-avatar>
              <img :src="profilePic" />
            </q-avatar>
          </q-item-section>

          <q-item-section>
            <q-item-label>Gaya Rabello</q-item-label>
            <q-item-label caption> @gayarabello </q-item-label>
          </q-item-section>
        </q-item>
      </div>
    </div>
  </q-page>
</template>

<script lang="ts">
import { date } from 'quasar';
import { Meta } from 'components/models';
/* import ExampleComponent from 'components/CompositionComponent.vue'; */
import { defineComponent, ref } from 'vue';
const profilePic =
  'https://res.cloudinary.com/practicaldev/image/fetch/s--klBCXUfL--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/509970/e2ac2bfa-2d1d-42f8-b263-e9e0608a26ae.png';
export default defineComponent({
  name: 'PageIndex',
  components: {},
  data() {
    return {
      profilePic,
      posts: [
        {
          id: 1,
          caption: 'A beloved Bridge',
          date: 1628697703,
          location: 'Lisbon, Portugal',
          imageUrl:
            'https://images.unsplash.com/photo-1627679482560-9258e05a4226?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYyODY5NjQ5OQ&ixlib=rb-1.2.1&q=80&w=1080',
        },
        {
          id: 2,
          caption: 'Random Image',
          date: 1628697703,
          location: 'Valencia, Spain',
          imageUrl:
            'https://images.unsplash.com/photo-1544180447-45e0c7167b48?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80',
        },
        {
          id: 3,
          caption: 'Una image qualquier',
          date: 1628697703,
          location: 'Copenhagen, Denmark',
          imageUrl:
            'https://images.unsplash.com/photo-1554792998-80c29ca41cfb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=916&q=80',
        },
      ],
    };
  },
  methods: {
    niceDate(value: number): string {
      return date.formatDate(value, 'MMMM D T h:mmA');
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
.card-post {
  .q-img {
    min-height: 200px;
  }
}
</style>
