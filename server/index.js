"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importStar(require("express"));
require("dotenv/config");
var cors_1 = __importDefault(require("cors"));
var helmet_1 = __importDefault(require("helmet"));
var routes_1 = require("./routes");
var app = (0, express_1.default)();
var PORT = process.env.PORT || 3002;
var isProduction = process.env.NODE_ENV === "production";
var origin = {
    origin: isProduction
        ? "https://www.production_url.com"
        : process.env.LOCAL_FRONTEND,
};
// TODO: ?
app.use((0, express_1.json)());
// secure HTTP headers in an Express app
app.use((0, helmet_1.default)());
// enable CORS to be able to make requests from the frontend
app.use((0, cors_1.default)(origin));
// load routers
app.use(routes_1.usersRouter);
app.use(routes_1.plantsRouter);
// health check endpoint
app.get("/health", function (_req, res) {
    res.json({ message: "Hello World! This is a message from the backend" });
});
app.listen(PORT, function () {
    console.log("Todos app listening on port ".concat(PORT));
});
