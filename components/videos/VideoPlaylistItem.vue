<template>
  <el-card class="video-playlist-item">
    <img
      src="@/assets/img/video_thumbnail.jpg"
      alt="Video thumbnail"
      width="150px"
      @click="handleClick"
    />

    <div class="video-playlist-item--content">
      <strong>{{ video.title }}</strong>
      <p><i class="el-icon-timer"></i> 3 min</p>
    </div>

    <el-progress
      type="circle"
      :percentage="video.progress"
      :show-text="false"
      :width="30"
      :stroke-width="4"
    />
  </el-card>
</template>

<script>
/* eslint-disable vue/prop-name-casing */
export default {
  name: 'VideoPlaylistItem',
  props: {
    video: {
      type: Object,
      required: true,
    },
  },
  methods: {
    handleClick() {
      this.$store.dispatch('videos/setVideoId', this.video.id)
    },
  },
}
</script>

<style lang="scss">
.video-playlist-item {
  padding: 10px;

  img {
    cursor: pointer;
  }

  .el-card__body {
    display: grid;
    grid-gap: 10px;
    align-items: center;
    grid-template-columns: auto 1fr auto;

    &--content {
      font-size: 14px;
    }
  }
}
</style>
