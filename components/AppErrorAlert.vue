<template>
  <v-col v-if="errors" cols="12">
    <v-alert
      v-for="(err, key) in errors"
      :key="key"
      dense
      type="error"
    >
      {{ err }}
    </v-alert>
  </v-col>
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
