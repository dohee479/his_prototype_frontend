import axios from "axios";

const EDI_API_URL = "http://localhost:5000/edi";

// library 전체 정보 조회
export const getEdiCondition = async (chapter : any, insurance: number[], group: string[], keyword: string) => {
  // const list = await axios.get(EDI_API_URL);
  // const list = await axios.get(`${EDI_API_URL}/?chapter=${act}`);
  // console.log("chapter", chapter);
  const list = await axios.get(`${EDI_API_URL}?chapter=${chapter}&insurance=${insurance}&group=${group}&keyword=${keyword}`);
  console.log(list.data)
  return list.data;
}

export const getEdiKeyword = async (keyword: string) => {
  const list = await axios.get(`${EDI_API_URL}/search?keyword=${keyword}`);
  return list.data;
}

