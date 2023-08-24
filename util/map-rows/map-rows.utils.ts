interface MapResult2 {
  many: boolean;
  mapToProperty: string;
  alias: string;
  nested?: MapResult2[];
}

function mapExtract(row: any, alias: string) {
  const values = {};

  Object.keys(row).forEach((keyRow) => {
    if (keyRow.slice(0, alias.length + 1).includes(`${alias}_`)) {
      values[keyRow.replace(`${alias}_`, '')] = row[keyRow];
    }
  });

  return values;
}

function mapJoin(
  rows: any[],
  baseAlias: string,
  baseId: string,
  map: MapResult2,
) {
  const baseAliasId = `${baseAlias}_id`;

  let result;

  if (map.many) {
    const base = {};
    rows.forEach((row) => {
      if (row[baseAliasId] !== baseId) {
        return;
      }

      const id = row[`${map.alias}_id`];

      if (id in base) {
        return;
      }

      base[id] = mapExtract(row, map.alias);
    });

    result = [...Object.keys(base).map((key) => base[key])];
  } else {
    result = mapExtract(
      rows.find((row) => row[baseAliasId] === baseId),
      map.alias,
    );
  }

  if (map.nested?.length > 0) {
    if (Array.isArray(result)) {
      result.forEach((r) => {
        map.nested?.forEach((m) => {
          r[m.mapToProperty] = mapJoin(rows, map.alias, r.id, m);
        });
      });
    } else if (result) {
      map.nested?.forEach((m) => {
        result[m.mapToProperty] = mapJoin(rows, map.alias, result.id, m);
      });
    }
  }

  return result;
}

export default function mapRowsUtils(
  rows: any[],
  baseAlias: string,
  maps: MapResult2[],
) {
  const base = {};

  rows.forEach((row) => {
    const id = row[`${baseAlias}_id`];

    if (id in base) {
      return;
    }

    base[id] = mapExtract(row, baseAlias);
  });

  let baseArray = Object.keys(base).map((key) => base[key]);

  baseArray = baseArray.map((item) => {
    maps.forEach((m) => {
      item = {
        ...item,
        [m.mapToProperty]: mapJoin(rows, baseAlias, item.id, m),
      };
    });
    return item;
  });

  return baseArray;
}
