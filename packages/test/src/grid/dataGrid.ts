import { OBTDataGridInterface } from "luna-orbit"

export const getGrid = (columns: any[]) => {
  const grid = new OBTDataGridInterface('grid_column_type', {
    gridType: OBTDataGridInterface.GridType.gridView,
    editable: true,
    appendable: true,
    emptyDataMsg: '초기 데이터가 없어요',
    fixedColumnCount: 1,
  })
  grid.setColumns(columns)
  grid.setProvider(
    {
      read: (e: any) => {
        return new Promise((resolve) => {
          // resolve()
        })
      },
      store: (e: any) => {
        return new Promise((resolve) => {})
      }  
    },
  )
  return grid;
}