'use strict';

console.log();
process.on('exit', () => {
    console.log();
});

if (!process.argv[2]) {
    console.error('[component name] is null.');
    process.exit(1);
}

const path = require('path');
const fileSave = require('file-save');
const uppercamelcase = require('uppercamelcase');
const componentname = process.argv[2];
// const chineseName = process.argv[3] || componentname;
const ComponentName = uppercamelcase(componentname);
const ComponentPath = path.resolve(__dirname, '../../src/components', componentname);

const newcss = require('./build-assests');

const Files = [{
        filename: 'index.js',
        content: `import Zk${ComponentName} from './src/main';

/* istanbul ignore next */
Zk${ComponentName}.install = function (Vue) {
  Vue.component(Zk${ComponentName}.name, Zk${ComponentName});
};

export default Zk${ComponentName};`
    },
    {
        filename: 'src/main.vue',
        content: `<template>
  <div class="zk-${componentname}"></div>
</template>

<script>
export default {
  name: 'zk-${componentname}'
};
</script>`
    },
    {
        filename: path.join('../../../test/unit/specs', `${componentname}.spec.js`),
        content: `import { createTest, destroyVM } from '../util';
import ${ComponentName} from '@/components/${componentname}';

describe('${ComponentName}', () => {
  let vm;
  afterEach(() => {
    destroyVM(vm);
  });

  it('create', () => {
    vm = createTest(${ComponentName}, true);
    expect(vm.$el).to.exist;
  });
});
`
    },
    {
        filename: path.join('../../../src/styles/theme/', `${componentname}.scss`),
        content: `@import "../variables";

.zk-${componentname} {

}`
    }
];

// 添加到 components.json
const componentsFile = require('../../src/components/components.json');
if (componentsFile[componentname]) {
    console.error(`${componentname} already exsist.`);
    process.exit(1);
}
componentsFile[componentname] = `../${componentname}/index.js`;
fileSave(path.join(__dirname, '../../src/components/components.json'))
    .write(JSON.stringify(componentsFile, null, '  '), 'utf8')
    .end('\n');

// 创建 Component
Files.forEach(file => {
    fileSave(path.join(ComponentPath, file.filename))
        .write(file.content, 'utf8')
        .end('\n');
});

newcss();

console.log('DONE!');