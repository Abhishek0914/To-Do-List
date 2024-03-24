"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const react_router_dom_1 = require("react-router-dom");
const Todo_1 = __importDefault(require("./components/Todo"));
function App() {
    const headStyle = {
        textAlign: "center",
    };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h1", { style: headStyle }, "Todo List"),
        react_1.default.createElement(react_router_dom_1.BrowserRouter, null,
            react_1.default.createElement(react_router_dom_1.Routes, null,
                react_1.default.createElement(react_router_dom_1.Route, { path: '/', element: react_1.default.createElement(Todo_1.default, null) })))));
}
exports.default = App;
