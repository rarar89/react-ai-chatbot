import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { fetchEventSource } from '@microsoft/fetch-event-source';
import { IChatbotState, Document, Message } from '../../types';

const initialState: IChatbotState = {
  messages: [],
  isLoading: false,
  isError: false,
  history: [],
  error: null,
  pendingSourceDocs: [],
  pendingMessage: '',
  apiEndpoint: null
};

export const chatbotSlice = createSlice({
  name: 'chatbot',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      return { ...state, messages: [...state.messages, action.payload] };
    },
    updateIncoming: (state, action: PayloadAction<{error?: string, pending?: string, sourceDocs?: Document[]}>) => {

      const payload = action.payload;

      const newState = { ...state };

      if(payload.error) {
        newState.error = payload.error;
        newState.isError = true;
      }

      if(payload.pending) {
        newState.pendingMessage = state.pendingMessage + action.payload.pending;
      }

      if(payload.sourceDocs) {
        newState.pendingSourceDocs = payload.sourceDocs;
      }

      return newState;
    },
    clearIncoming: state => {
      return { ...state, incoming: '' };
    },
    finishIncoming: (state, action: PayloadAction<Message>) => {
      
      return {...state, ...{
        history: [...state.history, [action.payload.message, state.pendingMessage ?? '', state.pendingSourceDocs as Document[]]],
        messages: [
          ...state.messages,
          {
            type: 'bot',
            message: state.pendingMessage ?? '',
            sourceDocs: state.pendingSourceDocs as Document[],
          },
        ],
        incoming: '',
        pendingSourceDocs: [],
        loading: false
      }};

    },
    setError: (state, action: PayloadAction<string>) => {
      return { ...state, isError: true, error: action.payload };
    },
    clearError: state => {
      return { ...state, isError: false, error: null };
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      return { ...state, isLoading: action.payload };
    },
    clearMessages: (state) => {
      return { ...state, messages: [] };
    },
    setApiEndpoint: (state, action: PayloadAction<string>) => {
      return { ...state, apiEndpoint: action.payload };
    },
  }
});

export const { addMessage, updateIncoming, clearIncoming, setError, clearError, setLoading, clearMessages, setApiEndpoint, finishIncoming } = chatbotSlice.actions;
export default chatbotSlice.reducer;
