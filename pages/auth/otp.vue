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
        <v-card-title class="text-subtitle-1">
          Masukkan kode yang dikirimkan ke no {{ $route.query.phone }}
        </v-card-title>
        <v-card-text>
          <app-error-alert :errors="errors" />
          <v-col cols="12">
            <v-text-field
              v-model="otpCode"
              label="OTP"
              outlined
            />
          </v-col>
          <v-col cols="12" class="text-center">
            <v-btn
              color="primary"
              class="px-5"
              :loading="isLoadingVerify"
              @click="verifyOtp"
            >
              Verifikasi
            </v-btn>
          </v-col>
          <v-col cols="12" class="text-center">
            <v-btn
              color="primary"
              class="px-5 text-capitalize"
              small
              text
              :loading="isLoadingResend"
              @click="resendOtp"
            >
              Kirim ulang kode verifikasi
            </v-btn>
          </v-col>
        </v-card-text>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import { handleApi } from '../../lib/core/api'
export default {
  auth: 'guest',
  data () {
    return {
      otpCode: '',
      isLoadingVerify: false,
      isLoadingResend: false,
      errors: null
    }
  },
  methods: {
    async verifyOtp () {
      const data = {
        user_id: this.$route.query.userId,
        otp_code: this.otpCode
      }

      this.errors = null
      this.isLoadingVerify = true
      const [response, responseErrors] = await handleApi(this.$axios.$post('/register/otp/match', data))
      if (responseErrors) {
        this.errors = responseErrors
        this.isLoadingVerify = false
        return
      }

      this.$auth.setUserToken(response.data.user.access_token)
      this.isLoadingVerify = false
    },
    async resendOtp () {
      const data = {
        phone: this.$route.query.phone
      }

      this.errors = null
      this.isLoadingResend = true
      const [, responseErrors] = await handleApi(this.$axios.$post('/register/otp/request', data))
      if (responseErrors) {
        this.errors = responseErrors
      }
      this.isLoadingResend = false
    }
  }
}
</script>
