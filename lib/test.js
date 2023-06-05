const { log } = require('console')
const {getAST,getDependencies,transform} =require('./parser')
const path = require('path')

let resultAST=getAST(path.join(__dirname,'../src/index.js'))
// console.log(getDependencies(resultAST));
console.log(transform(resultAST));