<template>
  <div class="container d-flex justify-content-center flex-wrap">
    <br />
    <br />
    <br />
    <br />
    <form id="settings" v-if="showSetting" @submit.prevent="doNewGame">
      <div class="form-group">
        <h1>Settings</h1>
        <div class="col mb-3 mt-5 mb-3">
          <label>Time Per Round</label>
          <br />
          <select class="form-control form-control-lg" v-model="selectedTime" required>
            <option>15</option>
            <option>30</option>
            <option>45</option>
          </select>
        </div>
        <div class="col">
          <label>Number of Points to Win</label>
          <br />
          <select class="form-control form-control-lg mb-3" v-model="selectedRound" required>
            <option>5</option>
            <option>10</option>
            <option>15</option>
          </select>
        </div>

        <div class="d-flex justify-content-center flex-wrap">
          <div class="d-flex justify-content-center mb-3">
            <span class="">First Team Name</span>
            <input
              class="form-control w-75"
              type="text"
              placeholder=" Input Your Team Name "
              v-model="firstTeamName"
              required
            />
          </div>
          <div class="d-flex justify-content-center mb-3">
            <span class=""> Second Team Name</span>
            <input
              class="form-control w-75"
              type="text"
              placeholder=" Input Your Team Name "
              v-model="secondTeamName"
              required
            />
          </div>
        </div>
        <button type="submit" class="btn btn-primary">Let's Start The Game !!!</button>
      </div>
    </form>

    <div v-if="inviteId && invitationUrl">
      <input :value="invitationUrl" readonly ref="inviteUrl" />
      <button id="copy_invite" @click="copyInvite">copy</button>
    </div>
  </div>
</template>

<script>
import db from '../config/firestore'
import { mapState, mapActions, mapGetters } from 'vuex'
import URI from 'urijs'
import swal from 'sweetalert2'

export default {
  data: () => {
    return {
      showSetting: true,
      selectedTime: null,
      selectedRound: null,
      firstTeamName: '',
      secondTeamName: ''
    }
  },
  computed: {
    ...mapState(['cards', 'game', 'settings', 'opponentIsJoined']),
    ...mapGetters(['inviteId']),
    invitationUrl() {
      return window.location.origin + `/?join=${this.inviteId}`
    }
  },
  methods: {
    ...mapActions(['newGame', 'joinGame', 'findAll', 'findGames']),
    copyInvite() {
      this.$refs.inviteUrl.value
      document.execCommand('copy')
    },
    doNewGame() {
      this.newGame({
        selectedTime: this.selectedTime,
        selectedRound: this.selectedRound,
        firstTeamName: this.firstTeamName,
        secondTeamName: this.secondTeamName
      }).then(res => {
        this.findGames(res.gameId)
        swal.fire({
          title: 'Invite to the game',
          text: this.$refs.inviteUrl.value,
          showCloseButton: true
        })
        localStorage.setItem('gameId', this.inviteId)
        this.$router.push('/')
      })
    }
  },
  mounted() {
    let uri = URI(window.location.href)
    const { join: gameId } = uri.query(true)
    if (gameId) {
      this.findGames(localStorage.getItem('gameId'))
    }
    this.findAll()
    if (gameId) {
      console.log('joining..')
      this.joinGame(gameId).then(_ => {
        console.log('joined')
        if (this.opponentIsJoined) {
          this.$router.push('/')
        }
      })
    }
  }
}
</script>

<style>
</style>
