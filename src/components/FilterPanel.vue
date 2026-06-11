<script setup lang="ts">
import type { QuizFilters } from '@/interfaces';
import { ref } from 'vue';

const emit = defineEmits<{
  start: [filters: QuizFilters];
}>();

const selectedDifficulties = ref<string[]>([]);
const selectedTypes = ref<string[]>([]);
const selectedForms = ref<string[]>([]);
const selectedCount = ref(10);

const difficulties = ['easy', 'medium', 'hard'];
const types = ['regular', 'irregular'];
const forms = [
  { value: 'past-simple', label: 'Past Simple' },
  { value: 'past-participle', label: 'Past Participle' },
];
const counts = [5, 10, 20, 0];

const countLabel = (counter: number) => (counter === 0 ? 'All' : String(counter));

const toggle = (arr: string[], value: string) => {
  const idx = arr.indexOf(value);
  if (idx >= 0) {
    arr.splice(idx, 1);

    return;
  }

  arr.push(value);
};

const handleStart = () => {
  emit('start', {
    difficulties: selectedDifficulties.value,
    types: selectedTypes.value,
    forms: selectedForms.value,
    questionCount: selectedCount.value,
  });
};
</script>

<template>
  <div class="filters">
    <p class="filter-title">Select topics to practice:</p>

    <div class="filter-group">
      <p class="filter-label">Difficulty</p>
      <div class="filter-options">
        <button
          v-for="difficult in difficulties"
          :key="difficult"
          :class="['filter-btn', { active: selectedDifficulties.includes(difficult) }]"
          @click="toggle(selectedDifficulties, difficult)"
        >
          {{ difficult }}
        </button>
      </div>
    </div>

    <div class="filter-group">
      <p class="filter-label">Verb Type</p>
      <div class="filter-options">
        <button
          v-for="type in types"
          :key="type"
          :class="['filter-btn', { active: selectedTypes.includes(type) }]"
          @click="toggle(selectedTypes, type)"
        >
          {{ type }}
        </button>
      </div>
    </div>

    <div class="filter-group">
      <p class="filter-label">Form</p>
      <div class="filter-options">
        <button
          v-for="form in forms"
          :key="form.value"
          :class="['filter-btn', { active: selectedForms.includes(form.value) }]"
          @click="toggle(selectedForms, form.value)"
        >
          {{ form.label }}
        </button>
      </div>
    </div>

    <div class="filter-group">
      <p class="filter-label">Questions</p>
      <div class="filter-options">
        <button
          v-for="count in counts"
          :key="count"
          :class="['filter-btn', { active: selectedCount === count }]"
          @click="selectedCount = count"
        >
          {{ countLabel(count) }}
        </button>
      </div>
    </div>

    <button class="start-btn" @click="handleStart">Start Quiz</button>
  </div>
</template>

<style scoped>
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
</style>
