<template>
  <div class="video-player">
    <client-only>
      <vimeo-player
        ref="vimeoPlayer"
        :video-id="vimeoId"
        @progress="handleProgress"
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
  methods: {
    async handleProgress() {
      const time = await this.$refs.vimeoPlayer.player.getCurrentTime()
      const duration = await this.$refs.vimeoPlayer.player.getDuration()

      const progress = time / duration

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
