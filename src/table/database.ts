import type { RowData } from '../types'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

export async function fetchDataFromDatabase(
  database: string,
  tableName: string
): Promise<string[][]> {
  const db = await open({
    filename: database,
    driver: sqlite3.Database
  })

  const data = await db.all<RowData[]>(`SELECT * FROM ${tableName}`)

  if (data.length > 0) {
    const head = Object.keys(data[0])
    const body = data.map(row =>
      Object.values(row).map(value => value?.toString() || '')
    )
    return [head, ...body]
  }

  return []
}
