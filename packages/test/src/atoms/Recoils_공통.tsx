import { atom } from 'recoil';
import { ICategory } from '../types/Interface_공통';

const openSnbState = atom<boolean>({
  key: 'openSnb',
  default: false,
});

const subMenuListState = atom<string[]>({
  key: 'menuList',
  default: ['메뉴1', '메뉴2'],
});

const categoryListState = atom<ICategory[]>({
  key: 'categoryList',
  default: [
    {
      title: '진단검사',
      menuList: [
        { key: 'receipt', title: '접수/취소' },
        { key: 'result', title: '결과 입력/조회' },
        { key: 'consignment', title: '위탁 의뢰' },
      ],
    },
    {
      title: '기초코드관리',
      menuList: [
        { key: 'edi', title: '처방코드관리' },
        { key: 'CLZM0200', title: 'EDI마스터관리' },
        { key: 'selfpay', title: '본인부담률관리'}
      ],
    },
    // {
    //   title: '영상검사',
    //   menuList: [
    //     { key: 'register', title: '접수/취소' },
    //     { key: 'interpretation', title: '판독 입력' },
    //   ],
    // },
    // {
    //   title: '내시경검사',
    //   menuList: [
    //     { key: 'register', title: '접수/취소' },
    //     { key: 'result', title: '결과 조회' },
    //   ],
    // },
    // {
    //   title: '통합 검사 결과 조회',
    //   menuList: [],
    // },
  ],
});

const openMenuListState = atom<string[]>({
  key: 'openMenuKeys',
  default: ['register'],
});

const subHeaderText = atom<string>({
  key: 'subHeaderText',
  default: '병원정보시스템',
});

export { subMenuListState, openSnbState, categoryListState, openMenuListState, subHeaderText };
