"use strict";
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
exports.WhereParams = exports.BaseService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("typeorm");
class BaseService {
    constructor(TClass) {
        this.TClass = TClass;
        this.logger = new common_1.Logger(`${TClass.name} service`);
    }
    getConnection() {
        return typeorm_1.getConnection(process.env.DB_CONNECTION_NAME);
    }
    getRepository() {
        return this.getConnection().getRepository(this.TClass);
    }
    findQuery(where, select) {
        let whereCondition = '';
        if (where) {
            for (let key in where) {
                if (whereCondition.length > 0) {
                    whereCondition += ' AND ';
                }
                whereCondition += `${key} = :${key}`;
            }
        }
        let query = this.getRepository()
            .createQueryBuilder()
            .select()
            .where(whereCondition, where);
        if (select && select.length) {
            for (let s of select) {
                query.addSelect(`"${this.TClass.name}"."${s.toString()}"`, `${this.TClass.name}_${s}`);
            }
        }
        return query;
    }
    find(where, select) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = this.findQuery(where, select);
            return query.getMany();
        });
    }
    findOne(where, select) {
        return __awaiter(this, void 0, void 0, function* () {
            let query = this.findQuery(where, select);
            return query.getOne();
        });
    }
    findOneById(id, select) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.findOne({ id: id }, select);
        });
    }
    findOneOrFail(params, select) {
        return __awaiter(this, void 0, void 0, function* () {
            let entity = yield this.findOne(params, select);
            if (!entity) {
                this.logger.log('Entity not found');
                this.logger.log(JSON.stringify(params || {}));
                this.logger.log(Error().stack);
                throw new common_1.NotFoundException();
            }
            else {
                return entity;
            }
        });
    }
    updateFields(id, values) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getConnection().manager.update(this.TClass, { id }, values);
        });
    }
    save(value) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getConnection().manager.save(value);
        });
    }
    createEntity() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getConnection().manager.create(this.TClass);
        });
    }
    delete(where) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getConnection().manager.delete(this.TClass, where);
        });
    }
}
exports.BaseService = BaseService;
class WhereParams {
}
exports.WhereParams = WhereParams;
//# sourceMappingURL=base.service.js.map