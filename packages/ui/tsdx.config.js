const alias = require('@rollup/plugin-alias')
const path = require('path')
const peerDepsExternal = require('rollup-plugin-peer-deps-external')
const { nodeResolve } = require('@rollup/plugin-node-resolve')

// Not transpiled with TypeScript or Babel, so use plain Es6/Node.js!
module.exports = {
  // This function will run for each entry/format/env combination
  rollup(config, options) {
    // console.log('🚀 ~ file: tsdx.config.js ~ line 11 ~ rollup ~ config', config)
    // console.log(
    //   '🚀 ~ file: tsdx.config.js ~ line 9 ~ rollup ~ config',
    //   path.join(__dirname, '../../web/node_modules/styled-components')
    // )
    config.plugins.unshift(nodeResolve())
    config.plugins.unshift(peerDepsExternal())
    // config.plugins.push(
    //   alias({
    //     resolve: ['.jsx', '.js'], //optional, by default this will just look for .js files or folders
    //     entries: [
    //       {
    //         find: 'styled-components',
    //         replacement: path.join(
    //           __dirname,
    //           '../../node_modules/styled-components'
    //         ),
    //       },
    //     ],
    //   })
    // )
    console.log(path.join(__dirname, '../../node_modules/react'))
    config.plugins.push(
      alias({
        resolve: ['.jsx', '.js'], //optional, by default this will just look for .js files or folders
        entries: [
          {
            find: 'react',
            replacement: path.join(__dirname, '../../web/node_modules/react'),
          },
        ],
      })
    )
    // config.plugins.push(
    //   alias({
    //     resolve: ['.jsx', '.js'], //optional, by default this will just look for .js files or folders
    //     entries: [
    //       {
    //         find: 'react',
    //         replacement: path.join(__dirname, '../../node_modules/react'),
    //       },
    //     ],
    //   })
    // )
    // config.plugins.push(
    //   alias({
    //     resolve: ['.jsx', '.js'], //optional, by default this will just look for .js files or folders
    //     entries: [
    //       {
    //         find: 'react-dom',
    //         replacement: path.join(__dirname, '../../node_modules/react-dom'),
    //       },
    //     ],
    //   })
    // )
    // config.external('styled-components')
    // console.log('heeelo')
    // config.external.push('styled-components')
    return config // always return a config.
  },
}
