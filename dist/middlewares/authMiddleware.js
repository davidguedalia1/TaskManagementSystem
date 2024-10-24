"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwks_rsa_1 = __importDefault(require("jwks-rsa"));
const client = (0, jwks_rsa_1.default)({
    jwksUri: `https://cognito-idp.${process.env.AWS_REGION}.amazonaws.com/${process.env.COGNITO_USER_POOL_ID}/.well-known/jwks.json`
});
// Function to retrieve the signing key
function getKey(header, callback) {
    client.getSigningKey(header.kid, function (err, key) {
        if (err || !key) {
            callback(err || new Error('Signing key not found'));
        }
        else {
            const signingKey = key.getPublicKey(); // This is the correct way to get the public key
            callback(null, signingKey);
        }
    });
}
const isAuthenticated = (req, res, next) => {
    var _a;
    const token = (_a = req.headers.authorization) === null || _a === void 0 ? void 0 : _a.split(' ')[1]; // Extract Bearer token
    if (!token) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    // Verify the token using Cognito's public key (JWKS)
    jsonwebtoken_1.default.verify(token, getKey, {}, (err, decoded) => {
        if (err) {
            res.status(401).json({ message: 'Invalid token', error: err });
            return;
        }
        req.user = decoded; // Attach decoded user information to the request
        next();
    });
};
exports.isAuthenticated = isAuthenticated;
