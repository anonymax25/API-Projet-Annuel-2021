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
const languages_enum_1 = require("modules/code-executor/entity/languages.enum");
let Code = class Code extends typeorm_1.BaseEntity {
    constructor(id, name, code, owner) {
        super();
        this.id = id;
        this.name = name;
        this.code = code;
        this.owner = owner;
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Code.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Code.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Code.prototype, "code", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Code.prototype, "language", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Code.prototype, "isPrivate", void 0);
__decorate([
    typeorm_1.ManyToOne(() => user_entity_1.User, (owner) => owner.files),
    __metadata("design:type", user_entity_1.User)
], Code.prototype, "owner", void 0);
Code = __decorate([
    typeorm_1.Entity(),
    __metadata("design:paramtypes", [Number, String, String, user_entity_1.User])
], Code);
exports.default = Code;
//# sourceMappingURL=code-save.entity.js.map