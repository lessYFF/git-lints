import * as fs from 'fs'
import * as path from 'path'

const FS = {
    // 同步读取文件封装
    readFileSync(arg) {
        return fs.readFileSync(path.resolve(__dirname, arg))
    },
    // 同步写入文件封装
    writeFileSync(...arg) {
        // 已存在则不写入
        if (this.isFileExist(arg[0])) return

        fs.writeFileSync(path.resolve(arg[0]), arg[1])
    },
    // 检查文件是否存在
    isFileExist(arg) {
        return fs.existsSync(path.resolve(arg))
    },
    // 拷贝文件到指定目录
    copyFile(src, dist) {
        this.writeFileSync(dist, this.readFileSync(src))
    },
    // 批量拷贝文件到指定目录
    batchCopyFile(args, srcPrefix = '', distPrefix = '') {
        if (!Array.isArray(args)) return new Error('the arguments should be Array')

        args.forEach(item => {
            this.copyFile(srcPrefix + item, distPrefix + item)
        })
    },
}

export default FS
