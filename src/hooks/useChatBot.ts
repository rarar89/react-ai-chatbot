import { EventSourceMessage, fetchEventSource } from '@microsoft/fetch-event-source';
import { useChatBotState } from '../context/ChatBotProvider';
import { Message } from '../types';

export function useChatBot() {
  const { state, dispatch } = useChatBotState();

  let ctrl:AbortController;

  const sendMessage = (question: string) => {
    dispatch({ type: 'SEND_MESSAGE', payload: { message: question, type: 'user'} });
    
    ctrl = new AbortController();

    const apiPath = state.apiEndpoint + '/chat';

    try {
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
          history: state.messages,
        }),
        signal: ctrl.signal,
        onmessage: (event: EventSourceMessage) => {

          if(event.data !== '[DONE]') {
            const data = JSON.parse(event.data);
            if(data.errorMessage) {
              dispatch({ type: 'SET_ERROR', payload: data.errorMessage});
              
              return;
            }
          } 

          const payload = {...event, question: question};
          dispatch({type: 'ADD_DATA_BY_EVENT', payload: payload });
        },
        onerror(err) {

          dispatch({ type: 'SET_ERROR', payload: err.message});
          throw err; // rethrow to stop the operation
        }
      });
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: error.message});
 
    }
  };

  return {
    messages: state.messages,
    sendMessage,
    isLoading: state.isLoading,
    isError: state.isError,
    error: state.error,
  };
}