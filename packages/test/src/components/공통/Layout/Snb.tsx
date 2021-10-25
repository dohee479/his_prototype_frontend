import { useRecoilValue } from 'recoil';
import { categoryListState } from '../../../atoms/Recoils_공통';
import { ICategory } from '../../../types/Interface_공통';
import Category from './Category';


const Snb = () => {
  const categories = useRecoilValue<ICategory[]>(categoryListState);

  return (
    <div className="snb">
      {categories.map((category) => (
        <Category key={category.title} category={category} />
      ))}
    </div>
  );
};

export default Snb;
