<script setup lang="ts">
import type { Question } from '@/interfaces/Question.interface'
import { computed } from 'vue'

const FORMS = {
  'past-simple': 'past simple',
  'past-participle': 'past participle',
}

interface Props {
  question: Question
}
const props = defineProps<Props>()
const emit = defineEmits(['answer'])

const parsedQuestion = computed(
  () =>
    `Which one is the correct conjugation of the verb "${props.question.infinitive}" in ${FORMS[props.question.form]} ?`,
)
</script>

<template>
  <section>
    <h2>{{ props.question.infinitive }}</h2>
    <p>{{ props.question.translation }}</p>
    <div class="options">
      <p class="question">{{ parsedQuestion }}</p>
      <button
        v-for="option in props.question.options"
        :key="option"
        @click="emit('answer', option)"
      >
        {{ option }}
      </button>
    </div>
  </section>
</template>

<style scoped></style>
