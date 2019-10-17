<template>
  <div class="container d-flex justify-content-center flex-wrap">
      <form id="settings" v-if="showSetting"  @submit="createGame">
        <h1>Settings</h1>
        <div class="col">
            <label>Time Per Round</label>
            <br>
            <select v-model="selectedTime" required>
                <option>15</option>
                <option>30</option>
                <option>45</option>
            </select>
        </div>
        <div class="col">
            <label>Number of Points to Win</label>
            <br>
            <select v-model="selectedRound" required>
                <option>5</option>
                <option>10</option>
                <option>15</option>
            </select>
        </div>
        <div class="row">
            <span>First Team Name</span>
            <input type="text" placeholder="Input Your Team Name" v-model="firstTeamName" required>
        </div>
        <div class="row">
            <span>Second Team Name</span>
            <input type="text" placeholder="Input Your Team Name" v-model="secondTeamName" required>
        </div>
        <button type="submit" class="btn btn-primary">Let's Start The Game !!!</button>
      </form>
  </div>
</template>

<script>
import db from '../config/firestore'
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
  methods: {
    createGame () {
      db.collection('settings').add({
        selectedTime: this.selectedTime,
        selectedRound: this.selectedRound,
        firstTeamName: this.firstTeamName,
        secondTeamName: this.secondTeamName
      })
        .then(function (docRef) {
          console.log('Document written with ID: ', docRef.id)
        })
        .catch(err => {
          console.log('ini error', err)
        })
    }
  }
}
</script>

<style>

</style>
