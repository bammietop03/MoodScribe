import { FC } from 'react';
import { ArticleValues } from '../../../../utils/types';
import Default from '../../../../assets/dashboard/default.jpg';
import { Link } from 'react-router-dom';

interface Props {
  article: ArticleValues;
}

const Article: FC<Props> = ({ article }) => {
  return (
    <div className='hover:shadow-xl hover:shadow-gray-700 p-1'>
      <img
        src={article.urlToImage || Default}
        alt='Mental health'
        className='h-52 w-full object-cover'
      />
      <p className=''>{article.title}</p>
      <p className='py-2'>
        Read more{' '}
        <Link
          to={article.url}
          target='_blank'
          className='text-teal-100 hover:text-teal-400 font-bold'
        >
          here
        </Link>
      </p>
    </div>
  );
};

export default Article;
