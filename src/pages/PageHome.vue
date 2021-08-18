<template>
  <q-page class="constrain q-pa-md">
    <div class="row q-col-gutter-lg">
      <div class="col-12 col-md-8">
        <template v-if="!loadingPosts && posts.length">
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
              <div class="text-caption text-grey">
                {{ niceDate(post.date) }}
              </div>
            </q-card-section>
          </q-card>
        </template>
        <template v-else>
          <q-card flat bordered style="max-width: 300px">
            <q-item>
              <q-item-section avatar>
                <q-skeleton type="QAvatar" animation="fade" size="40px" />
              </q-item-section>

              <q-item-section>
                <q-item-label>
                  <q-skeleton type="text" animation="fade" />
                </q-item-label>
                <q-item-label caption>
                  <q-skeleton type="text" animation="fade" />
                </q-item-label>
              </q-item-section>
            </q-item>

            <q-skeleton height="200px" square animation="fade" />

            <q-card-section>
              <q-skeleton type="text" class="text-subtitle2" animation="fade" />
              <q-skeleton
                type="text"
                width="50%"
                class="text-subtitle2"
                animation="fade"
              />
            </q-card-section>
          </q-card>
        </template>
        <template v-else-if="!loadingPosts && !posts.length">
          <h5>No posts yet</h5>
        </template>
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
import { error } from 'console';
const profilePic =
  'https://res.cloudinary.com/practicaldev/image/fetch/s--klBCXUfL--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://dev-to-uploads.s3.amazonaws.com/uploads/user/profile_image/509970/e2ac2bfa-2d1d-42f8-b263-e9e0608a26ae.png';
export default defineComponent({
  name: 'PageIndex',
  components: {},
  data() {
    return {
      loadingPosts: false,
      profilePic,
      posts: Array,
    };
  },
  created() {
    this.getPosts();
  },
  methods: {
    niceDate(value: number): string {
      return date.formatDate(value, 'MMMM D h:mmA');
    },
    getPosts() {
      this.loadingPosts = true;
      this.$axios
        .get('http://localhost:3000/posts')
        .then((response) => {
          this.posts = response.data;
          this.loadingPosts = false;
        })
        .catch((err) => {
          console.log(err);
          this.loadingPosts = false;
        });
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
