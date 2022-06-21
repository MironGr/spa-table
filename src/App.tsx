import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import './App.scss';

import { getDataTable } from 'src/store/actions/table'
import { Filter } from 'src/components/Filter/index'
import { Table } from 'src/components/Table/index'

export const App: React.FC = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getDataTable({
      page: 0
    }))
  }, [])

  return (
    <div className='wrapper'>
      <div className='wrapper__filter'>
        Filtres:
        <Filter />
      </div>
      <div className='wrapper__table'>
        <Table />
      </div>
    </div>
  )
}

