import { createContext, useReducer, ReactNode, useContext } from 'react';
import { Action, Document, State } from '../types';

const initialState: State = {
  messages: [],
  isLoading: false,
  pendingSourceDocs: [],
  isError: false,
  pending: '',
  error: null,
  apiEndpoint: null
};

const ChatBotContext = createContext<{ state: State; dispatch: React.Dispatch<Action> } | undefined>(undefined);

function chatBotReducer(state: State, action: Action): State {
  switch (action.type) {

    case 'ADD_DATA_BY_EVENT':
      
        const payload = action.payload;
  
        if (payload.data === '[DONE]') {
  
          return {...state, ...{
          //  history: [...state.history, [payload.question, state.pending ?? '', state.pendingSourceDocs as Document[]]],
            messages: [
              ...state.messages,
              {
                type: 'bot',
                message: state.pending ?? '',
                sourceDocs: state.pendingSourceDocs as Document[],
              },
            ],
            pending: undefined,
            pendingSourceDocs: undefined,
            loading: false
          }};
  
        } else {
          const data = JSON.parse(action.payload.data);
          if (data.sourceDocs) {
            return {
              ...state,
              pendingSourceDocs: data.sourceDocs,
              isLoading: true
            };
          } else {
            return {
              ...state,
              pending: (state.pending ?? '') + data.data,
              isLoading: true
            };
          }
        }

    case 'SEND_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };
    case 'RECEIVE_MESSAGE':
      return { ...state, messages: [...state.messages, action.payload] };
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, isError: true, error: action.payload };
    default:
      return state;
  }
}

type Props = {
  children: ReactNode;
  endpoint: string;
};

export function ChatBotProvider({ children, endpoint }: Props) {
  const [state, dispatch] = useReducer(chatBotReducer, {...initialState, ...{ endpoint }});

  return <ChatBotContext.Provider value={{ state, dispatch }}>{children}</ChatBotContext.Provider>;
}

export function useChatBotState() {
  const context = useContext(ChatBotContext);
  if (context === undefined) {
    throw new Error('useChatBotState must be used within a ChatBotProvider');
  }
  return context;
}