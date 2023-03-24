import { createContext } from "react";
import { createMachine, } from "xstate";
import { PostMachine } from "./post/post.machine";

export const CREATE_POST = 'CREATE_POST';

const doLogin = async () => {

}
const postAction = {
    [CREATE_POST]: {
        target: 'posts.createPostInProgress'
    }
}
export const MachineContext = createContext<any>({});
export const appMachine = createMachine({
    id: 'app',
    initial: 'init',
    states: {
        init: {},
        posts: PostMachine
    },
    on: {
        ...postAction
    } as any
})



