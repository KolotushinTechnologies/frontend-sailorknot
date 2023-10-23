export const DASHBOARD_NAVIGATION = {
  DASHBOARD: {
    title: "Главная",
    link: () => "/dashboard",
    icon: `<svg class="w-[17px] h-[17px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
    <path stroke="currentColor" strokeLinecap="round" stroke-linejoin="round" strokeWidth="1" d="M3 8v10a1 1 0 0 0 1 1h4v-5a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v5h4a1 1 0 0 0 1-1V8M1 10l9-9 9 9"/>
  </svg>`,
    urlParam: ["dashboard"],
  },
  DASHBOARD_USERS: {
    title: "Пользователи",
    link: () => "/dashboard/users",
    icon: `<svg class="w-[17px] h-[17px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 18">
    <path stroke="currentColor" strokeLinecap="round" stroke-linejoin="round" strokeWidth="1" d="M7 8a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-2 3h4a4 4 0 0 1 4 4v2H1v-2a4 4 0 0 1 4-4Z"/>
  </svg>`,
    urlParam: ["users"],
  },
  DASHBOARD_USERS_UPDATE: {
    title: "Редактировать пользователя",
    link: (userId?: string) => `/dashboard/users/${userId}/update`,
    icon: `<svg class="w-[17px] h-[17px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 18">
    <path stroke="currentColor" strokeLinecap="round" stroke-linejoin="round" strokeWidth="1" d="M7 8a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm-2 3h4a4 4 0 0 1 4 4v2H1v-2a4 4 0 0 1 4-4Z"/>
  </svg>`,
    urlParam: ["users"],
  },
  DASHBOARD_ORDERS: {
    title: "Заявки",
    link: () => "/dashboard/orders",
    icon: `<svg class="w-[17px] h-[17px] text-gray-800 dark:text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
    </svg>
  `,
    urlParam: ["orders"],
  },
  // DASHBOARD_POSTS: {
  //   title: "Посты",
  //   link: () => "/dashboard/posts",
  //   icon: `<svg class="w-[17px] h-[17px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
  //   <path stroke="currentColor" strokeLinecap="round" stroke-linejoin="round" strokeWidth="1" d="M18 5h1v12a2 2 0 0 1-2 2m0 0a2 2 0 0 1-2-2V2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v15a2 2 0 0 0 2 2h14ZM10 4h2m-2 3h2m-8 3h8m-8 3h8m-8 3h8M4 4h3v3H4V4Z"/>
  // </svg>`,
  //   urlParam: ["posts"],
  // },
  // DASHBOARD_POSTS_CREATE: {
  //   title: "Создать пост",
  //   link: () => "/dashboard/posts/create",
  //   icon: `<svg class="w-[17px] h-[17px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
  //   <path stroke="currentColor" strokeLinecap="round" stroke-linejoin="round" strokeWidth="1" d="M18 5h1v12a2 2 0 0 1-2 2m0 0a2 2 0 0 1-2-2V2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v15a2 2 0 0 0 2 2h14ZM10 4h2m-2 3h2m-8 3h8m-8 3h8m-8 3h8M4 4h3v3H4V4Z"/>
  // </svg>`,
  //   urlParam: ["posts", "create"],
  // },
}
