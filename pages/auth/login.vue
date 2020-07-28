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
      <v-card>
        <v-card-title class="text-subtitle-1 justify-center text-center">
          Masukkan nomor dan password <br> yang sudah terdaftar
        </v-card-title>
        <v-card-text>
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
        </v-card-text>
        <v-card-actions class="justify-center">
          <v-btn
            color="primary"
            :loading="isLoadingLogin"
            class="px-5"
            @click="login"
          >
            Login
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import axios from 'axios'
import { AUTH_TOKEN, AUTH_TOKEN_TYPE } from '~/constants/storageKeys'
import { SET_USER } from '~/constants/storeTypes'

export default {
  data () {
    return {
      showPassword: false,
      isLoadingLogin: false,
      phone: '',
      password: ''
    }
  },

  methods: {
    async login () {
      try {
        this.isLoadingLogin = true
        const response = await axios.post('http://pretest-qa.dcidev.id/api/v1/oauth/sign_in', {
          phone: this.phone,
          password: this.password,
          latlong: this.$store.state.latlong,
          device_token: 'ngawur',
          device_type: 2
        })
        const { user } = response.data.data
        localStorage.setItem(AUTH_TOKEN, user.access_token)
        localStorage.setItem(AUTH_TOKEN_TYPE, user.token_type)

        const responseCredential = await axios.get('http://pretest-qa.dcidev.id/api/v1/oauth/credentials', {
          params: {
            access_token: user.access_token
          }
        })
        this.$store.commit(SET_USER, responseCredential.data.data.user)
        this.$router.push('/')
        this.isLoadingLogin = false
      } catch (error) {
        this.isLoadingLogin = false
        console.log('error', error)
      }
    }
  }
}
</script>
