<script setup lang="ts">
import QuestionComponent from '@/components/QuestionComponent.vue';
import { useQuiz } from '@/composables/useQuiz';
import { onMounted } from 'vue';

const {
  currentQuestion,
  currentIndex,
  score,
  total,
  progress,
  selectedAnswer,
  isFinished,
  startQuiz,
  selectAnswer,
  nextQuestion,
} = useQuiz();

onMounted(startQuiz);
</script>

<template>
  <div class="home">
    <h1>English Verbs Quiz</h1>

    <div v-if="isFinished" class="result">
      <h2>Quiz Complete!</h2>
      <p class="score">
        You scored <strong>{{ score }}</strong> out of <strong>{{ total }}</strong>
      </p>
      <p class="percentage">{{ Math.round((score / total) * 100) }}%</p>
      <button class="restart-btn" @click="startQuiz">Try Again</button>
    </div>

    <template v-else-if="currentQuestion">
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: progress + '%' }"></div>
      </div>
      <p class="counter">{{ currentIndex + 1 }} / {{ total }}</p>

      <QuestionComponent
        :question="currentQuestion"
        :selected-answer="selectedAnswer"
        @select="selectAnswer"
      />

      <button v-if="selectedAnswer !== null" class="next-btn" @click="nextQuestion">
        {{ currentIndex + 1 < total ? 'Next' : 'Finish' }}
      </button>
    </template>
  </div>
</template>

<style scoped>
.home {
  max-width: 600px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

h1 {
  margin-bottom: 1.5rem;
  font-size: 1.5rem;
}

.progress-bar {
  height: 8px;
  background: #e5e7eb;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.progress-fill {
  height: 100%;
  background: #646cff;
  transition: width 0.3s ease;
  border-radius: 4px;
}

.counter {
  color: #888;
  font-size: 0.85rem;
  margin-bottom: 1.5rem;
}

.next-btn {
  margin-top: 1.5rem;
  padding: 0.75rem 2rem;
  background: #646cff;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
}

.next-btn:hover {
  background: #535bf2;
}

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
