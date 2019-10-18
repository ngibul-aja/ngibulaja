<template>
    <div>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4 justify-content-between">
        <div  class="btn btn-primary">
          NGIBUL 1 <span class="badge badge-light ml-2">{{score}}</span>
        </div>
        <div>
          <span class="text-white">20</span>
        </div>
        <div  class="btn btn-primary">
          NGIBUL 2 <span class="badge badge-light ml-2">0</span>
        </div>
    </nav>

     <section class="text-center">
        <div class="container">
            {{randomNum}}
          <h1 class="bg-secondary p-2 rounded text-white">{{listCards[randomNum].keyword}}</h1>
        </div>
        <div class="container justify-content-center">
            <div v-for="(card, index) in listCards[randomNum].values" :key="index">
                <p class="lead text-danger">{{card}}</p>
            </div>
        </div>
        <div class="container d-flex justify-content-center">
            <div class="col">
                <a @click="minScore" href="#" class="btn btn-danger my-2 w-75" ><img src="https://image.flaticon.com/icons/svg/126/126497.svg" alt="" width="70"></a>
            </div>
            <div class="col">
                <a  @click="next" href="#" class="btn btn-info my-2 w-75"> <img src="https://image.flaticon.com/icons/svg/159/159695.svg" alt="" width="70"> </a>
            </div>
            <div class="col">
                <a @click="addScore" href="#" class="btn btn-success my-2 w-75"><img src="https://image.flaticon.com/icons/svg/149/149148.svg" alt="" width="70"></a>
            </div>
            
            
            
        </div>
      </section>
    </div>

</template>

<script>
import db from "../../src/config/firestore"
export default {
    data () {
        return {
            listCards : [],
            randomNum : Math.floor(Math.random()*30),
            score : 0
        }
    },methods :{
        addScore(){
            this.score++
            this.next()
        },
        minScore(){
            this.score--
            this.next()
        },
        next(){
            this.randomNum = Math.floor(Math.random()*30)
        },
        
    },
    created(){
    db.collection("cards")
    .onSnapshot(doc=> {
        doc.forEach(card =>{
          this.listCards.push(card.data())
        })
        console.log(this.listCards)
    });
    }
}
</script>

<style>

</style>