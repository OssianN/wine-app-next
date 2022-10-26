import React, { useState, useEffect } from 'react'

const Hamburger = ({ showSettings, setShowSettings }) => {
  const [isOpen, setIsOpen] = useState('hamburger--closed')

  const toggleSettings = () => {
    setShowSettings(!showSettings)
  }

  useEffect(() => {
    showSettings ? setIsOpen('hamburger--open') : setIsOpen('hamburger--closed')
  }, [showSettings])

  return (
    <>
      <button className="hamburger" onClick={toggleSettings}>
        <div id="nav-icon2" className={`${isOpen}`}>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
    </>
  )
}

export default Hamburger
