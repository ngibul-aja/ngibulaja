import Vue from 'vue'
import Vuex from 'vuex'
import db from '@/config/firestore'
import RemoteGame from '@/RemoteGame'
import promiseTry from 'es6-promise-try'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    settings: {
      timePerRound: 45000,
      maximumPoints: 10,
      team1Name: '1',
      team2Name: '2'
    },
    cards: [],
    remoteGameId: '',
    remoteInviteId: '',
    team1Points: 0,
    team2Points: 0,
    roundNumber: 0,
    whomTurn: 1,
    isRoundCompleted: false,
    showModal: true,
    timeLeft: 0,
    lastTurnPoints: 0,
    nextQuestion: 2,
    winner: null
  },
  mutations: {
    setCards (state, payload) {
      state.cards = payload
    },
    setPlayers (state, payload) {
      state.settings.team1Name = payload.firstTeamName
      state.settings.team2Name = payload.secondTeamName
      state.settings.timePerRound = payload.selectedTime
      state.settings.maximumPoints = payload.selectedRound
    },
    newRemoteGame (state, payload) {
      state.remoteGameId = payload.gameId
      state.remoteInviteId = payload.inviteId
    },
    joinRemoteGame (state, payload) {
      state.remoteGameId = payload.gameId
    },
    remote_opponent_accepted (state, remoteInviteId) {
      console.log(state, remoteInviteId)
    },
    join_remote_game (state, payload) {
      state.remoteGameId = payload
    }
  },
  actions: {
    findAll ({ commit }) {
      db.collection('cards').onSnapshot(qS => {
        const cards = []
        qS.forEach(doc => {
          cards.push(doc.data())
        })
        commit('setCards', cards)
      })
    },
    newGame ({ commit }, payload) {
      console.log(payload, 'ini paylaod')
      return new Promise((resolve, reject) => {
        commit('setPlayers', payload)
        RemoteGame.create(payload).then(res => {
          console.log(res, 'asdf res')
          commit('newRemoteGame', res)
          resolve('new game')
        })
      })
    },
    joinGame ({ commit }, gameId) {
      console.log('gameiddd wooooiii', gameId)
      console.log(RemoteGame)
      return promiseTry(() => {
        RemoteGame.join(gameId)
          .then(g => {
            console.log(g)
            commit('join_remote_game', g)
          })
      })
      // return new Promise((resolve, reject) => {
      //   RemoteGame.join({gameId}).then(res => {
      //     console.log(res, 'joinigggg resss hereeee')
      //     commit('join_remote_game', res)
      //     resolve('join game')
      //   })
      // })
    },
    remoteOpponentAccepted ({ commit }, { remoteInviteId }) {
      console.log('roa', remoteInviteId)
      commit('remote_opponent_accepted', { remoteInviteId })
    }
  },
  getters: {
    inviteId: state => {
      console.log('dari getters inviteid', state)
      return state.remoteInviteId
    }
  },
  modules: {}
})
