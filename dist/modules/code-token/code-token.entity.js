"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenCode = void 0;
const user_entity_1 = require("../users/user.entity");
const typeorm_1 = require("typeorm");
let TokenCode = class TokenCode extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], TokenCode.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], TokenCode.prototype, "token", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], TokenCode.prototype, "langage", void 0);
__decorate([
    typeorm_1.ManyToOne(() => user_entity_1.User, (owner) => owner.files),
    __metadata("design:type", user_entity_1.User)
], TokenCode.prototype, "owner", void 0);
TokenCode = __decorate([
    typeorm_1.Entity()
], TokenCode);
exports.TokenCode = TokenCode;
//# sourceMappingURL=code-token.entity.js.map