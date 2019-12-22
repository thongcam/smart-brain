import React from 'react';

const FaceRecognition = ({imageUrl,box}) => {
  return(
    <div className='center ma'>
      <div className='absolute mt2'>
        <img src={imageUrl} alt='' width='500' height='auto' id='inputImage'/>
        <div id='goddamnBox' className='ba bw2 b--blue shadow-5 bounding-box' style={{top:box.topRow,right:box.rightCol,bottom:box.bottomRow,left:box.leftCol}}></div>
      </div>
    </div>
  )
}

export default FaceRecognition;
