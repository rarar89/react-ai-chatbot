var $8zHUo$reactjsxruntime = require("react/jsx-runtime");
var $8zHUo$react = require("react");
var $8zHUo$reactredux = require("react-redux");
var $8zHUo$reduxjstoolkit = require("@reduxjs/toolkit");
var $8zHUo$microsoftfetcheventsource = require("@microsoft/fetch-event-source");

function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "ChatBotProvider", () => $a817765f6380df3e$export$edcf98832de20694);
$parcel$export(module.exports, "useChatBot", () => $e75ae738e7284e2d$export$2e2bcd8739ae039);
$parcel$export(module.exports, "usePending", () => $b7aa2fa0c58e4ded$export$2e2bcd8739ae039);





const $1844adcbe4abdd51$var$initialState = {
    messages: [],
    isLoading: false,
    isError: false,
    history: [],
    error: null,
    pendingSourceDocs: [],
    pendingMessage: "",
    apiEndpoint: null
};
const $1844adcbe4abdd51$export$2d216c7ce5e6c5d4 = (0, $8zHUo$reduxjstoolkit.createSlice)({
    name: "chatbot",
    initialState: $1844adcbe4abdd51$var$initialState,
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
const { addMessage: $1844adcbe4abdd51$export$16fdb433d434f08, updateIncoming: $1844adcbe4abdd51$export$461102b9fcc3f403, clearIncoming: $1844adcbe4abdd51$export$2bfb84727faba2b7, setError: $1844adcbe4abdd51$export$b8d0bb2aa0adefe5, clearError: $1844adcbe4abdd51$export$a15ba4bdf59dacc9, setLoading: $1844adcbe4abdd51$export$3ac708362c1f96eb, clearMessages: $1844adcbe4abdd51$export$f2434643f2abff11, setApiEndpoint: $1844adcbe4abdd51$export$8e00fdfb3569f0ac, finishIncoming: $1844adcbe4abdd51$export$e841af224c9eea56 } = $1844adcbe4abdd51$export$2d216c7ce5e6c5d4.actions;
var $1844adcbe4abdd51$export$2e2bcd8739ae039 = $1844adcbe4abdd51$export$2d216c7ce5e6c5d4.reducer;


const $3a84d87b6b4e6254$export$6f57813fe9f31bf9 = (0, $8zHUo$reduxjstoolkit.configureStore)({
    reducer: {
        chatbot: (0, $1844adcbe4abdd51$export$2e2bcd8739ae039)
    }
});



const $a817765f6380df3e$var$EndpointSetter = ({ children: children, endpoint: endpoint })=>{
    const dispatch = (0, $8zHUo$reactredux.useDispatch)();
    (0, $8zHUo$react.useEffect)(()=>{
        dispatch((0, $1844adcbe4abdd51$export$8e00fdfb3569f0ac)(endpoint));
    }, [
        endpoint,
        dispatch
    ]);
    return /*#__PURE__*/ (0, $8zHUo$reactjsxruntime.jsx)((0, $8zHUo$reactjsxruntime.Fragment), {
        children: children
    });
};
function $a817765f6380df3e$export$edcf98832de20694({ children: children, endpoint: endpoint }) {
    return /*#__PURE__*/ (0, $8zHUo$reactjsxruntime.jsx)((0, $8zHUo$reactredux.Provider), {
        store: (0, $3a84d87b6b4e6254$export$6f57813fe9f31bf9),
        children: /*#__PURE__*/ (0, $8zHUo$reactjsxruntime.jsx)($a817765f6380df3e$var$EndpointSetter, {
            endpoint: endpoint,
            children: children
        })
    });
}






const $82b08bd8b88cb9fd$export$465cb47180de50f0 = (0, $8zHUo$reduxjstoolkit.createAsyncThunk)("chatbot/sendMessage", async (question, { getState: getState, dispatch: dispatch })=>{
    const { apiEndpoint: apiEndpoint, history: history } = getState().chatbot;
    const apiPath = apiEndpoint + "/chat";
    try {
        dispatch((0, $1844adcbe4abdd51$export$a15ba4bdf59dacc9)(undefined));
        dispatch((0, $1844adcbe4abdd51$export$16fdb433d434f08)({
            message: question,
            type: "user"
        }));
        (0, $8zHUo$microsoftfetcheventsource.fetchEventSource)(apiPath, {
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
                dispatch((0, $1844adcbe4abdd51$export$461102b9fcc3f403)(data));
            },
            onclose: ()=>{
                dispatch((0, $1844adcbe4abdd51$export$e841af224c9eea56)({
                    message: question,
                    type: "user"
                }));
            },
            onerror (err) {
                dispatch((0, $1844adcbe4abdd51$export$b8d0bb2aa0adefe5)(err.message));
                throw err; // rethrow to stop the operation
            }
        });
    } catch (error) {
        dispatch((0, $1844adcbe4abdd51$export$b8d0bb2aa0adefe5)(error.message));
    }
});
var $82b08bd8b88cb9fd$export$2e2bcd8739ae039 = $82b08bd8b88cb9fd$export$465cb47180de50f0;



function $e75ae738e7284e2d$export$2e2bcd8739ae039() {
    const dispatch = (0, $8zHUo$reactredux.useDispatch)();
    const messages = (0, $8zHUo$reactredux.useSelector)((state)=>state.chatbot.messages);
    const isLoading = (0, $8zHUo$reactredux.useSelector)((state)=>state.chatbot.isLoading);
    const isError = (0, $8zHUo$reactredux.useSelector)((state)=>state.chatbot.isError);
    const error = (0, $8zHUo$reactredux.useSelector)((state)=>state.chatbot.error);
    const sendMessage = (question)=>dispatch((0, $82b08bd8b88cb9fd$export$2e2bcd8739ae039)(question));
    const clearMessages = ()=>dispatch((0, $1844adcbe4abdd51$export$f2434643f2abff11)(undefined));
    const setEndpoint = (endpoint)=>dispatch((0, $1844adcbe4abdd51$export$8e00fdfb3569f0ac)(endpoint));
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



function $b7aa2fa0c58e4ded$export$2e2bcd8739ae039() {
    const pending = (0, $8zHUo$reactredux.useSelector)((state)=>state.chatbot.pendingMessage);
    return {
        pending: pending
    };
}




//# sourceMappingURL=main.js.map
