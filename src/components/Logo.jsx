import React from 'react'
import BlogVaultImg from '../assets/Blogvault.jpeg'

function Logo({width = '100px'}) {
  return (
    <div>
      <img src={BlogVaultImg} alt="blogLogo" width={width} />
    </div>
  )
}

export default Logo