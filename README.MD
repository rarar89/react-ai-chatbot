# React ChatBot

Simple React AI Chatbot based on GPT-3 or GPT-4 OpenAI models. This component provides hooks for chatbot interaction - sending and receiving messages. UI Styling is completely up to you!

Chatlas.ai is used to set discussion context and settings!

## Install

``npm install react-chatbot``

or

``yarn install react-chatbot``

## Usage instructions: 

1. Singup at chatlas.ai

2. Start discussion either from documents or webpages. 

3. Enable discussion sharing (at right top side). Copy discussion endpoint.

4. Example implementation:

```tsx
import { ReactNode, useState, ChangeEvent } from 'react';
import { ChatBotProvider, useChatBot, usePending } from 'react-ai-chatbot';

const ChatBot = ({ children } : { children: ReactNode }) => {

  const [ message, setMessage ] = useState<string>();

  const { messages, sendMessage, isLoading, isError, error } = useChatBot();

  const messageChangeHandler = (e:ChangeEvent<HTMLInputElement>) => setMessage(e.target.value);

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

const PendingMessage = () => {

  const { pending } = usePending();

  return <>{ pending }</>;
}

const App = () => {

  return <ChatBotProvider endpoint='<your_discussion_endpoint>'>
    <ChatBot>
      <PendingMessage />
    </ChatBot>
  </ChatBotProvider>
}
```

## Documentation

**useChatBot**
  - messages: <[{type: 'bot' | 'user', message: string}]> - Discussion message are stored in this array
  - sendMessage: <(message: string)> - function used to send message
  - incomming: string - message returned on-the-fly upon message generation. Store in a seperate component to not re-render whole chat component
  - isLoading: boolean - true while ai generates the message
  - isError: boolean - when error ocure 
  - error: string - error message
  - clearMessages: ()=>void - clear all chat messages
  - setEnpoint: (endpoint:string)=>void - set chat endpoint. Can be used to switch to a different chat

**usePending**
  - pending: string - use to get message on-the-fly while it's being generated, chatgpt style.