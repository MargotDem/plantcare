"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var databaseCallBack = function (onSucces, onError) {
    return function (error, results) {
        try {
            if (error) {
                throw error;
            }
            onSucces(results);
        }
        catch (e) {
            console.log("Database error:");
            console.log(e);
            onError(error);
        }
    };
};
exports.default = databaseCallBack;
