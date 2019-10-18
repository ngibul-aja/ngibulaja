<template>
  <div class="about">
    <button @click="toMain" class="btn btn-primary w-75 py-5"><h1><strong>NEW GAME</strong></h1></button>
  </div>
</template>

<script>
export default {
  methods: {
    toMain () {
      this.$router.push('main')
    }
  }
}
</script>

<style>

</style>
