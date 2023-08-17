import {jsx as $hgUW1$jsx, Fragment as $hgUW1$Fragment} from "react/jsx-runtime";
import {useEffect as $hgUW1$useEffect} from "react";
import {useDispatch as $hgUW1$useDispatch, Provider as $hgUW1$Provider, useSelector as $hgUW1$useSelector} from "react-redux";
import {configureStore as $hgUW1$configureStore, createSlice as $hgUW1$createSlice, createAsyncThunk as $hgUW1$createAsyncThunk} from "@reduxjs/toolkit";
import {fetchEventSource as $hgUW1$fetchEventSource} from "@microsoft/fetch-event-source";






const $b708373557f7a76e$var$initialState = {
    messages: [],
    isLoading: false,
    isError: false,
    history: [],
    error: null,
    pendingSourceDocs: [],
    pendingMessage: "",
    apiEndpoint: null
};
const $b708373557f7a76e$export$2d216c7ce5e6c5d4 = (0, $hgUW1$createSlice)({
    name: "chatbot",
    initialState: $b708373557f7a76e$var$initialState,
    reducers: {
        addMessage: (state, action)=>{
            return {
                ...state,
                messages: [
                    ...state.messages,
                    action.payload
                ]
            };
        },
        updateIncoming: (state, action)=>{
            const payload = action.payload;
            const newState = {
                ...state
            };
            if (payload.error) {
                newState.error = payload.error;
                newState.isError = true;
            }
            if (payload.pending) newState.pendingMessage = state.pendingMessage + action.payload.pending;
            if (payload.sourceDocs) newState.pendingSourceDocs = payload.sourceDocs;
            return newState;
        },
        clearIncoming: (state)=>{
            return {
                ...state,
                pendingMessage: ""
            };
        },
        finishIncoming: (state, action)=>{
            return {
                ...state,
                history: [
                    ...state.history,
                    [
                        action.payload.message,
                        state.pendingMessage ?? "",
                        state.pendingSourceDocs
                    ]
                ],
                messages: [
                    ...state.messages,
                    {
                        type: "bot",
                        message: state.pendingMessage ?? "",
                        sourceDocs: state.pendingSourceDocs
                    }
                ],
                pendingMessage: "",
                pendingSourceDocs: [],
                loading: false
            };
        },
        setError: (state, action)=>{
            return {
                ...state,
                isError: true,
                error: action.payload
            };
        },
        clearError: (state, action)=>{
            return {
                ...state,
                isError: false,
                error: null
            };
        },
        setLoading: (state, action)=>{
            return {
                ...state,
                isLoading: action.payload
            };
        },
        clearMessages: (state, action)=>{
            return {
                ...state,
                messages: []
            };
        },
        setApiEndpoint: (state, action)=>{
            return {
                ...state,
                apiEndpoint: action.payload
            };
        }
    }
});
const { addMessage: $b708373557f7a76e$export$16fdb433d434f08, updateIncoming: $b708373557f7a76e$export$461102b9fcc3f403, clearIncoming: $b708373557f7a76e$export$2bfb84727faba2b7, setError: $b708373557f7a76e$export$b8d0bb2aa0adefe5, clearError: $b708373557f7a76e$export$a15ba4bdf59dacc9, setLoading: $b708373557f7a76e$export$3ac708362c1f96eb, clearMessages: $b708373557f7a76e$export$f2434643f2abff11, setApiEndpoint: $b708373557f7a76e$export$8e00fdfb3569f0ac, finishIncoming: $b708373557f7a76e$export$e841af224c9eea56 } = $b708373557f7a76e$export$2d216c7ce5e6c5d4.actions;
var $b708373557f7a76e$export$2e2bcd8739ae039 = $b708373557f7a76e$export$2d216c7ce5e6c5d4.reducer;


const $f59605d4b8245d24$export$6f57813fe9f31bf9 = (0, $hgUW1$configureStore)({
    reducer: {
        chatbot: (0, $b708373557f7a76e$export$2e2bcd8739ae039)
    }
});



const $a5a5402ae9691704$var$EndpointSetter = ({ children: children, endpoint: endpoint })=>{
    const dispatch = (0, $hgUW1$useDispatch)();
    (0, $hgUW1$useEffect)(()=>{
        dispatch((0, $b708373557f7a76e$export$8e00fdfb3569f0ac)(endpoint));
    }, [
        endpoint,
        dispatch
    ]);
    return /*#__PURE__*/ (0, $hgUW1$jsx)((0, $hgUW1$Fragment), {
        children: children
    });
};
function $a5a5402ae9691704$export$edcf98832de20694({ children: children, endpoint: endpoint }) {
    return /*#__PURE__*/ (0, $hgUW1$jsx)((0, $hgUW1$Provider), {
        store: (0, $f59605d4b8245d24$export$6f57813fe9f31bf9),
        children: /*#__PURE__*/ (0, $hgUW1$jsx)($a5a5402ae9691704$var$EndpointSetter, {
            endpoint: endpoint,
            children: children
        })
    });
}






const $6905464cc58aaec6$export$465cb47180de50f0 = (0, $hgUW1$createAsyncThunk)("chatbot/sendMessage", async (question, { getState: getState, dispatch: dispatch })=>{
    const { apiEndpoint: apiEndpoint, history: history } = getState().chatbot;
    const apiPath = apiEndpoint + "/chat";
    try {
        dispatch((0, $b708373557f7a76e$export$a15ba4bdf59dacc9)(undefined));
        dispatch((0, $b708373557f7a76e$export$16fdb433d434f08)({
            message: question,
            type: "user"
        }));
        (0, $hgUW1$fetchEventSource)(apiPath, {
            method: "POST",
            credentials: "include",
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "mode": "cors"
            },
            body: JSON.stringify({
                question: question,
                history: history
            }),
            onmessage: (event)=>{
                if (event.data === "[DONE]") return;
                const data = JSON.parse(event.data);
                dispatch((0, $b708373557f7a76e$export$461102b9fcc3f403)(data));
            },
            onclose: ()=>{
                dispatch((0, $b708373557f7a76e$export$e841af224c9eea56)({
                    message: question,
                    type: "user"
                }));
            },
            onerror (err) {
                dispatch((0, $b708373557f7a76e$export$b8d0bb2aa0adefe5)(err.message));
                throw err; // rethrow to stop the operation
            }
        });
    } catch (error) {
        dispatch((0, $b708373557f7a76e$export$b8d0bb2aa0adefe5)(error.message));
    }
});
var $6905464cc58aaec6$export$2e2bcd8739ae039 = $6905464cc58aaec6$export$465cb47180de50f0;



function $105133afc1787036$export$2e2bcd8739ae039() {
    const dispatch = (0, $hgUW1$useDispatch)();
    const messages = (0, $hgUW1$useSelector)((state)=>state.chatbot.messages);
    const isLoading = (0, $hgUW1$useSelector)((state)=>state.chatbot.isLoading);
    const isError = (0, $hgUW1$useSelector)((state)=>state.chatbot.isError);
    const error = (0, $hgUW1$useSelector)((state)=>state.chatbot.error);
    const sendMessage = (question)=>dispatch((0, $6905464cc58aaec6$export$2e2bcd8739ae039)(question));
    const clearMessages = ()=>dispatch((0, $b708373557f7a76e$export$f2434643f2abff11)(undefined));
    const setEndpoint = (endpoint)=>dispatch((0, $b708373557f7a76e$export$8e00fdfb3569f0ac)(endpoint));
    return {
        messages: messages,
        isLoading: isLoading,
        isError: isError,
        error: error,
        setEndpoint: setEndpoint,
        clearMessages: clearMessages,
        sendMessage: sendMessage
    };
}



function $adcc41bd85650a36$export$2e2bcd8739ae039() {
    const pending = (0, $hgUW1$useSelector)((state)=>state.chatbot.pendingMessage);
    return {
        pending: pending
    };
}




export {$a5a5402ae9691704$export$edcf98832de20694 as ChatBotProvider, $105133afc1787036$export$2e2bcd8739ae039 as useChatBot, $adcc41bd85650a36$export$2e2bcd8739ae039 as usePending};
//# sourceMappingURL=module.js.map
