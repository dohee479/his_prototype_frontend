export interface IWatingPatient {
  index: number;
  pid: string; //환자등록번호
  pt_nm: string; //환자명
  sex_cd: string;
  age: string;
  pt_frrn: string;
  mdcr_hm: string;
  dept_hnm: string;
  user_nm: string;
  prsc_date: string;
  cmcd_nm: string;
  dept_hnm2: string;
  state: string;
  rcpn_sqno: string;
}

export interface IDiagnosis {
  prsc_cd: string; //환자등록번호
  prsc_nm: string; //환자명
  spcm_hnm: string;
  ctnr_nm: number;
  user_nm: string;
  user_nm2: string;
  pid: string;
  prsc_date: string;
  prsc_sqno: string;
  state: string;
  rcpn_sqno: string;
}

export interface IConsignment {
  index: number;
  prsc_sqno: string;
  pid: string; //등록번호(환자등록번호)
  pt_nm: string; //이름(환자명)
  sex_age: string; //성별/나이
  prsc_date: string; //검사일자(진료일자)
  user_nm: string; //진료의
  prsc_nm: string; //검사명
  spcm_hnm: string; //검체명
  bacode_nm: string; //바코드번호
  dept_hnm: string; //수탁기관
  state: string; //상태
  trans_date: string; //전송일자
  reply_date: string; //회신일자
}

export interface IBtnDisabled {
  select: boolean;
  bacode: boolean;
  cancel: boolean;
  complete: boolean;
}

export interface IFromToDate {
  from: Date;
  to: Date;
}

export interface ICheckedList {
  index: number;
  hspt_cd: string; // 병원코드
  prsc_sqno: string; // 처방순번
  pid: string; // 등록번호
  pt_nm: string; // 이름
  sex_age: string; // 성별 / 나이
  prsc_date: Date; // 검사일자
  user_nm: string; // 진료의
  prsc_nm: string; // 검사명
  spcm_hnm: string; // 검체명
  bacode_nm: string; // 바코드번호
  dept_hnm: string; // 수탁기관
  state: string; // 상태
  trans_date: Date; // 전송일자
  reply_date: Date; // 회신일자
  cons_yn: string; // 수탁기관확인여부
  rcpn_sqno: number; // 접수일련번호
}

export interface IConsBtnDisabled {
  send: boolean;
  cancel: boolean;
}

export interface IConsCheckedList {
  prsc_sqno: number; //검사일련번호
  pid: string; //환자등록번호
  prsc_date: Date; //검사일자
  index: number;
}

export interface IResultPatient {
  index: number;
  pid: string; //환자등록번호
  pt_nm: string; //환자명
  sex_cd: string;
  age: string;
  pt_frrn: string;
  dept_hnm: string;
  user_nm: string;
  prsc_date: string;
  exmn_date: string;
  cmcd_nm: string;
  dept_hnm2: string;
  state: string;
  rcpn_sqno: string;
}

export interface IResultDiagnosis {
  prsc_cd: string; //환자등록번호
  prsc_nm: string; //환자명
  spcm_hnm: string;
  ctnr_nm: number;
  pid: string;
  prsc_date: string;
  exmn_date: string;
  prsc_sqno: string;
  state: string;
  rcpn_sqno: string;
  exmn_rslt1: string;
  nots: string;
  nots_low: string;
  nots_high: string;
  judgment: string;
}

export interface IResultBtnDisabled {
  save: boolean;
  report: boolean;
  cancel: boolean;
  print: boolean;
}

export interface IResultCheckedList {
  prsc_sqno: string; //처방순번
  rcpn_sqno: string; //접수일련번호
  index: number;
  exmn_rslt1: string; //결과치
}

export interface IResulteditList {
  index: number;
  prsc_sqno: string; //처방순번
  rcpn_sqno: string; //접수일련번호
  exmn_rslt1: string; //결과치
}

export interface ICode {
  pt_nm: string; //이름(환자명)
  prsc_date: string; //검사일자(진료일자)
  prsc_nm: string; //검사명
  // totalCount: number;
}
