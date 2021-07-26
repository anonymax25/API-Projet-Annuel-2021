import { Logger } from "@nestjs/common";
import { Connection, Repository } from "typeorm";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
export declare class BaseService<T> {
    private TClass;
    protected logger: Logger;
    constructor(TClass: {
        new (): T;
    });
    getConnection(): Connection;
    getRepository(): Repository<T>;
    private findQuery;
    find(where: WhereParams, select?: (keyof T)[]): Promise<T[]>;
    findOne(where: WhereParams, select?: (keyof T)[]): Promise<T>;
    findOneById(id: number, select?: (keyof T)[]): Promise<T>;
    findOneOrFail(params: WhereParams, select?: (keyof T)[]): Promise<T>;
    updateFields(id: number, values: QueryDeepPartialEntity<T>): Promise<import("typeorm").UpdateResult>;
    save(value: T): Promise<T>;
    createEntity(): Promise<T>;
    delete(where: WhereParams): Promise<import("typeorm").DeleteResult>;
}
export declare class WhereParams {
    [key: string]: any;
}
