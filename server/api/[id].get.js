import { promises as fs } from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
  const { id } = event.context.params;

  try {
    // Путь к файлу
    const filePath = path.resolve('data', `${id}.json`);

    // Проверяем, существует ли файл
    const fileExists = await fs.stat(filePath).then(() => true).catch(() => false);

    if (!fileExists) {
      return { success: false, message: 'Данные не найдены' };
    }

    // Читаем файл
    const fileContent = await fs.readFile(filePath, 'utf-8');

    return { success: true, data: JSON.parse(fileContent) };
  } catch (error) {
    console.error('Ошибка при чтении данных:', error);
    return { success: false, message: 'Ошибка при загрузке данных' };
  }
});
