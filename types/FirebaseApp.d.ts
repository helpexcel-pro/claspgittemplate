// типы для FirebaseApp


interface optQueryParameters {
  orderBy?: string;
  limitToFirst?: number;
  limitToLast?: number;
  startAt?: string | number;
  endAt?: string | number;
  equalTo?: string | number;
}
type method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
type responeFirebase = object | Array<any> | string | number | null;
type data = object | Array<any> | string | number;

interface Firebaserequest {
  method: method;
  path: string;
  optQueryParameters?: optQueryParameters;
  data?: data;
}

interface FIREBASE {

  /**
   * Get data from Firebase
   * @param path 
   * @param {optQueryParameters} optQueryParameters - orderBy?:string; limitToFirst?:number; limitToLast?:number; startAt?:string|number; endAt?:string|number; equalTo?:string|number;
   */
  getData(path: string, optQueryParameters?: optQueryParameters): responeFirebase;

  /**
   * Returns data in all specified paths
   * @param {Firebaserequest} requests - {
   * 
   * method : 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
   * 
   * path : string,
   * 
   * optQueryParameters : {
   * 
   * orderBy?:string;
   * 
   * limitToFirst?:number;
   * 
   * limitToLast?:number;
   * 
   * startAt?:string|number;
   * 
   * endAt?:string|number;
   * 
   * equalTo?:string|number;
   * 
   * },
   * 
   * data?: object | Array<any> | string | number
   * 
   * }
   */
  getAllData(requests: Array<Firebaserequest>): Array<object> | [];

  /**
   * Generates a new child location using a unique key
   * @param path 
   * @param data 
   * @param optQueryParameters 
   */
  pushData(path: string, data: data, optQueryParameters?: optQueryParameters): string;

  /**
   * Write or replace data to a defined path, like messages/users/<username>
   * @param path 
   * @param data 
   * @param optQueryParameters 
   */
  setData(path: string, data: data, optQueryParameters?: optQueryParameters): responeFirebase;

  /**
   * Update specific children at the specified path without overwriting existing data
   * @param path 
   * @param data 
   * @param optQueryParameters 
   */
  updateData(path: string, data: data, optQueryParameters?: optQueryParameters): responeFirebase;

  /**
   * Remove data from Firebase
   * @param path 
   * @param optQueryParameters 
   */
  removeData(path: string, optQueryParameters?: optQueryParameters): null;

  /**
   * Get the absolute URL corresponding to the given path
   * @param path 
   */
  getUrlFromPath(path: string): string;
}



/**
 * Название переменной по которой будет происходить обращение к Firebase
 * Пример:
 * const FIREBASE = FirebaseApp.getDatabaseByUrl(URL, SECRET);
 */
declare const FIREBASE: FIREBASE;
