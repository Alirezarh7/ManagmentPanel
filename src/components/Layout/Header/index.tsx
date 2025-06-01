import {GiHamburgerMenu} from 'react-icons/gi';
import LogOut from '../__archive/Header/LogOut';
import React from 'react';

interface IProps {
  sidebarOpen: string | boolean | undefined;
  setSidebarOpen: (arg0: boolean) => void;
  isConnected: boolean;
}

const Header = ({sidebarOpen, setSidebarOpen, isConnected}: IProps) => {
  return (

    <div className='w-full bg-gradient-to-r from-sliderColor/70  to-sliderColor  p-2 z-10  '>
      <div className='w-full flex items-center justify-between'>
        <GiHamburgerMenu onClick={e => {
          e.stopPropagation();
          setSidebarOpen(!sidebarOpen);
        }} className='w-8 h-8 text-white'/>
        <div className='flex'>
          {!isConnected ? '' : <LogOut/>}
        </div>
      </div>
    </div>
  );
};

export default Header;
