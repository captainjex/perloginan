<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-flex
      xs12
      sm8
      md6
    >
      <v-card class="pa-8">
        <v-card-title class="text-subtitle-1 justify-center text-center">
          Buat Akun
        </v-card-title>
        <v-card-text>
          <app-error-alert :errors="errors" />
          <v-col cols="12">
            <v-text-field
              v-model="phone"
              label="No HP"
              outlined
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="password"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              label="Password"
              outlined
              @click:append="showPassword = !showPassword"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="country"
              label="Country"
              outlined
            />
          </v-col>
        </v-card-text>
        <v-card-actions>
          <v-btn
            color="primary"
            text
            small
            class="px-5"
            nuxt
            to="/auth/login"
          >
            Login Saja
          </v-btn>
          <v-spacer />
          <v-btn
            color="primary"
            :loading="isLoadingRegister"
            class="px-5"
            @click="register"
          >
            Register
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { handleApi } from '~/lib/core/api'
export default {
  auth: 'guest',
  data () {
    return {
      showPassword: false,
      isLoadingRegister: false,
      phone: '',
      password: '',
      country: '',
      errors: null
    }
  },

  methods: {
    async register () {
      const data = {
        phone: this.phone,
        password: this.password,
        country: this.country,
        latlong: this.$store.state.latlong,
        device_token: 'ngawur',
        device_type: 2
      }
      this.errors = null
      this.isLoadingRegister = true
      const [register, registerErrors] = await handleApi(this.$axios.$post('/register', data))
      if (registerErrors) {
        this.errors = registerErrors
        this.isLoadingRegister = false
        return
      }
      this.$router.push({ path: '/auth/otp', query: { userId: register.data.user.id, phone: this.phone } })
      this.isLoadingRegister = false
    }
  }
}
</script>
