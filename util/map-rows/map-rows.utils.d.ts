interface AnyObject {
  [p: string]: any
}

interface MapResult2 {
  many: boolean
  mapToProperty: string
  alias: string
  nested?: MapResult2[]
}

export function mapRowsUtils(rows: any[], baseAlias: string, maps: MapResult2[]): AnyObject[]
