import { FC } from 'react';
import { Route } from '../../../../utils/types';
import { Icon } from '@iconify/react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../../../../assets/dashboard/logo-transparent.png';

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
    route: '/dashboard/journals',
  },

  {
    id: 3,
    name: 'Analysis',
    icon: 'carbon:text-link-analysis',
    route: '/dashboard/analysis',
  },

  {
    id: 4,
    name: 'Resources',
    icon: 'grommet-icons:resources',
    route: '/dashboard/resources',
  },
];
interface Props {
  toggleNav: () => void;
}

const SideNavbar: FC<Props> = ({ toggleNav }) => {
  //   const [openTab, setOpenTab] = useState(0);
  const location = useLocation();

  return (
    <div>
      {' '}
      <>
        <div className='relative min-h-screen bg-slate-800 shadow-lg '>
          <div className='bg-theme py-4 lg:ml-1 max-h-[100vh] overflow-y-auto '>
            <div className='flex items-center gap-1 px-4 py-6 border-b border-slate-400'>
              <Link to='/'>
                <img src={Logo} alt='MoodScribe Logo' />
              </Link>
            </div>
            <div className='px-2 space-y-1'>
              {routes.map((navItem) => {
                const isActive = navItem.route === location.pathname;
                return (
                  <nav key={navItem.id}>
                    {navItem.route && (
                      <Link
                        to={navItem.route}
                        onClick={() => {
                          toggleNav();
                        }}
                        className={`${
                          isActive
                            ? 'text-teal-100 border-r-4 border-teal-100'
                            : 'text-white'
                        } flex w-full gap-4 justify-between items-center px-2 h-12 rounded group my-3`}
                      >
                        <div className='flex items-center w-full gap-2 p-3 rounded-sm group-hover:text-slate-800 hover:bg-slate-300'>
                          <div
                            className={`${
                              window.location.href === navItem.route
                                ? 'bg-white border-none'
                                : 'text-gray-400'
                            } w-9 h-9 font-medium flex items-center justify-center text-lg`}
                          >
                            <Icon
                              icon={navItem.icon}
                              className='w-5 h-5 group-hover:text-primary-500'
                            />
                          </div>
                          <p
                            // id={navItem.name}
                            className='font-medium text-left sub_text nav_link'
                          >
                            {navItem.name}
                          </p>
                        </div>
                        <div className='absolute right-0 hidden w-1 h-12 bg-primary-500 group-hover:flex rounded-s-md'></div>
                      </Link>
                    )}
                  </nav>
                );
              })}
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default SideNavbar;
