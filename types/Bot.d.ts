interface TgBot {
  /**
   * The token of the Telegram bot.
   */
  botToken: string;

  /**
   * Fetches data to the Telegram API.
   * @param method - The method to call.
   * @param data - The data to send.
   * @returns The response from the API.
   */
  fetchToTelegram(method: string, data: object): any;

  /**
   * Sets a callback function for a specific method.
   * @param method - The method to set the callback for.
   * @param callback - The callback function.
   */
  on(method: string, callback: Function): void;

  /**
   * Starts the Telegram bot.
   */
  start(): void;

  /**
   * Sends a message to a chat.
   * @param chatId - The ID of the chat.
   * @param text - The text of the message.
   * @param optional - Optional parameters for the message.
   * @returns The response from the API.
   */
  sendMessage(chatId: number, text: string, optional?: object): any;

  /**
   * Answers a callback query.
   * @param callbackId - The ID of the callback query.
   * @returns The response from the API.
   */
  answerCallbackQuery(callbackId: string): any;

  /**
   * Retrieves updates from the Telegram API.
   * @returns The updates from the API.
   */
  getUpdates(): any;

  /**
   * Sets the webhook URL for the bot.
   * @param url - The URL to set as the webhook.
   * @returns The response from the API.
   */
  setWebhook(url: string): any;

  /**
   * Deletes the webhook URL for the bot.
   * @returns The response from the API.
   */
  deleteWebhook(): any;

  /**
   * Retrieves information about the webhook.
   * @returns The webhook information.
   */
  getWebhookInfo(): any;

  /**
   * Retrieves information about the bot.
   * @returns The bot information.
   */
  getMe(): any;

  /**
   * Retrieves information about a chat.
   * @param chatId - The ID of the chat.
   * @returns The chat information.
   */
  getChat(chatId: number): any;

  /**
   * Retrieves the administrators of a chat.
   * @param chatId - The ID of the chat.
   * @returns The chat administrators.
   */
  getChatAdministrators(chatId: number): any;

  /**
   * Retrieves the number of members in a chat.
   * @param chatId - The ID of the chat.
   * @returns The number of chat members.
   */
  getChatMembersCount(chatId: number): any;

  /**
   * Retrieves information about a chat member.
   * @param chatId - The ID of the chat.
   * @param userId - The ID of the user.
   * @returns The chat member information.
   */
  getChatMember(chatId: number, userId: number): any;

  /**
   * Leaves a chat.
   * @param chatId - The ID of the chat.
   * @returns The response from the API.
   */
  leaveChat(chatId: number): any;

  /**
   * Creates a keyboard button object.
   * @param text - The text of the button.
   * @param optional - Optional parameters for the button.
   * @returns The keyboard button object.
   */
  keyboardButton(text: string, optional?: object): object;

  /**
   * Creates an inline keyboard button object.
   * @param text - The text of the button.
   * @param callbackData - The callback data of the button.
   * @param optional - Optional parameters for the button.
   * @returns The inline keyboard button object.
   */
  InlineKeyboardButton(text: string, callbackData: string, optional?: object): object;

  /**
   * Creates an inline keyboard markup string.
   * @param rows - The rows of buttons.
   * @returns The inline keyboard markup string.
   */
  inlineKeyboardMarkup(...rows: object[]): string;

  /**
   * Creates a reply keyboard markup string.
   * @param keyboard - The keyboard buttons.
   * @param optional - Optional parameters for the keyboard.
   * @returns The reply keyboard markup string.
   */
  replyKeyboardMarkup(keyboard: object[], optional?: object): string;

  /**
   * Creates a reply keyboard remove string.
   * @param optional - Optional parameters for the keyboard remove.
   * @returns The reply keyboard remove string.
   */
  replyKeyboardRemove(optional?: object): string;

  /**
   * Retrieves the cache for a user/chat.
   * @param userChatId - The ID of the user/chat.
   * @returns The cache data.
   */
  getCache(userChatId: string): any;

  /**
   * Sets the cache for a user/chat.
   * @param userChatId - The ID of the user/chat.
   * @param data - The data to set as the cache.
   */
  setCache(userChatId: string, data: any): void;

  /**
   * Updates the cache for a user/chat.
   * @param userChatId - The ID of the user/chat.
   * @param data - The data to update the cache with.
   */
  updateCache(userChatId: string, data: any): void;

  /**
   * Clears the cache for a user/chat.
   * @param userChatId - The ID of the user/chat.
   */
  clearCache(userChatId: string): void;
}



