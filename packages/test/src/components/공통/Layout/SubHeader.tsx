import { useRecoilState, useRecoilValue } from 'recoil';
import { openSnbState, subHeaderText, subMenuListState } from '../../../atoms/Recoils_공통';

const SubHeader = () => {
  const [openSnb, setOpenSnb] = useRecoilState<boolean>(openSnbState);
  const text = useRecoilValue<string>(subHeaderText);
  const subMenuList = useRecoilValue<string[]>(subMenuListState);

  return (
    // <div className="sub-header" style={{ backgroundColor: '#60bfcc' }}>
    <div className="sub-header" style={{ backgroundColor: '#4286EB' }}>
      <div className="left">
        <button
          type="button"
          className="btn-menu"
          onClick={() => setOpenSnb(!openSnb)}
          // style={{ backgroundColor: '#60aacc' }}
        >
          <span className="material-icons">menu</span>
          <span className="blind">메뉴</span>
        </button>
        <a href="/" className="svg-title">
          <h2>{text}</h2>
        </a>
      </div>
      <div className="right">
        <div className="sub-menu">
          <ul>
            {subMenuList.map((menu) => (
              <li key={menu}>
                <a href="/" className="link">
                  {menu}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SubHeader;
