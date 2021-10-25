import { useState } from 'react';
import { ICategory } from '../../../types/Interface_공통';
import { Link, useLocation } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { openSnbState } from '../../../atoms/Recoils_공통';

const Category = ({ category }: { category: ICategory }) => {
  const [open, setOpen] = useState<boolean>(false);
  const setOpenSnb = useSetRecoilState<boolean>(openSnbState);
  const location = useLocation();

  return (
    <div className={`menu-block${open ? ' on' : ''}`}>
      <h3>
        <button type="button" className="menu-btn" onClick={() => setOpen(!open)}>
          {category.title}
        </button>
      </h3>
      <ul className="menu-list">
        {category.menuList.map((menu) => (
          <li key={menu.key} className={`${location.pathname === '/' + menu.key ? 'selected' : ''}`}>
            <Link to={menu.key} className="menu-link" onClick={() => setOpenSnb(false)}>
              {menu.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Category;