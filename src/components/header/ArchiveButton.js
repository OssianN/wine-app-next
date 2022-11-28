import Image from 'next/image'
import React, { useRef } from 'react'
import { images } from '../../images'

const ArchiveButton = ({ setShowArchived }) => {
  const ref = useRef(null)

  const addAndRemoveClass = showArchivedState => {
    if (showArchivedState) {
      ref.current.classList.remove('archive__button--archived')
      return
    }
    ref.current.classList.add('archive__button--archived')
  }

  const handleShowArchived = () => {
    setShowArchived(prev => {
      addAndRemoveClass(prev)
      return !prev
    })
  }

  return (
    <button
      className="btn archive__button"
      onClick={handleShowArchived}
      ref={ref}
    >
      <div className="archive__button-img archive__button-img--wine">
        <Image src={images.wine} alt="wines" />
      </div>
      <div className="archive__button-img archive__button-img--archive">
        <Image src={images.archive} alt="archived" />
      </div>
    </button>
  )
}

export default ArchiveButton
