import * as url from 'url';
import { ClaspService } from './config/claspService.js';


const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

const arg = process.argv;

let mode;
if (arg.includes('--prod')&&arg.includes('--dev')) throw new Error('Укажите один ключ проекта! Доступно: --prod или --dev')
if (arg.includes('--prod')) {
  mode = 'prod'
} else if (arg.includes('--dev')) {
  mode = 'dev';
} else{
  throw new Error('Укажите ключ проекта! Доступно: --prod или --dev')
}


let srcDirName;
if (arg.includes('--srcDir')) {
  const srcDirIndex = arg.indexOf('--srcDir')
  srcDirName = arg[srcDirIndex+1]
}

let configFileName;
if (arg.includes('--configFile')) {
  const srcDirIndex = arg.indexOf('--configFile')
  configFileName = arg[srcDirIndex+1]
}

const claspService = new ClaspService(mode, __dirname, srcDirName&&srcDirName, configFileName&&configFileName)


if(arg.includes('--getConfig')){
  claspService.getConfigData()
}


if(arg.includes('--setConfig')){
  claspService.setConfigData()
}

