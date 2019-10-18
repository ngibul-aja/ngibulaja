<template>
  <div class="about">
    <h1>This is an about page</h1>
  </div>
</template>

<script>
import URI from 'urijs'
import { mapActions } from 'vuex'

export default {
  name: 'Home',
  methods: {
    ...mapActions(['joinGame'])
  },
  mounted () {
    let uri = URI(window.location.href)
    console.log(uri)
    console.log(window.location.href)
    const { join: gameId } = uri.query(true)
    console.log(gameId, 'gamiddddddddddddddddddddd')
    if (gameId) {
      console.log('joining..')
      this.joinGame(gameId).then(_ => {
        console.log('joined')
      })
    }
  }
}
</script>
