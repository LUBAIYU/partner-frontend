import {UserType} from "../models/user";

let currentUser: UserType

const setCurrentUser = (user: UserType) => {
    currentUser = user;
}

const getCurrentUser = (): UserType => {
    return currentUser;
}

export {
    setCurrentUser,
    getCurrentUser
}