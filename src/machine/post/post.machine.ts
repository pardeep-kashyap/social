import { createPost } from "./post.action";

export const PostMachine = {
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
}