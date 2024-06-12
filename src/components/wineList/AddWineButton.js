import { useDispatch, useSelector } from 'react-redux';
import { setPickedWine } from '../../actions/setPickedWine.js';

export const AddWineButton = ({ row, column, setShowAddModal, cardWidth }) => {
  const dispatch = useDispatch();
  const pickedWine = useSelector(state => state.pickedWine);

  const breakOutXY = string => {
    const arr = string.split(':');
    return {
      shelf: parseInt(arr[0]),
      column: parseInt(arr[1]),
    };
  };

  const handleClick = e => {
    setShowAddModal({ display: 'flex' });
    dispatch(
      setPickedWine({ ...pickedWine, ...breakOutXY(e.target.parentElement.id) })
    );
  };

  return (
    <div
      className="add-wine__div"
      id={`${row}:${column}`}
      style={{ width: `calc(${cardWidth}% - 20px)` }}
    >
      <div className="card-header">
        <p className="card-header__position--dark">{`${row + 1}:${
          column + 1
        }`}</p>
      </div>
      <button onClick={handleClick}>&#43;</button>
    </div>
  );
};
