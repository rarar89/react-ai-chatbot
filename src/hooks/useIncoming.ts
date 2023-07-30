import { RootState } from '../reduxApp/store';
import { useSelector } from 'react-redux';

export default function useIncoming() {
  const incoming = useSelector((state: RootState) => state.chatbot.incoming);
  
  return { incoming };
}