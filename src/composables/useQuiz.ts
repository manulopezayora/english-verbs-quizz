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

export const useQuiz = () => {
  const shuffled = ref<Question[]>([])
  const currentIndex = ref(0)
  const score = ref(0)
  const selectedAnswer = ref<number | null>(null)
  const isFinished = ref(false)

  const currentQuestion = computed(() => shuffled.value[currentIndex.value] ?? null)
  const total = computed(() => shuffled.value.length)
  const progress = computed(() =>
    total.value > 0 ? ((currentIndex.value + 1) / total.value) * 100 : 0,
  )

  const startQuiz = () => {
    shuffled.value = shuffle(questions).slice(0, 10)
    currentIndex.value = 0
    score.value = 0
    selectedAnswer.value = null
    isFinished.value = false
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
    startQuiz,
    selectAnswer,
    nextQuestion,
  }
}
