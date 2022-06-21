import { createAction } from '@reduxjs/toolkit' 

import { actionTypes } from 'src/store/actionTypes'
import { DataInfo, DataInfoQuery } from 'src/store/reducers/table'


export const getDataTable = createAction<DataInfoQuery>(actionTypes.GET_DATA_TABLE)
export const setDataTable = createAction<DataInfo>(actionTypes.SET_DATA_TABLE)
// for sorting
export const setSortTable = createAction<string>(actionTypes.SET_SORT_TABLE)
export const setOrderSortTable = createAction<string>(actionTypes.SET_ORDER_SORT_TABLE)
// for filters
export const setWhereTable = createAction<string>(actionTypes.SET_WHERE_TABLE)
export const setConditionTable = createAction<string>(actionTypes.SET_CONDITION_TABLE)
export const setInputTable = createAction<string>(actionTypes.SET_INPUT_TABLE)