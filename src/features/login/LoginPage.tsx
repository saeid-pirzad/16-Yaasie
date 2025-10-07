// import { useMutation } from "@tanstack/react-query";
// import { Login } from "../../services/Users/LoginBranch";



export default function LoginForm() {

  // const loginMutation = useMutation({
    // mutationFn: async ({ username, password }: any) =>
    //   Login(username, password),
    // onSuccess: (data, variables) => {
    //   if (data.token) {
        // authActions.login(variables.username, data.token, data.roles, data.nationalId);
        // router.navigate({ to: "/dashboard" });
    //     console.log('data', data)
    //   }
    //   else {
    //     throw new Error(data?.errorMessage || "ورود ناموفق بود!")
    //   }
    // },
    // onError: (error: any) => {
    //   throw new Error(error.errorMessage || "ورود ناموفق بود!");
    // }
  // });



  return (
    <div className="bg-white rounded-xl p-4">

      <h2 className="text-sm font-semibold text-blue-900 mb-6">
        قسمت تعریف کامپوننت ها
      </h2>

      {/* <button onClick={() => loginMutation.mutate({
        "username": "3350147321",
        "password": "123456"
      })}>Click</button> */}

    </div>
  );
}
