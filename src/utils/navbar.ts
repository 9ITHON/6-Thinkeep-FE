import {
  assignment,
  assignment_light,
  mail,
  mail_light,
  favorite,
  favorite_light,
  settings,
  settings_light,
} from "@/assets";

export const tabs = [
  {
    id: "today",
    label: "오늘추억",
    icon: assignment,
    activeIcon: assignment_light,
    path: "/home",
  },
  {
    id: "memory",
    label: "추억보관함",
    icon: mail,
    activeIcon: mail_light,
    path: "/calendar",
  },
  {
    id: "record",
    label: "기록",
    icon: favorite,
    activeIcon: favorite_light,
    path: "/badge",
  },
  {
    id: "setting",
    label: "설정",
    icon: settings,
    activeIcon: settings_light,
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
