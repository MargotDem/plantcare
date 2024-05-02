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
var PlantDatabaseLayer = /** @class */ (function (_super) {
    __extends(PlantDatabaseLayer, _super);
    function PlantDatabaseLayer(table) {
        return _super.call(this, table) || this;
    }
    PlantDatabaseLayer.prototype.createPlant = function (plant, callBack) {
        this.insert(Object.keys(plant), Object.values(plant), callBack);
    };
    PlantDatabaseLayer.prototype.updatePlant = function (id, plant, callBack) {
        this.update(id, Object.keys(plant), Object.values(plant), callBack);
    };
    PlantDatabaseLayer.prototype.getByUserId = function (user_id, callBack) {
        var order = {};
        this.join(user_id, "users", "plants_users", callBack, order);
    };
    PlantDatabaseLayer.prototype.getByUserIdAsc = function (user_id, callBack) {
        var order = {
            asc: "true",
        };
        this.join(user_id, "users", "plants_users", callBack, order);
    };
    PlantDatabaseLayer.prototype.assignUserToPlant = function (user_id, plant_id, callBack) {
        this.insertJoin(["user_id", "plant_id"], [user_id, plant_id], "plants_users", callBack);
    };
    return PlantDatabaseLayer;
}(abstractDatabaseLayer_1.default));
exports.default = PlantDatabaseLayer;
