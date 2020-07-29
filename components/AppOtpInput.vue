<template>
  <v-layout>
    <v-col
      v-for="i in length"
      :key="i"
      :style="{width: '50px'}"
    >
      <v-text-field
        ref="input"
        v-model="codes[i-1]"
        :class="$style.input"
        single-line
        type="tel"
        filled
        @input="onInput($event, i)"
        @keypress="onKeyPress($event)"
        @keydown.delete="onDelete($event, i)"
      />
    </v-col>
  </v-layout>
</template>

<script>
export default {
  props: {
    length: {
      type: Number,
      required: true
    }
  },

  data () {
    return {
      codes: []
    }
  },

  computed: {
    code () {
      const code = this.codes.join('')
      return code || null
    }
  },

  mounted () {
    this.$nextTick(() => {
      this.focus()
    })
  },

  methods: {
    onKeyPress (event) {
      if (event.target.value.length === 1) { return event.preventDefault() }
    },
    setFocusByRef (index) {
      if (!this.$refs.input[index]) { return }
      this.$refs.input[index].focus()
    },
    onInput (event, i) {
      this.$emit('input', this.code)
      if (event) {
        this.setFocusByRef(i)
      }
    },
    onDelete (event, i) {
      const oldVal = event.target.value
      if (oldVal) {
        return
      }
      this.setFocusByRef(i - 2)
    },
    focus () {
      this.$refs.input[0].focus()
    },
    reset () {
      this.codes = []
    }
  }
}
</script>

<style module>
.input input {
  text-align: center;
}
</style>
