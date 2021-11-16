"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
        while (_) try {
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
exports.__esModule = true;
exports.IdentityService = void 0;
var common_1 = require("@nestjs/common");
var IdentityService = /** @class */ (function () {
    function IdentityService(ssiService) {
        this.ssiService = ssiService;
        this.logger = new common_1.Logger(IdentityService_1.name);
    }
    IdentityService_1 = IdentityService;
    IdentityService.prototype.error = function (issuer, error) {
        return {
            issuer: issuer,
            isVerified: false,
            error: error
        };
    };
    IdentityService.prototype.valid = function (issuer) {
        return {
            issuer: issuer,
            isValid: true
        };
    };
    IdentityService.prototype.verify = function (verifiableCredential) {
        return __awaiter(this, void 0, void 0, function () {
            var issuerDoc, isIssuerVerified, subjectDoc, isSubjectVerified, credentialVerified, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.ssiService.getLatestIdentityDoc(verifiableCredential.issuer)];
                    case 1:
                        issuerDoc = _a.sent();
                        if (!issuerDoc) {
                            return [2 /*return*/, this.error(verifiableCredential.issuer, "Issuer is not on the tangle")];
                        }
                        isIssuerVerified = issuerDoc.verify();
                        if (!isIssuerVerified) {
                            return [2 /*return*/, this.error(verifiableCredential.issuer, "Issuer is not verified")];
                        }
                        return [4 /*yield*/, this.ssiService.getLatestIdentityDoc(verifiableCredential.id)];
                    case 2:
                        subjectDoc = _a.sent();
                        if (!subjectDoc) {
                            return [2 /*return*/, this.error(verifiableCredential.issuer, "Subject is not on the tangle")];
                        }
                        isSubjectVerified = subjectDoc.verify();
                        if (!isSubjectVerified) {
                            return [2 /*return*/, this.error(verifiableCredential.issuer, "Subject is not verified")];
                        }
                        credentialVerified = issuerDoc.verifyData(verifiableCredential);
                        if (!credentialVerified) {
                            return [2 /*return*/, this.error(verifiableCredential.issuer, "VerifiableCredential is not verifiable by issuer")];
                        }
                        return [2 /*return*/, this.valid(verifiableCredential.issuer)];
                    case 3:
                        e_1 = _a.sent();
                        this.logger.error("Error verifying credential: " + e_1.message);
                        return [2 /*return*/, { issuer: verifiableCredential.issuer, verified: false, error: e_1.message }];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    var IdentityService_1;
    IdentityService = IdentityService_1 = __decorate([
        common_1.Injectable()
    ], IdentityService);
    return IdentityService;
}());
exports.IdentityService = IdentityService;
