//这是自己建的文件，以解决next导入全局CSS冲突问题
// next.config.js
const semi = require('@douyinfe/semi-next').default({
    /* the extension options */
});
module.exports = semi({
    // your custom Next.js configuration
});