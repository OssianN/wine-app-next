import React, { useEffect, useState, useMemo } from 'react'
import LogOutButton from './LogOutButton'
import InitialSetup from './InitialSetup'
import { useSelector } from 'react-redux'
import useUser from '../../../hooks/useUser'

const extractPrice = wine => {
  if (!wine.price || isNaN(wine.price)) {
    return 0
  }
  return parseInt(wine.price)
}

const priceReducer = (acc, curr) => acc + parseInt(curr)

const Settings = ({ showSettings, setShowSettings }) => {
  const { user } = useUser()
  const wineArr = useSelector(state => state.wineArr).filter(
    wine => !wine.archived
  )
  const totalPrice = useMemo(
    () => wineArr.map(extractPrice).reduce(priceReducer, 0),
    [wineArr]
  )

  const leftMargin = showSettings ? null : '-400px'

  if (!user) return null

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
