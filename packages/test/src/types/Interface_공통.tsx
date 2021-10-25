interface IMenu {
  key: string;
  title: string;
}

interface ICategory {
  title: string;
  menuList: IMenu[];
}

export type { IMenu, ICategory };
