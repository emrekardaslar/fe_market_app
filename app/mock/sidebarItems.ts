import { SidebarItem, SidebarMenu } from "../models/sidebarMenu";

const snackItems: SidebarItem[] = [
  { name: "Chocolate", subItems: [] },
  /* {name: 'Ice Cream', subItems: []}, {name: 'Crisps', subItems: []} */
];
const drinkItems: SidebarItem[] = [
  { name: "Coke", subItems: [] },
  { name: "Water", subItems: [] },
  { name: "Tea", subItems: [] },
];

export const sidebarMenu: SidebarMenu = {
  items: [
    {
      name: "Food",
      subItems: snackItems,
    },
    {
      name: "Drink",
      subItems: drinkItems,
    },
  ],
};

export default sidebarMenu;
