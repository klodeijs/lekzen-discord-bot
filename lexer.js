
/*
not required anymore, but useful as a reference guide
let TokenType = {
    EOF : "EOF",
    ILLEGAL : "ILLEGAL",
    IDENT : "IDENT",
    NUMBER: "NUMBER",
    ASSIGNED: "ze",
    ADD: "+",
    SUB: "-",
    TIMES: ".",
    DIVIDE: "=",
    LT: "<",
    GT: ">",
    COMMA: ",",
    END :"\\",
    LPAREN : "(",
    RPAREN: ")",
    OBJECT_DEF: "ry",
    VARIABLE: "vu",
    TRUE: "so",
    IF: "ve",
    ELSE: "ru",
    NEGATE : "ni",
    LBRACK: "[",
    RBRACK: "]",
    START: "na",
    SPACE: "SPACE",
    UPPERLANG: "no",
    PRINT: "ne"
};
 */

let NumberDef = /[IVXLKDMN]+/g;


function removeTheBadWhitespace(inp){
    let remove = /(\s)(?!\/.*\/)/g;
    return inp.replace(remove,"");
};


function lexer(inp){
    self.input = inp;
    self.position = 0;
    self.ch = '';
};

function new_token(tk, lit) {
    let token = {};
    token.type = tk;
    token.literal = lit;
    return token;
};

function convertFromVexenNumeral(inp){
    let final = 0;
    inp = inp.toUpperCase();
    for (let i = 0; i < inp.length; i++){
        //add and subtract numbers yay
        switch (inp.charAt(i)){
            case "I":
                final += 1;
                break;
            case "V":
                final += 5;
                break;
            case "X":
                final += 10;
                break;
            case "L":
                final += 50;
                break;
            case "K":
                final += 100;
                break;
            case "D":
                final += 500;
                break;
            case "M":
                final += 1000;
                break;
            case "N":
                final = -final;
                break;
        }
    }
    return final;
};

module.exports = {


    find_tokens : function (inp){
        let tokenzPre = removeTheBadWhitespace(inp);
        tokenzPre = tokenzPre.split(/(\W)/g);
        let tokenz = [];
        tokenzPre.forEach(function(item,index){
            //time to mark the identifiers and not accidentally mark the strings

            //test for number first and use return so we don't reach the next one cause that could confuse things
            if (NumberDef.test(item)){
                tokenz.push(new_token("NUMBER",convertFromVexenNumeral(item)));
                return;
            }else if (/\w{3,}/g.test(item)){
                if (index > 0 && index < tokenzPre.length - 1 && tokenzPre[index-1] == "/" && tokenzPre[index+1] == "/"){
                    tokenz.push(new_token("STRING",item));
                    return;
                } else if (item.startsWith("ni") && item.length == 4){
                    tokenz.push(new_token("NEGATIVE", "ni"));
                    tokenz.push(new_token(item.slice(2), item.slice(2)));
                    return;
                } else {
                    tokenz.push(new_token("IDENTIFIER",item));
                    return;
                }
            } else if (/[<>]/g.test(item)){
                tokenz.push(new_token("COMPARE",item));
                return;
            } else if (/[\+-\.=]/g.test(item)){
                tokenz.push(new_token("OPERATOR",item));
                return;
            } else {
                tokenz.push(new_token(item,item));
                return;
            }

        })

        return tokenz;
    }

};