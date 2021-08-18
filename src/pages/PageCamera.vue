<template>
  <q-page class="constrain-more q-pa-md">
    <div class="camera-frame q-pa-md">
      <video
        v-show="!imageCaptured"
        ref="video"
        class="full-width"
        autoplay
        playsinline
      />
      <canvas
        v-show="imageCaptured"
        ref="canvas"
        class="full-width"
        height="140"
      />
    </div>

    <div class="text-center q-pa-md">
      <q-btn
        v-if="hasCameraSupport"
        @click="captureImage()"
        color="grey-10"
        icon="eva-camera"
        round
        size="lg"
      />

      <q-file
        accept="image/*"
        @change="captureImageFallback"
        v-model="imageUpload"
        v-else
        outlined
        label="Choose an image"
      >
        <template v-slot:prepend>
          <q-icon name="eva-attach-outline" />
        </template>
      </q-file>

      <div class="justify-center q-ma-md">
        <q-input
          v-model="post.caption"
          class="col col-sm-6"
          label="caption"
          dense
        />
        <q-input
          :loading="locationLoading"
          v-model="post.location"
          class="col col-sm-6"
          label="location"
          dense
        >
          <template v-slot:append>
            <q-btn
              v-if="!locationLoading && locationSupported"
              @click="getLocation()"
              rounded
              dense
              flat
              icon="eva-navigation-2-outline"
            />
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
  computed: {
    locationSupported() {
      return navigator.geolocation ? true : false;
    },
  },
  data() {
    return {
      imageUpload: [],
      imageCaptured: false,
      locationLoading: false,
      hasCameraSupport: true,
      post: {
        id: uid(),
        caption: '',
        location: '',
        photo: ref(Blob),
        date: Date.now(),
      },
    };
  },
  methods: {
    initCamera() {
      navigator.mediaDevices
        .getUserMedia({
          video: true,
        })
        .then((stream) => {
          (this.$refs['video'] as any)['srcObject'] = stream;
        })
        .catch((error) => {
          this.hasCameraSupport = false;
        });
    },

    captureImage() {
      let video: HTMLVideoElement = this.$refs.video as HTMLVideoElement;
      let canvas: HTMLCanvasElement = this.$refs.canvas as HTMLCanvasElement;
      canvas.width = video.getBoundingClientRect().width;
      canvas.height = video.getBoundingClientRect().height;
      let context: CanvasRenderingContext2D | null = canvas.getContext('2d');
      context?.drawImage(video, 0, 0, canvas.width, canvas.height);
      this.imageCaptured = true;
      (this.post as any).photo = this.dataURItoBlob(canvas.toDataURL());
      this.disableCamera();
    },

    captureImageFallback(file: any): void {
      let canvas: HTMLCanvasElement = this.$refs.canvas as HTMLCanvasElement;
      let context: CanvasRenderingContext2D | null = canvas.getContext('2d');

      let reader = new FileReader();
      reader.onload = (e) => {
        let img: HTMLImageElement = new Image();
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          context?.drawImage(img, 0, 0);
          this.imageCaptured = true;
        };
        img.src = e.target?.result as string;
      };
      reader.readAsDataURL([...file.target.files][0]);
      (this.post as any).photo = [...file.target.files][0];
    },

    getLocation() {
      this.locationLoading = true;
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.getCityAndCountry(position);
        },
        (err) => {
          this.locationError(err);
        },
        {
          timeout: 7000,
        }
      );
    },

    getCityAndCountry(position: any) {
      let apiUrl = `https://geocode.xyz/${position.coords.latitude},${position.coords.longitude}?json=1`;
      this.$axios
        .get(apiUrl)
        .then((result) => {
          this.locationSuccess(result);
        })
        .catch((err) => {
          this.locationError(err);
        });
    },

    locationSuccess(result: any) {
      console.log('locationSuccess result data', result.data);
      this.post.location = result.data.city;
      if (result.data.country) {
        this.post.location += `, ${result.data.country}`;
      }
      this.locationLoading = false;
    },

    locationError(err: any) {
      this.$q.dialog({
        title: 'Error',
        message: 'Could not find your location.',
      });
      this.locationLoading = false;
    },

    disableCamera() {
      let video = this.$refs.video as HTMLMediaElement;
      let srcOb = video.srcObject as MediaStream;
      srcOb.getVideoTracks().forEach((track) => {
        track.stop();
      });
    },

    dataURItoBlob(dataURI: string) {
      var byteString = atob(dataURI.split(',')[1]);
      var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
      var ab = new ArrayBuffer(byteString.length);
      var ia = new Uint8Array(ab);
      for (var i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      var blob = new Blob([ab], { type: mimeString });
      return blob;
    },

    publishPost() {
      console.log(this.post);
    },
  },
  mounted() {
    this.initCamera();
  },

  beforeUnmount() {
    if (this.hasCameraSupport) {
      this.disableCamera();
    }
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
