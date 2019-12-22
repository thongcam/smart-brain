import React from 'react';
import './LinkForm.css';

const LinkForm = ({onInputChange,onButtonSubmit}) => {
  return(
    <div onChange={onInputChange}>
      <p className='f3 center'>This Magic Brain will detect faces in your pictures. Give it a try.</p>
      <div className='center pa4 br3 shadow-5 w-50 form'>
        <input type='text' className='f4 pa2 w-70 center'/>
        <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple mh1' onClick={onButtonSubmit}>Detect</button>
      </div>
    </div>
  )
}
export default LinkForm;
