import React from 'react'
import { useDispatch } from 'react-redux'
import wineSVG from './wine4.png'
import { setPickedWine } from '../../actions/setPickedWine'
import Image from 'next/image'

const Card = ({ card, setShowEditModal, cardWidth }) => {
  const dispatch = useDispatch()
  const img = card.img ? `https:${card.img}` : wineSVG
  const {
    _id,
    shelf,
    column,
    title,
    country,
    comment,
    year,
    price,
    rating,
    vivinoUrl,
  } = card

  const handleEdit = async () => {
    dispatch(setPickedWine(card))
    setShowEditModal({ display: 'flex' })
  }

  const conditionalRender = element => element || '-'

  const conditionalRenderURL = element => {
    if (!element) {
      return <a className="card__info-paragraph card__vivino-url"> - </a>
    }
    return (
      <a
        target="_blank"
        rel="noreferrer"
        href={vivinoUrl}
        className="card__info-paragraph card__vivino-url"
      >
        vivino &#x203A;
      </a>
    )
  }

  const limitTextLength = text => {
    if (text?.length > 12) {
      return `${text.slice(0, 12)}...`
    }
    return text
  }

  return (
    <figure
      key={_id}
      className="card"
      id={_id}
      style={{ width: `calc(${cardWidth}% - 20px)` }}
    >
      <header className="card-header">
        <p className="card-header__position">{`${shelf + 1}:${column + 1}`}</p>
        <button className="edit-card__button" onClick={handleEdit}>
          &#8942;
        </button>
      </header>
      <div className="card__img">
        <Image alt="wine bottle" src={img} height={170} width={170} />
      </div>
      <div className="card__text-container">
        <h1 className="card__title">{title}</h1>
        <p className="card__country-paragraph">{conditionalRender(country)}</p>
        <p className="card__comment">{limitTextLength(comment)}</p>
        <footer className="card__footer">
          <span className="card__separaion-span"></span>
          <p className="card__info-paragraph">{conditionalRender(year)}</p>
          <p className="card__info-paragraph">{conditionalRender(price)} kr</p>
          <p className="card__info-paragraph">
            {conditionalRender(rating)}&#9733;
          </p>
          {conditionalRenderURL(vivinoUrl)}
        </footer>
      </div>
    </figure>
  )
}

export default Card
