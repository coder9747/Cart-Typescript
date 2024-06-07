export interface UserData {
    email: string,
    password: string,
}

export interface RegisterResponse
{
    succes:boolean,
    message:string,
    payload?:any,
};