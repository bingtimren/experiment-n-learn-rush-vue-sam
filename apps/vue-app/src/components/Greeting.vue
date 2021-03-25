<template>
  <p>What's your name? <input type="text" v-model="name"/></p>
  <p>
    Greetings: {{ greeting(name) }}{{terminator}}
  </p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {greeting} from "@bingsjs/greeting"
export default defineComponent({
  name: 'Greeting',
  props: {
    terminator: {
      type: String,
      required: false,
      default: "!"
    },
  },
  data() {
    return { name : "Stranger"}
  },
  methods: {
    greeting(name:string) {
      return greeting(name)
    }
  } 
})
</script>