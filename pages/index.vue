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
      <v-card
        :loading="isLoading"
        class="mx-auto"
      >
        <v-hover v-slot:default="{ hover }">
          <v-img
            :src="user.cover_picture && user.cover_picture.url"
            height="200px"
          >
            <v-overlay
              absolute
              :value="hover"
            >
              <v-btn text @click="$refs.inputCover.click()">
                ubah cover
              </v-btn>
              <input ref="inputCover" type="file" class="d-none" @input="onInputCover">
            </v-overlay>
          </v-img>
        </v-hover>
        <v-card-actions :class="$style.cardActions">
          <v-hover v-slot:default="{ hover }">
            <v-avatar color="white" size="140" :class="$style.avatar">
              <img
                src="https://cdn.vuetifyjs.com/images/john.jpg"
                alt="John"
              >
              <v-overlay
                absolute
                :value="hover"
              >
                <v-btn text>
                  edit
                </v-btn>
              </v-overlay>
            </v-avatar>
          </v-hover>
        </v-card-actions>
        <app-error-alert :errors="errors" />
        <v-card-title>
          <div>
            {{ user.name }}
          </div>
          <v-spacer />

          <v-btn color="primary" class="mr-4" @click="onOpenEditProfile">
            edit profil
          </v-btn>
          <v-btn
            color="primary"
            outlined
            :loading="isLoadingLogout"
            @click="logout"
          >
            Logout
          </v-btn>
        </v-card-title>

        <v-card-subtitle v-if="user.bio">
          {{ user.bio }}
        </v-card-subtitle>
        <v-card-text>
          <p v-if="user.gender">
            {{ user.gender }}
          </p>
          <p v-if="user.birthday">
            {{ user.birthday }}
          </p>
          <p v-if="user.hometown">
            {{ user.hometown }}
          </p>
        </v-card-text>
        <v-card-text>
          <p>{{ user }}</p>
        </v-card-text>
      </v-card>
    </v-flex>

    <v-dialog
      v-model="dialogEditProfileOpened"
      persistent
      max-width="400"
    >
      <v-card>
        <v-card-title class="headline">
          Edit Profil
        </v-card-title>

        <v-card-text>
          <v-text-field
            v-model="profile.name"
            label="Nama"
            outlined
          />
          <v-text-field
            v-model="profile.bio"
            label="Bio"
            outlined
          />
          <v-text-field
            v-model="profile.hometown"
            label="Lokasi"
            outlined
          />
        </v-card-text>

        <v-card-actions>
          <v-spacer />

          <v-btn
            color="primary"
            @click="onSaveEditProfile"
          >
            simpan
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>

<script>
import { handleApi } from '../lib/core/api'

function initProfileForm () {
  return {
    name: '',
    gender: '',
    birthday: '',
    hometown: '',
    bio: ''
  }
}

export default {
  components: {
  },

  data () {
    return {
      isLoadingLogout: false,
      isLoading: false,
      errors: null,
      dialogEditProfileOpened: false,
      profile: initProfileForm()
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
    },
    async onInputCover (e) {
      const [file] = e.target.files
      const data = new FormData()
      data.append('image', file)

      this.errors = null
      this.isLoading = true
      const [response, errors] = await handleApi(this.$axios.$post('/uploads/cover', data))
      if (errors) {
        this.errors = errors
        this.isLoading = false
        return
      }

      this.$auth.setUser({ ...this.user, cover_picture: response.data.user_picture.cover_picture })
      this.isLoading = false
    },
    onOpenEditProfile () {
      this.dialogEditProfileOpened = true
    },
    onSaveEditProfile () {
      this.profile = initProfileForm()
      this.dialogEditProfileOpened = false
    }
  }
}
</script>

<style module>
.cardActions {
  position: relative;
  height: 80px;
}
.avatar {
  position: absolute;
  top: -70px;
}
</style>
