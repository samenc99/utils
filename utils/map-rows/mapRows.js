"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
exports.__esModule = true;
exports.mapRows = void 0;
function mapExtract(row, alias) {
    var values = {};
    Object.keys(row).forEach(function (keyRow) {
        if (keyRow.slice(0, alias.length + 1).includes("".concat(alias, "_"))) {
            values[keyRow.replace("".concat(alias, "_"), '')] = row[keyRow];
        }
    });
    return values;
}
function mapJoin(rows, baseAlias, baseId, map) {
    var _a, _b;
    var baseAliasId = "".concat(baseAlias, "_id");
    var result;
    if (map.many) {
        var base_1 = {};
        rows.forEach(function (row) {
            if (row[baseAliasId] !== baseId) {
                return;
            }
            var id = row["".concat(map.alias, "_id")];
            if (id in base_1) {
                return;
            }
            base_1[id] = mapExtract(row, map.alias);
        });
        result = __spreadArray([], Object.keys(base_1).map(function (key) { return base_1[key]; }), true);
    }
    else {
        result = mapExtract(rows.find(function (row) { return row[baseAliasId] === baseId; }), map.alias);
    }
    if (((_a = map.nested) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        if (Array.isArray(result)) {
            result.forEach(function (r) {
                var _a;
                (_a = map.nested) === null || _a === void 0 ? void 0 : _a.forEach(function (m) {
                    r[m.mapToProperty] = mapJoin(rows, map.alias, r.id, m);
                });
            });
        }
        else if (result) {
            (_b = map.nested) === null || _b === void 0 ? void 0 : _b.forEach(function (m) {
                result[m.mapToProperty] = mapJoin(rows, map.alias, result.id, m);
            });
        }
    }
    return result;
}
function mapRows(rows, baseAlias, maps) {
    var base = {};
    rows.forEach(function (row) {
        var id = row["".concat(baseAlias, "_id")];
        if (id in base) {
            return;
        }
        base[id] = mapExtract(row, baseAlias);
    });
    var baseArray = Object.keys(base).map(function (key) { return base[key]; });
    baseArray = baseArray.map(function (item) {
        maps.forEach(function (m) {
            var _a;
            item = __assign(__assign({}, item), (_a = {}, _a[m.mapToProperty] = mapJoin(rows, baseAlias, item.id, m), _a));
        });
        return item;
    });
    return baseArray;
}
exports.mapRows = mapRows;
