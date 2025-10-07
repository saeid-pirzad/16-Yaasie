import { apiClient } from "../../libs/api";

export const LoginBranch = async (username : string , password : string ) =>{
  return apiClient.request<{
        success: boolean;
        token?: string;
        message?: string;
        roles: string[];
        nationalId:string;
        haveError : boolean;
        errorMessage : string
    }>
    ('/User/LoginBranch', {
        method: 'POST',
        body: JSON.stringify({
             username,
              password
        }),
    });
}