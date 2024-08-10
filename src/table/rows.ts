import { fetchDataFromDatabase } from './database'
import type { TableConfig } from '../types'

export const getRows = async ({
  head,
  body,
  database,
  tableName
}: TableConfig): Promise<string[][]> => {
  if (database && tableName) {
    return fetchDataFromDatabase(database, tableName)
  }
  return head.length ? [head, ...body] : body
}
