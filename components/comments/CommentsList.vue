<template>
  <div class="comment-list">
    <h2>{{ comments.length }} comentarios</h2>

    <CommentsListItem
      v-for="comment in comments"
      :key="comment.id"
      :comment="comment"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import CommentsListItem from './CommentsListItem'

export default {
  name: 'CommentsList',
  components: {
    CommentsListItem,
  },
  computed: {
    ...mapState('videos', ['comments']),
  },
}
</script>

<style lang="scss">
.comment-list {
  padding: 20px 0;

  h2 {
    margin: 20px 0;
  }

  .el-card + .el-card {
    margin-top: 20px;
  }
}
</style>
