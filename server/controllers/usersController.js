"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var user_1 = __importDefault(require("../databaseLayer/user"));
var databaseCallBack_1 = __importDefault(require("./databaseCallBack"));
var User = new user_1.default("users");
var usersController = {
    getUsers: function (_req, res) {
        var callBack = (0, databaseCallBack_1.default)(function (results) { return res.status(200).json(results.rows); }, function (_error) { return res.status(500).json({ message: "Database error" }); });
        User.getAll(callBack);
    },
    createUser: function (req, res) {
        var callBack = (0, databaseCallBack_1.default)(function (results) {
            var newUserId = results.rows[0].id;
            res
                .status(200)
                .json({ message: "User added with ID: ".concat(newUserId), newUserId: newUserId });
        }, function (_error) { return res.status(500).json({ message: "Database error" }); });
        User.createUser(req.body, callBack);
    },
    getUserById: function (req, res) {
        var id = parseInt(req.params.id);
        var callBack = (0, databaseCallBack_1.default)(function (results) { return res.status(200).json(results.rows); }, function (_error) { return res.status(500).json({ message: "Database error" }); });
        User.getById(id, callBack);
    },
    deleteUser: function (req, res) {
        var id = parseInt(req.params.id);
        var callBack = (0, databaseCallBack_1.default)(function (_results) {
            return res.status(200).json({ message: "User deleted with ID: ".concat(id) });
        }, function (_error) { return res.status(500).json({ message: "Database error" }); });
        User.delete(id, callBack);
    },
    updateUser: function (req, res) {
        var id = parseInt(req.params.id);
        var callBack = (0, databaseCallBack_1.default)(function (_results) {
            return res.status(200).json({ message: "User updater with ID: ".concat(id) });
        }, function (_error) { return res.status(500).json({ message: "Database error" }); });
        User.updateUser(id, req.body, callBack);
    },
};
exports.default = usersController;
