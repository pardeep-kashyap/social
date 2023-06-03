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


export interface INotification {
    _id: string;
    user: {
        _id: string;
        firstName: string;
        lastName: string;
        userImage: string;
        username: string;
    };
    action: number;
    item: number;
    targetUser: string;
    post: {
        _id: string;
        caption: string;
        images: string[];
        likes: string[];
    };
    isUnread: boolean;
    createdAt: string
}



export interface NotificationReq {
    user: string;
    action: NOTIFICATIONTYPE;
    item?: 1 | 2;
    targetUser: string;
    post?: string;
    comment?: string;
    isUnread?: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export enum NOTIFICATIONTYPE {
    MESSAGE,
    LIKE,
    COMMENT,
    FOLLOW
}
export enum ACTIONTYPE {
    UNFOLLOW,
    POST,
    COMMENT,
    FOLLOW
}
