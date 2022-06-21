
import { DataInfoQuery } from 'src/store/reducers/table'


export const getObjectReq = (
  page: number,
  column: string, 
  value: string,
  where: string = '',
  condition: string = '',
  input: string = ''
): DataInfoQuery => ({
  page: page, 
  sort: column, 
  value,
  where,
  condition,
  input
})