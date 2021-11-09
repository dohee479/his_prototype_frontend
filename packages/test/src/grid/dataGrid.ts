import { OBTDataGridInterface } from 'luna-orbit';

export const getGrid = (columns: any[]) => {
  const grid = new OBTDataGridInterface('grid_column_type', {
    emptyDataMsg: '초기 데이터가 없어요',
    // fixedColumnCount: 1,
  })
    .setColumns(columns)
    .setProvider({
      read: (e: any) => {
        return new Promise((resolve) => {
          // resolve()
        });
      },
      // readPage: (e: any) => {  console.log('test2');
      //   return new Promise((resolve) => {})
      // }
    });
  return grid;
};
