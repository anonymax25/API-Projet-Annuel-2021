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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticationService = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("../users/users.service");
const bcrypt = require("bcrypt");
const jwt_1 = require("@nestjs/jwt");
const user_entity_1 = require("../users/user.entity");
let AuthenticationService = class AuthenticationService {
    constructor(usersService, jwtService) {
        this.usersService = usersService;
        this.jwtService = jwtService;
    }
    register(registrationData) {
        return __awaiter(this, void 0, void 0, function* () {
            let emailCheck = yield this.usersService.findOne({ email: registrationData.email });
            if (emailCheck)
                throw new common_1.ConflictException(null, "A User with this email already exists");
            let nameCheck = yield this.usersService.findOne({ name: registrationData.name });
            if (nameCheck)
                throw new common_1.ConflictException(null, "A User with this name already exists");
            let newUser = new user_entity_1.User();
            newUser.email = registrationData.email;
            newUser.password = yield bcrypt.hash(registrationData.password, 10);
            newUser.name = registrationData.name;
            newUser.resultKey = null;
            const createdUser = yield this.usersService.save(newUser);
            delete createdUser.password;
            return createdUser;
        });
    }
    login(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const payload = { name: user.name, id: user.id };
            return {
                token: this.jwtService.sign(payload),
            };
        });
    }
    getAuthenticatedUser(email, plainTextPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield (yield this.usersService.find({ email })).shift();
                yield this.verifyPassword(plainTextPassword, user.password);
                return user;
            }
            catch (error) {
                throw new common_1.ForbiddenException(error, 'Wrong credentials provided');
            }
        });
    }
    verifyPassword(plainTextPassword, hashedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const isPasswordMatching = yield bcrypt.compare(plainTextPassword, hashedPassword);
            if (!isPasswordMatching) {
                throw new common_1.ForbiddenException(null, 'Wrong credentials provided');
            }
        });
    }
};
AuthenticationService = __decorate([
    common_1.Injectable(),
    __metadata("design:paramtypes", [users_service_1.UsersService,
        jwt_1.JwtService])
], AuthenticationService);
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=authentication.service.js.map