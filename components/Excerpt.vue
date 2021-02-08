<template>
  <div>
    <span>{{ excerpt }}</span>

    <el-button type="text" @click="toggleShow">
      <span v-if="showAll">Ocultar texto</span>
      <span v-else>Mostrar texto</span>
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'Excerpt',
  props: {
    text: {
      type: String,
      required: true,
    },
    limit: {
      type: Number,
      default: 50,
    },
  },
  data() {
    return {
      showAll: false,
    }
  },
  computed: {
    excerpt() {
      const filter = this.text.replace(/\s+/g, ' ')
      const wordsarray = filter.split(' ')

      if (this.showAll || wordsarray.length < this.limit) {
        return this.text
      } else {
        let result = ''

        for (let i = 0; i < this.limit; i++) {
          result = result + ' ' + wordsarray[i] + ' '
        }

        result += '...'

        return result
      }
    },
  },
  methods: {
    toggleShow() {
      this.showAll = !this.showAll
    },
  },
}
</script>
