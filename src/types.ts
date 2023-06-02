export interface IFace {
    face: string
}

export interface IUser {
    id: string;
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    userImage: string;
    token?: string
}
export interface IConversation {
    messages: any[],
    users: IUser[],
    _id: string,
    id: string,
    createdAt: string;
    updatedAt: string;

}

export interface IPost {
    caption: string;
    images: string[];
    tags: string[];
    _id: string,
    author: string;
    postAuthoredDetails: {
        lastName: string;
        firstName: string;
        userImage: string;
    };
    comments: {
        images: string[];
        author: string;
        likes: number;
        text: string;
    }[];
    location: {
        lat: number;
        lng: number;
        name: string;
    };
    likes: string[];
    createdAt: String;
    isComment?: boolean
}

export enum POST_VIEW {
    GRID,
    ROW
}
