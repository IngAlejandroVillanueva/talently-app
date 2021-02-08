<template>
  <el-card shadow="never" class="video-player-card">
    <template slot="header" class="clearfix">
      <VideoPlayer
        :id="currentVideo.id"
        :progress="currentVideo.progress"
        :vimeo-id="currentVideo.vimeo_id"
      />
    </template>

    <h2>{{ currentVideo.title }}</h2>

    <Excerpt :text="currentVideo.article" />
  </el-card>
</template>

<script>
import { mapState } from 'vuex'
import Excerpt from '@/components/Excerpt'
import VideoPlayer from './VideoPlayer'

export default {
  name: 'VideoPlayerCard',
  components: {
    VideoPlayer,
    Excerpt,
  },
  computed: {
    ...mapState('videos', ['currentVideo']),
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
