<template>
  <el-form
    ref="registerForm"
    :model="form"
    :rules="rules"
    status-icon
    @submit.native.prevent
  >
    <el-form-item label="Nombre" prop="name">
      <el-input
        v-model="form.name"
        name="name"
        placeholder="Ingresa tu nombre"
        @keyup.enter.native="handleEnter"
      ></el-input>
    </el-form-item>

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
        ref="password"
        v-model="form.password"
        name="password"
        placeholder="Ingresa tu contraseña"
        show-password
        @keyup.enter.native="handleEnter"
      ></el-input>
    </el-form-item>

    <el-form-item label="Confirma tu contraseña" prop="password_confirmation">
      <el-input
        ref="passwordConfirmation"
        v-model="form.password_confirmation"
        name="password_confirmation"
        placeholder="Ingresa tu contraseña nuevamente"
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
        <span>Registrarme</span>
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'RegisterForm',
  data() {
    const validateServerErrors = (rule, value, callback) => {
      if (this.serverErrors[rule.field]) {
        callback(new Error(this.serverErrors[rule.field][0]))
      } else {
        callback()
      }
    }

    const validatePasswordConfirmation = (rule, value, callback) => {
      if (!value) {
        callback(new Error('Ingresa tu contraseña'))
      } else if (this.form.password !== value) {
        callback(new Error('Las contraseñas no coinciden'))
      } else {
        callback()
      }
    }

    return {
      loading: false,
      form: {
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      },
      rules: {
        name: [
          {
            required: true,
            message: 'Ingresa tu nombre',
            trigger: ['blur', 'change'],
          },
          {
            validator: validateServerErrors,
            trigger: null,
          },
        ],
        email: [
          {
            required: true,
            message: 'Ingresa tu email',
            trigger: ['blur', 'change'],
          },
          {
            type: 'email',
            message: 'Ingresa en email válido',
            trigger: ['blur', 'change'],
          },
          {
            validator: validateServerErrors,
            trigger: null,
          },
        ],
        password: [
          {
            required: true,
            message: 'Ingresa tu contraseña',
            trigger: ['blur', 'change'],
          },
          {
            validator: validateServerErrors,
            trigger: null,
          },
        ],
        password_confirmation: [
          {
            required: true,
            message: 'Ingresa tu contraseña',
            trigger: ['blur', 'change'],
          },
          {
            validator: validatePasswordConfirmation,
            trigger: ['blur', 'change'],
          },
        ],
      },
      serverErrors: {},
    }
  },
  methods: {
    handleEnter(e) {
      switch (e.target.name) {
        case 'email':
          this.$refs.password.focus()
          break
        case 'password':
          this.$refs.passwordConfirmation.focus()
          break
        default:
          this.handleSubmit()
          break
      }
    },
    handleSubmit() {
      if (!this.loading) {
        this.serverErrors = {}

        this.$refs.registerForm.validate((valid) => {
          if (valid) {
            this.handleRegister()
          }
        })
      }
    },
    async handleRegister() {
      this.loading = true

      try {
        const payload = {
          name: this.form.name,
          email: this.form.email,
          password: this.form.password,
        }

        const url = '/api/auth/register'

        const response = await this.$axios.post(url, payload)

        if (response.data.success) {
          this.handleLogin()
        } else {
          this.handleErrors(response.data)
        }
      } catch (error) {
        this.handleErrors(error.response.data)
      }

      this.loading = false
    },
    handleLogin() {
      const payload = {
        data: {
          email: this.form.email,
          password: this.form.password,
        },
      }

      this.$auth.loginWith('local', payload)
    },
    handleErrors(data) {
      if (data.errors) {
        this.serverErrors = data.errors
        this.$refs.registerForm.validate()
      }
    },
  },
}
</script>
