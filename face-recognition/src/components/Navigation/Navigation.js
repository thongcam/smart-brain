import React from 'react';

const Navigation = ({onRouteChange,isSignedIn}) => {
  return( isSignedIn?
    <nav style={{display:'flex',justifyContent:'flex-end',cursor:'pointer'}}>
      <p className='f3 link black underline dim pa3' onClick={() => onRouteChange('signin')}>Sign Out</p>
    </nav>
  :
    <nav style={{display:'flex',justifyContent:'flex-end',cursor:'pointer'}}>
      <p className='f3 link black underline dim pa3' onClick={() => onRouteChange('signin')}>Sign In</p>
      <p className='f3 link black underline dim pa3' onClick={() => onRouteChange('register')}>Register</p>
    </nav>
  );
}

export default Navigation;
