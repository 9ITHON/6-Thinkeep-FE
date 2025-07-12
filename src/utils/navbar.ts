export const tabs = [
  {
    id: "today",
    label: "오늘추억",
    icon: "/icons/assignment.svg",
    activeIcon: "/icons/assignment_light.svg",
    path: "/home",
  },
  {
    id: "memory",
    label: "추억보관함",
    icon: "/icons/mail.svg",
    activeIcon: "/icons/mail_light.svg",
    path: "/calendar",
  },
  {
    id: "record",
    label: "기록",
    icon: "/icons/favorite.svg",
    activeIcon: "/icons/favorite_light.svg",
    path: "/badge",
  },
  {
    id: "setting",
    label: "설정",
    icon: "/icons/settings.svg",
    activeIcon: "/icons/settings_light.svg",
    path: "/option",
  },
];

export const pathToTabIdMap = tabs.reduce<Record<string, string>>(
  (map, tab) => {
    map[tab.path] = tab.id;
    return map;
  },
  {}
);
