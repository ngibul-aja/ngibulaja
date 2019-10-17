<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
    {{ cards }}
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'home',
  data () {
    return {}
  },
  components: {
    HelloWorld
  },
  computed: {
    ...mapState(['cards'])
  },
  methods: {
    ...mapActions(['findAll'])
  },
  mounted () {
    this.findAll()
  }
}
</script>
