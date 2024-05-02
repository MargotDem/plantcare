"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
Object.defineProperty(exports, "__esModule", { value: true });
var config_1 = require("../config");
var DatabaseLayer = /** @class */ (function () {
    function DatabaseLayer(table) {
        this.table = table;
    }
    DatabaseLayer.prototype.getAll = function (callBack) {
        config_1.pool.query("SELECT * FROM ".concat(this.table, " ORDER BY id ASC"), callBack);
    };
    DatabaseLayer.prototype.getById = function (id, callBack) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                config_1.pool.query("SELECT * FROM ".concat(this.table, " WHERE id = $1"), [id], callBack);
                return [2 /*return*/];
            });
        });
    };
    DatabaseLayer.prototype.delete = function (id, callBack) {
        config_1.pool.query("DELETE FROM ".concat(this.table, " WHERE id = $1"), [id], callBack);
    };
    DatabaseLayer.prototype.insert = function (columns, values, callBack) {
        config_1.pool.query("INSERT INTO ".concat(this.table, " (").concat(columns.toString(), ") VALUES (").concat(__spreadArray([], values.map(function (_val, id) { return "$".concat(id + 1); }), true).toString(), ")  RETURNING *;"), values, callBack);
    };
    DatabaseLayer.prototype.update = function (id, columns, values, callBack) {
        var columnsValuesPairs = __spreadArray([], columns.map(function (col, id) { return "".concat(col, " = $").concat(id + 1); }), true).toString();
        config_1.pool.query("UPDATE ".concat(this.table, " SET ").concat(columnsValuesPairs, " WHERE id = $").concat(columns.length + 1), __spreadArray(__spreadArray([], values, true), [id], false), callBack);
    };
    DatabaseLayer.prototype.join = function (id, joinedTable, jointTable, callBack, order) {
        /*
            TODO: this join method is entirely reliant on the fact that tables and joint tables are named
            like this:
            plants, users, plants_users
            and that the fields in the joint table are named like: plant_id, user_id
    
            not great
        */
        config_1.pool.query("SELECT *\n\tFROM ".concat(joinedTable, "\n\tJOIN ").concat(jointTable, " ON ").concat(joinedTable, ".id = ").concat(jointTable, ".").concat(joinedTable.slice(0, -1), "_id\n\tJOIN ").concat(this.table, " ON ").concat(this.table, ".id = ").concat(jointTable, ".").concat(this.table.slice(0, -1), "_id\n\tWHERE ").concat(joinedTable, ".id = ").concat(id, " ").concat(order.asc ? "ORDER BY next_watering_due_date ASC" : "", ";"), callBack);
    };
    DatabaseLayer.prototype.insertJoin = function (columns, values, jointTable, callBack) {
        config_1.pool.query("INSERT INTO ".concat(jointTable, " (").concat(columns.toString(), ") VALUES (").concat(__spreadArray([], values.map(function (_val, id) { return "$".concat(id + 1); }), true).toString(), ")  RETURNING *;"), values, callBack);
    };
    return DatabaseLayer;
}());
exports.default = DatabaseLayer;