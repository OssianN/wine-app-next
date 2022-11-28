import { useEffect, useState } from 'react'
import WineGrid from '../src/components/wineGrid/WineGrid'
import AddWine from '../src/components/wineForm/AddWine'
import EditWine from '../src/components/wineForm/EditWine'
import Search from '../src/components/header/Search'
import { useDispatch } from 'react-redux'
import { withSessionSSR } from '../lib/session'
import { setWineArr } from '../src/actions/wineActions'
import Settings from '../src/components/header/Settings'
import InitialSetup from '../src/components/header/InitialSetup'
import Hamburger from '../src/components/header/Hamburger'
import ArchivedWines from '../src/components/wineGrid/ArchivedWines'
import ArchiveButton from '../src/components/header/ArchiveButton'
import axios from 'axios'
import { sessionOptions } from '../lib/session'

const Dashboard = ({ user }) => {
  const [updateOnPost, setUpdateOnPost] = useState(0)
  const [showAddModal, setShowAddModal] = useState({ display: 'none' })
  const [showEditModal, setShowEditModal] = useState({ display: 'none' })
  const [searchArr, setSearchArr] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [showSettings, setShowSettings] = useState(false)
  const [showArchived, setShowArchived] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!user) return

    const getWines = async () => {
      try {
        const response = await axios.post('/api/wines/getUserWines', {
          wineList: user.wineList ?? [],
        })
        const data = response.data
        dispatch(setWineArr(data))
      } catch (err) {
        console.error(err, 'getWines error')
      }
    }
    getWines()
  }, [dispatch, user])

  if (!user) {
    return null
  }

  if (!user.columns || !user.shelves) {
    return <InitialSetup user={user} setShowSettings={setShowSettings} />
  }

  return (
    <div className="dashboard">
      <header className="main__header">
        <Search
          setSearchArr={setSearchArr}
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          showArchived={showArchived}
        />
        <ArchiveButton setShowArchived={setShowArchived} />
        <Hamburger
          showSettings={showSettings}
          setShowSettings={setShowSettings}
        />
        <Settings
          user={user}
          showSettings={showSettings}
          setShowSettings={setShowSettings}
          setShowArchived={setShowArchived}
        />
      </header>
      <h1 className="header">This is the wine we whine about</h1>
      <AddWine
        updateOnPost={updateOnPost}
        setUpdateOnPost={setUpdateOnPost}
        showAddModal={showAddModal}
        setShowAddModal={setShowAddModal}
      />
      <EditWine
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
        updateOnPost={updateOnPost}
        setUpdateOnPost={setUpdateOnPost}
      />
      {showArchived ? (
        <ArchivedWines
          setShowEditModal={setShowEditModal}
          searchArr={searchArr}
          searchValue={searchValue}
        />
      ) : (
        <WineGrid
          user={user}
          setShowAddModal={setShowAddModal}
          setShowEditModal={setShowEditModal}
          searchArr={searchArr}
          searchValue={searchValue}
        />
      )}
    </div>
  )
}

export default Dashboard

export const getServerSideProps = withSessionSSR(async ({ req }) => {
  const { user } = req.session

  if (!user) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    }
  }

  return {
    props: { user: user?.user },
  }
}, sessionOptions)
