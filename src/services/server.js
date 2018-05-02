const fastify = require('fastify')();
const path = require('path');
const fs = require('fs');

if (process.env.NODE_ENV === "development") {
    const path = require("path");
    require("ts-node").register({
        project: path.join(__dirname, "../../tsconfig.json"),
        compilerOptions: {
            "module": "commonjs",
        },
    });
}

if (process.env.NODE_ENV === "production") {
    const path = require("path");
    require("ts-node").register({
        project: path.join(__dirname, "../../tsconfig.json"),
        compilerOptions: {
            "module": "commonjs",
        },
    });
}

const {host, port } = require('./configuration').getConfig();

// 批量注册内部plugins
// const plugins = path.join(__dirname, "plugins");
//
// fs.readdirSync(plugins).forEach(fileName => {
//     fastify.register(require(path.join(plugins, `${fileName}`)).default)
// });

fastify.register(require('fastify-static'), {
    root: path.join(__dirname, '../../static'),
    prefix: '/static/',
});


// Run the server!
fastify.listen(port, host, function (err) {
    if (err) {
        fastify.log.error(err);
        process.exit(1)
    }
    console.log(`server listening on ${fastify.server.address().port}`);
});
