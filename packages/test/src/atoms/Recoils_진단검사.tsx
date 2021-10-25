import { atom } from 'recoil';
import {
  IWatingPatient,
  IBtnDisabled,
  IFromToDate,
  IDiagnosis,
  ICheckedList,
  IConsignment,
  IConsBtnDisabled,
  IConsCheckedList,
  IResultPatient,
  IResultBtnDisabled,
  IResultDiagnosis,
  IResultCheckedList,
  IResulteditList,
} from '../types/Interface_진단검사';

/****************************** 진단검사 접수 ******************************/
/******** Components/diagnosisExmn/Receipt ********/
// 1. DateBox.tsx
// 검사일자 DateField
export const date = atom<Date>({
  key: 'date',
  default: new Date(),
});
// 검사실 SelectField
export const deptValue = atom<string>({
  key: 'deptValue',
  default: '1',
});
// 대기환자 리스트 선택시 Flag 값으로 진단검사 리스트 조회
export const watingPatientStateFlag = atom<boolean>({
  key: 'watingPatientStateFlag',
  default: false,
});

// 2. Tabs.tsx => 중복되는 컴포넌트라 useTab(), useEchart() 커스텀 훅으로 뺌
//  탭 선택
// export const selectedTab = atom<string>({
//   key: 'selectedTab',
//   default: '전체',
// });
// Echart, 탭별 건수
// export const receiptCount = atom<number[]>({
//   key: 'receiptCount',
//   default: [0, 0, 0, 0],
// });

// 3. WatingPatientList.tsx
// 진단검사 대기환자리스트 조회 결과
export const waitingPatientList = atom<IWatingPatient[]>({
  key: 'waitingPatientList',
  default: [],
});
// 대기환자리스트 선택시 WatingPatientList 화면에 세팅
export const selectedList = atom<IWatingPatient | undefined>({
  key: 'selectedList',
  default: undefined,
});
// Flag값 변경될때 대기환자리스트 조회
export const selectWatingPatientFlag = atom<boolean>({
  key: 'selectPatientListFlag',
  default: false,
});

// 4. PatientDetail.tsx

// 5. ButtonLine.tsx
// DataBox.tsx 버튼Line Disabled
export const btnDisabled = atom<IBtnDisabled>({
  key: 'btnDisabled',
  default: {
    select: false,
    bacode: false,
    cancel: false,
    complete: false,
  },
});

// 6. DiagnosisList.tsx
// 진단검사 리스트 조회
export const diagnosisList = atom<IDiagnosis[]>({
  key: 'diagnosisList',
  default: [],
});
// 체크한 진단검사 리스트
export const checkedList = atom<ICheckedList[]>({
  key: 'checkedList',
  default: [],
});
// 리스트 선택시 Flag 값으로 진단검사 리스트 조회
export const selectDiagnosisFlag = atom<boolean>({
  key: 'selectDiagnosisListFlag',
  default: false,
});
// 바코드출력/접수취소/완료 버튼 클릭시 진단검사 리스트 provider값 변경
export const clickedBtn = atom<string>({
  key: 'clickedBtn',
  default: '',
});

/****************************** 위탁 의뢰 ******************************/
/******** ComponentsdiagnosisExmn//Consignment ********/
// 1. DateBox.tsx
// DataBox.tsx 날짜선택
export const fromToDate = atom<IFromToDate>({
  key: 'fromToDate',
  default: {
    from: new Date(),
    to: new Date(),
  },
});
// DataBox.tsx 수탁기관
export const consignmentDeptValue = atom<string>({
  key: 'consignmentDeptValue',
  default: '',
});
// DataBox.tsx 수탁기관
export const consignmentUnSendValue = atom<string>({
  key: 'consignmentUnSendValue',
  default: '',
});
// DataBox.tsx 날짜구분
export const consignmentDateValue = atom<string>({
  key: 'consignmentDateValue',
  default: '',
});

// 2. ConsignmentList.tsx
// 위탁 의뢰 목록 조회
export const consignmentList = atom<IConsignment[]>({
  key: 'consignmentList',
  default: [],
});
// 체크한 진단검사 리스트
export const consignmentCheckedList = atom<IConsCheckedList[]>({
  key: 'consignmentCheckedList',
  default: [],
});
// Flag값 변경될때 위탁 의뢰 목록 조회
export const selectConsignmentFlag = atom<boolean>({
  key: 'selectConsignmentFlag',
  default: false,
});
//  탭 선택
export const consignmentTab = atom<string>({
  key: 'consignmentTab',
  default: '미전송',
});
// DataBox.tsx 버튼Line Disabled
export const consBtnDisabled = atom<IConsBtnDisabled>({
  key: 'consBtnDisabled',
  default: {
    send: false,
    cancel: false,
  },
});

/****************************** 진단검사 결과 ******************************/
/******** Components/diagnosisExmn/Result ********/
// 1. DateBox.tsx
// 검사일자 DateField
export const resultFromToDate = atom<IFromToDate>({
  key: 'resultFromToDate',
  default: {
    from: new Date(),
    to: new Date(),
  },
});
// 검사실 SelectField
export const resultDeptValue = atom<string>({
  key: 'resultDeptValue',
  default: '1',
});
// 대기환자 리스트 선택시 Flag 값으로 진단검사 리스트 조회
export const resultWatingStateFlag = atom<boolean>({
  key: 'resultWatingStateFlag',
  default: false,
});

// 3. WatingPatientList.tsx
// 진단검사 대기환자리스트 조회 결과
export const resultWaitingList = atom<IResultPatient[]>({
  key: 'resultWaitingList',
  default: [],
});
// 대기환자리스트 선택시 WatingPatientList 화면에 세팅
export const selectedResultList = atom<IResultPatient | undefined>({
  key: 'selectedResultList',
  default: undefined,
});
// Flag값 변경될때 대기환자리스트 조회
export const selectResultWatingFlag = atom<boolean>({
  key: 'selectResultWatingFlag',
  default: false,
});

// 4. PatientDetail.tsx

// 5. ButtonLine.tsx
// DataBox.tsx 버튼Line Disabled
export const resultBtnDisabled = atom<IResultBtnDisabled>({
  key: 'resultBtnDisabled',
  default: {
    save: false,
    report: false,
    cancel: false,
    print: false,
  },
});

// 6. DiagnosisList.tsx
// 진단검사 리스트 조회
export const resultDiagnosisList = atom<IResultDiagnosis[]>({
  key: 'resultDiagnosisList',
  default: [],
});
// 체크한 진단검사 리스트
export const resultCheckedList = atom<IResultCheckedList[]>({
  key: 'resultCheckedList',
  default: [],
});
// 리스트 선택시 Flag 값으로 진단검사 리스트 조회
export const selectRsultDiagnosisFlag = atom<boolean>({
  key: 'selectRsultDiagnosisFlag',
  default: false,
});
// 바코드출력/접수취소/완료 버튼 클릭시 진단검사 리스트 provider값 변경
export const resultClickedBtn = atom<string>({
  key: 'resultClickedBtn',
  default: '',
});
// 수정한 진단검사 리스트
export const resultEditList = atom<IResulteditList[]>({
  key: 'resultEditList',
  default: [],
});
/********************************************************************/
