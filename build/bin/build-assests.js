module.exports = function() {
    const Components = require('../../src/components/components.json');
    const path = require('path');
    const render = require('json-templater/string');
    const fs = require('fs');

    const OUTPUT_PATH = path.join(__dirname, '../../src/styles/theme/index.scss');

    const componentsName = Object.keys(Components);

    const MAIN_TEMPATE = `{{list}}`;
    const cssIndexTemplate = [];

    const cssExtentsion = 'scss';


    componentsName.forEach(name => {
        cssIndexTemplate.push(`@import "./${name}";`);
    });

    const cssImportList = cssIndexTemplate.join('\n');

    const template = render(MAIN_TEMPATE, {
        list: cssImportList
    });

    fs.writeFileSync(OUTPUT_PATH, template);

    console.log('index.scss updated!');
}