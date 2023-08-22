import { IChatbotState } from '../../types';
import reducer, { addMessage, updateIncoming, clearIncoming, setError, clearError, setLoading, clearMessages, setApiEndpoint } from './chatbotSlice';

describe('chatbotSlice', () => {
  let initialState: IChatbotState;

  beforeEach(() => {
    initialState = {
      messages: [],
      isLoading: false,
      isError: false,
      history: [],
      error: null,
      pendingSourceDocs: [],
      pendingMessage: '',
      apiEndpoint: null
    };
  });

  it('should handle addMessage', () => {
    const newMessage = { type: 'user', message: 'Hello, bot!' };
    const newState = reducer(initialState, addMessage(newMessage));
    expect(newState.messages).toHaveLength(1);
    expect(newState.messages[0]).toEqual(newMessage);
  });

  it('should handle updateIncoming with error', () => {
    const actionPayload = { error: 'Some error occurred.' };
    const newState = reducer(initialState, updateIncoming(actionPayload));
    expect(newState.error).toBe(actionPayload.error);
    expect(newState.isError).toBeTruthy();
  });

  it('should handle updateIncoming with pending message', () => {
    const actionPayload = { pending: '...loading' };
    const newState = reducer(initialState, updateIncoming(actionPayload));
    expect(newState.pendingMessage).toBe(actionPayload.pending);
  });

  it('should handle clearIncoming', () => {
    const newState = reducer(initialState, clearIncoming(undefined));
    expect(newState.pendingMessage).toBe('');
  });

  it('should handle setError', () => {
    const error = 'A mock error';
    const newState = reducer(initialState, setError(error));
    expect(newState.isError).toBeTruthy();
    expect(newState.error).toBe(error);
  });

  it('should handle clearError', () => {
    initialState.isError = true;
    initialState.error = 'Some error';
    const newState = reducer(initialState, clearError(undefined));
    expect(newState.isError).toBeFalsy();
    expect(newState.error).toBeNull();
  });

  it('should handle setLoading', () => {
    const loadingState = true;
    const newState = reducer(initialState, setLoading(loadingState));
    expect(newState.isLoading).toBe(loadingState);
  });

  it('should handle clearMessages', () => {
    initialState.messages = [{ type: 'user', message: 'Hello' }];
    const newState = reducer(initialState, clearMessages(undefined));
    expect(newState.messages).toHaveLength(0);
  });

  it('should handle setApiEndpoint', () => {
    const apiEndpoint = 'http://localhost:3000/api';
    const newState = reducer(initialState, setApiEndpoint(apiEndpoint));
    expect(newState.apiEndpoint).toBe(apiEndpoint);
  });
});