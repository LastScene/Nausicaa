const postcss = require('postcss');

const toTitleCase = (str) => {
    return str.replace(/\w\S*/g, function(txt) {
        return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    });
};

const createRule = (selector, atRule) => {
    const rule = postcss.rule({
        selector,
        source: atRule.source
    });
    rule.nodes = (atRule.nodes && atRule.nodes.map((node) => {
        return node.clone({
            parent: rule
        });
    })) || [];
    return rule;
};

const recycleBin = {
    element: [],
    modifier: [],
    is: [],
    when: [],
    whenIs: []
};
const emptyRecycleBin = (type) => {
    recycleBin[type].forEach((rule) => {
        rule.remove();
    });
};

const willInsert = [];
const insertEverything = (root) => {
    Object.values(willInsert).forEach((insertInstruction) => {
        insertInstruction.rules.reverse().forEach((rule) => {
            root.insertAfter(insertInstruction.baseAtRule, rule);
        });
        insertInstruction.baseAtRule.remove();
    });
};

let newBlock = null;
const processBlocks = (container, next) => {
    container.walkAtRules('b', (blockAtRule) => {
        willInsert[`.${blockAtRule.params}`] = {
            baseAtRule: blockAtRule,
            rules: []
        };
        newBlock = createRule(`.${blockAtRule.params}`, blockAtRule);
        willInsert[`.${blockAtRule.params}`].rules.push(newBlock);
        next(newBlock);
    });
};

const processElements = (container, blockName, next) => {
    container.walkAtRules('e', (elementAtRule) => {
        const newElement = createRule(`${container.selector}__${elementAtRule.params}`, elementAtRule);
        willInsert[blockName].rules.push(newElement);
        recycleBin.element.push(elementAtRule);
        next(newElement);
    });
    emptyRecycleBin('element');
};

const processModifier = (container, blockName) => {
    container.walkAtRules('m', (modifierAtRule) => {
        const newModifier = createRule(`${container.selector}--${modifierAtRule.params}`, modifierAtRule);
        willInsert[blockName].rules.push(newModifier);
        recycleBin.modifier.push(modifierAtRule);
    });
    emptyRecycleBin('modifier');
};

const processIs = (container, blockName) => {
    container.walkAtRules('is', (isAtRule) => {
        if (isAtRule.parent.name !== 'when') {
            const newModifier = createRule(`${container.selector}--is${toTitleCase(isAtRule.params)}`, isAtRule);
            willInsert[blockName].rules.push(newModifier);
            recycleBin.is.push(isAtRule);
        }
    });
    emptyRecycleBin('is');
};

const processWhen = (container, blockName, cb) => {
    container.walkAtRules('when', (whenAtRule) => {
        const newWhen = createRule(`[class*='${container.selector.substring(1)}--${whenAtRule.params}']`, whenAtRule);
        willInsert[blockName].rules.push(newWhen);
        newWhen.walkAtRules('is', (isAtRule) => {
            const newIs = createRule(`${newWhen.selector.slice(0, -2)}:${isAtRule.params}']`, isAtRule);
            willInsert[blockName].rules.push(newIs);
            recycleBin.whenIs.push(isAtRule);
        });
        emptyRecycleBin('whenIs');
        recycleBin.when.push(whenAtRule);
    });
    emptyRecycleBin('when');
};

const process = (root) => {
    processBlocks(root, (processedBlock) => {
        processElements(processedBlock, processedBlock.selector, (processedElement) => {
            processModifier(processedElement, processedBlock.selector);
            processIs(processedElement, processedBlock.selector);
            processWhen(processedElement, processedBlock.selector);
        });
        processModifier(processedBlock, processedBlock.selector);
        processIs(processedBlock, processedBlock.selector);
        processWhen(processedBlock, processedBlock.selector);
        insertEverything(root);
    });
};

module.exports = postcss.plugin('postcss-bem', (options = {}) => {
    return (root) => {
        process(root);
    };
});
