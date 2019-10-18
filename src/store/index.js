import Vue from 'vue'
import Vuex from 'vuex'
import db from '@/config/firestore'
import RemoteGame from '@/RemoteGame'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    settings: {
      timePerRound: 45000,
      maximumPoints: 10,
      team1Name: '1',
      team2Name: '2',
      remoteGameId: '',
      remoteInviteId: ''
    },
    cards: [],
    // game: [],
    game: {
      timePerRound: 0,
      maximumPoints: 0,
      team1Name: '',
      team2Name: ''
    },
    team1Points: 0,
    team2Points: 0,
    roundNumber: 0,
    whomTurn: 1,
    opponentIsJoined: false,
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
      state.settings.remoteGameId = payload.gameId
      state.settings.remoteInviteId = payload.inviteId
    },
    joinRemoteGame (state, payload) {
      state.remoteGameId = payload.gameId
    },
    setOpponentIsJoined (state, payload) {
      state.opponentIsJoined = payload
    },
    setGames (state, payload) {
      // state.game = payload
      state.game.team1Name = payload.playerOne
      state.game.team2Name = payload.playerTwo
      state.game.timePerRound = payload.timePerRound
      state.game.maximumPoints = payload.maximumPoints
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
    findGames ({ commit, state }, payload) {
      console.log(payload, 'asdferppp')
      db.collection('games')
        .doc(payload)
        .onSnapshot(doc => {
          console.log('qssssss', doc.data())
          const data = doc.data()
          commit('setGames', data)
        })
    },
    newGame ({ commit }, payload) {
      console.log(payload, 'ini paylaod')
      return new Promise((resolve, reject) => {
        RemoteGame.create(payload).then(res => {
          console.log(res, 'asdf res')
          commit('setPlayers', payload)
          commit('newRemoteGame', res)
          localStorage.setItem('gameId', res.gameId)
          resolve(res)
        })
      })
    },
    joinGame ({ commit }, gameId) {
      console.log('gameiddd wooooiii', gameId)
      return new Promise((resolve, reject) => {
        RemoteGame.join(gameId).then(res => {
          console.log(res, 'joinigggg resss hereeee')
          // commit('joinRemoteGame', res)
          commit('setOpponentIsJoined', true)
          console.log(res, 'zzzzzzzzzzzzzzzzzzzzzz')
          localStorage.setItem('gameId', gameId)
          resolve(res, 'joined game')
        })
      })
    }
  },
  getters: {
    inviteId: state => {
      return state.settings.remoteInviteId
    }
  },
  modules: {}
})
