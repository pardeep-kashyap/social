import { createContext } from "react";
import { createMachine, } from "xstate";
// import { loginSuccess } from "./auth/auth.action";
// import { AuthMachine } from "./auth/auth.machine";
import { createPost } from "./post/post.action";
// import { PostMachine } from "./post/post.machine";

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
        posts: {
            states: {
                'createPostInProgress': {
                    invoke: {
                        src: (context: any, event: any) => createPost(event),
                        onDone: {
                            target: "createPostSuccess"
                        },
                        onError: {
                            target: 'createPostInFailed'
                        }
                    }
                },
                'createPostSuccess': {
                    type: 'final'
                },
                'createPostInFailed': {
                },

            }
        },
        auth: {
            states: {
                'authSuccess': {

                },
                'loginFailed': {
                },
            }
        }
    },
    on: {
        ...postAction
    } as any
})



