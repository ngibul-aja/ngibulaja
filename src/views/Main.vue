<template>
  <div>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4 justify-content-between">
      <div class="btn btn-primary">
        {{ game.team1Name }}<span class="badge badge-light ml-2">{{ game.team1Points }}</span>
      </div>
      <div>
        <span class="text-white">{{ game.timePerRound }}</span>
      </div>
      <div class="btn btn-primary">
        {{ game.team2Name }}<span class="badge badge-light ml-2">{{ game.team2Points }}</span>
      </div>
    </nav>

    <section class="text-center">
      <div class="container">
        <h1 class="bg-secondary p-2 rounded text-white">{{ cards[randomNum].keyword }}</h1>
      </div>
      <div class="container justify-content-center">
        <div v-for="(card, index) in cards[randomNum].values" :key="index">
          <p class="lead text-danger">{{ card }}</p>
        </div>
      </div>
      <div class="container d-flex justify-content-center">
        <div class="col">
          <a @click="minScore" href="#" class="btn btn-danger my-2 w-75">
            <img src="https://image.flaticon.com/icons/svg/126/126497.svg" alt="" width="70" />
          </a>
        </div>
        <div class="col">
          <a @click="next" href="#" class="btn btn-info my-2 w-75">
            <img src="https://image.flaticon.com/icons/svg/159/159695.svg" alt="" width="70" />
          </a>
        </div>
        <div class="col">
          <a @click="addScore" href="#" class="btn btn-success my-2 w-75">
            <img src="https://image.flaticon.com/icons/svg/149/149148.svg" alt="" width="70" />
          </a>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import URI from 'urijs'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'Main',
  computed: {
    ...mapState(['cards', 'game'])
  },
  data() {
    return {
      //listCards: [],
      randomNum: Math.floor(Math.random() * 30),
      score: 0
      //whomTurn: this.game.whomTurn
    }
  },
  methods: {
    ...mapActions(['joinGame', 'findAll', 'findGames']),
    addScore() {
      console.log(this.game)
      let newGame = { ...this.game, id: localStorage.getItem('gameId') }
      console.log(newGame, 'asdfasdf')
      this.$store.dispatch('addScore', newGame)
      this.next()
    },
    /*addScore() {
      this.score++
      this.next()
    },*/
    minScore() {
      let newGame = { ...this.game, id: localStorage.getItem('gameId') }
      console.log(newGame, 'asdfasdf')
      this.$store.dispatch('minScore', newGame)
      this.next()
    },
    next() {
      this.randomNum = Math.floor(Math.random() * 30)
    }
  },
  mounted() {
    this.findAll()
    let uri = URI(window.location.href)
    console.log(uri)
    console.log(window.location.href)
    const { join: gameId } = uri.query(true)
    console.log(gameId, 'gamiddddddddddddddddddddd')
    //this.findGames(localStorage.getItem('gameId'))
    if (gameId) {
      console.log('joining..')
      this.joinGame(gameId).then(_ => {
        console.log('joined')
        this.findGames(localStorage.getItem('gameId'))
      })
    }
    if (localStorage.getItem('gameId')) {
      console.log(localStorage.getItem('gameId'), '-----------------')
      this.findGames(localStorage.getItem('gameId'))
    }
  }
}
</script>

<style></style>
