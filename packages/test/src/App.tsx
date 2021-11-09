import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useRecoilState } from "recoil";
import { openSnbState } from "./atoms/Recoils_공통";
import Lnb from "./components/공통/Layout/Lnb";
import Snb from "./components/공통/Layout/Snb";
import SubHeader from "./components/공통/Layout/SubHeader";
import WehagoHeader from "./components/공통/Layout/WehagoHeader";
import Edi from "./components/기초코드관리";
import SelfPay from "./components/본인부담률";

function App() {
  const [openSnb, setOpenSnb] = useRecoilState<boolean>(openSnbState);

  return (
    <BrowserRouter>
      {/* 위하고 헤더 이미지 */}
      <WehagoHeader />
      {/* 왼쪽 메뉴 아이콘 (이미지) */}
      <Lnb />
      <div className={`container ${openSnb ? 'open-snb' : ''}`}>
        {/* 서브 헤더 메뉴 */}
        <SubHeader />
        {/* 진료지원 서브 메뉴바 = 더보기(三) */}
        <Snb />
        <Switch>
          <Route path="/edi" component={Edi} />
          <Route path="/selfpay" component={SelfPay} />
        </Switch>
        <div className="dimmed" onClick={() => setOpenSnb(false)} />
      </div>
    </BrowserRouter>
  );
}

export default App;
