import { RootState } from '../reduxApp/store';
import { useSelector } from 'react-redux';

export default function usePending() {
  const pending = useSelector((state: RootState) => state.chatbot.pendingMessage);
  
  return { pending };
}