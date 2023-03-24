import { postAPICall } from "../../apiService";
import { CREATE_POST_API } from "../../endPoints";

export const createPost = async (event: any) => {
    console.log("Create Post", event);
    const result = await postAPICall({
        baseUrl: CREATE_POST_API,
        body: event
    })
    return result;
}
