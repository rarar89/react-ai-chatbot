import { ThunkDispatch, configureStore, Action } from '@reduxjs/toolkit';
import chatbotReducer from '../features/chatbot/chatbotSlice';

export const store = configureStore({
  reducer: {
    chatbot: chatbotReducer
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkDispatch<RootState, unknown, Action<string>>