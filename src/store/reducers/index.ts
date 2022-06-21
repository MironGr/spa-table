import { combineReducers } from '@reduxjs/toolkit'

import { table, Table} from './table'

export const rootReducer = combineReducers({
  table: table
})

export interface RootReducer {
  data: Table
}