import Vue from 'vue'
import Vuex from 'vuex'
import db from '@/config/firestore'

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
    }
  },
  modules: {}
})
