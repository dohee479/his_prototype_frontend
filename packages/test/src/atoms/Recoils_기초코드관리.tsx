import { atom } from 'recoil';

/****************************** 기초코드관리 ******************************/
// 처방코드조회목록
export const selectPrscCodeList = atom<any[]>({
  key: 'selectPrscCodeList',
  default: [],
});

// 처방코드관리 코드 조회 탭
export const prscCodeTab = atom<string>({
  key: 'prscCodeTab',
  default: '라이브러리',
});
/********************************************************************/

// 기초 코드관리
// 등록된 처방코드 | 라이브러리에 따른 코드조회 tabList
export const categories = atom<string[]>({
  key: 'categories',
  default: ['전체', '행위', '약제', '치료재료'] 
});