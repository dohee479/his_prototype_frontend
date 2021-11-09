import { OBTComplete, OBTTreeView } from 'luna-orbit';
import { useEffect, useState } from 'react';
import { getIntyList, searchInty } from '../../../utils/Hooks/api/UschApiService';

function InsuranceType(props: any) {
  // 보험유형검색 state
  const [insnKeyword, setInsnKeyword] = useState('');

  // 보험유형 검색 ref
  // const searchRef = useRef();

  // 보험유형검색(입력 될 때의 함수)
  const handleInsnKeyword = async (e: any) => {
    setInsnKeyword(e.value);
  };

  // x 누르면 검색창안에 keyword 모두 삭제
  const eraseAll = () => {
    setInsnKeyword('');
  };

  // smart complete
  const handleSearch = async (keyword: string): Promise<any[]> => {
    return await searchInty(keyword);
  };

  const getDataInfo = () => {
    return {
      columnWidths: ['15%', '40%', '40%'], //itemInfo를 총 3칸으로 나눠 배치하고, 각각 너비를 지정합니다.
      itemInfo: [
        {
          key: 'inty_lcls',
          column: 0,
          isKeyValue: true,
        },
        {
          key: 'inty_type_asst_1',
          column: 1,
          isKeyValue: true,
        },
        {
          key: 'inty_type_asst_2',
          column: 2,
          isKeyValue: true,
        },
      ],
    };
  };

  // 보험유형 목록 state
  const [insnList, setInsnList] = useState<any>({
    selectedItem: '',
    list: [],
  });

  const onMapItem = (e: any) => {
    let list = e.list;
    e.item = {
      key: list.CODE,
      parentKey: list.PARENT,
      labelText: list.NAME,
    };
  };

  // 보험유형 목록을 불러오는 useEffect
  useEffect(() => {
    const fetchAndSetIntyList = async () => {
      setInsnList(await getIntyList());
    };
    fetchAndSetIntyList();
  }, []);

  const clickSearchInty = (e: any) => {
    if (e.target.data) {
      setInsnList({ ...insnList, selectedItem: e.target.value });
      props.setInty(e.target.data);
    }
  };

  useEffect(() => {
    // console.log('selectedItem', insnList.selectedItem);
  }, [insnList.selectedItem]);

  // Treeview onSelectChange 함수
  const onAfterSelectChange = (item: any) => {
    // console.log('item', item);
    setInsnList({ ...insnList, selectedItem: item.ID });
    if (item.FULLNAME) {
      const inty = JSON.parse(item.FULLNAME);
      props.setInty(inty);
    }
  };

  return (
    <>
      <div>
        {/* 보험유형 검색 */}
        <div style={{ padding: '16px', borderBottom: '1px solid #f1f3f5' }}>
          <div style={{ fontWeight: 'bold' }}>보험유형 검색</div>
          <div style={{ margin: '8px 0', position: 'relative' }} className="insn-search-frame">
            <OBTComplete
              // ref={searchRef}
              className="insn-search"
              value={insnKeyword}
              onChange={(e) => {
                handleInsnKeyword(e);
                clickSearchInty(e);
              }}
              onSearch={handleSearch}
              dataInfo={getDataInfo()}
              placeHolder="유형명으로 검색하세요"
            />
            {insnKeyword ? (
              <svg
                height="16"
                aria-hidden="true"
                focusable="false"
                data-prefix="far"
                data-icon="times-circle"
                className="svg-inline--fa fa-times-circle fa-w-16 svg-close"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                fill="currentColor"
                onClick={eraseAll}
              >
                <path d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm101.8-262.2L295.6 256l62.2 62.2c4.7 4.7 4.7 12.3 0 17l-22.6 22.6c-4.7 4.7-12.3 4.7-17 0L256 295.6l-62.2 62.2c-4.7 4.7-12.3 4.7-17 0l-22.6-22.6c-4.7-4.7-4.7-12.3 0-17l62.2-62.2-62.2-62.2c-4.7-4.7-4.7-12.3 0-17l22.6-22.6c4.7-4.7 12.3-4.7 17 0l62.2 62.2 62.2-62.2c4.7-4.7 12.3-4.7 17 0l22.6 22.6c4.7 4.7 4.7 12.3 0 17z"></path>
              </svg>
            ) : (
              <svg
                height="16"
                aria-hidden="true"
                focusable="false"
                data-prefix="fas"
                data-icon="search"
                className="svg-inline--fa fa-search fa-w-16 svg-search"
                role="img"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
              >
                <path
                  fill="currentColor"
                  d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z"
                ></path>
              </svg>
            )}
          </div>
        </div>
        {/* 보험유형 목록 */}
        <div style={{ padding: '16px' }}>
          <div style={{ fontWeight: 'bold' }}>보험유형 목록</div>
          <div style={{ height: '100%' }}>
            <OBTTreeView
              list={insnList.list}
              childCount={true}
              type={OBTTreeView.Type.default}
              onAfterSelectChange={({ item }) => onAfterSelectChange(item)}
              onMapItem={onMapItem}
              selectedItem={insnList.selectedItem}
              width="100%"
              height="100%"
              className="insn-treeview"
            ></OBTTreeView>
          </div>
        </div>
      </div>
    </>
  );
}

export default InsuranceType;
