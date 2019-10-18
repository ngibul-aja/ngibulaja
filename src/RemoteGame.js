import firebase from 'firebase/app'
import db from '@/config/firestore'

class RemoteGame {
  constructor (store) {
    this.store = store
    let gameId = store.state.remoteGameId

    // if (!store.state[WHITE]) {
    //   let opponent = db.ref(`games/${gameId}/${WHITE}`)
    //   let cb = snapshot => {
    //     if (!snapshot.val()) {
    //       return
    //     }

    //     store.dispatch('remoteOpponentAccepted', { opponentId: snapshot.val() })
    //     opponent.off('value', cb)
    //   }
    //   opponent.on('value', cb)
    // }

    // // TODO: If no opponent yet, listen for acceptance of invitation!
    // this.movesRef = db.ref('moves').child(gameId)
    // this.movesRef.on('child_added', m => {
    //   store.dispatch('addRemoteMove', { id: m.key, move: m.val() })
    // })
    // }

    // pass() {
    // this.movesRef.push({
    //   type: 'pass'
    // })
    // }

    // play({ x, y }) {
    // this.movesRef.push({
    //   type: 'play',
    //   params: {
    //     x,
    //     y
    //   }
    // })
    // }

    // localCurrentTurn() {
    // let t = this.store.getters.currentTurn

    // if (!t) {
    //   return t
    // }

    // let uid = firebase.auth().currentUser.uid

    // return this.store.state[t] === uid ? t : null
  }
}

RemoteGame.create = async function (payload) {
  if (!firebase.auth().currentUser) {
    firebase
      .auth()
      .signInAnonymously()
      .then(() => RemoteGame.create(payload))
  }

  const newGame = await db.collection('games').add({
    playerOne: payload.firstTeamName,
    playerTwo: payload.secondTeamName,
    timePerRound: payload.selectedTime,
    maximumPoints: payload.selectedRound
  })
  const key = newGame.id

  return Promise.resolve({ ...payload, gameId: key, inviteId: key })
}

RemoteGame.join = async function (gameId) {
  if (!firebase.auth().currentUser) {
    firebase
      .auth()
      .signInAnonymously()
      .then(() => RemoteGame.join(gameId))
  }

  // const newGame = await db
  //   .collection('games')
  //   .doc(gameId)
  //   .update({
  //     playerTwo: firebase.auth().currentUser.id
  //   })
  // console.log('************')
  // console.log({ gameId, newGame })

  // const key = newGame.id
  // console.log('key', key)

  // let game = db.ref(`games/${gameId}`)
  // return promiseTry(() => game.update({ [WHITE]: firebase.auth().currentUser.uid }))
  //   .then(() => game.once('value'))
  //   .then(v => {
  //     let { size, [WHITE]: white, [BLACK]: black } = v.val()

  return Promise.resolve()
  // return Promise.resolve({ ...newGame, gameId: newGame.id })
  // })
}

export default RemoteGame
