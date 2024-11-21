<template>
  <div class="flex h-screen">
    <!-- Левая колонка: Форма -->
    <div class="w-1/2 p-6 bg-gray-100 border-r">
      <h1 class="text-2xl font-bold mb-4">Создание профиля</h1>


      <form @submit.prevent="saveData">
        <!-- Поле ввода для ФИО -->
        <div class="mb-4">
          <label for="fio" class="block text-gray-700">ФИО</label>
          <input
            id="fio"
            v-model="form.fio"
            type="text"
            placeholder="Введите ФИО"
            class="w-full p-2 border rounded"
            required
          />
        </div>

        <!-- Поле ввода для описания -->
        <div class="mb-4">
          <label for="description" class="block text-gray-700">Описание</label>
          <textarea
            id="description"
            v-model="form.description"
            rows="3"
            placeholder="Напишите о себе"
            class="w-full p-2 border rounded"
          ></textarea>
        </div>

        <!-- Поле ввода для ссылки на аватар -->
        <div class="mb-4">
          <label for="avatar" class="block text-gray-700">Ссылка на аватар</label>
          <input
            id="avatar"
            v-model="form.avatar"
            type="url"
            placeholder="Введите URL аватара"
            class="w-full p-2 border rounded"
            required
          />
        </div>

            <button
          type="submit"
          class="w-full bg-green-500 text-white p-2 rounded hover:bg-green-600"
        >
          Сохранить данные
        </button>
      </form>
    </div>

    <!-- Правая колонка: Предпросмотр -->
    <div class="w-1/2 p-6 bg-white">
      <h1 class="text-2xl font-bold mb-4">Предпросмотр </h1>
      <div class="border rounded-lg p-4">
        <!-- Аватар -->
        <div v-if="form.avatar" class="mb-4 flex justify-center">
          <img :src="form.avatar" alt="Аватар" class="w-32 h-32 rounded-full" />
        </div>

        <!-- ФИО -->
        <h2 v-if="form.fio" class="text-xl font-bold text-center mb-2">{{ form.fio }}</h2>

        <!-- Описание -->
        <p v-if="form.description" class="text-gray-700 text-center">{{ form.description }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';


const form = reactive({
  fio: '',
  description: '',
  avatar: '',
});

const saveData = async () => {
  try {
    const response = await fetch('/api/save-data', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const result = await response.json();
    if (result.success) {
      alert('Данные успешно сохранены!');
      // Можно перенаправить на страницу просмотра
      window.location.href = result.link;
    } else {
      alert(`Ошибка: ${result.message}`);
    }
  } catch (error) {
    console.error('Ошибка при сохранении данных:', error);
    alert('Произошла ошибка при сохранении данных.');
  }
};
</script>
