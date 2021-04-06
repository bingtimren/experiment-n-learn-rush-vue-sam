<template>
  <p>What's your name? <input type="text" v-model="name"/></p>
  <p>
    Greetings: {{ greeting(name) }}{{terminator}}
  </p>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import {greeting} from "@bingsjs/greeting"
import S from "string";
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
      return greeting(S(name).titleCase().toString());
    }
  } 
})
</script>