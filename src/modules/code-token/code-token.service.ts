import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectConnection, InjectRepository } from "@nestjs/typeorm";
import { Languages } from "../code-executor/entity/languages.enum";
import { BaseService } from "../../shared/base.service";
import { Connection, getManager, Not, Repository } from "typeorm";
import { TokenCode } from "./code-token.entity";
import { JsConstants } from "./utils/js-constants";
import { PyConstants } from "./utils/py-constants";
import { response } from "express";
import Code from "modules/code-save/code-save.entity";

@Injectable()
export class TokenCodeSaveService {
    constructor(
      @InjectRepository(TokenCode)
      @InjectConnection()
      private tokenCodeSaveRepository: Repository<TokenCode>,
      private readonly configService: ConfigService
    ) { }
   
    async saveToken(ownerId: number, code: Code, langage: string) {
      var token;
      if(langage===Languages.javascript) token = this.tokenizeJavascript(code.code);
      if(langage===Languages.python) token = this.tokenizePython(code.code);

      const newCode = this.tokenCodeSaveRepository.create({
        token: token,
        langage: langage,
        owner: {
          id: ownerId
        },
        codeId: code.id
      });

      await this.tokenCodeSaveRepository.save(newCode);
      return newCode;
    }
    
  
    async deleteCode(id: number) {
      return await this.tokenCodeSaveRepository.delete({id});
    }

    async getLowestSimilarityDistance(code: Code, langage: string) {
      var token: string;

      if(langage===Languages.javascript) token = this.tokenizeJavascript(code.code);
      if(langage===Languages.python) token = this.tokenizePython(code.code);
      
      let tokensList = await this.tokenCodeSaveRepository.find({
        langage: code.language,
        codeId: Not(code.id)
      })

      if(!tokensList.length) return 0;

      return await tokensList.map((item, index) => {
        let distance = this.levenshteinDistance(token, item.token)
        let maximalLength = token.length > item.token.length ? token.length : item.token.length
        return ( maximalLength - distance ) / maximalLength
      }).sort(function(a, b){return b-a})[0] * 100
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
        let token = code.replace(PyConstants.LINE_COMMENT, "")
                          .replace(PyConstants.BLOCK_COMMENT, "")
                          .replace(PyConstants.PRINT, "")
                          .replace(PyConstants.STRING, "S")
                          .replace(PyConstants.NUMBER, "N")
                          .replace(PyConstants.VARS, "V")
                          .replace(PyConstants.WHITESPACE, "")
        return token;
    }

    levenshteinDistance(str1: string, str2:string) : number {
      const track = Array(str2.length + 1).fill(null).map(() =>
          Array(str1.length + 1).fill(null));
          for (let i = 0; i <= str1.length; i += 1) {
              track[0][i] = i;
          }
          for (let j = 0; j <= str2.length; j += 1) {
              track[j][0] = j;
          }
          for (let j = 1; j <= str2.length; j += 1) {
              for (let i = 1; i <= str1.length; i += 1) {
                  const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
                  track[j][i] = Math.min(
                      track[j][i - 1] + 1,
                      track[j - 1][i] + 1,
                      track[j - 1][i - 1] + indicator,
                  );
              }
          }
      return track[str2.length][str1.length];
  }
}