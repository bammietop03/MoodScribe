import { FC, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import logo from '../assets/logo.png';

export const Header: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const genericHamburgerLine = `h-1 w-8 my-1 rounded-full bg-primary-300 transition ease transform duration-300`;

  const location = useLocation();

  const navItems = [
    { name: 'Login', href: '/auth/signin' },
    { name: 'Signup', href: '/auth/signup' },
  ];

  return (
    <header className='container mx-auto'>
      <div className='flex h-16 items-center justify-between py-3'>
        <Link to='/'>
          <img className='' src={logo} alt='Moodscribe logo' />
        </Link>

        <button
          className='group flex h-12 w-12 flex-col items-center justify-center lg:hidden'
          onClick={() => setIsOpen(!isOpen)}
        >
          <div
            className={`${genericHamburgerLine} ${
              isOpen
                ? 'translate-y-3 rotate-45 opacity-50 group-hover:opacity-100'
                : 'opacity-50 group-hover:opacity-100'
            }`}
          />
          <div
            className={`${genericHamburgerLine} ${
              isOpen ? 'opacity-0' : 'opacity-50 group-hover:opacity-100'
            }`}
          />
          <div
            className={`${genericHamburgerLine} ${
              isOpen
                ? '-translate-y-3 -rotate-45 opacity-50 group-hover:opacity-100'
                : 'opacity-50 group-hover:opacity-100'
            }`}
          />
        </button>

        <ul className='hidden items-center space-x-6 font-semibold text-cyan-800  lg:flex'>
          {navItems.map((item) => {
            const isActive = item.href === location.pathname;
            return (
              <li key={item.name}>
                <Link
                  className={clsx(
                    'hover:text-cyan-600',
                    isActive && 'text-primary-100'
                  )}
                  to={item.href}
                >
                  {item.name}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <ul
        className={clsx(
          'text-gray-85 my-4 items-center space-y-5 font-semibold',
          isOpen ? 'block' : 'hidden'
        )}
      >
        {navItems.map((item, idx) => {
          const isActive = item.href === location.pathname;
          return (
            <li key={idx} onClick={() => setIsOpen(!isOpen)}>
              <Link
                className={clsx('', isActive && 'text-primary-100')}
                to={item.href}
              >
                {item.name}
              </Link>
            </li>
          );
        })}
      </ul>
    </header>
  );
};
