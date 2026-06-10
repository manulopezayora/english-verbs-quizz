<script setup lang="ts">
import QuestionComponent from '@/components/QuestionComponent.vue'
import { questions } from '@/data/questions'

const checkAnswer = (answer: string) => {
  console.log(answer)
}
</script>

<template>
  <h1>English verbs</h1>

  <QuestionComponent :question="questions[67]!" @answer="checkAnswer" />
</template>

<style lang="css" scoped></style>
