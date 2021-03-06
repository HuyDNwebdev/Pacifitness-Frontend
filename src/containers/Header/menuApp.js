export const adminMenu = [
  {
    // quản lý người dùng
    name: "menu.admin.manage-user",
    menus: [
      {
        name: "menu.admin.crud",
        link: "/system/user-manage",
      },
      {
        name: "menu.admin.crud-redux",
        link: "/system/user-redux",
      },
      {
        name: "menu.admin.manage-doctor",
        link: "/system/user-doctor",
      },
      {
        name: "menu.admin.manage-admin",
        link: "/system/user-admin",
      },
    ],
  },
  {
    // quản lý phòng khám
    name: "menu.admin.clinic",
    menus: [
      {
        name: "menu.admin.clinic-manage",
        link: "/system/clinic-manage",
      },
    ],
  },
  {
    // quản lý chuyên khoa
    name: "menu.admin.specialty",
    menus: [
      {
        name: "menu.admin.specialty-manage",
        link: "/system/specialty-manage",
      },
    ],
  },
  {
    // quản lý cẩm nang
    name: "menu.admin.handbook",
    menus: [
      {
        name: "menu.admin.handbook-manage",
        link: "/system/handbook-manage",
      },
    ],
  },
]

// subMenus: [
//   {
//     name: "menu.system.system-administrator.user-manage",
//     link: "/system/user-manage",
//   },
//   {
//     name: "menu.system.system-administrator.user-redux",
//     link: "/system/user-redux",
//   },
// ],
