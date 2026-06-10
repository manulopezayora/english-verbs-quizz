<script setup lang="ts">
import { ref } from 'vue'
import QuestionComponent from '@/components/QuestionComponent.vue'
import { useQuiz } from '@/composables/useQuiz'
import type { QuizFilters } from '@/composables/useQuiz'

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
} = useQuiz()

const selectedDifficulties = ref<string[]>([])
const selectedTypes = ref<string[]>([])
const selectedForms = ref<string[]>([])
const selectedCount = ref(10)

function toggle(arr: string[], value: string) {
  const idx = arr.indexOf(value)
  if (idx >= 0) arr.splice(idx, 1)
  else arr.push(value)
}

function handleStart() {
  const filters: QuizFilters = {
    difficulties: selectedDifficulties.value,
    types: selectedTypes.value,
    forms: selectedForms.value,
    questionCount: selectedCount.value,
  }
  startQuiz(filters)
}

function handleRestart() {
  selectedDifficulties.value = []
  selectedTypes.value = []
  selectedForms.value = []
  selectedCount.value = 10
  startQuiz()
}

const difficulties = ['easy', 'medium', 'hard']
const types = ['regular', 'irregular']
const forms = [
  { value: 'past-simple', label: 'Past Simple' },
  { value: 'past-participle', label: 'Past Participle' },
]
const counts = [5, 10, 20, 0]

const countLabel = (c: number) => (c === 0 ? 'All' : String(c))
</script>

<template>
  <div class="home">
    <h1>English Verbs Quiz</h1>

    <div v-if="!isPlaying && !isFinished" class="filters">
      <p class="filter-title">Select topics to practice:</p>

      <div class="filter-group">
        <p class="filter-label">Difficulty</p>
        <div class="filter-options">
          <button
            v-for="d in difficulties"
            :key="d"
            :class="['filter-btn', { active: selectedDifficulties.includes(d) }]"
            @click="toggle(selectedDifficulties, d)"
          >
            {{ d }}
          </button>
        </div>
      </div>

      <div class="filter-group">
        <p class="filter-label">Verb Type</p>
        <div class="filter-options">
          <button
            v-for="t in types"
            :key="t"
            :class="['filter-btn', { active: selectedTypes.includes(t) }]"
            @click="toggle(selectedTypes, t)"
          >
            {{ t }}
          </button>
        </div>
      </div>

      <div class="filter-group">
        <p class="filter-label">Form</p>
        <div class="filter-options">
          <button
            v-for="f in forms"
            :key="f.value"
            :class="['filter-btn', { active: selectedForms.includes(f.value) }]"
            @click="toggle(selectedForms, f.value)"
          >
            {{ f.label }}
          </button>
        </div>
      </div>

      <div class="filter-group">
        <p class="filter-label">Questions</p>
        <div class="filter-options">
          <button
            v-for="c in counts"
            :key="c"
            :class="['filter-btn', { active: selectedCount === c }]"
            @click="selectedCount = c"
          >
            {{ countLabel(c) }}
          </button>
        </div>
      </div>

      <button class="start-btn" @click="handleStart">Start Quiz</button>
    </div>

    <div v-if="isFinished" class="result">
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
            ({{ item.question.translation }})
            &mdash; {{ item.question.form }}
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

      <button class="restart-btn" @click="handleRestart">Try Again</button>
    </div>

    <template v-else-if="isPlaying && currentQuestion">
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

.filters {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}

.filter-title {
  font-size: 1.1rem;
  color: #444;
}

.filter-group {
  text-align: left;
}

.filter-label {
  font-size: 0.9rem;
  font-weight: 600;
  color: #555;
  margin-bottom: 0.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.filter-options {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.filter-btn {
  padding: 0.5rem 1rem;
  border: 2px solid #ddd;
  border-radius: 8px;
  background: #fff;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s;
  text-transform: capitalize;
}

.filter-btn:hover {
  border-color: #646cff;
  background: #f0f0ff;
}

.filter-btn.active {
  border-color: #646cff;
  background: #646cff;
  color: white;
}

.start-btn {
  margin-top: 0.5rem;
  padding: 0.75rem 2rem;
  background: #22c55e;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  cursor: pointer;
}

.start-btn:hover {
  background: #16a34a;
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
