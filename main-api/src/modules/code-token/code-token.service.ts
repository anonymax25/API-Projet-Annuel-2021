import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectConnection, InjectRepository } from "@nestjs/typeorm";
import console from "console";
import { Languages } from "modules/code-executor/entity/languages.enum";
import { BaseService } from "shared/base.service";
import { Connection, getManager, Repository } from "typeorm";
import { TokenCode } from "./code-token.entity";
import { JsConstants } from "./utils/js-constants";

@Injectable()
export class TokenCodeSaveService extends BaseService<TokenCode>{
    constructor(
      @InjectRepository(TokenCode)
      @InjectConnection()
      private tokenCodeSaveRepository: Repository<TokenCode>,
      private readonly configService: ConfigService
    ) {
      super(TokenCode);
    }
   
    async saveToken(ownerId: number, code: string, langage: string) {
      var token;
      if(langage===Languages.javascript) token = this.tokenizeJavascript(code);
      if(langage===Languages.python) token = this.tokenizePython(code);
      const newCode = this.tokenCodeSaveRepository.create({
        token: token,
        langage: langage,
        owner: {
          id: ownerId
        }
      });
      await this.tokenCodeSaveRepository.save(newCode);
      return newCode;
    }
    
  
    async deleteCode(id: number) {
      return await this.tokenCodeSaveRepository.delete({id});
    }

    async getLowestSimilarityDistance(code: string, langage: string) {
      var token;
      if(langage===Languages.javascript) token = this.tokenizeJavascript(code);
      if(langage===Languages.python) token = this.tokenizePython(code);
      // let response = await this.tokenCodeSaveRepository
      //                     .createQueryBuilder("tokenCode")
      //                     .select(`levenshtein(tokenCode.token, '${token}')`)
      //                     .where("tokenCode.langage = :langage", {langage: langage})
      //                     //.andWhere(`levenshtein(tokenCode.token, '${token}') <= 10`)
      //                     .addOrderBy(`levenshtein(tokenCode.token, '${token}')`)
      //                     .limit(1).printSql;
      //console.log(response);
    }

    tokenizeJavascript(code: string): string {
        let token = code.replace(JsConstants.LINE_COMMENT, "")
                          .replace(JsConstants.BLOCK_COMMENT, "")
                          .replace(JsConstants.CONSOLE, "")
                          .replace(JsConstants.BACK_SLASH, "")
                          .replace(JsConstants.STRING, "S")
                          .replace(JsConstants.NUMBER, "N")
                          .replace(JsConstants.VARS, "V")
                          .replace(JsConstants.WHITESPACE, "")
        return token;
    }

    tokenizePython(code: string): string {
        return "TODO"
    }
  }