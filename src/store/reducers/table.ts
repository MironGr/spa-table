import { 
  Reducer, 
  Action,
  PayloadAction, 
  createReducer
} from '@reduxjs/toolkit' 

import {
  setDataTable,
  setSortTable,
  setWhereTable,
  setConditionTable,
  setInputTable,
  setOrderSortTable
} from 'src/store/actions/table'
import { State } from 'src/store/stateType'


export const initialState = {
  data: {
    rows: [],
    page: 0,
    total: 0,
    sort: '',
    order: '',
    value: '',
    where: '',
    condition: '',
    input: ''
  },
}

export const table: Reducer<typeof initialState, Action> = createReducer(initialState, builder => {
  builder
    .addCase(setDataTable, (state: State['table'], action: PayloadAction<DataInfo>) => {
      state.data.rows = action.payload.rows
      state.data.page = action.payload.page
      state.data.total = action.payload.total
    })
    .addCase(setSortTable, (state: State['table'], action: PayloadAction<string>) => {
      state.data.sort = action.payload
    })
    .addCase(setOrderSortTable, (state: State['table'], action: PayloadAction<string>) => {
      state.data.order = action.payload
    })
    .addCase(setWhereTable, (state: State['table'], action: PayloadAction<string>) => {
      state.data.where = action.payload
    })
    .addCase(setConditionTable, (state: State['table'], action: PayloadAction<string>) => {
      state.data.condition = action.payload
    })
    .addCase(setInputTable, (state: State['table'], action: PayloadAction<string>) => {
      state.data.input = action.payload
    })
})

export interface Table {
  data: DataInfo
}

export interface DataInfo {
  rows: Item[],
  page: number,
  total: number,
  sort: string,
  order: string,
  value: string,
  where: string,
  condition: string,
  input: string
}

export interface DataInfoQuery {
  page: number,
  sort?: string,
  value?: string,
  where?: string,
  condition?: string,
  input?: string,
}

export interface Item {
  id: number,
  date: string,
  name: string,
  distance: number,
  count: number
}

