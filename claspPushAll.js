// Импортируем необходимые модули
import fs from 'fs'; // Модуль для работы с файловой системой
import { execSync } from 'child_process'; // Модуль для выполнения команд в командной строке

// Путь к папке с проектами clasp
const srcFolder = './src';

/**
 * Проверяет, является ли папка проектом clasp.
 * @param {string} folderPath - Путь к папке для проверки.
 * @returns {boolean} - Возвращает true, если папка является проектом clasp, иначе - false.
 */
function isClaspProject(folderPath) {
  const claspConfigPath = `${folderPath}/.clasp.json`;
  return fs.existsSync(claspConfigPath);
}

/**
 * Выполняет команду clasp push в указанной папке.
 * @param {string} folderPath - Путь к папке, в которой нужно выполнить clasp push.
 */
async function runClaspPush(folderPath) {
  try {
    console.log(`Pushing clasp project in folder: ${folderPath}`);
    execSync('clasp push', { cwd: folderPath, stdio: 'inherit' });
  } catch (error) {
    console.error(`Error pushing clasp project in folder: ${folderPath}`);
    console.error(error.message);
  }
}

/**
 * Основная функция, которая читает содержимое папки src и выполняет clasp push для каждого проекта clasp внутри нее.
 */
fs.promises.readdir(srcFolder)
  .then(files => {
    // Перебираем все файлы в папке
    files.forEach(async (file) => {
      const folderPath = `${srcFolder}/${file}`;
      // Проверяем, является ли файл папкой и проектом clasp
      if (fs.statSync(folderPath).isDirectory() && isClaspProject(folderPath)) {
        // Выполняем команду clasp push для проекта
        await runClaspPush(folderPath);
      }
    });
  })
  .catch(err => {
    console.error('Error reading source folder:', err);
  });
