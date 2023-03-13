export interface SidebarItem {
  name: string;
  subItems: SidebarItem[];
}

export interface SidebarMenu {
  items: SidebarItem[];
}
