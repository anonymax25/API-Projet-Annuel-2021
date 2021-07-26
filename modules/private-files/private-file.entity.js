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
const user_entity_1 = require("../users/user.entity");
const typeorm_1 = require("typeorm");
let PrivateFile = class PrivateFile extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], PrivateFile.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], PrivateFile.prototype, "key", void 0);
__decorate([
    typeorm_1.ManyToOne(() => user_entity_1.User, (owner) => owner.files),
    __metadata("design:type", user_entity_1.User)
], PrivateFile.prototype, "owner", void 0);
PrivateFile = __decorate([
    typeorm_1.Entity()
], PrivateFile);
exports.default = PrivateFile;
//# sourceMappingURL=private-file.entity.js.map