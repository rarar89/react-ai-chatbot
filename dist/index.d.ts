import { ReactNode } from "react";
type ProviderProps = {
    children: ReactNode;
    endpoint: string;
};
export function ChatBotProvider({ children, endpoint }: ProviderProps): import("react/jsx-runtime").JSX.Element;
export function useChatBot(): {
    messages: import("types").Message[];
    isLoading: boolean;
    isError: boolean;
    error: string;
    setEndpoint: (endpoint: string) => {
        payload: any;
        type: `${string}/${string}`;
    };
    clearMessages: () => {
        payload: any;
        type: `${string}/${string}`;
    };
    sendMessage: (question: string) => Promise<import("@reduxjs/toolkit").PayloadAction<void, string, {
        arg: string;
        requestId: string;
        requestStatus: "fulfilled";
    }, never> | import("@reduxjs/toolkit").PayloadAction<unknown, string, {
        arg: string;
        requestId: string;
        requestStatus: "rejected";
        aborted: boolean;
        condition: boolean;
    } & ({
        rejectedWithValue: true;
    } | ({
        rejectedWithValue: false;
    } & {})), import("@reduxjs/toolkit").SerializedError>> & {
        abort: (reason?: string) => void;
        requestId: string;
        arg: string;
        unwrap: () => Promise<void>;
    };
};
export function usePending(): {
    pending: string;
};

//# sourceMappingURL=index.d.ts.map
