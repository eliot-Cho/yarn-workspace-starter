"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loader = void 0;
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const express_1 = require("express");
const routes_1 = require("../apis/routes");
const constants_1 = require("@/constants");
const error_res_1 = require("@/utils/error-res");
const loader = (app) => {
    app.use((0, express_1.json)());
    app.use((0, morgan_1.default)("dev"));
    app.use((0, cors_1.default)());
    app.use("/", routes_1.router);
    app.get("/status", (req, res) => {
        return res.json({});
    });
    app.all("*", (_req, _res, next) => {
        next(new error_res_1.ErrorResponse(constants_1.commonError.notFound));
    });
};
exports.loader = loader;
