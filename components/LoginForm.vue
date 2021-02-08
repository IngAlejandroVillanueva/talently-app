<template>
  <el-form
    ref="loginForm"
    :model="form"
    :rules="rules"
    status-icon
    @submit.native.prevent
  >
    <el-form-item label="Email" prop="email">
      <el-input
        v-model="form.email"
        name="email"
        placeholder="Ingresa tu email"
        @keyup.enter.native="handleEnter"
      ></el-input>
    </el-form-item>

    <el-form-item label="Contraseña" prop="password">
      <el-input
        ref="passwordInput"
        v-model="form.password"
        name="password"
        placeholder="Ingresa tu contraseña"
        show-password
        @keyup.enter.native="handleEnter"
      ></el-input>
    </el-form-item>

    <el-form-item>
      <el-button
        type="primary"
        class="submit-btn"
        :loading="loading"
        :disabled="loading"
        @click="handleSubmit"
      >
        <span>Iniciar sesión</span>
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'LoginForm',
  data() {
    return {
      loading: false,
      form: {
        email: '',
        password: '',
      },
      rules: {
        email: [
          {
            required: true,
            message: 'Ingresa tu email',
            trigger: ['blur', 'change'],
          },
          {
            type: 'email',
            message: 'Ingresa un email válido',
            trigger: ['blur', 'change'],
          },
        ],
        password: [
          {
            required: true,
            message: 'Ingresa tu contraseña',
            trigger: ['blur', 'change'],
          },
        ],
      },
    }
  },
  methods: {
    handleEnter(e) {
      if (e.target.name === 'email') {
        this.$refs.passwordInput.focus()
      } else {
        this.handleSubmit()
      }
    },
    handleSubmit() {
      if (!this.loading) {
        this.$refs.loginForm.validate((valid) => {
          if (valid) {
            this.handleLogin()
          }
        })
      }
    },
    async handleLogin() {
      this.loading = true

      try {
        const payload = { data: this.form }

        await this.$auth.loginWith('local', payload)
      } catch (error) {
        this.handleErrors(error.response.data)
      }

      this.loading = false
    },
    handleErrors(data) {
      if (data.error) {
        this.$notify.error({
          title: 'Error',
          message: data.error,
        })
      }
    },
  },
}
</script>
