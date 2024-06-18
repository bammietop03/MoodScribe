import { FC, useState } from 'react';
import { Route } from '../../../../utils/types';
import { Icon } from '@iconify/react';
import { Link } from 'react-router-dom';
import Logo from '../../../../assets/logo-transparent.png';

const routes: Route[] = [
  {
    id: 1,
    name: 'Home',
    icon: 'iconoir:home',
    route: '/dashboard',
  },

  {
    id: 2,
    name: 'Journals',
    icon: 'el:livejournal',
    route: '/dashboard/catalogues',
  },

  {
    id: 3,
    name: 'Analysis',
    icon: 'carbon:text-link-analysis',
    route: '/dashboard/catalogues',
  },

  {
    id: 4,
    name: 'Resources',
    icon: 'grommet-icons:resources',
    route: '/dashboard/catalogues',
  },
];
interface Props {
  toggleNav: () => void;
}

const SideNavbar: FC<Props> = ({ toggleNav }) => {
  const [openTab, setOpenTab] = useState(0);

  return (
    <div>
      {' '}
      <>
        <div className='relative min-h-screen bg-white shadow-lg lg:pb-6 dark:bg-slate-800'>
          <div className='bg-theme py-4 lg:ml-1 max-h-[100vh] overflow-y-auto '>
            <div className='flex items-center gap-1 px-4 py-6 border-b'>
              <img src={Logo} alt='MoodScribe Logo' className='' />
            </div>
            <div className='px-2 space-y-1'>
              {routes.map((navItem) => (
                <nav key={navItem.id}>
                  {navItem.route && (
                    <Link
                      to={navItem.route}
                      onClick={() => {
                        setOpenTab(0);
                        toggleNav();
                      }}
                      className={`${
                        window.location.href === navItem.route && openTab === 0
                          ? 'bg-white text-theme'
                          : 'text-white'
                      } flex w-full gap-4 justify-between items-center nav_tab px-2 h-12 rounded-xl group my-3`}
                    >
                      <div className='flex items-center w-full gap-2 p-3 rounded-lg group-hover:text-primary-500 hover:bg-orange-100'>
                        <div
                          className={`${
                            window.location.href === navItem.route
                              ? 'bg-white text-theme border-none'
                              : 'text-gray-400'
                          } w-9 h-9 font-medium nav_icon flex items-center justify-center text-lg`}
                        >
                          <Icon
                            icon={navItem.icon}
                            className='w-5 h-5 group-hover:text-primary-500'
                          />
                        </div>
                        <div
                          id={navItem.name}
                          className='font-medium text-left sub_text nav_link'
                        >
                          {navItem.name}
                        </div>
                      </div>
                      <div className='absolute right-0 hidden w-1 h-12 bg-primary-500 group-hover:flex rounded-s-md'></div>
                    </Link>
                  )}
                </nav>
              ))}
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default SideNavbar;
