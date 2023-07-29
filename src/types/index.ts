export interface DocumentInput<Metadata extends Record<string, any> = Record<string, any>> {
  pageContent: string;
  metadata?: Metadata;
}

export declare class Document<Metadata extends Record<string, any> = Record<string, any>> implements DocumentInput {
  pageContent: string;
  metadata: Metadata;
  constructor(fields: DocumentInput<Metadata>);
}

export type Message = {
  type: 'bot' | 'user';
  message: string;
  isStreaming?: boolean;
  sourceDocs?: Document[];
};

export type State = {
  messages: Message[];
  history?: [string, string, Document[]][];
  isLoading: boolean;
  pending: string;
  pendingSourceDocs: Document[];
  isError: boolean;
  error: string | null;
  apiEndpoint: string;
};

export type EventPayload = {
  question: string;
  id: string;
  event: string;
  data: string;
  retry?: number;
}

export type Action = 
  | { type: 'ADD_DATA_BY_EVENT'; payload: EventPayload }
  | { type: 'SEND_MESSAGE'; payload: Message }
  | { type: 'RECEIVE_MESSAGE'; payload: Message }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null };
