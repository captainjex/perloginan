<template>
  <div v-if="errors">
    <v-alert
      v-for="(err, key) in errors"
      :key="key"
      dense
      type="error"
    >
      {{ err }}
    </v-alert>
  </div>
</template>

<script>
export default {
  props: {
    errors: {
      type: Array,
      default: () => null
    }
  }
}
</script>
