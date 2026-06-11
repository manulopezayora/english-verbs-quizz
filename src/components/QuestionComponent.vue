<script setup lang="ts">
import type { Question } from '@/interfaces/Question.interface';
import { computed } from 'vue';

const FORMS: Record<string, string> = {
  'past-simple': 'past simple',
  'past-participle': 'past participle',
};

interface Props {
  question: Question;
  selectedAnswer: number | null;
}

const props = defineProps<Props>();
const emit = defineEmits(['select']);

const parsedQuestion = computed(
  () =>
    `Which one is the correct conjugation of the verb "${props.question.infinitive}" in ${FORMS[props.question.form]}?`,
);

const classOption = (index: number) => {
  if (props.selectedAnswer === null) {
    return '';
  }

  if (index === props.question.correctAnswer) {
    return 'correct';
  }

  if (index === props.selectedAnswer) {
    return 'incorrect';
  }

  return 'dimmed';
};
</script>

<template>
  <section>
    <p class="question">{{ parsedQuestion }}</p>
    <p class="translation">{{ props.question.translation }}</p>
    <div class="options">
      <button
        v-for="(option, index) in props.question.options"
        :key="option"
        :class="['option-btn', classOption(index)]"
        :disabled="selectedAnswer !== null"
        @click="emit('select', index)"
      >
        {{ option }}
      </button>
    </div>
    <p v-if="selectedAnswer !== null" class="explanation">
      <span>Difficulty: {{ props.question.difficulty }}</span>
      <span>Type: {{ props.question.type }}</span>
    </p>
  </section>
</template>

<style scoped>
.question {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
}

.translation {
  color: #666;
  margin-bottom: 1rem;
  text-transform: capitalize;
}

.options {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.option-btn {
  padding: 0.75rem 1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  background: #fff;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s;
  text-transform: capitalize;
}

.option-btn:hover:not(:disabled) {
  border-color: #646cff;
  background: #f0f0ff;
}

.option-btn.correct {
  border-color: #22c55e;
  background: #dcfce7;
  color: #166534;
}

.option-btn.incorrect {
  border-color: #ef4444;
  background: #fee2e2;
  color: #991b1b;
}

.option-btn.dimmed {
  opacity: 0.5;
}

.explanation {
  margin-top: 1rem;
  color: #888;
  font-size: 0.85rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  text-transform: capitalize;
}
</style>
