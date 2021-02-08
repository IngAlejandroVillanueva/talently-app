<template>
  <el-container class="home-page wrapper">
    <el-main>
      <VideoPlayerCard />
      <CommentsList />
    </el-main>

    <el-aside width="380px">
      <VideoPlaylist />
    </el-aside>
  </el-container>
</template>

<script>
import VideoPlayerCard from '@/components/videos/VideoPlayerCard'
import CommentsList from '@/components/comments/CommentsList'
import VideoPlaylist from '@/components/videos/VideoPlaylist'

export default {
  name: 'HomePage',
  components: {
    VideoPlayerCard,
    CommentsList,
    VideoPlaylist,
  },
  async asyncData({ store }) {
    await store.dispatch('videos/getContent')
    await store.dispatch('videos/getComments', store.state.videos.videoId)
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
