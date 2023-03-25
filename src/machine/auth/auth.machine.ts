import { actions } from "xstate";
import { loginSuccess } from "./auth.action";

const AuthContent = {
    userInfo: {

    }
}
export const AuthMachine = {
    states: {
        'authSuccess': {
            invoke: loginSuccess

        },
        'loginFailed': {
        },

    }
}