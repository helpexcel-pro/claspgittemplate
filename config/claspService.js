import * as fs from 'fs/promises';
import * as url from 'url';
import path from 'path';

const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

export class ClaspService {
  #mod;
  #__dirname;
  #srcDir;
  #srcDirFiles;
  #configFileName;
  configFile;
  /**
   *
   * @param {string} mod
   * @param {string} __dirname
   * @param {string} configFileName
   * @param {string} srcDir
   * @property {Promise<object>} configFile
   * @property {string[]} srcDirFiles
   * @property {string} srcDir
   * @property {string} configFileName
   * @property {string} __dirname
   * @property {string} mod
   */
  constructor(
    mod,
    __dirname,
    srcDir = 'src',
    configFileName = 'claspconfig.json'
  ) {
    this.#mod = mod;
    this.#__dirname = __dirname;
    this.#srcDir = srcDir;
    this.#configFileName = configFileName;
    this.#srcDirFiles = this.#setSrcDir(srcDir);
    this.configFile = this.#getConfigFile(configFileName);
  }

  /**
   *
   * @param {string} src название папки с файлами
   * @returns {Promise<string[]>} массив с путями к файлам
   */
  async #setSrcDir(src) {
    return await fs.readdir(path.join(this.#__dirname, src), {
      recursive: true,
    });
  }

  /**
   * Считывает конфиг файл
   * @param {string} configFileName название файла с конфигом
   * @returns {Promise<object>} объект с конфигом
   */
  async #getConfigFile(configFileName) {
    let configFile;
    try {
      configFile = await fs.readFile(path.join(__dirname, configFileName), {
        encoding: 'utf-8',
      });
    } catch (error) {
      configFile = await this.#setConfigFile(configFileName);
    }
    return JSON.parse(configFile);
  }

  /**
   * Создает конфиг файл
   * @param {*} configFileName название файла с конфигом
   * @returns {Promise<string>} возвращает шаблон файла с конфигом
   */
  async #setConfigFile(configFileName) {
    const template = `{
      "dev": {},
      "prod": {}
    }`;
    const configFile = await fs.writeFile(
      path.join(__dirname, configFileName),
      template,
      {
        encoding: 'utf-8',
      }
    );
    return template;
  }

  /**
   * Записывает данные из конфига в файлы .clasp.json и _env.js
   * @param {} config
   * @param {*} pathArr
   * @returns
   */
  async #whriteToFiles(config, pathArr) {
    if (
      Object.keys(config).every(
        (el) => el.includes('.js') || el.includes('.json')
      )
    ) {
      for (const key in config) {
        if (Object.hasOwnProperty.call(config, key)) {
          key.includes('.json') &&
            fs.writeFile(
              path.join(...pathArr, key),
              JSON.stringify(config[key]) || ''
            );
          key.includes('.js') &&
            !key.includes('.json') &&
            fs.writeFile(
              path.join(...pathArr, key),
              this.#jsonToJs(config[key]) || ''
            );
        }
      }
      return true;
    }

    for (const key in config) {
      if (Object.hasOwnProperty.call(config, key)) {
        const newpathArr = [...pathArr];
        newpathArr.push(key);
        this.#whriteToFiles(config[key], newpathArr);
      }
    }
  }

  /**
   * Получает данные из файлов .clasp.json и _env.js и записывает в объект
   * @returns {Promise<object>} объект с данными из файлов .clasp.json и _env.js
   */
  async #readOnFile() {
    const filtredPaths = (await this.#srcDirFiles).filter(
      (path) => path.includes('.clasp.json') || path.includes('__env.js')
    );
    const configObj = {};

    for (const pathStr of filtredPaths) {
      const splitPath = pathStr.split('\\');
      let readedData = await fs.readFile(path.join(this.#srcDir, pathStr), {
        encoding: 'utf-8',
      });
      if (pathStr.includes('.json')) {
        readedData = JSON.parse(readedData);
      }
      if (pathStr.includes('_env.js')) {
        readedData = this.#jsToJson(readedData);
      }

      /**
       *
       * @param {string[]} path - массив с путем к файлу
       * @param {object} prev - объект в который записываются данные
       * @returns {boolean} - возвращает true если все записано
       */
      function createConfigObj(path, prev) {
        const firstValue = path.shift();

        if (!path.length) {
          prev[firstValue] = readedData;
          return true;
        } else {
          if (!Object.hasOwnProperty.call(prev, firstValue))
            prev[firstValue] = {};
        }
        createConfigObj(path, prev[firstValue], firstValue);
      }

      createConfigObj(splitPath, configObj);
    }

    return configObj;
  }

  /**
   * Преобразует объект json в строку с данными для файла _env.js
   * @param {object} json
   * @returns
   */
  #jsonToJs(json) {
    let result = '';
    for (const key in json) {
      if (Object.hasOwnProperty.call(json, key)) {
        if (typeof json[key].value === 'string') {
          result += `const ${key} = "${json[key].value}"; ${
            (json[key].comment && '// ' + json[key].comment) || ''
          }\n`;
        } else if (typeof json[key].value === 'object') {
          result += `const ${key} = ${JSON.stringify(json[key].value)}; ${
            (json[key].comment && '// ' + json[key].comment) || ''
          }\n`;
        } else {
          result += `const ${key} = ${json[key].value}; ${
            (json[key].comment && '// ' + json[key].comment) || ''
          }\n`;
        }
      }
    }
    return result;
  }

  /**
   * Преобразует данные из файла _env.js в объект json
   * @param {string} string строка с данными из файла _env.js
   * @returns
   */
  #jsToJson(string) {
    const resultJson = {};

    const rows = string
      .split('const')
      .filter((el) => el.length)
      .map((el) => el.replace(RegExp(/\n+/gm), ''));

    const varAndVal = rows.map((el) => el.split('=').map((e) => e.trim()));

    for (let i = 0; i < varAndVal.length; i++) {
      const variable = varAndVal[i].shift();

      resultJson[variable] = {};
      const valAndComm = varAndVal[i].pop();
      if (valAndComm) {
        const valAndCommSplit = valAndComm.split('//').map((e) => e.trim());

        let val = valAndCommSplit.shift();

        if (val[val.length - 1] === ';') {
          val = val.slice(0, val.length - 1);
        }

        if (val.match(/(?<=[{])[^}]+/gm)) val = JSON.parse(val);

        if (typeof val === 'string' && val.match(RegExp(/(?<=["'])[^"']+/gm))) {
          val = val.slice(1, val.length - 1);
        }

        Number.isNaN(Number(val))
          ? (resultJson[variable].value = val)
          : (resultJson[variable].value = Number(val));

        valAndCommSplit.length &&
          (resultJson[variable].comment = valAndCommSplit.pop());
      }
    }
    
    return resultJson;
  }

  /**
   * Получаеь дынные конфиг файла  и записывает  в файлы .clasp.json и _env.js
   */
  async getConfigData() {
    const config = await this.configFile;

    this.#whriteToFiles(config[this.#mod], [this.#srcDir]);
  }

  /**
   * Получает данные из файлов .clasp.json и _env.js и записывает в конфиг файл
   */
  async setConfigData() {
    const filesData = await this.#readOnFile();

    const config = await this.configFile;

    config[this.#mod] = filesData;

    await fs.writeFile(
      path.join(__dirname, this.#configFileName),
      JSON.stringify(config),
      {
        encoding: 'utf-8',
      }
    );
  }
}
