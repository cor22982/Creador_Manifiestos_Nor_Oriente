import React, { forwardRef } from 'react';
import BauncherOne from './BauncherOne';
import './BauncherList.css';

const BauncherList = forwardRef(({ list }, ref) => {
  return (
    <div ref={ref} className='list-bauncher'>
      {list.map((item, index) => ( 
          <BauncherOne key={index} info={item} />
      ))}
      {list.map((item, index) => ( 
          <BauncherOne key={index} info={item} />
      ))}
    </div>
  );
});

export default BauncherList;
