import { questions } from '@/data/questions';
import type { Question } from '@/interfaces/Question.interface';
import { computed, ref } from 'vue';

const shuffle = <T>(array: T[]): T[] => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = arr[i]!;
    arr[i] = arr[j]!;
    arr[j] = temp;
  }
  return arr;
};

export interface QuizFilters {
  difficulties: string[];
  types: string[];
  forms: string[];
  questionCount: number;
}

export interface WrongAnswer {
  question: Question;
  selectedIndex: number;
}

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
  const progress = computed(() =>
    total.value > 0 ? ((currentIndex.value + 1) / total.value) * 100 : 0,
  );

  const startQuiz = (filters?: QuizFilters) => {
    let filtered = questions;

    if (filters) {
      if (filters.difficulties.length > 0) {
        filtered = filtered.filter((f) => filters.difficulties.includes(f.difficulty));
      }
      if (filters.types.length > 0) {
        filtered = filtered.filter((f) => filters.types.includes(f.type));
      }
      if (filters.forms.length > 0) {
        filtered = filtered.filter((f) => filters.forms.includes(f.form));
      }
    }

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
    if (selectedAnswer.value !== null) return;
    selectedAnswer.value = index;
    if (index === currentQuestion.value!.correctAnswer) {
      score.value++;
    } else {
      wrongAnswers.value.push({
        question: currentQuestion.value!,
        selectedIndex: index,
      });
    }
  };

  const nextQuestion = () => {
    if (currentIndex.value < shuffled.value.length - 1) {
      currentIndex.value++;
      selectedAnswer.value = null;
    } else {
      isFinished.value = true;
    }
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
