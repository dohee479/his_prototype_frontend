import axios from 'axios';

const USCH_API_URL = 'http://localhost:5000/usch';

// 보험유형 목록
export const getIntyList = async () => {
  const intyList = await axios.get(USCH_API_URL);
  // console.log(intyList.data);
  return intyList.data;
};

// 보험유형검색
export const searchInty = async (keyword: string) => {
  const searchInty = await axios.get(`${USCH_API_URL}/search?keyword=${keyword}`);
  return searchInty.data;
};

// 보험유형 하나의 데이터 불러오기
export const getIntyDetail = async (inty: any) => {
  const intyDetailData = await axios.get(`${USCH_API_URL}/${inty.inty_lcls}/${inty.inty_type_asst_1}/${inty.inty_type_asst_2}`);
  return intyDetailData.data;
};

// 보험유형 이력 업데이트
export const updateInty = async (updateData: any) => {
  console.log('updateData', updateData);
  await axios.post(`${USCH_API_URL}`, updateData);
};
