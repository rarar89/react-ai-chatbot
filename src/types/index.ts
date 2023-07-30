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

export interface IChatbotState {
  messages: Message[];
  history: [string, string, Document[]][];
  isLoading: boolean;
  pendingMessage: string;
  pendingSourceDocs: Document[];
  isError: boolean;
  error: string | null;
  apiEndpoint: string;
};