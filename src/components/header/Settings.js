import React, { useEffect, useState } from 'react'
import LogOutButton from './LogOutButton'
import InitialSetup from './InitialSetup'
import { useSelector } from 'react-redux'

const Settings = ({ showSettings, setShowSettings, setShowArchived }) => {
  const { user } = useSelector(state => state.auth)
  const wineArr = useSelector(state => state.wineArr).filter(
    wine => !wine.archived
  )
  const [totalPrice, setTotalPrice] = useState(0)
  const leftMargin = showSettings ? null : '-400px'

  const extractPrice = wine => {
    if (!wine.price || isNaN(wine.price)) {
      return 0
    }
    return parseInt(wine.price)
  }

  const priceReducer = (acc, curr) => acc + parseInt(curr)

  useEffect(() => {
    const totalPrice = wineArr.map(extractPrice).reduce(priceReducer, 0)
    setTotalPrice(totalPrice)
  }, [wineArr])

  return (
    <div className="settings-container" style={{ right: leftMargin }}>
      <h2 className="settings__name">{user.name}</h2>
      <LogOutButton />
      <div className="settings__price-container">
        <h4 className="settings__price-header">
          Total price for this storage:{' '}
        </h4>
        <p className="settings__price-p">{totalPrice} kr</p>
      </div>
      <InitialSetup setShowSettings={setShowSettings} />
    </div>
  )
}

export default Settings
