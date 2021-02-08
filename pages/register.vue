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

      <RegisterForm />

      <div class="auth-card--footer">
        <span>¿Ya tienes cuenta?</span>

        <NuxtLink to="/login" class="el-link el-link--primary">
          <span class="el-link--inner">Inicia sesión.</span>
        </NuxtLink>
      </div>
    </el-card>
  </div>
</template>

<script>
import RegisterForm from '@/components/RegisterForm'

export default {
  name: 'RegisterPage',
  auth: 'guest',
  components: {
    RegisterForm,
  },
}
</script>
