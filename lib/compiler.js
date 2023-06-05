const { getAST, getDependencies, transform } = require('./parser')
let path = require('path')
let fs = require('fs')

module.exports = class Complier {
    constructor(options) {
        const { entry, output } = options
        this.entry = entry
        this.output = output
        // 存放构建的模块
        this.modules = []
    }

    // 入口方法
    run() {
        const entryModule = this.buildModule(this.entry, true)
        this.modules.push(entryModule)
        this.modules.map((module) => {
            module.dependencies.map((dep) => {
                // 把入口文件的依赖再次解析
                this.modules.push(this.buildModule(dep, false))
            })
        })

        this.emitFiles()
    }

    // 模块构建
    buildModule(filename, isEntry) {
        let ast
        if (isEntry) {
            ast = getAST(filename)
        } else {
            // 获取绝对路径
            const absolutePath = path.join(process.cwd(), './src', filename)
            ast = getAST(absolutePath)
        }

        return {
            filename,
            dependencies: getDependencies(ast),
            source: transform(ast)
        }

    }

    // 文件输出
    emitFiles() {
        const outputPath = path.join(this.output.path, this.output.filename)
        let modules = '';
        this.modules.map(module => {
            modules += `'${module.filename}':function(require,module,exports){${module.source}},`
        })
        const bundle = `(function(modules){
            function require(filename){
                var fn =modules[filename];
                var module={exports:{}};
                fn(require,module,module.exports);

                return module.exports
            }

            require('${this.entry}')
        })({${modules}})`

        // console.log('bundle.js', bundle);
        fs.writeFileSync(outputPath, bundle, 'utf-8')
    }

} 