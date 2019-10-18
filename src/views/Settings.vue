<template>
  <div class="container d-flex justify-content-center flex-wrap">
    {{ cards }}
    <br />
    <br />
    {{ settings }}
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

        <div>
        <div class="row d-flex justify-content-center mb-3">
            <span class="mr-auto">First Team Name</span>
            <input class="form-control w-75" type="text" placeholder=" Input Your Team Name " v-model="firstTeamName" required>
        </div>
        <div class="row d-flex justify-content-center mb-3">
            <span class="mr-auto"> Second Team Name</span>
            <input class="form-control w-75" type="text" placeholder=" Input Your Team Name " v-model="secondTeamName" required>
        </div>

        </div>
      <button type="submit" class="btn btn-primary">Let's Start The Game !!!</button>
      </div>

    </form>

    <div v-if="inviteId && invitationUrl">
      <input :value="invitationUrl" readonly ref="inviteUrl" />
      <button id="copy_invite" @click="copyInvite">copy</button>
    </div>
    {{ inviteId }}
    {{ invitationUrl }}
  </div>
</template>

<script>
import db from '../config/firestore'
import { mapState, mapActions, mapGetters } from 'vuex'
import URI from 'urijs'

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
    ...mapState(['cards', 'settings']),
    ...mapGetters(['inviteId']),
    invitationUrl () {
      return window.location.origin + `/settings/?join=${this.inviteId}`
    }
  },
  methods: {
    ...mapActions(['newGame', 'joinGame']),
    copyInvite () {
      this.$refs.inviteUrl.value
      document.execCommand('copy')
    },
    doNewGame () {
      this.newGame({
        selectedTime: this.selectedTime,
        selectedRound: this.selectedRound,
        firstTeamName: this.firstTeamName,
        secondTeamName: this.secondTeamName
      }).then(res => {
        console.log(res)
      })
    },
    createGame () {
      db.collection('settings')
        .add({
          selectedTime: this.selectedTime,
          selectedRound: this.selectedRound,
          firstTeamName: this.firstTeamName,
          secondTeamName: this.secondTeamName
        })
        .then(function (docRef) {
          console.log('Document written with ID: ', docRef.id)
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
  mounted () {
    let uri = URI(window.location.href)
    const { join: gameId } = uri.query(true)
    if (gameId) {
      console.log('joining..')
      this.joinGame(gameId).then(_ => {
        console.log('joined')
      })
    }
  }
}
</script>

<style></style>
