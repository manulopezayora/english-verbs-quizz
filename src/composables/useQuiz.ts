import { questions } from '@/data/questions';
import type { QuizFilters, WrongAnswer } from '@/interfaces';
import type { Question } from '@/interfaces/Question.interface';
import { computed, ref } from 'vue';

const shuffle = <T>(array: T[]): T[] => {
  const arr = [...array];

  for (let index = arr.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    const temp = arr[index]!;
    arr[index] = arr[randomIndex]!;
    arr[randomIndex] = temp;
  }

  return arr;
};

export const useQuiz = () => {
  const shuffled = ref<Question[]>([]);
  const currentIndex = ref(0);
  const score = ref(0);
  const selectedAnswer = ref<number | null>(null);
  const isFinished = ref(false);
  const isPlaying = ref(false);
  const wrongAnswers = ref<WrongAnswer[]>([]);

  const currentQuestion = computed(() => shuffled.value[currentIndex.value] ?? null);
  const total = computed(() => shuffled.value.length);
  const progress = computed(() => total.value > 0 ? ((currentIndex.value + 1) / total.value) * 100 : 0);

  const applyFilters = (questions: Question[], filters: QuizFilters) => {
    let result = questions;

    if (filters.difficulties.length) {
      result = result.filter(question => filters.difficulties.includes(question.difficulty));
    }

    if (filters.types.length) {
      result = result.filter(question => filters.types.includes(question.type));
    }

    if (filters.forms.length) {
      result = result.filter(question => filters.forms.includes(question.form));
    }

    return result;
  };

  const startQuiz = (filters?: QuizFilters) => {
    const filtered = filters ? applyFilters(questions, filters) : questions;
    const count = filters?.questionCount ?? 10;
    const picked = shuffle(filtered).slice(0, count > 0 ? count : filtered.length);

    shuffled.value = picked;
    currentIndex.value = 0;
    score.value = 0;
    selectedAnswer.value = null;
    isFinished.value = false;
    isPlaying.value = true;
    wrongAnswers.value = [];
  };

  const selectAnswer = (index: number) => {
    if (selectedAnswer.value !== null) {
      return;
    }

    selectedAnswer.value = index;

    if (index === currentQuestion.value!.correctAnswer) {
      score.value++;

      return;
    }

    wrongAnswers.value.push({
      question: currentQuestion.value!,
      selectedIndex: index,
    });
  };

  const nextQuestion = () => {
    if (currentIndex.value < shuffled.value.length - 1) {
      currentIndex.value++;
      selectedAnswer.value = null;

      return;
    }

    isFinished.value = true;
  };

  return {
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
  };
};
