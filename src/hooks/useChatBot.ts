import { useDispatch, useSelector } from 'react-redux';
import sendMessageThunk from '../features/chatbot/sendMessage';
import { AppDispatch, RootState } from '../reduxApp/store';
import { clearMessages as clearMessagesAction, setApiEndpoint } from '../features/chatbot/chatbotSlice';

export default function useChatBot () {
  const dispatch = useDispatch<AppDispatch>();
  
  const messages = useSelector((state:RootState) => state.chatbot.messages);
  const isLoading = useSelector((state:RootState) => state.chatbot.isLoading);
  const isError = useSelector((state:RootState) => state.chatbot.isError);
  const error = useSelector((state:RootState) => state.chatbot.error);
  
  const sendMessage = (question: string) => dispatch(sendMessageThunk(question));
  const clearMessages = () => dispatch(clearMessagesAction(undefined));
  const setEndpoint = (endpoint: string) => dispatch(setApiEndpoint(endpoint));

  return {
    messages,
    isLoading,
    isError,
    error,
    setEndpoint,
    clearMessages,
    sendMessage
  };
};