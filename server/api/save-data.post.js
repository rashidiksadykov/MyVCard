import { v4 as uuidv4 } from 'uuid';
import base62 from 'base62/lib/ascii';
import fs from 'fs';
import path from 'path';

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);

    if (!body) {
      throw createError({ statusCode: 400, message: 'Нет данных для сохранения' });
    }

    // Генерация ID
    const uuid = uuidv4();
    const buffer = Buffer.from(uuid.replace(/-/g, ''), 'hex');
    const shortId = base62.encode(buffer.readUInt32BE());

    // Сохранение данных
    const dirPath = './data';
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath);
    }

    const filePath = path.resolve(`${dirPath}/${shortId}.json`);
    fs.writeFileSync(filePath, JSON.stringify(body, null, 2));

    // Возвращаем ссылку
    const baseUrl = 'http://localhost:3000'; // Укажите свой базовый URL
    const resultLink = `${baseUrl}/${shortId}`;

    return { success: true, link: resultLink };
  } catch (error) {
    console.error('Ошибка API:', error.message);
    throw createError({ statusCode: 500, message: error.message });
  }
});
