import { useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import useUser from '../../../hooks/useUser.js';
import { GridView } from './GridView.js';
import { ListView } from './ListView.js';

export const WineList = ({
  searchValue,
  searchArr,
  setShowEditModal,
  setShowAddModal,
}) => {
  const [isGridView, setIsGridView] = useState(false);
  const { user } = useUser();
  const wines = useSelector(state => state.wineArr);
  const wineArr = useMemo(() => wines.filter(wine => !wine.archived), [wines]);
  const cardArr = searchValue ? searchArr : wineArr;

  if (!user) return null;

  return (
    <div className="wine-grid">
      {isGridView ? (
        <GridView
          cardArr={cardArr}
          setShowAddModal={setShowAddModal}
          setShowEditModal={setShowEditModal}
          searchValue={searchValue}
        />
      ) : (
        <ListView
          cardArr={cardArr}
          setShowAddModal={setShowAddModal}
          setShowEditModal={setShowEditModal}
        />
      )}
    </div>
  );
};
