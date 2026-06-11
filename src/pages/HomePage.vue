<script setup lang="ts">
import FilterPanel from '@/components/FilterPanel.vue';
import QuestionComponent from '@/components/QuestionComponent.vue';
import QuizProgress from '@/components/QuizProgress.vue';
import ResultScreen from '@/components/ResultScreen.vue';
import { useQuiz } from '@/composables/useQuiz';
import type { QuizFilters } from '@/interfaces';

const {
  currentQuestion,
  currentIndex,
  score,
  total,
  progress,
  selectedAnswer,
  isFinished,
  isPlaying,
  wrongAnswers,
  startQuiz,
  selectAnswer,
  nextQuestion,
} = useQuiz();

const handleStart = (filters: QuizFilters) => {
  startQuiz(filters);
};

const handleRestart = () => {
  isPlaying.value = false;
  isFinished.value = false;
};
</script>

<template>
  <div class="home">
    <h1>English Verbs Quiz</h1>

    <FilterPanel v-if="!isPlaying && !isFinished" @start="handleStart" />

    <ResultScreen
      v-if="isFinished"
      :score="score"
      :total="total"
      :wrong-answers="wrongAnswers"
      @restart="handleRestart"
    />

    <template v-else-if="isPlaying && currentQuestion">
      <QuizProgress :current="currentIndex + 1" :total="total" :progress="progress" />

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
</style>
