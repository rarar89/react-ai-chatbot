React ChatBot

Simple React AI Chatbot based on GPT-3 or GPT-4 OpenAI models. This component provides hooks for chatbot interaction - sending and receiving messages. UI Styling is completely up to you!

Chatlas.ai is used to set chat context!

Install

# npm install react-chatbot

Usage instructions: 

1. Singup at chatlas.ai

2. Start discussion either from documents or webpages. 

3. Enable discussion sharing (at right top side). Copy discussion endpoint.

4. Example implementation:

import { ChatBotProvider, useChatBot } from 'react-ai-chatbot';

index.tsx

import { ChatBotProvider } from 'react-ai-chatbot';

const ChatBotWrapper = () => {

  <ChatBotProvider endpoint="<your_discussion_endpoint>">
    <ChatBot />
  </ChatBotProvider>
}

ChatBot.tsx

import { useState } from 'react';
import { useChatBot } from 'react-ai-chatbot';
import { Message } from 'react-ai-chatbot/types'

const ChatBot = () => {

  const [message, setMessage] = useState<string>();

  const [messages, sendMessage, incommingMessage, isLoading, isError, error] = useChatBot();

  const messageChangeHandler = (e) => {

    setMessage(e.target.value);
  }

  const sendMessageHandler = () => {

    sendMessage(message);
    setMessage('');
  }

  return <div>
    {isLoading ? <div>loading...</div> : ''}
    {isError ? <div>{error}</div> : ''}
    <div>
      {messages.map((m, i)=><div>{m.type}: {m.message}</div>)}
    </div>
    <div>
      <input type="text" value={message} onChange={messageChangeHandler} />
    </div>
  </div>
}

Documentation

useChatBot
  - messages <[{type: 'bot' | 'user', message: string}]> - Discussion message are stored in this array
  - sendMessage <(message: string)> - function used to send message
  - incommingMessage string - message returned on-the-fly upon message generation. Store in a seperate component to not re-render whole chat component
  - isLoading boolean - true while ai generates the message
  - isError boolean - when error ocure 
  - error string - error message