import { Books_Handlers } from './books-handler';
import { ContactsHandler } from './contacts-handler';
import { NewsHandler } from './developer-news-handler';

export const handlers = [...NewsHandler, ...ContactsHandler, ...Books_Handlers];
