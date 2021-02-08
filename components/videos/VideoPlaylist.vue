<template>
  <el-card class="video-playlist">
    <template slot="header" class="clearfix">
      <h3>Contenido</h3>
    </template>

    <VideoPlaylistItem v-for="item in content" :key="item.id" :video="item" />
  </el-card>
</template>

<script>
import { mapState } from 'vuex'
import VideoPlaylistItem from './VideoPlaylistItem'

export default {
  name: 'VideoPlaylist',
  components: {
    VideoPlaylistItem,
  },
  computed: {
    ...mapState('videos', ['content']),
  },
}
</script>

<style lang="scss">
.video-playlist {
  .el-card__body {
    max-height: 60vh;
    overflow-y: auto;
    padding: 0;
  }
}
</style>
