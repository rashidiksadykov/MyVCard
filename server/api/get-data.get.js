import fs from 'fs';
import path from 'path';

export default defineEventHandler((event) => {
  const shortId = event.context.params.shortId; // Получение ID из маршрута
  const filePath = path.resolve(`./data/${shortId}.json`);

  if (fs.existsSync(filePath)) {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data); // Возврат данных
  } else {
    throw createError({ statusCode: 404, message: 'Data not found' });
  }
});
