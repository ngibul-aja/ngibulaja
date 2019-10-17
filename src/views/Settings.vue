<template>
  <div class="container d-flex justify-content-center flex-wrap">
    {{ cards }}
    <br />
    <br />
    {{ settings }}
    <form id="settings" v-if="showSetting" @submit.prevent="doNewGame">
      <h1>Settings</h1>
      <div class="col">
        <label>Time Per Round</label>
        <br />
        <select v-model="selectedTime" required>
          <option>15</option>
          <option>30</option>
          <option>45</option>
        </select>
      </div>
      <div class="col">
        <label>Number of Points to Win</label>
        <br />
        <select v-model="selectedRound" required>
          <option>5</option>
          <option>10</option>
          <option>15</option>
        </select>
      </div>
      <div class="row">
        <span>First Team Name</span>
        <input type="text" placeholder="Input Your Team Name" v-model="firstTeamName" required />
      </div>
      <div class="row">
        <span>Second Team Name</span>
        <input type="text" placeholder="Input Your Team Name" v-model="secondTeamName" required />
      </div>
      <button type="submit" class="btn btn-primary">Let's Start The Game !!!</button>
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
      return window.location.origin + `/?join=${this.inviteId}`
    }
  },
  methods: {
    ...mapActions(['newGame']),
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
  }
}
</script>

<style></style>
