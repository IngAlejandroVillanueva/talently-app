<template>
  <el-container class="home-page wrapper">
    <el-main>
      <VideoPlayerCard />
    </el-main>

    <el-aside width="380px">
      <VideoPlaylist />
    </el-aside>
  </el-container>
</template>

<script>
import VideoPlayerCard from '@/components/videos/VideoPlayerCard'
import VideoPlaylist from '@/components/videos/VideoPlaylist'

export default {
  name: 'HomePage',
  components: {
    VideoPlayerCard,
    VideoPlaylist,
  },
  async asyncData({ store }) {
    await store.dispatch('videos/getContent')
    await store.dispatch('videos/getComments', { id: 1 })
  },
}
</script>

<style lang="scss">
.home-page {
  margin-top: 40px;

  & > .el-main {
    padding: 0 20px;
  }
}
</style>
