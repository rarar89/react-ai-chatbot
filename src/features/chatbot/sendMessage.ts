import { fetchEventSource } from "@microsoft/fetch-event-source";
import { setError, updateIncoming, finishIncoming, clearError, addMessage } from "./chatbotSlice";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "../../reduxApp/store";

export const sendMessage = createAsyncThunk('chatbot/sendMessage', async (question: string,  { getState, dispatch }) => {
  const { apiEndpoint, history } = (getState() as RootState).chatbot;

  const apiPath = apiEndpoint + '/chat';

  try {

    dispatch(clearError(undefined));
    dispatch(addMessage({
      message: question,
      type:'user'
    }))
    fetchEventSource(apiPath, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'mode': 'cors',
      },
      body: JSON.stringify({
        question,
        history
      }),
      onmessage: (event: any) => {

        if(event.data === '[DONE]') {
          return;
        }

        const data = JSON.parse(event.data);
          
        dispatch(updateIncoming(data));
      },
      onclose: () => {
        dispatch(finishIncoming({message: question, type: 'user'}));
      },
      onerror(err: any) {
        dispatch(setError(err.message));
        throw err; // rethrow to stop the operation
      }
    });
  } catch (error: any) {
    dispatch(setError(error.message));
  }
});

export default sendMessage;