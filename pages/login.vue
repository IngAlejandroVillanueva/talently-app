<template>
  <div class="auth-page">
    <el-card class="auth-card">
      <div slot="header" class="auth-card--header">
        <img
          src="@/assets/img/logo.png"
          width="auto"
          height="45px"
          alt="Talently Logo"
        />
      </div>

      <LoginForm />

      <div class="auth-card--footer">
        <span>¿Nuevo en Talently?</span>

        <NuxtLink to="/register" class="el-link el-link--primary">
          <span class="el-link--inner">Crea una cuenta.</span>
        </NuxtLink>
      </div>
    </el-card>
  </div>
</template>

<script>
import LoginForm from '@/components/LoginForm'

export default {
  name: 'LoginPage',
  auth: 'guest',
  components: {
    LoginForm,
  },
}
</script>
