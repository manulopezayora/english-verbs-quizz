<script setup lang="ts">
interface Props {
  current: number
  total: number
  progress: number
}

defineProps<Props>()
</script>

<template>
  <div>
    <div class="progress-bar">
      <div class="progress-fill" :style="{ width: progress + '%' }"></div>
    </div>
    <p class="counter">{{ current }} / {{ total }}</p>
  </div>
</template>

<style scoped>
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
</style>
