"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = errorMiddleware;
function errorMiddleware(err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({ message: 'Internal Server Error' });
}
