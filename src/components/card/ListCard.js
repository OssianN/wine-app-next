import wineSVG from './wine4.png';
import Image from 'next/image';

export const ListCard = ({ card }) => {
  const img = card.img ? `https:${card.img}` : wineSVG;
  console.log(card);
  return (
    <div key={card.id} className="listCardContainer">
      <div className="list-card__img">
        <Image alt="wine bottle" src={img} height={170} width={170} />
      </div>

      <div className="list-card__content">
        <h2 className="list-card__title">{card.title}</h2>
        <div className="list-card__details">
          <p>{card.rating}</p>
          <p>{card.price}</p>
          <p>{`${card.shelf}:${card.column}`}</p>
        </div>
      </div>
    </div>
  );
};
