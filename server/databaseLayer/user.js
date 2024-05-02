"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var abstractDatabaseLayer_1 = __importDefault(require("./abstractDatabaseLayer"));
var UserDatabaseLayer = /** @class */ (function (_super) {
    __extends(UserDatabaseLayer, _super);
    function UserDatabaseLayer(table) {
        return _super.call(this, table) || this;
    }
    UserDatabaseLayer.prototype.createUser = function (user, callBack) {
        this.insert(Object.keys(user), Object.values(user), callBack);
    };
    UserDatabaseLayer.prototype.updateUser = function (id, user, callBack) {
        this.update(id, Object.keys(user), Object.values(user), callBack);
    };
    UserDatabaseLayer.prototype.getByPlantId = function (id, callBack) {
        var order = {};
        this.join(id, "plants", "plants_users", callBack, order);
    };
    return UserDatabaseLayer;
}(abstractDatabaseLayer_1.default));
exports.default = UserDatabaseLayer;
