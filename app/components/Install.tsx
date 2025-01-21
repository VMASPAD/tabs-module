import React from 'react'
import CopyBlock from './CopyBlock'
function Install() {
  return (
    <div>
      <CopyBlock text="1" />
      <p className='my-5 font-bold'>Dependencies:</p>
      <CopyBlock text="npm i react-dnd react-dnd-html5-backend" />
    </div>
  )
}

export default Install
