<script setup lang="ts">
import type { WrongAnswer } from '@/interfaces';

interface Props {
  score: number;
  total: number;
  wrongAnswers: WrongAnswer[];
}

defineProps<Props>();

const emit = defineEmits<{
  restart: [];
}>();
</script>

<template>
  <div class="result">
    <h2>Quiz Complete!</h2>
    <p class="score">
      You scored <strong>{{ score }}</strong> out of <strong>{{ total }}</strong>
    </p>
    <p class="percentage">{{ Math.round((score / total) * 100) }}%</p>

    <div v-if="wrongAnswers.length > 0" class="review">
      <h3>Review your mistakes ({{ wrongAnswers.length }})</h3>
      <div v-for="(item, i) in wrongAnswers" :key="i" class="review-card">
        <p class="review-question">
          <strong>{{ item.question.infinitive }}</strong>
          ({{ item.question.translation }}) &mdash; {{ item.question.form }}
        </p>
        <p class="review-answers">
          <span class="review-wrong">
            Your answer: {{ item.question.options[item.selectedIndex] }}
          </span>
          <span class="review-correct">
            Correct: {{ item.question.options[item.question.correctAnswer] }}
          </span>
        </p>
      </div>
    </div>

    <p v-else class="perfect">Perfect score! No mistakes.</p>

    <button class="restart-btn" @click="emit('restart')">Try Again</button>
  </div>
</template>

<style scoped>
.result h2 {
  font-size: 1.5rem;
  margin-bottom: 1rem;
}

.result .score {
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
}

.result .percentage {
  font-size: 3rem;
  font-weight: bold;
  color: #646cff;
  margin-bottom: 1.5rem;
}

.review {
  text-align: left;
  margin-bottom: 1.5rem;
}

.review h3 {
  font-size: 1.1rem;
  margin-bottom: 0.75rem;
  text-align: center;
}

.review-card {
  background: #f9fafb;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 0.75rem;
  margin-bottom: 0.5rem;
}

.review-question {
  font-size: 0.95rem;
  margin-bottom: 0.25rem;
  text-transform: capitalize;
}

.review-answers {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  font-size: 0.85rem;
}

.review-wrong {
  color: #dc2626;
}

.review-correct {
  color: #16a34a;
  font-weight: 600;
}

.perfect {
  font-size: 1.1rem;
  color: #16a34a;
  margin-bottom: 1.5rem;
}

.restart-btn {
  padding: 0.75rem 2rem;
  background: #22c55e;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
}

.restart-btn:hover {
  background: #16a34a;
}
</style>
