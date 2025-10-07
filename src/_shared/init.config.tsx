export const defaultMenuItems = [
  {
    id: 'dashboard',
    title: 'داشبورد',
    icon: 'home',
    path: '/dashboard',
    roles: ["FullAdmin", "BranchManager" , "Customer"], 
  },
  {
    id: 'promisorEnactment',
    title: 'مدیریت متعهد',
    icon: 'contact',
    children: [
      {
        id: 'create-promisor',
        title: 'ایجاد متعهد',
        icon: 'contact',
        path: '/dashboard/customer/promisor',
        roles: ["FullAdmin","BranchManager"],
      },
      {
        id: 'create-enactment',
        title: 'لیست مصوبات',
        icon: 'contact',
        path: '/dashboard/customer/enactment',
        roles: ["FullAdmin","BranchManager"],
      },
    ],
  },

]
