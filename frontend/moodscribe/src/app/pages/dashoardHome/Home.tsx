import { Icon } from '@iconify/react/dist/iconify.js';
import { FC, FormEvent, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../redux/store';
import clsx from 'clsx';
import { addQuote } from '../../../redux/quotes/features';

const Home: FC = () => {
  const dispatch = useAppDispatch();
  const quotes = useAppSelector((state) => state.quotes.quotes);
  const [newQuote, setNewQuote] = useState('');

  const getRandomColor = () => {
    const colors = ['#FFCDD2', '#C8E6C9', '#BBDEFB', '#FFECB3', '#f4438a'];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const getRandomIcon = () => {
    const icons = [
      'fxemoji:beachumbrella',
      'meteocons:star-fill',
      'twemoji:fire',
      'noto:light-bulb',
      'icon-park-twotone:muscle',
      'streamline-emojis:love-hotel',
      'noto:bicycle',
    ];
    return icons[Math.floor(Math.random() * icons.length)];
  };

  const defaultIconColor = ['#f4e543', '', '#f4c543', '#df43f4'];
  const color = getRandomColor();
  const icon = getRandomIcon();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (newQuote.trim()) {
      dispatch(addQuote({ quote: newQuote, icon, color }));
      setNewQuote('');
    }
  };

  return (
    <div>
      <div className='container mx-auto max-w-2xl px-4 text-white h-screen'>
        <section className='py-8 text-center'>
          <h1 className='text-4xl tracking-wider'>
            <Icon
              icon='ph:scribble-bold'
              className='inline-block mr-4 text-teal-100'
            />
            Mood Scribe
            <Icon
              icon='ph:scribble-bold'
              className='inline-block ml-4 text-teal-100'
            />
          </h1>
          <p className='text-lg py-2 tracking-wider'>
            Document your day, Discover your mood.
          </p>
        </section>
        <section className='sm:grid grid-cols-auto-fit-100 gap-4'>
          {quotes.map((quote, idx) => (
            <div
              key={idx}
              className={clsx(
                'p-2 my-4 sm:my-0 rounded-sm',
                idx % 3 === 0 ? 'col-span-2' : 'col-span-1'
              )}
              style={{
                background: quote.color,
              }}
            >
              <div className='flex justify-between items-center space-x-5'>
                <p>
                  {idx === 0 ? (
                    <span className='block font-semibold text-lg text-gray-500'>
                      Hi John Doe{' '}
                    </span>
                  ) : null}
                  {quote.quote}
                </p>
                <Icon
                  icon={quote.icon}
                  className='w-9 h-9 flex-shrink-0'
                  style={{ color: defaultIconColor[idx] }}
                />
              </div>
            </div>
          ))}
        </section>
        <section className='mt-16 mb-4'>
          <form
            onSubmit={handleSubmit}
            className='p-4 bg-gray-700 bg-opacity-65 shadow-lg rounded-sm hover:bg-slate-700 transition-all duration-500 ease-out'
          >
            <label htmlFor='newQuote' className='block'>
              Add a new quote?
            </label>
            <input
              type='text'
              id='newQuote'
              name='newQuote'
              value={newQuote}
              onChange={(e) => setNewQuote(e.target.value)}
              className='outline-none w-full py-2 px-3 mt-3 mb-7 text-slate-800 rounded-sm'
              // placeholder='Enter a new quote'
            />
            <button
              type='submit'
              className='text-center bg-cyan-700 hover:bg-cyan-500 py-2 px-4'
            >
              Add Quote
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Home;
