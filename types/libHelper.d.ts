
 interface libHelper{
  TgBot: new (token: string) => TgBot;
  /**
   * The BigQuery service.
   */
  bigQueryService: new (projectId: string, datasetId: string) => BigQueryService;
  sheetService: new (sheet: GoogleAppsScript.Spreadsheet.Sheet) => SheetServiceInterface;
  scriptProcessesService: new (scriptId: string, OAuthToken: string) => ScriptProcessesServiceInterface;
}


interface BigQueryService {
  projectId: string
  datasetId: string
  sendQuery(query: string): GoogleAppsScript.BigQuery.Schema.QueryResponse
  getData(query: string): {}[]
  updateData(data: dataForDB): undefined | Error
  buildInserts(table: string, tableData: object[], datasetId: string): string
  buildUpdate(table: any, tableData: any, datasetId?: any): string
  buildDelete(table: string, options?: object, datasetId?: string): string
  clearTable(table: string, datasetId?: string): any
}


interface SheetServiceInterface {
  /**
   * Базовый класс для работы с листом
   * @param {GoogleAppsScript.Spreadsheet.Sheet} sheet объект листа 
   * @property {GoogleAppsScript.Spreadsheet.Sheet} sheet объект листа
   * @property {any[][]} values массив значений листа
   * @property {sheetKeysObj} keys объект с ключами
   */
  constructor(sheet: GoogleAppsScript.Spreadsheet.Sheet): void;

  /**
   * позволяет брать номера колонок и строк по ключам, расставленным в колонке А и строке 1. Принимает на входе содержимое листа.
   * Для первого ключа в колонках создается алиас start_col
   * @param {any[][]} sheet_data 
   * @returns
   */
  getKeysFromSheet(sheet_data: any[][]): sheetKeysObj;

  /**
   * Ощищает чекбоксы в столбце
   * @param {number} start_row - номер строки с которой начинается заполнение
   * @param {number} checkboxs_col - номер столбца с чекбоксами
   */
  clearCheckboxes(start_row: number, checkboxs_col: number): void;

  /**
   * статический метод для запуска и рсиановки лоадера
   * @returns { close: (msg: string) => void, open: (msg: string) => void}
   */
  static loader(): {
    close: (msg: string) => void,
    open: (msg: string) => void,
    alert: (title: string, content: string) => void
  };
}

interface ScriptProcessesServiceInterface {
  /**
   * Sends a request to the Apps Script API.
   * @param request - The request URL.
   * @returns The response data.
   */
  sendRequest(request: string): any;

  /**
   * Retrieves a list of running script processes for a given function name.
   * @param funcName - The name of the function.
   * @returns The list of running script processes.
   */
  getFuncRunningProcesses(funcName: string): any;

   /**
     * id скрипта
     * @type {string}
     */
  scriptId: string;
   /**
    * токен аунтефикации
    * @type {string}
    */
   OAuthToken: string;

   /**
    * url для запросов
    * @type {string}
    */
   url: string;
}
