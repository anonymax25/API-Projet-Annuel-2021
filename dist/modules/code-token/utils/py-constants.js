"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PyConstants = void 0;
exports.PyConstants = {
    LINE_COMMENT: /(\#)(.*?)(\\n)/g,
    BLOCK_COMMENT: /(\"\"\")(.*?)(\"\"\")/g,
    NUMBER: /[\.0-9]+/g,
    STRING: /(\\"')(.*?)(\\"')/g,
    PRINT: /(print)(.*?)(\\n)/g,
    WHITESPACE: /\s/g,
    VARS: /(?<=|(\|\|)|(\<\=)|(\=\=\=)|(\=\=)|(\>\=)|(\&\&)|[\;\.\+\-\*\/\=\>\<\&\%\!\^\)\,{\(]\s*)([_A-Za-z])+\s*(?=[\;\.\+\-\*\/\=\>\<\&\%\!\^\)\,}]|(\|\|)|(\<\=)|(\=\=\=)|(\=\=)|(\>\=)|(\&\&))/g,
};
//# sourceMappingURL=py-constants.js.map