import { questions } from '@/data/questions'
import type { Question } from '@/interfaces/Question.interface'
import { computed, ref } from 'vue'

const shuffle = <T>(array: T[]): T[] => {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = arr[i]!
    arr[i] = arr[j]!
    arr[j] = temp
  }
  return arr
}

export interface QuizFilters {
  difficulties: string[]
  types: string[]
  forms: string[]
}

export const useQuiz = () => {
  const shuffled = ref<Question[]>([])
  const currentIndex = ref(0)
  const score = ref(0)
  const selectedAnswer = ref<number | null>(null)
  const isFinished = ref(false)
  const isPlaying = ref(false)

  const currentQuestion = computed(() => shuffled.value[currentIndex.value] ?? null)
  const total = computed(() => shuffled.value.length)
  const progress = computed(() =>
    total.value > 0 ? ((currentIndex.value + 1) / total.value) * 100 : 0,
  )

  const startQuiz = (filters?: QuizFilters) => {
    let filtered = questions

    if (filters) {
      if (filters.difficulties.length > 0) {
        filtered = filtered.filter((filter) => filters.difficulties.includes(filter.difficulty))
      }
      if (filters.types.length > 0) {
        filtered = filtered.filter((filter) => filters.types.includes(filter.type))
      }
      if (filters.forms.length > 0) {
        filtered = filtered.filter((filter) => filters.forms.includes(filter.form))
      }
    }

    shuffled.value = shuffle(filtered).slice(0, 10)
    currentIndex.value = 0
    score.value = 0
    selectedAnswer.value = null
    isFinished.value = false
    isPlaying.value = true
  }

  const selectAnswer = (index: number) => {
    if (selectedAnswer.value !== null) return
    selectedAnswer.value = index
    if (index === currentQuestion.value!.correctAnswer) {
      score.value++
    }
  }

  const nextQuestion = () => {
    if (currentIndex.value < shuffled.value.length - 1) {
      currentIndex.value++
      selectedAnswer.value = null
    } else {
      isFinished.value = true
    }
  }

  return {
    currentQuestion,
    currentIndex,
    score,
    total,
    progress,
    selectedAnswer,
    isFinished,
    isPlaying,
    startQuiz,
    selectAnswer,
    nextQuestion,
  }
}
