import { useState } from 'react';
import History from './components/History';
import NewEntry from './components/NewEntry';
import clsx from 'clsx';

const Journals = () => {
  const [newEntry, setNewEntry] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [history, setHistory] = useState(false);

  const handleNewEntry = () => {
    setNewEntry(true);
    setHistory(false);
  };

  const handleHistory = () => {
    setHistory(true);
    setNewEntry(false);
  };

  return (
    <section className='container mx-auto max-w-2xl px-4 py-12 h-full text-white'>
      <h1 className='text-2xl text-center'>
        Hello John. Welcome to your journal
      </h1>
      <div className='flex space-x-6 mt-16'>
        <span
          className={clsx(
            'cursor-pointer pb-2',
            newEntry ? 'text-teal-100 border-b-2 border-teal-100' : ''
          )}
          onClick={handleNewEntry}
        >
          New Entry
        </span>
        <span
          className={clsx(
            'cursor-pointer pb-2',
            history ? 'text-teal-100 border-b-2 border-teal-100' : ''
          )}
          onClick={handleHistory}
        >
          History
        </span>
      </div>
      {newEntry ? <NewEntry /> : <History />}
    </section>
  );
};

export default Journals;
