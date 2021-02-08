<template>
  <el-card class="comments-list-item">
    <el-avatar :size="40" :src="require('@/assets/img/default-avatar.png')" />

    <div>
      <strong>{{ comment.user.name }}</strong>
      <p>{{ comment.content }}</p>
    </div>

    <el-button slot="reference" type="text" size="small" icon="el-icon-more" />
  </el-card>
</template>

<script>
export default {
  name: 'CommentsListItem',
  props: {
    comment: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss">
.comments-list-item {
  .el-card__body {
    display: grid;
    grid-gap: 10px;
    grid-template-columns: auto 1fr auto;
  }
}
</style>
