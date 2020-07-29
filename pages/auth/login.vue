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
          Gunakan nomor HP dan password <br> yang sudah terdaftar
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
        <v-card-actions>
          <v-btn
            color="primary"
            text
            small
            class="px-5"
            nuxt
            to="/auth/register"
          >
            Belum punya akun
          </v-btn>
          <v-spacer />
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
        const response = await this.$auth.loginWith('local', {
          data: {
            phone: this.phone,
            password: this.password,
            latlong: this.$store.state.latlong,
            device_token: 'ngawur',
            device_type: 2
          }
        })
        console.log(response)
        this.isLoadingLogin = false
      } catch (error) {
        this.isLoadingLogin = false
        console.log('error', error)
      }
    }
  }
}
</script>
