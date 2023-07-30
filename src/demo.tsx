import { ReactNode, useState } from 'react';
import { createRoot } from 'react-dom/client';
import useChatBot from './hooks/useChatBot';
import { ChatBotProvider } from './context/ChatBotProvider';
import usePending from './hooks/usePending';

const ChatBot = ({ children } : {children: ReactNode}) => {

  const [message, setMessage] = useState<string>();

  const {messages, sendMessage, isLoading, isError, error} = useChatBot();

  const messageChangeHandler = (e:any) => setMessage(e.target.value);

  const sendMessageHandler = () => {

    sendMessage(message);
    setMessage('');
  }

  return <div>
    {isLoading ? <div>loading...</div> : ''}
    {isError ? <div>{error}</div> : ''}
    <div>
      {messages.map((m, i)=><div key={i}>{m.type}: {m.message}</div>)}
      <div>{children}</div>
    </div>
    <div>
      <input type="text" value={message} onChange={messageChangeHandler} />
    </div>
    <button onClick={sendMessageHandler}>Send</button>
  </div>
}

const Incoming = () => {

  const { pending } = usePending();

  return <>{pending}</>;
}
const App = () => {

  return <ChatBotProvider endpoint='http://localhost:3001/api/discussion-public/903edde9-16ec-400e-ad56-14cfb711b9f6/tzDngBKdIaujas8QtGew96iT2SHshXdlf5wVaSHgIpygl8vgU0hdVbDxPt3DSXyQ'>
    <ChatBot>
      <Incoming />
    </ChatBot>
  </ChatBotProvider>
}

const root = createRoot(document.getElementById('app'));
root.render(<App />);