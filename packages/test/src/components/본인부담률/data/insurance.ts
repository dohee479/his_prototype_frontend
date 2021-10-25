import { OBTTooltip } from "luna-orbit";
import big from "../../../img/folder-plus-solid.svg";
import middle from "../../../img/folder-regular.svg";

// export const insuranceList = {
//   selectedItem: '',
//   list: [
//     { CODE: '1000', NAME: '건강보험일반'},
//     { CODE: '1001', NAME: '중증질환자', PARENT: '1000'},
//     { CODE: '1002', NAME: '(외래)65세 미만 일반환자', PARENT: '1000'},
//     { CODE: '1003', NAME: '(외래)65세 미만 의약분업예외환자', PARENT: '1000'},
//     { CODE: '1003-1', NAME: '일반', PARENT: '1003'},
//     { CODE: '1003-2', NAME: '임산부', PARENT: '1003'},
//     { CODE: '2000', NAME: '건강보험차상위C'},
//     { CODE: '2001', NAME: '건강보험차상위C-아들', PARENT: '2000'},
//     { CODE: '2002', NAME: '건강보험차상위C-딸', PARENT: '2000'},
//     { CODE: '3000', NAME: '건강보험차상위E'},
//     { CODE: '3001', NAME: '건강보험차상위E-딸', PARENT: '3000'},
//     { CODE: '3002', NAME: '건강보험차상위E-아들', PARENT: '3000'},
//   ]
// }

export const insuranceList = {
  selectedItem: "",
  list: [
    {
      key: "1000",
      labelText: "건강보험일반",
      imageUrl: big,
      childCount: true,
      // collapsed: false,
      // tooltip: { labelText: '더존ICT그룹', theme: OBTTooltip.Theme.black, position: OBTTooltip.Position.bottom },
      children: [
        { key: "1001", labelText: "중증질환자", imageUrl: middle },
        {
          key: "1002",
          labelText: "(외래)65세 미만 일반환자",
          imageUrl: middle,
        },
        {
          key: "1003",
          labelText: "(외래)65세 미만 의약분업예외환자",
          imageUrl: middle,
          childCount: true,
          children: [
            { key: "1003-1", labelText: "일반"},
            { key: "1003-2", labelText: "임산부"}
          ],
        },
      ],
    },
    {
      key: '2000',
      labelText: "건강보험차상위C",
      imageUrl: big,
      childCount: true,
      children: [
        { key: "2001", labelText: "건강보험차상위C-1", imageUrl: middle},
        { key: "2002", labelText: "건강보험차상위C-2", imageUrl: middle}
      ]
    },
    {
      key: '3000',
      labelText: "건강보험차상위E",
      imageUrl: big,
      childCount: true,
      children: [
        { key: "3001", labelText: "건강보험차상위E-1", imageUrl: middle},
        { key: "3002", labelText: "건강보험차상위E-2", imageUrl: middle}
      ]
    }
  ],
};
