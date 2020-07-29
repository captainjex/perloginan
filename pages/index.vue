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
      <div class="text-center">
        <logo />
        <vuetify-logo />
      </div>
      <v-card>
        <v-card-title class="headline justify-center">
          {{ user.name }}
        </v-card-title>
        <v-card-text>
          <p>{{ user }}</p>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="primary"
            :loading="isLoadingLogout"
            @click="logout"
          >
            Logout
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import Logo from '~/components/Logo.vue'
import VuetifyLogo from '~/components/VuetifyLogo.vue'

export default {
  components: {
    Logo,
    VuetifyLogo
  },

  data () {
    return {
      isLoadingLogout: false
    }
  },

  computed: {
    user () {
      return this.$auth.user
    }
  },

  methods: {
    async logout () {
      this.isLoadingLogout = true
      await this.$auth.logout({
        data: {
          access_token: this.$auth.getToken('local'),
          confirm: 1
        }
      })
      this.isLoadingLogout = false
    }
  }
}
</script>
