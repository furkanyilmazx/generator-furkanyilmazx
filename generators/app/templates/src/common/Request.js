import { v4 as uuidv4 } from 'uuid';

export default class Request {
  constructor(reqBody) {
    this.locale = reqBody.locale || 'tr';
    this.conversationId = reqBody.conversationId || uuidv4();
  }
}
