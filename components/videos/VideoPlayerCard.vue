<template>
  <el-card shadow="never" class="video-player-card">
    <template slot="header" class="clearfix">
      <VideoPlayer
        :id="video.id"
        :progress="video.progress"
        :vimeo-id="video.vimeo_id"
      />
    </template>

    <h2>{{ video.title }}</h2>

    <Excerpt :text="video.article" />
  </el-card>
</template>

<script>
import { mapGetters } from 'vuex'
import Excerpt from '@/components/Excerpt'
import VideoPlayer from './VideoPlayer'

export default {
  name: 'VideoPlayerCard',
  components: {
    VideoPlayer,
    Excerpt,
  },
  computed: {
    ...mapGetters('videos', ['video']),
  },
}
</script>

<style lang="scss">
.video-player-card {
  .el-card__header {
    padding: 0;
  }

  .el-card__body {
    padding: 30px 20px;

    h2 {
      margin-bottom: 15px;
    }
  }
}
</style>
