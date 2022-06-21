import { call, put } from 'redux-saga/effects'

import { getRequest } from 'src/api/request'
import { actionTypes } from 'src/store/actionTypes'
import { Item } from 'src/store/reducers/table'

const getData = (
  page: number,
  column: string = '',
  value: string = '',
  where: string = '',
  condition: string = '',
  input: string = ''
) => {
  const query = `
    /get-x-page
    ?page=${page}
    &sort=${column}
    &value=${value}
    &where=${where}
    &condition=${condition}
    &input=${input}
  `
  return getRequest(query.replaceAll('\n', '').replaceAll(' ', ''));
};

export function* getTableDataSaga(action: any) {
  try {
    const page = action.payload.page
    const sort = action.payload.sort
    const value = action.payload.value
    const where = action.payload.where
    const condition = action.payload.condition
    const input = action.payload.input
    
    const res: Item[] = yield call(
      getData,
      page,
      sort, 
      value,
      where,
      condition,
      input
    )
    if (res) {
      yield put({
        type: actionTypes.SET_DATA_TABLE,
        payload: res,
      });
    }
  } catch (err) {
    console.log('Error get data - ', err);
  }
}