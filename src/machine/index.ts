import { createContext } from "react";
import { createMachine, } from "xstate";
import { AuthMachine } from "./auth/auth.machine";
import { PostMachine } from "./post/post.machine";

export const CREATE_POST = 'CREATE_POST';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';

const doLogin = async () => {

}
const postAction = {
    [CREATE_POST]: {
        target: 'posts.createPostInProgress'
    },
    [AUTH_SUCCESS]: {
        target: 'auth.authSuccess'
    }

}
export const MachineContext = createContext<any>({});
export const appMachine = createMachine({
    predictableActionArguments: true,
    id: 'app',
    initial: 'init',
    states: {
        init: {},
        posts: PostMachine,
        auth: AuthMachine
    },
    on: {
        ...postAction
    } as any
})



