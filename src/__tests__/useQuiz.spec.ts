import { describe, it, expect, beforeEach } from 'vitest'
import { useQuiz } from '@/composables/useQuiz'
import type { QuizFilters } from '@/interfaces'

describe('useQuiz', () => {
  let quiz: ReturnType<typeof useQuiz>

  beforeEach(() => {
    quiz = useQuiz()
  })

  it('starts in idle state', () => {
    expect(quiz.isPlaying.value).toBe(false)
    expect(quiz.isFinished.value).toBe(false)
    expect(quiz.currentQuestion.value).toBeNull()
    expect(quiz.score.value).toBe(0)
    expect(quiz.total.value).toBe(0)
    expect(quiz.progress.value).toBe(0)
    expect(quiz.selectedAnswer.value).toBeNull()
    expect(quiz.wrongAnswers.value).toEqual([])
  })

  it('starts a quiz with default 10 questions', () => {
    quiz.startQuiz()
    expect(quiz.isPlaying.value).toBe(true)
    expect(quiz.total.value).toBe(10)
    expect(quiz.currentIndex.value).toBe(0)
    expect(quiz.currentQuestion.value).not.toBeNull()
  })

  it('starts a quiz with custom question count', () => {
    const filters: QuizFilters = {
      difficulties: [],
      types: [],
      forms: [],
      questionCount: 5,
    }
    quiz.startQuiz(filters)
    expect(quiz.total.value).toBe(5)
  })

  it('starts a quiz with all questions when count is 0', () => {
    const filters: QuizFilters = {
      difficulties: [],
      types: [],
      forms: [],
      questionCount: 0,
    }
    quiz.startQuiz(filters)
    expect(quiz.total.value).toBeGreaterThan(10)
  })

  it('filters by difficulty', () => {
    const filters: QuizFilters = {
      difficulties: ['hard'],
      types: [],
      forms: [],
      questionCount: 50,
    }
    quiz.startQuiz(filters)
    expect(quiz.total.value).toBeGreaterThan(0)
    for (const q of quiz.shuffled.value) {
      expect(q.difficulty).toBe('hard')
    }
  })

  it('filters by verb type', () => {
    const filters: QuizFilters = {
      difficulties: [],
      types: ['regular'],
      forms: [],
      questionCount: 50,
    }
    quiz.startQuiz(filters)
    expect(quiz.total.value).toBeGreaterThan(0)
    for (const q of quiz.shuffled.value) {
      expect(q.type).toBe('regular')
    }
  })

  it('filters by form', () => {
    const filters: QuizFilters = {
      difficulties: [],
      types: [],
      forms: ['past-simple'],
      questionCount: 50,
    }
    quiz.startQuiz(filters)
    expect(quiz.total.value).toBeGreaterThan(0)
    for (const q of quiz.shuffled.value) {
      expect(q.form).toBe('past-simple')
    }
  })

  it('selectAnswer increments score on correct answer', () => {
    quiz.startQuiz()
    const correctIndex = quiz.currentQuestion.value!.correctAnswer
    quiz.selectAnswer(correctIndex)
    expect(quiz.score.value).toBe(1)
    expect(quiz.wrongAnswers.value.length).toBe(0)
  })

  it('selectAnswer tracks wrong answers', () => {
    quiz.startQuiz()
    const correctIndex = quiz.currentQuestion.value!.correctAnswer
    const wrongIndex = correctIndex === 0 ? 1 : 0
    quiz.selectAnswer(wrongIndex)
    expect(quiz.score.value).toBe(0)
    expect(quiz.wrongAnswers.value.length).toBe(1)
    expect(quiz.wrongAnswers.value[0]!.selectedIndex).toBe(wrongIndex)
  })

  it('selectAnswer is ignored after first selection', () => {
    quiz.startQuiz()
    const correctIndex = quiz.currentQuestion.value!.correctAnswer
    quiz.selectAnswer(correctIndex)
    expect(quiz.score.value).toBe(1)

    quiz.selectAnswer(correctIndex === 0 ? 1 : 0)
    expect(quiz.score.value).toBe(1)
  })

  it('nextQuestion advances to next question', () => {
    quiz.startQuiz()

    const correctIndex = quiz.currentQuestion.value!.correctAnswer
    quiz.selectAnswer(correctIndex)
    expect(quiz.currentIndex.value).toBe(0)

    quiz.nextQuestion()
    expect(quiz.currentIndex.value).toBe(1)
    expect(quiz.selectedAnswer.value).toBeNull()
  })

  it('nextQuestion finishes the quiz on last question', () => {
    const filters: QuizFilters = {
      difficulties: [],
      types: [],
      forms: [],
      questionCount: 1,
    }
    quiz.startQuiz(filters)

    const correctIndex = quiz.currentQuestion.value!.correctAnswer
    quiz.selectAnswer(correctIndex)
    quiz.nextQuestion()

    expect(quiz.isFinished.value).toBe(true)
    expect(quiz.isPlaying.value).toBe(true)
  })

  it('progress increases throughout the quiz', () => {
    const filters: QuizFilters = {
      difficulties: [],
      types: [],
      forms: [],
      questionCount: 3,
    }
    quiz.startQuiz(filters)

    expect(quiz.progress.value).toBeCloseTo((1 / 3) * 100, 1)

    const correctIndex = quiz.currentQuestion.value!.correctAnswer
    quiz.selectAnswer(correctIndex)
    quiz.nextQuestion()
    expect(quiz.progress.value).toBeCloseTo((2 / 3) * 100, 1)

    quiz.selectAnswer(correctIndex)
    quiz.nextQuestion()
    expect(quiz.progress.value).toBeCloseTo((3 / 3) * 100, 1)
  })

  it('restart resets state', () => {
    quiz.startQuiz()
    quiz.selectAnswer(0)
    quiz.nextQuestion()
    quiz.startQuiz()

    expect(quiz.isPlaying.value).toBe(true)
    expect(quiz.isFinished.value).toBe(false)
    expect(quiz.currentIndex.value).toBe(0)
    expect(quiz.score.value).toBe(0)
    expect(quiz.selectedAnswer.value).toBeNull()
    expect(quiz.wrongAnswers.value).toEqual([])
  })
})
