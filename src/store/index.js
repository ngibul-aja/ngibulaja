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
      team2Name: '',
      team1Points: 0,
      team2Points: 0,
      whomTurn: 1
    },
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
    setCards(state, payload) {
      state.cards = payload
    },
    setPlayers(state, payload) {
      state.settings.team1Name = payload.firstTeamName
      state.settings.team2Name = payload.secondTeamName
      state.settings.timePerRound = payload.selectedTime
      state.settings.maximumPoints = payload.selectedRound
    },
    newRemoteGame(state, payload) {
      state.settings.remoteGameId = payload.gameId
      state.settings.remoteInviteId = payload.inviteId
    },
    joinRemoteGame(state, payload) {
      state.remoteGameId = payload.gameId
    },
    setOpponentIsJoined(state, payload) {
      state.opponentIsJoined = payload
    },
    setGames(state, payload) {
      // state.game = payload
      state.game.team1Name = payload.playerOne
      state.game.team2Name = payload.playerTwo
      state.game.timePerRound = payload.timePerRound
      state.game.maximumPoints = payload.maximumPoints
      state.game.team1Points = payload.team1Points
      state.game.team2Points = payload.team2Points
      state.game.whomTurn = payload.whomTurn
    },
    setScore(state, payload) {
      console.log(payload, '&&&&&&&&&&&&&&&&&&&&&&&&')
      state.game = payload
    }
  },
  actions: {
    findAll({ commit }) {
      db.collection('cards').onSnapshot(qS => {
        const cards = []
        qS.forEach(doc => {
          cards.push(doc.data())
        })
        commit('setCards', cards)
      })
    },
    findGames({ commit, state }, payload) {
      db.collection('games')
        .doc(payload)
        .onSnapshot(doc => {
          const data = doc.data()
          commit('setGames', data)
        })
    },
    newGame({ commit }, payload) {
      return new Promise((resolve, reject) => {
        RemoteGame.create(payload).then(res => {
          commit('setPlayers', payload)
          commit('newRemoteGame', res)
          localStorage.setItem('gameId', res.gameId)
          resolve(res)
        })
      })
    },
    joinGame({ commit }, gameId) {
      return new Promise((resolve, reject) => {
        RemoteGame.join(gameId).then(res => {
          // commit('joinRemoteGame', res)
          commit('setOpponentIsJoined', true)
          localStorage.setItem('gameId', gameId)
          localStorage.setItem('whoFirst', 0)
          resolve(res, 'joined game')
        })
      })
    },
    addScore({ commit }, game) {
      console.log(game)
      if (game.whomTurn == 1) {
        game.team1Points++
        db.collection('games')
          .doc(game.id)
          .update({
            team1Points: game.team1Points
          })
          .then(_ => {
            console.log('updated')
            commit('setScore', game)
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        game.team2Points++
        db.collection('games')
          .doc(game.id)
          .update({
            team2Points: game.team2Points
          })
          .then(_ => {
            console.log('updated')
            commit('setScore', game)
          })
          .catch(err => {
            console.log(err)
          })
      }
    },
    minScore({ commit }, game) {
      console.log(game)
      if (game.whomTurn == 1) {
        game.team1Points--
        db.collection('games')
          .doc(game.id)
          .update({
            team1Points: game.team1Points
          })
          .then(_ => {
            console.log('updated')
            commit('setScore', game)
          })
          .catch(err => {
            console.log(err)
          })
      } else {
        game.team2Points--
        db.collection('games')
          .doc(game.id)
          .update({
            team2Points: game.team2Points
          })
          .then(_ => {
            console.log('updated')
            commit('setScore', game)
          })
          .catch(err => {
            console.log(err)
          })
      }
    }
  },
  getters: {
    inviteId: state => {
      return state.settings.remoteInviteId
    }
  },
  modules: {}
})
