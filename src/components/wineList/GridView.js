import { useCallback, useState } from 'react';
import { useEffect } from 'react';
import useUser from '../../../hooks/useUser.js';
import { GridCard } from '../card/GridCard.js';
import { AddWineButton } from './AddWineButton.js';

export const GridView = ({
  cardArr,
  setShowEditModal,
  setShowAddModal,
  searchValue,
}) => {
  const [shelves, setShelves] = useState([]);
  const { user } = useUser();
  const cardWidth = 100 / user.columns;

  const orderCards = useCallback(
    (cardArr, target, i, j) => {
      let check = false;
      cardArr?.forEach(card => {
        if (`${card.shelf}:${card.column}` === `${i}:${j}`) {
          check = true;
          target.push(
            <GridCard
              key={card._id}
              card={card}
              cardWidth={cardWidth}
              setShowEditModal={setShowEditModal}
            />
          );
        }
      });
      if (!check && !searchValue)
        return target.push(
          <AddWineButton
            key={`${i}${j}`}
            row={i}
            column={j}
            setShowAddModal={setShowAddModal}
            cardWidth={cardWidth}
          />
        );
    },
    [cardWidth, searchValue, setShowAddModal, setShowEditModal]
  );

  useEffect(() => {
    const shelves = [];
    for (let i = 0; i < user.shelves; i++) {
      const columns = [];
      for (let j = 0; j < user.columns; j++) {
        orderCards(cardArr, columns, i, j);
      }
      shelves.push(columns);
    }
    setShelves(shelves);
  }, [cardArr, orderCards, setShelves, user.columns, user.shelves]);

  return shelves.map((shelf, i) => {
    return (
      <div className="wine-row" key={i}>
        {shelf}
      </div>
    );
  });
};
