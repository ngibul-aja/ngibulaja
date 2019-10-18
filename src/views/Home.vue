<template>
  <div class="about">
    <h1>This is an about page</h1>
    {{ cards }}
    <br />
    <br />
    {{ game }}
  </div>
</template>

<script>
import URI from 'urijs'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Home',
  methods: {
    ...mapActions(['joinGame', 'findAll', 'findGames'])
  },
  computed: {
    ...mapState(['cards', 'game'])
  },
  mounted () {
    this.findAll()
    let uri = URI(window.location.href)
    console.log(uri)
    console.log(window.location.href)
    const { join: gameId } = uri.query(true)
    console.log(gameId, 'gamiddddddddddddddddddddd')
    this.findGames(localStorage.getItem('gameId'))
    if (gameId) {
      console.log('joining..')
      this.joinGame(gameId).then(_ => {
        console.log('joined')
        this.findGames(localStorage.getItem('gameId'))
      })
    }
  }
}
</script>
