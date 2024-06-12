import { ListCard } from '../card/ListCard';

export const ListView = ({
  cardArr,
  setShowEditModal,
  setShowAddModal,
  searchValue,
}) => {
  return (
    <div className="listViewContainer">
      {cardArr.map(card => (
        <ListCard key={card.id} card={card} />
      ))}
    </div>
  );
};
