// 将代码转换为ast语法树

// nodejs的文件系统
const fs = require('fs')
// 将js转换为ast的工具
const babylon = require('babylon')
// 将ast转换为js
const {transformFromAst}=require('babel-core')

// 分析ast的工具
const traverse=require('babel-traverse').default;

module.exports = {
    getAST: (path) => {
        // 同步读取文件（异步：readFile），异步方法性能更高，且没有阻塞
        const source = fs.readFileSync(path, 'utf-8')

        return babylon.parse(source, {
            sourceType: 'module'
        })
    },
    getDependencies:(ast)=>{
        const deps=[];
        traverse(ast,{
            // 解析 import 语法
            ImportDeclaration:({node})=>{
                deps.push(node.source.value)
            }
        })

        return deps
    },
    transform:(ast)=>{
      const {code}=  transformFromAst(ast,null,{
            presets:['env']
        })
        return code
    }
}