import { useEffect } from "react";

function useListGridProvider(props : any) {
  useEffect(() => {
    props.grid.setProvider({
      read: async (e : any) => {
        return new Promise((resolve) => {
          resolve([
              {
                  totalCount: 80,
              },
          ]);
        });
      },
      readPage: (e : any) => {
        return new Promise((resolve) => {
          resolve(props.gridData);
        })
      }
    }, []);
    props.grid.readData();
  })
}

export default useListGridProvider;