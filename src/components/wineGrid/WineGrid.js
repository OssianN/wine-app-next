import React from 'react'
import Card from '../card/Card.js'
import { useDispatch, useSelector } from 'react-redux'
import { setPickedWine } from '../../actions/setPickedWine'

const WineGrid = ({
  user,
  searchValue,
  searchArr,
  setShowEditModal,
  setShowAddModal,
}) => {
  const dispatch = useDispatch()
  const wines = useSelector(state => state.wineArr)
  const wineArr = wines.filter(wine => !wine.archived)
  const pickedWine = useSelector(state => state.pickedWine)
  const cardArr = searchValue ? searchArr : wineArr
  const cardWidth = 100 / user.columns

  const createButton = (i, j) => {
    return (
      <div
        key={`${i}:${j}`}
        className="add-wine__div"
        id={`${i}:${j}`}
        style={{ width: `calc(${cardWidth}% - 20px)` }}
      >
        <div className="card-header">
          <p className="card-header__position--dark">{`${i + 1}:${j + 1}`}</p>
        </div>
        <button onClick={handleClick}>&#43;</button>
      </div>
    )
  }

  const createCard = card => {
    return (
      <Card
        key={card._id}
        card={card}
        cardWidth={cardWidth}
        setShowEditModal={setShowEditModal}
      />
    )
  }

  const orderCards = (cardArr, target, i, j) => {
    let check = false
    cardArr?.forEach(card => {
      if (`${card.shelf}:${card.column}` === `${i}:${j}`) {
        check = true
        target.push(createCard(card))
      }
    })
    if (!check && !searchValue) return target.push(createButton(i, j))
  }

  const renderCards = cardArr => {
    const shelves = []

    for (let i = 0; i < user.shelves; i++) {
      const columns = []
      for (let j = 0; j < user.columns; j++) {
        orderCards(cardArr, columns, i, j)
      }
      shelves.push(columns)
    }
    return shelves.map((shelf, i) => {
      return (
        <div className="wine-row" key={i}>
          {shelf}
        </div>
      )
    })
  }

  const breakOutXY = string => {
    const arr = string.split(':')
    return {
      shelf: parseInt(arr[0]),
      column: parseInt(arr[1]),
    }
  }

  const handleClick = e => {
    setShowAddModal({ display: 'flex' })
    dispatch(
      setPickedWine({ ...pickedWine, ...breakOutXY(e.target.parentElement.id) })
    )
  }

  return <div className="wine-grid">{renderCards(cardArr)}</div>
}

export default WineGrid
