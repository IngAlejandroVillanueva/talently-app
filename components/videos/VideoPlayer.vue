<template>
  <div class="video-player">
    <client-only>
      <vimeo-player
        ref="vimeoPlayer"
        :video-id="vimeoId"
        @progress="handleProgress"
        @ready="setVideoDuration"
        @ended="handleProgress"
      />
    </client-only>
  </div>
</template>

<script>
export default {
  name: 'VideoPlayer',
  props: {
    id: {
      type: Number,
      required: true,
    },
    progress: {
      type: Number,
      required: true,
    },
    vimeoId: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      videoDuration: 0,
    }
  },
  methods: {
    async setVideoDuration() {
      this.videoDuration = await this.$refs.vimeoPlayer.player.getDuration()
    },
    async handleProgress() {
      const time = await this.$refs.vimeoPlayer.player.getCurrentTime()

      const progress = parseInt((time / this.videoDuration) * 100)

      if (progress > this.progress) {
        const payload = { id: this.id, progress }
        this.$store.dispatch('videos/updateVideoProgress', payload)
      }
    },
  },
}
</script>

<style lang="scss">
.video-player {
  padding: 0;
  position: relative;
  padding-bottom: 56.25%;
  height: 0;
  overflow: hidden;
  max-width: 100%;
  height: auto;

  iframe,
  object,
  embed {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>
