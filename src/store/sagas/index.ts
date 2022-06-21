import { all, takeLatest, takeEvery } from 'redux-saga/effects'

import { actionTypes } from 'src/store/actionTypes'
import { getTableDataSaga } from './table'


export function* watchDataTable() {
  yield takeLatest(actionTypes.GET_DATA_TABLE, getTableDataSaga);
}

export function* rootSaga() {
  yield all([
    watchDataTable()
  ])
}