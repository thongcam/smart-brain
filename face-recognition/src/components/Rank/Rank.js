import React from 'react';

const Rank = ({name,entries}) => {
  return(
    <div>
      <div className='f3 white'>
        {name}, you currently have
      </div>
      <div className='f1 white'>
        {entries} entries.
      </div>
    </div>
  );
}

export default Rank;
