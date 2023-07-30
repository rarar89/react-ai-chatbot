import { ReactNode, useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { store } from '../reduxApp/store';
import { setApiEndpoint } from '../features/chatbot/chatbotSlice';

type ProviderProps = {
  children: ReactNode,
  endpoint: string
}

const EndpointSetter = ({ children, endpoint }: ProviderProps) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setApiEndpoint(endpoint));
  }, [endpoint, dispatch]);

  return <>{children}</>;
};

export function ChatBotProvider({ children, endpoint }: ProviderProps) {

  return <Provider store={store}>
    <EndpointSetter endpoint={endpoint}>
      {children}
    </EndpointSetter>
</Provider>
}