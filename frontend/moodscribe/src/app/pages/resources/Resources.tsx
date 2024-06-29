import { FC, useEffect } from 'react';
import {
  RootState,
  useAppDispatch,
  useAppSelector,
} from '../../../redux/store';
import { getArticles } from '../../../redux/articles/features';
import Article from './components/Article';

const Resources: FC = () => {
  const dispatch = useAppDispatch();
  const { articles } = useAppSelector((state: RootState) => state.articles);

  console.log('Articles', articles);

  useEffect(() => {
    dispatch(getArticles());
  }, [dispatch]);

  return (
    <div className='container mx-auto max-w-2xl text-white my-16'>
      <h1 className='font-bold text-2xl text-center'>
        Discover Helpful Articles & Tips
      </h1>
      <p className='py-6'>
        Explore our collection of articles and tips to support your mental
        well-being. Find practical advice, coping strategies, and self-care
        techniques to enhance your mental health. Dive in and empower yourself
        with valuable insights and knowledge.
      </p>
      <div className='sm:grid grid-cols-auto-fit-100 gap-7'>
        {articles.map((article, idx) => (
          <div key={idx} className=''>
            <Article article={article} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Resources;
