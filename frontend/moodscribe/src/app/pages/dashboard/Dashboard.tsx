import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../home/Home';
import SideNavbar from './components/SideNavbar';

const Dashboard = () => {
  const [mobileNav, setMobileNav] = useState(false);

  const toggleNav = () => {
    setMobileNav(!mobileNav);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  return (
    <main className='relative flex flex-col min-h-screen lg:flex-row bg-stone-100 dark:bg-slate-900'>
      <section
        className={`transform lg:transform-none inset-y-0 left-0 transition duration-300 ease-in-out  ${
          mobileNav ? 'translate-x-0' : '-translate-x-full'
        } z-50 lg:z-0 w-80 lg:w-[22%] xl:w-[22%] 2xl:w-[17%] h-screen fixed`}
      >
        <SideNavbar toggleNav={toggleNav} />
      </section>
      {/* Mobile */}
      <div className='block p-3 lg:hidden'>
        <div className='flex items-center justify-between'>
          <button
            onClick={toggleNav}
            className={
              !mobileNav
                ? 'z-50 flex items-center justify-center w-10 h-10 bg-white border rounded-lg text-primary'
                : ''
            }
          >
            {!mobileNav ? (
              <svg
                xmlns='http://www.w3.org/2000/svg'
                viewBox='0 0 24 24'
                fill='currentColor'
                className='w-6 h-6'
              >
                <path
                  fillRule='evenodd'
                  d='M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z'
                  clipRule='evenodd'
                />
              </svg>
            ) : // <svg
            //   xmlns="http://www.w3.org/2000/svg"
            //   viewBox="0 0 24 24"
            //   fill="currentColor"
            //   className="w-6 h-6"
            // >
            //   <path
            //     fillRule="evenodd"
            //     d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
            //     clipRule="evenodd"
            //   />
            // </svg>
            null}
          </button>
          <div>Menu</div>
        </div>
      </div>

      {/* Overlay  */}

      <div
        onClick={toggleNav}
        className={`fixed inset-0 h-full z-40 flex items-end bg-teal-900 bg-opacity-40 sm:items-center sm:justify-center lg:hidden ${
          mobileNav ? 'translate-x-0' : '-translate-x-full'
        }`}
      ></div>
      <div className='h-8' />

      <section className='lg:w-[78%] xl:w-[78%] 2xl:w-[83%] lg:ml-[22%] xl:ml-[22%] 2xl:ml-[17%] '>
        {/* <NavComponent /> */}
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </section>
    </main>
  );
};

export default Dashboard;
