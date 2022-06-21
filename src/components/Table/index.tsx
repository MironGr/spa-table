import React, { 
  useEffect, 
  useState
} from 'react'
import { useSelector, useDispatch } from 'react-redux'

import './Table.scss'

import { 
  getDataTable,
  setSortTable,
  setOrderSortTable
} from 'src/store/actions/table'
import { getObjectReq } from 'src/components/helpers'
import { State } from 'src/store/stateType'
import { Item, DataInfo, DataInfoQuery } from 'src/store/reducers/table'
import { SortIcon } from 'src/components/icons/SortIcon'
import { Arrow } from 'src/components/icons/Arrow'

export const Table: React.FC = () => {

  const dispatch = useDispatch()
  // current page
  const [page, setPage] = useState<number>(0)
  // total count of pages
  const [pages, setPages] = useState<number>(1)
  // '0' - not sorted, '-1' - asc, '1' - desc, 
  const [orderSortName, setOrderSortName] = useState<number>(0)
  const [orderSortCount, setOrderSortCount] = useState<number>(0)
  const [orderSortDistance, setOrderSortDistance] = useState<number>(0)
  // column wich are sorted
  const [sortedColumn, setSortedColumn] = useState<string>('')
  const [orderSort, setOrderSort] = useState<string>('')
  const [readyData, setReadyData] = useState<Item[]>([])

  // from State
  const data = useSelector<State, DataInfo>(state => state.table.data)
  const where = useSelector<State, string>(state => state.table.data.where)
  const condition = useSelector<State, string>(state => state.table.data.condition)
  const input = useSelector<State, string>(state => state.table.data.input)

  useEffect(() => {
    setReadyData(data.rows)
    const page = Number(data.page)
    const total = Number(data.total)
    const pageNumber = Math.ceil(total / 3)
    setPage(page)
    setPages(pageNumber)
  }, [data])

  useEffect(() => {
    let payload = getObjectReq(
      page, 
      sortedColumn, 
      orderSort
    )
    if (!!where && !!condition && !!input) {
      payload = getObjectReq(
        page, 
        sortedColumn, 
        orderSort,
        where, 
        condition, 
        input
      )
    }
    dispatch(getDataTable(payload))
  }, [page])

  const fillTable = (data: Item[]) => {
    return data.map((item: Item, index) => {
      return <div 
        className='table__row' 
        key={item.id}
        style={{
          backgroundColor: index % 2 === 0 ? '#bfbfbf' : 'white'
        }}
      >
        <div className='table__cell' key={item.date}>
          {item.date}
        </div>
        <div className='table__cell' key={item.name}>
          {item.name}
        </div>
        <div className='table__cell' key={item.count}>
          {item.count}
        </div>
        <div className='table__cell' key={item.distance}>
          {item.distance}
        </div>
      </div>
    })
  }

  const handleSort = (page: number, column: string, setOrderColumn: any, order: number) => {
    let payload: DataInfoQuery = getObjectReq(page, '', '', where, condition, input)

    if (order === 0) {
      setOrderColumn(-1)
      payload = getObjectReq(page, column, 'ASC', where, condition, input)
      setSortedColumn(column)
      setOrderSort('ASC')
      // set sorted params
      dispatch(setOrderSortTable('ASC'))
      dispatch(setSortTable(column))
    } else if(order === -1) {
      setOrderColumn(1)
      payload = getObjectReq(page, column, 'DESC', where, condition, input)
      setSortedColumn(column)
      setOrderSort('DESC')
      // set sorted params
      dispatch(setOrderSortTable('DESC'))
      dispatch(setSortTable(column))
    } else if (order === 1) {
      setOrderColumn(0)
      setSortedColumn('')
      setOrderSort('')
      // set sorted params
      dispatch(setOrderSortTable(''))
      dispatch(setSortTable(''))
    }
    dispatch(getDataTable(payload))
  }

  return (<>
    <div className='table'>
      <div className='table__row'>
        <div className='table__cell'>
          <div>Date</div>
        </div>
        <div className='table__cell'>
          Name
          <button 
            className='table__btn'
            onClick={() => {
              // sorting on back-end
              handleSort(page, 'name', setOrderSortName, orderSortName)
              setOrderSortCount(0)
              setOrderSortDistance(0)
            }}
          >
            {orderSortName === 0 && <SortIcon />}
            {orderSortName === -1 && <Arrow rotate={180} />}
            {orderSortName === 1 && <Arrow rotate={0} />}
          </button>
        </div>
        <div className='table__cell'>
          Count
          <button 
            className='table__btn'
            onClick={() => {
              // sorting on back-end
              handleSort(page, 'count', setOrderSortCount, orderSortCount)
              setOrderSortName(0)
              setOrderSortDistance(0)
            }}
          >
            {orderSortCount === 0 && <SortIcon />}
            {orderSortCount === -1 && <Arrow rotate={180} />}
            {orderSortCount === 1 && <Arrow rotate={0} />}
          </button>
        </div>
        <div className='table__cell'>
          Distance
          <button 
            className='table__btn'
            onClick={() => {
              // sorting on back-end
              handleSort(page, 'distance', setOrderSortDistance, orderSortDistance)
              setOrderSortName(0)
              setOrderSortCount(0)
            }}
          >
            {orderSortDistance === 0 && <SortIcon />}
            {orderSortDistance === -1 && <Arrow rotate={180} />}
            {orderSortDistance === 1 && <Arrow rotate={0} />}
          </button>
        </div>
      </div>
      {readyData.length > 0 && fillTable(readyData)}
      {readyData.length === 0 && <div>No data</div>}
    </div>
    <div className='table__pagination'>
      {page === 0 && <div style={{width: '30px'}}/>}
      {page !== 0 
        && <button 
              className='table__btn'
              onClick={() => {
                setPage(page - 1)
              }}
            >
            <Arrow rotate={-90}/>
          </button>}
      <div>{(page + 1)} of {pages}</div>
      {pages > 1 && page + 1 < pages 
        && <button 
              className='table__btn'
              onClick={() => {
                setPage(page + 1)
              }}
            >
              <Arrow rotate={90}/>
            </button>}
    </div>
  </>)
}