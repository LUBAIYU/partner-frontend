import {UserType} from "./user";

/**
 * 队伍类别
 */
export type TeamType = {
    id: number;
    name: string;
    description?: string;
    maxNum: number;
    expireTime?: Date;
    password?: string;
    status: number;
    createTime: Date;
    updateTime: Date;
    createUser: UserType;
    userId: number;
    hasJoinNum?: number;
}