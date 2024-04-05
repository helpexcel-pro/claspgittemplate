
interface libHelper {
  TgBot: new (token: string) => TgBot;
  /**
   * The BigQuery service.
   */
  bigQueryService: new (projectId: string, datasetId: string) => BigQueryService;
  sheetService: new (sheet: GoogleAppsScript.Spreadsheet.Sheet) => SheetServiceInterface;
  scriptProcessesService: new (scriptId: string, OAuthToken: string) => ScriptProcessesServiceInterface;
}
// Формат данных которы  должен быть отправлен методу updateData в BigQueryService 
interface dataForDB {
  [key: string]: object[]
}

type sheetKeysObj = {
  col: {};
  row: {};
}

interface buildOptions {
  where?: {
    column: string
    value: string
    or?: [{ column: string, value: string }]
    and?: [{ column: string, value: string }]
  }
  limit?: number
  orderBy?: {
    col: string
    asc?: boolean
  }

}

interface BigQueryService {
  projectId: string
  datasetId: string
  ManageDatasets(): new (projectId: string) => ManageDatasetInterface
  sendQuery(query: string): GoogleAppsScript.BigQuery.Schema.QueryResponse
  getData(query: string): {}[]
  updateData(data: dataForDB): undefined | Error
  buildInserts(table: string, tableData: object[], datasetId: string): string
  buildUpdate(table: any, tableData: any, datasetId?: any): string
  buildDelete(table: string, options?: buildOptions, datasetId?: string): string
  buildSelect(table: string, fields: any[], options?: buildOptions, datasetId?: string): string
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
  loader(): {
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

interface OptParams {
  labels?: object;
  location?: string;
  selfLink?: string;
  description?: string;
  access?: GoogleAppsScript.BigQuery.Schema.DatasetAccess[];
}

interface ManageDatasetInterface {

  /**
   * Создает датасет
   * @param {string} datasetId - id датасета
   * @param {string} projectId - id проекта
   * @param {OptParams} optParams - дополнительные параметры
   */
  createDataset(datasetId: string, projectId?: string, optParams?: OptParams): void;

  /**
   * Получает список датасетов
   * @param {string} projectId - id проекта
   * @returns {BigQuery.Schema.DatasetList}
   */
  getDatasetsList(projectId?: string): GoogleAppsScript.BigQuery.Schema.DatasetListDatasets[];

  /**
   * Создает уникальный id для датасета
   * @returns {string}
   */
  createUniqueDatasetId(): string;

  /**
   * Удаляет датасет
   * @param {string} datasetId - id датасета
   * @param {boolean} forse - флаг, если true, то удаляет датасет даже если в нем есть таблицы. По умолчанию false
   * @param {string} projectId - id проекта
   */
  deleteDataset(datasetId: string, forse: boolean, projectId?: string): void;
  /**
   * Создает новый датасет с уникальным именем
   * @returns {BigQuery.Schema.Dataset}
   */
  createNewDataset(): any;

  createUpsertProcedure(datasetId: any, projectId?: any): GoogleAppsScript.BigQuery.Schema.Job;

  updateSchema(schema: string, datasetId: any, projectId?: any): GoogleAppsScript.BigQuery.Schema.QueryResponse;

  /**
   * Обновляет доступы к датасету
   * @param datasetId 
   * @param accesses - массив объектов с параметрами доступа к датасету
   * @param projectId 
   */
  updateAccess(datasetId: string, accesses: UpdateAccessOptions[], projectId?: string): GoogleAppsScript.BigQuery.Schema.Dataset;
}

interface UpdateAccessOptions {
  role: string;
  isAccess: boolean;
  userByEmail?: string;
  groupByEmail?: string;
  domain?: string;
  specialGroup?: string;
  iamMember?: string;
  view?: TableReference;
  routine?: RoutineReference;
  dataset?: DatasetAccessEntry;
}

interface FileOptions {
  email: string;
  fileId: string;
  access: boolean;
  accessType: "VIEW" | "EDIT" | "COMMENT";
}

interface GoogleDriveService {
  /**
   * Управление доступами к файлам
   * @param email - email пользователя
   * @param options - массив объектов с параметрами доступа к файлам
   */
  managePermision(options: FileOptions[]): void;

  /**
   * Метод устарел, используйте managePermision
   * Добавляет доступ к файлу и библиотеке
   * @deprecated
   * @param email - email пользователя
   * @param fileId - id файла
   */
  addPermision(email: string, fileId: string): void;

  /**
   * Метод устарел, используйте managePermision
   * Забирает доступ к файлу и библиотеке
   * @deprecated
   * @param email - email пользователя
   * @param removeLib - убрать доступ к библиотеке
   * @param fileId - id файла
   */
  removePermision(email: string, removeLib?: boolean, fileId?: string): void;
}


/**
 * Сервис для работы с ролями в Cloud Google Project. Для работы сервиса проект Apps Script должен быть привязан к проекту в GCP.
 * В проекте GCP должен быть включен API - "Cloud Resource Manager API"(https://console.cloud.google.com/apis/library/cloudresourcemanager.googleapis.com);
 * Настроены https://console.cloud.google.com/apis/api/cloudresourcemanager.googleapis.com/credentials OAuth 2.0 Client IDs;
 * Создано и опубликовано приожение в https://console.cloud.google.com/apis/credentials/consent OAuth consent screen(Publishing status - In production);
 * И иметь "oauthScopes": ["https://www.googleapis.com/auth/cloud-platform"]
 * 
 * P.S. Если кто найдет вариант получения токена аунтефикации GCP не через ScriptApp.getOAuthToken(), то пожалуйста напишите мне.
 */
interface ICgpRoleService {
  projectId: string;
  muteHttpExceptions: boolean;
  OAuthToken: string;
  imPolicyData: any;
  /**
   * Получает текущий список ролей для проекта(IamPolicy)
   * Подробности - https://cloud.google.com/resource-manager/reference/rest/v3/projects/getIamPolicy
   * @returns текущий список ролей для проекта
   */
  fetchImPolicy(): any;

  /**
   * Добавляет роль для пользователя
   * @param email - email пользователя
   * @param role - роль, которую необходимо добавить. For example, roles/viewer, roles/editor, or roles/owner. Подробнее тут - https://cloud.google.com/iam/docs/understanding-roles
   */
  addRole(email: string, role: string): void;

  /**
   * Удаляет роль для пользователя
   * @param email - email пользователя
   * @param role - роль, которую необходимо удалить. For example, roles/viewer, roles/editor, or roles/owner. Подробнее тут - https://cloud.google.com/iam/docs/understanding-roles
   */
  removeRole(email: string, role: string): void;

  /**
   * Обновляет политику доступа
   * Подробности - https://cloud.google.com/resource-manager/reference/rest/v3/projects/setIamPolicy
   * 
   * Для того чтобы пользователь смог сохранить политики доступа, ему необходимо иметь роль минимум "roles/resourcemanager.projectIamAdmin" в проекте
   * и он должен принять политику использования гугл клайд сервисов перейдя по ссылке  https://console.cloud.google.com/
   */
  updateImPolicy(): void;
}

type TableReference = { "projectId": string; "datasetId": string; "tableId": string; };

type RoutineReference = {
  "projectId": string;
  "datasetId": string;
  "routineId": string;
};

type DatasetReference = { datasetId: string; "projectId": string; };

type DatasetAccessEntry = { dataset: DatasetReference; targetTypes: "VIEWS" | "TARGET_TYPE_UNSPECIFIED"; };
