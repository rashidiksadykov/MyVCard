<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100">
    <h1 class="text-3xl font-bold mb-6">Просмотр данных</h1>

    <div v-if="loading" class="text-gray-700">Загрузка данных...</div>

    <div v-else-if="error" class="text-red-500">
      <p>Ошибка: {{ error }}</p>
    </div>

    <div v-else class="bg-white shadow-md rounded-lg p-6 w-full max-w-md">
      <!-- Аватар -->
      <div v-if="data.avatar" class="mb-4 flex justify-center">
        <img :src="data.avatar" alt="Аватар" class="w-32 h-32 rounded-full" />
      </div>

      <!-- ФИО -->
      <h2 v-if="data.fio" class="text-xl font-bold text-center mb-2">{{ data.fio }}</h2>

      <!-- Описание -->
      <p v-if="data.description" class="text-gray-700 text-center">{{ data.description }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const data = ref({});
const loading = ref(true);
const error = ref(null);

const fetchData = async () => {
  try {
    const response = await fetch(`/api/${route.params.id}`);
    const result = await response.json();

    if (result.success) {
      data.value = result.data;
    } else {
      throw new Error(result.message || 'Не удалось загрузить данные');
    }
  } catch (err) {
    error.value = err.message;
  } finally {
    loading.value = false;
  }
};

onMounted(fetchData);
</script>

<style>
/* Стили для отображения */
</style>
