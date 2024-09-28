import React from 'react';
import { useSelector } from 'react-redux';
import Card from '../card/Card';
import { searchFilter } from '../header/Search';

const ArchivedWines = ({ setShowEditModal, searchValue, searchArr }) => {
  const wines = useSelector(state => state.wineArr);
  const wineArr = searchValue
    ? searchArr
    : wines
        .filter(wine => wine.archived)
        .filter(wines => searchFilter(searchValue, wines));

  const sortById = (a, b) => {
    if (a._id < b._id) return 1;
    if (a._id > b._id) return -1;
    return 0;
  };

  return (
    <div className="archived__container">
      {wineArr.sort(sortById).map((wine, i) => {
        return <Card key={i} card={wine} setShowEditModal={setShowEditModal} />;
      })}
    </div>
  );
};

export default ArchivedWines;
