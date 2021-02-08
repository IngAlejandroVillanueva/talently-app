<template>
  <div class="header">
    <div class="wrapper">
      <img
        src="@/assets/img/logo.png"
        width="auto"
        height="30px"
        alt="Talently Logo"
      />

      <el-button type="text" @click="handleLogout">
        <span>Cerrar sesión</span>
        <i class="el-icon-arrow-right el-icon-right"></i>
      </el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Header',
  methods: {
    handleLogout() {
      this.$auth.logout()
    },
  },
}
</script>

<style lang="scss">
.header {
  background-color: #fff;
  padding: 10px;

  .wrapper {
    display: grid;
    align-items: center;
    grid-template-columns: auto 1fr;

    .el-button {
      justify-self: right;
    }
  }
}
</style>
