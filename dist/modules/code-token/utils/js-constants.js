"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JsConstants = void 0;
exports.JsConstants = {
    LINE_COMMENT: /(\/\/)(.*?)(\n)/g,
    BLOCK_COMMENT: /(\/\*)(.*?)(\*\/)/g,
    NUMBER: /[\.0-9]+/g,
    STRING: /(\\"')(.*?)(\\"')/g,
    CONSOLE: /(console\.log)(.*?)(\))/g,
    WHITESPACE: /\s/g,
    BACK_SLASH: /\\[nt]/g,
    SEMI_COLON: /;/g,
    VARS: /(?<=(?!static readonly|let|var|return|function)|(\|\|)|(\<\=)|(\=\=\=)|(\=\=)|(\>\=)|(\&\&)|[\;\.\+\-\*\/\=\>\<\&\%\!\^\)\,{\(]\s*)([_A-Za-z])+\s*(?=[\;\.\+\-\*\/\=\>\<\&\%\!\^\)\,}]|(\|\|)|(\<\=)|(\=\=\=)|(\=\=)|(\>\=)|(\&\&))/g,
};
//# sourceMappingURL=js-constants.js.map