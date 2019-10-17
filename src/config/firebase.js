const firebase = require('firebase/app')
require('firebase/firestore')
require('firebase/auth')

// Initialize Cloud Firestore through Firebase
// firebase.initializeApp({
//   apiKey: 'AIzaSyBglgy7ZoAA1Ul9AE3MR0hj4XI1nYEZhZ0',
//   authDomain: 'ngibulaja-4acc7.firebaseapp.com',
//   databaseURL: 'https://ngibulaja-4acc7.firebaseio.com',
//   projectId: 'ngibulaja-4acc7',
//   storageBucket: 'ngibulaja-4acc7.appspot.com',
//   messagingSenderId: '378855200674',
//   appId: '1:378855200674:web:1a8695e8a171868d9304fb'
// })
firebase.initializeApp({
  apiKey: 'AIzaSyDqkiXCq-yTQYzHCP-SkjQCQvTmvGiHpCA',
  authDomain: 'kanban-d99f9.firebaseapp.com',
  projectId: 'kanban-d99f9'
})

module.exports = firebase
