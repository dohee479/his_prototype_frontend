import { OBTListGrid, OBTListGridInterface, OBTTab, OBTTabs, OBTButton, OBTFormPanel, OBTCheckBox, OBTTextField, OBTDropDownList } from "luna-orbit";
import { ColumnType } from "luna-orbit/OBTListGrid/IColumn";
import { useEffect, useState } from "react";
import { getEdiCondition, getEdiKeyword } from "../../utils/Hooks/api/ApiService";

const list = [
  { value: '1', labelText: '전체' },
  { value: '2', labelText: 'EDI코드' },
  { value: '3', labelText: '한글명' },
  { value: '4', labelText: '영문명' },
];

function Left(props : any) {

  const [ediState, setEdiState] = useState(
    {
      value: "1"
    }
  );
  
  // list-grid
  const initializeGrid = () => {
    let grid = new OBTListGridInterface('grid', {
      useEmptySet: true,
      paging: false,
      rowCountPerPage: 20
    }).setColumns([
      {
        name: '고시일자',
        header: '고시일자',
        type: ColumnType.text,
        width: 100
    },
    {
        name: 'EDI코드',
        header: 'EDI코드',
        type: ColumnType.text,
        width: 100
    },
    {
        name: '한글명',
        header: '한글명',
        type: ColumnType.text,
        width: 100
    },
    {
        name: '보험구분',
        header: '보험구분',
        type: ColumnType.text,
        width: 100
    },
    {
        name: '기재',
        header: '기/재',
        type: ColumnType.text,
        width: 100
    },
    {
        name: '영문명',
        header: '영문명',
        type: ColumnType.text,
        width: 100
    },
    {
        name: '단가',
        header: '단가',
        type: ColumnType.text,
        width: 100
    },
    {
        name: '상대가치점수',
        header: '상대가치점수',
        type: ColumnType.text,
        width: 100
    },
    ]).setProvider({
      read: async (e) => {
        return new Promise((resolve) => {
          resolve([
              {
                  totalCount: 80,
              },
          ]);
      });
      },
      readPage: (e) => {
        console.log("이게 말이대", state)
        return new Promise((resolve) => {
          console.log("readPage안에 state", state)
          resolve(state.results)
        })
      }
    });

    return grid;
  }

  const [state, setState] = useState(
    {
      grid: initializeGrid(),
      noData: false,
      results: [] as any[] | null | undefined
    }
  );

  const handleGrid = () => {

  }

  // 비급여게시 checkbox state
  const [unpaid, setUnpaid] = useState<boolean>(false);

  // 검색 state
  const [keyword, setKeyword] = useState<string>('');

  // 검색 dropdown 초기 value
  const [dropDownState, setDropDownState] = useState<string>('전체')

  // 행위 버튼 on/off
  const [active, setActive] = useState<boolean>(false);

  // 행위 눌렀을 때의 목록
  const [act, setAct] = useState([
      {
        value: false,
        name: '기본진료료',
        code: '01'
      },
      {
        value: false,
        name: '검사료',
        code: '02'
      },
      {
        value: false,
        name: '영상진단 및 방사선치료료',
        code: '03'
      },
      {
        value: false,
        name: '투약 및 조재료',
        code: '04'
      },
      {
        value: false,
        name: '주사료',
        code: '05'
      },
      {
        value: false,
        name: '마취료',
        code: '06'
      },
      {
        value: false,
        name: '이학요법료',
        code: '07'
      },
      {
        value: false,
        name: '정신요법료',
        code: '08'
      },
      {
        value: false,
        name: '처치 및 수술료 등',
        code: '09'
      }
    ]
  )
  
  const [chapter, setChapter] = useState<string[]>(
    ['01', '02', '03', '04', '05', '06', '07', '08', '09']
  );
  // check에 따른 act 함수
  const handleAct = async (e : any) => {
    setAct(act.map(content => {
      if (content.name === e.target.props.labelText) {
        content.value = e.value;
        return content;
      }
      return content;
    }))
    let temp = [];
    for (let data of act) {
      if (data.value) {
        temp.push(data.code)
      }
    }
    setChapter(temp);
    setState(
      {
        ...state,
        results: await getEdiCondition(temp, insurance, group, keyword)
      }
    )
  }

  // 검색
  const search = async (e: any) => {
    setKeyword(e.value);
    // setState(
    //   {
    //     ...state,
    //     results: await getEdiCondition(chapter, insurance, group, e.value)
    //   }
    // )
  }

  // const useProvider = useListGridProvider(state.results);


  useEffect(() => {
    async function fetchAndSetSearch() {
      state.grid.setProvider({
        read: async (e) => {
          return new Promise((resolve) => {
            resolve([
                {
                    totalCount: 80,
                },
            ]);
          });
        },
        readPage: (e) => {
          return new Promise((resolve) => {
            resolve(state.results);
          })
        }
      });
      state.grid.readData();
    }
    fetchAndSetSearch();
  }, [state])

  const handleSelect = async () => {
    state.grid.readData();
  }

  // 보험 구분 코드
  const [insurance, setInsurance] = useState<number[]>([1, 2, 3, 4]);

  const handleInsurance = async (insuranceNum : number[]) => {
    setInsurance(insuranceNum)
    setState(
      {
        ...state,
        results: await getEdiCondition(chapter, insuranceNum, group, keyword)
      }
    )
  }

  // 그룹 코드
  const [group, setGroup] = useState<string[]>(['S', 'G']);

  const handleGroup = async (groupCode : string[]) => {
    setGroup(groupCode);
    setState(
      {
        ...state,
        results: await getEdiCondition(chapter, insurance, groupCode, keyword)
      }
    )
  }

  useEffect(() => {
    async function fetchAndSetFirst() {
      setState(
        {
          ...state,
          results: await getEdiCondition(chapter, insurance, group, keyword)
        }
      )
    }
    fetchAndSetFirst()
  }, [])

  return (
    <>
      <div>
        <div style={{ marginLeft: '16px' }}>
          <OBTTabs
            className="edi-tab"
            value={ediState.value}
            onChange={(e) => setEdiState({value: e.value})}>
            <OBTTab labelText="등록된 처방코드" value="1"></OBTTab>
            <OBTTab labelText="라이브러리" value="2"></OBTTab>
          </OBTTabs>
        </div>
        <div style={{ fontWeight: 'bold', marginLeft: '16px', marginBottom: '8px' }}>코드 조회</div>
        <div className="edi-category">
          <OBTFormPanel className="OBTFormPanel-border" disabled={false} labelTextAlign={OBTFormPanel.Align.center}>
            <colgroup>
              <col data-type='label' width='80px'/>
              <col width='120px'/>
              <col width='120px'/>
              <col width='120px'/>
            </colgroup>
            <tbody>
              <tr>
                <th>카테고리</th>
                <td><OBTButton labelText='행위' onClick={() => setActive(!active)}/></td>
                <td><OBTButton labelText='약재' onClick={handleSelect} /></td>
                <td><OBTButton labelText='치료재료'/></td>
              </tr>
            </tbody>
          </OBTFormPanel>
          <OBTFormPanel className="OBTFormPanel-border obt-unpaid" disabled={false} labelTextAlign={OBTFormPanel.Align.center}>
            <colgroup>
              <col data-type='label' width='80px'/>
              <col width='100px'/>
            </colgroup>
            <tbody>
              <tr>
                <th>비급여게시</th>
                <td><OBTCheckBox value={unpaid} labelText='' onChange={(e) => setUnpaid(e.value)}/></td>
              </tr>
            </tbody>
          </OBTFormPanel>
        </div>
        {
          active ?
          <div style={{ marginLeft: '16px', marginTop: '8px' }}>
            <OBTFormPanel className="OBTFormPanel-border" disabled={false} labelTextAlign={OBTFormPanel.Align.center}>
              <colgroup>
                <col data-type="label" width='64px'/>
                {/* {act.map((content, index) => <col key={index} width='200px'/>)} */}
                <col />
              </colgroup>
              <tbody>
                <tr>
                  <th>행위</th>
                  {act.map(content => <td key={content.name}><OBTCheckBox value={content.value} labelText={content.name} onChange={(e) => handleAct(e)}/></td>)}
                </tr>
              </tbody>
            </OBTFormPanel>
          </div>
          :
          <></>
        }
        <div className="edi-group">
          <OBTFormPanel disabled={false} className="lookup-position OBTFormPanel-border" labelTextAlign={OBTFormPanel.Align.center}>
            <colgroup>
              <col data-type="label" width='80px'/>
              <col width='80px'/>
              <col width='80px'/>
              <col width='80px'/>
            </colgroup>
            <tbody>
              <tr>
                <th>그룹/싱글</th>
                <td><OBTButton labelText='전체' onClick={() => handleGroup(['S', 'G'])}/></td>
                <td><OBTButton labelText='그룹' onClick={() => handleGroup(['G'])}/></td>
                <td><OBTButton labelText='싱글' onClick={() => handleGroup(['S'])}/></td>
              </tr>
            </tbody>
          </OBTFormPanel>
          <OBTFormPanel disabled={false} className="lookup-position OBTFormPanel-border" labelTextAlign={OBTFormPanel.Align.center}>
            <colgroup>
              <col data-type="label" width='80px'/>
              <col width='80px'/>
              <col width='80px'/>
              <col width='80px'/>
            </colgroup>
            <tbody>
              <tr>
                <th>보험구분</th>
                <td><OBTButton labelText='전체' onClick={() => handleInsurance([1, 2, 3, 4])}/></td>
                <td><OBTButton labelText='급여' onClick={() => handleInsurance([1, 2])}/></td>
                <td><OBTButton labelText='비급여' onClick={() => handleInsurance([3, 4])}/></td>
              </tr>
            </tbody>
          </OBTFormPanel>
        </div>
        <div className="code-search">
          <OBTFormPanel disabled={false} className="OBTFormPanel-border">
            <colgroup>
              <col width='100px'/>
              <col />
            </colgroup>
            <tbody>
              <tr>
                <th><OBTDropDownList 
                      displayType={OBTDropDownList.DisplayType.text}
                      list={list}
                      value={dropDownState} 
                      onChange={(e) => setDropDownState(e.value)}/></th>
                <td><OBTTextField value={keyword} onChange={(e) => search(e)}/></td> 
                {/* <td><input type='text' value={keyword} onChange={(e) => search(e)}/></td>  */}
              </tr>
            </tbody>
          </OBTFormPanel>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <OBTButton labelText='엑셀등록' className="excel-position"/> 
            <OBTButton labelText='엑셀다운'/>
          </div>
        </div>
        <div style={{ marginLeft: '16px', marginTop: '8px' }}>
          <OBTListGrid height='400px' interface={state.grid} onChange={handleGrid}/>
        </div>
      </div>
    </>
  );  
}

export default Left;