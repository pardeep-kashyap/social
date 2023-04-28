import { gql } from "@apollo/client";

export const GET_QUOUTES_BY_USER = gql`query getQuotesByUser($by:ID!){
    quote(by:$by){
        text
    }, 
}`;

export const GET_ALL_USER = gql`query getAllUsers{
  users{
    id 
    firstName
    lastName 
    email
  }, 
}`;

export const SEARCH_USER = gql`query SearchUser($param:String!){
  userSearch(param:$param){
    id 
    firstName
    lastName 
    email
    userImage
    saved
    username
    followers
    following
    bio
  }
}`

export const GET_USER_BY_ID = gql`query getUserById($userid:ID!){
    user(id:$userid){
    id 
    firstName
    lastName 
    email
    userImage
    saved
    username
    followers
    following
    bio
  }
}`
export const CREATE_USER = gql`mutation createUser($userNew:UserInput!){
    signUpUser(userNew:$userNew){
      id 
      firstName
      lastName 
      email
      password
    }
}`;

export const SIGN_IN = gql`mutation login($user:UserSigninInput!){
  signInUser(userSignIn:$user){
    token, 
    id,
    firstName
      lastName 
      email
  }
}`;

export const CREATE_QUOTE = gql`mutation createQuote($text:String!){
  createQuote(text:$text)
}`;

export const GET_ALL_POST_BY_USER = gql`
query getPostbyAuther($userid:ID!){
  posts(author:$userid){
    _id
    caption
    images
    tags
    author
    postAuthoredDetails{
      lastName
      firstName
      userImage
    }
    comments{
      images
      author
      likes
      text
    }
    location{
      lat
      lng
      name
    }
    likes
    createdAt{
      date
    }
  }
}
`