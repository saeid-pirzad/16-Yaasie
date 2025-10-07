import { apiClient } from "../../libs/api";

export const Login = async (username : string , password : string ) =>{
  return apiClient.request
    ('/Users/Login', {
        method: 'POST',
        body: JSON.stringify({
             username,
              password
        }),
    });
}