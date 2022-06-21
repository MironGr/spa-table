import React, { 
  useEffect, 
  useState
} from 'react'
import { useSelector, useDispatch } from 'react-redux'

import './Filter.scss'

import { 
  getDataTable,
  setWhereTable,
  setConditionTable,
  setInputTable
} from 'src/store/actions/table'
import { getObjectReq } from 'src/components/helpers'
import { State } from 'src/store/stateType'
import { Item, DataInfo, DataInfoQuery } from 'src/store/reducers/table'


export const Filter: React.FC = () => {
  const dispatch = useDispatch()

  const [column, setColumn] = useState<string>('')
  const [condition, setCondition] = useState<string>('')
  const [input, setInput] = useState<string>('')

  // from State
  const sort = useSelector<State, string>(state => state.table.data.sort)
  const order = useSelector<State, string>(state => state.table.data.order)

  // true - disabled, fasle - not
  const disabledOptions: any = {
    count: true,
    distance: true,
  }
  const disabledColunm: any = {
    contain: true
  }

  return (<div className='filter'>
    <div>
      <select 
        className='filter__column'
        onChange={(e) => {
          setColumn(e.target.value)
          dispatch(setWhereTable(e.target.value))
        }}
      >
        <option value='' selected disabled hidden/>
        <option value='name'>Name</option>
        <option 
          value='count'
          disabled={disabledColunm[condition]}
        >
          Count
        </option>
        <option 
          value='distance'
          disabled={disabledColunm[condition]}
        >
          Distance
        </option>
      </select>
    </div>
    <div>
      <select 
        disabled={!column}
        className='filter__condition'
        onChange={(e) => {
          setCondition(e.target.value)
          dispatch(setConditionTable(e.target.value))
          let payload: DataInfoQuery = getObjectReq(0, sort, order)
          if (input !== '') {
            payload = getObjectReq(0, sort, order, column, e.target.value, input)
          }
          dispatch(getDataTable(payload))
        }}
      >
        <option value='' selected disabled hidden/>
        <option value='equal'>equal</option>
        <option 
          value='contain'
          disabled={disabledOptions[column]}
        >
          contain
        </option>
        <option value='more'>more</option>
        <option value='less'>less</option>
      </select>
    </div>
    <div>
      <input 
        disabled={!condition}
        className='filter__options'
        type='text'
        onChange={(e) => {
          dispatch(setInputTable(e.target.value))
          let payload: DataInfoQuery = getObjectReq(0, sort, order)
          if (e.target.value !== '') {
            payload = getObjectReq(0, sort, order, column, condition, e.target.value)
          }
          dispatch(getDataTable(payload))
          setInput(e.target.value)
        }}
      />
    </div>
  </div>)
}