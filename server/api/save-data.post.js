import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import base62 from 'base62/lib/ascii';

export default defineEventHandler(async (event) => {
  try {
    // Чтение тела запроса
    const body = await readBody(event);

    if (!body) {
      throw createError({ statusCode: 400, message: 'Нет данных для сохранения' });
    }

    // Генерация ID
    const uuid = uuidv4();
    const buffer = Buffer.from(uuid.replace(/-/g, ''), 'hex');
    const shortId = base62.encode(buffer.readUInt32BE());

    // Подготовка данных для GitHub API
    const content = Buffer.from(JSON.stringify(body, null, 2)).toString('base64');
    const filePath = `data/${shortId}.json`;

    try {
      const response = await axios.put(
        `https://api.github.com/repos/${process.env.GITHUB_OWNER}/${process.env.GITHUB_REPO}/contents/${filePath}`,
        {
          message: `Создание файла ${filePath}`,
          content, // Контент в формате base64
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Успешный ответ:', response.data); // Работает, так как response определён
    } catch (error) {
      if (error.response) {
        console.error('Ошибка API:', error.response.data); // Работает, error.response доступен
        console.error('Код статуса:', error.response.status);
      } else {
        console.error('Ошибка запроса:', error.message); // Здесь response не используется
      }
    }
    
    

    // Возвращаем ссылку на файл в репозитории
    const resultLink = response.data.content.html_url;

    return { success: true, link: resultLink };
  } catch (error) {
    console.error('Ошибка API:', error.response?.data || error.message);
    throw createError({
      statusCode: error.response?.status || 500,
      message: error.response?.data?.message || error.message,
    });
  }
});
