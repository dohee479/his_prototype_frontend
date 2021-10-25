import { OBTComplete, OBTTreeView } from "luna-orbit";
import { useState } from "react";
import { insuranceList } from "../data/insurance";
let dataArr = [
  {
    name: "홍길동",
    company: "더존비즈온 EBP사업본부 EBP프로젝트관리부",
    email: "abcdefg1@douzone.com",
  },
  {
    name: "홍길준",
    company: "더존비즈온 EBP사업본부 EBP전략사업부",
    email: "abcdefg6@douzone.com",
  },
  {
    name: "김홍길",
    company: "더존비즈온 EBP사업본부 EBP컨설팅센터",
    email: "abcdefg3@douzone.com",
  },
  {
    name: "최홍길",
    company: "더존비즈온 EBP사업본부 EBP기획부",
    email: "abcdefg4@douzone.com",
  },
  {
    name: "박홍길",
    company: "더존비즈온 EBP사업본부 EBP고객지원부",
    email: "abcdefg5@douzone.com",
  },
  {
    name: "이홍길",
    company: "더존비즈온 EBP사업본부 EBP전략사업부",
    email: "abcdefg6@douzone.com",
  },
];
function InsuranceType(props: any) {
  // 보험유형검색 state
  const [insnKeyword, setInsnKeyword] = useState({
    value: "",
    validateState: "",
  });

  // 보험유형검색(입력 될 때의 함수)
  const handleInsnKeyword = (e: any) => {
    setInsnKeyword({
      ...insnKeyword,
      value: e.value,
    });
  };

  // x 누르면 검색창안에 keyword 모두 삭제
  const eraseAll = () => {
    setInsnKeyword({
      ...insnKeyword,
      value: "",
    });
  };

  // smart complete
  const searchData = (keyword: string): Promise<any[]> => {
    return new Promise((resolve, reject) => {
      let result = dataArr.filter(isMatch(keyword));
      resolve(result);
    });
  };

  const isMatch = (keyword: string) => {
    return (value: any) => {
      let result =
        value["name"].indexOf(keyword) !== -1 ||
        value["email"].indexOf(keyword) !== -1 ||
        value["company"].indexOf(keyword) !== -1;
      return result;
    };
  };

  const handleSearch = (keyword: string): Promise<any[]> => {
    return searchData(keyword);
  };

  const getDataInfo = () => {
    return {
      columnWidths: ["15%", "40%", "40%"], //itemInfo를 총 3칸으로 나눠 배치하고, 각각 너비를 지정합니다.
      itemInfo: [
        {
          key: "name",
          column: 0,
          isKeyValue: true,
        },
        {
          key: "company",
          column: 1,
        },
        {
          key: "email",
          column: 2,
        },
      ],
    };
  };

  // 보험유형 목록 state
  const [insnList, setInsnList] = useState(insuranceList);

  const onMapItem = (e: any) => {
    let list = e.list;
    e.item = {
      key: list.CODE,
      parentKey: list.PARENT,
      labelText: list.NAME
    }
  }

  return (
    <>
      <div>
        {/* 보험유형 검색 */}
        <div style={{ padding: "16px", borderBottom: "1px solid #f1f3f5" }}>
          <div style={{ fontWeight: "bold" }}>보험유형 검색</div>
          <div
            style={{ margin: "8px 0", position: "relative" }}
            className="insn-search-frame"
          >
            <OBTComplete
              className="insn-search"
              value={insnKeyword.value}
              onChange={(e) => handleInsnKeyword(e)}
              onSearch={handleSearch}
              dataInfo={getDataInfo()}
              placeHolder="유형명으로 검색하세요"
            />
            {insnKeyword.value ? (
              // <svg
              //   height="16"
              //   aria-hidden="true"
              //   focusable="false"
              //   data-prefix="fas"
              //   data-icon="times-circle"
              //   className="svg-inline--fa fa-times-circle fa-w-16 svg-close"
              //   role="img"
              //   xmlns="http://www.w3.org/2000/svg"
              //   viewBox="0 0 512 512"
              //   fill="currentColor"
              // >
              //   <path
              //     d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm121.6 313.1c4.7 4.7 4.7 12.3 0 17L338 377.6c-4.7 4.7-12.3 4.7-17 0L256 312l-65.1 65.6c-4.7 4.7-12.3 4.7-17 0L134.4 338c-4.7-4.7-4.7-12.3 0-17l65.6-65-65.6-65.1c-4.7-4.7-4.7-12.3 0-17l39.6-39.6c4.7-4.7 12.3-4.7 17 0l65 65.7 65.1-65.6c4.7-4.7 12.3-4.7 17 0l39.6 39.6c4.7 4.7 4.7 12.3 0 17L312 256l65.6 65.1z"
              //   ></path>
              // </svg>
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
        <div style={{ padding: "16px" }}>
          <div style={{ fontWeight: "bold" }}>보험유형 목록</div>
          <div style={{ height: '100%' }}>
            <OBTTreeView
              key="1993"
              list={insnList.list}
              childCount={true}
              type={OBTTreeView.Type.default}
              onAfterSelectChange={({ item }) => {
                setInsnList({ ...insnList, selectedItem: item.key })
              }}
              // onMapItem={onMapItem}
              selectedItem={insnList.selectedItem}
              width='100%'
              height='100%'
              className="insn-treeview"
            ></OBTTreeView>
          </div>
        </div>
      </div>
    </>
  );
}

export default InsuranceType;
