import { useEffect } from 'react'
import './App.css'
import { getAllEntries, getEntries } from './store/slices/blog'
import { useDispatch, useSelector } from 'react-redux'
import GetAllEntries from './components/GetAllEntries';

function App() {
  const dispatch: any = useDispatch();
  const { entries, count, totalRecords } = useSelector((state: any) => state.entries)

  useEffect(() => {
    dispatch(getAllEntries())
    dispatch(getEntries())
  }, [])
  

  return (
    <>
      <h1>Entradas</h1>
      <GetAllEntries entries={entries} count={count} totalRecords={totalRecords}/>
    </>
  )
}

export default App
