"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.IdentityModule = void 0;
var common_1 = require("@nestjs/common");
var identity_controller_1 = require("./identity.controller");
var identity_service_1 = require("./identity.service");
var ssi_service_1 = require("./ssi-service");
var IdentityModule = /** @class */ (function () {
    function IdentityModule() {
    }
    IdentityModule = __decorate([
        common_1.Module({
            controllers: [identity_controller_1.IdentityController],
            providers: [identity_service_1.IdentityService, ssi_service_1.SsiService]
        })
    ], IdentityModule);
    return IdentityModule;
}());
exports.IdentityModule = IdentityModule;
