/* eslint-env browser */
export function prepMarkdown(str) {
    const lines = str.split('\n');

    // Removing empty lines at start of str
    while (lines[0].trim() === '') {
        lines.shift();
    }

    // Finding det starting padding-level
    let padding = 0;
    const matches = lines[0].match(/^ */);
    if (matches) {
        padding = matches[0].length;
    }

    // Removing starting padding-level from all lines
    return lines.map((s) => s.slice(padding)).join('\n');
}

export function getCssRulesForElement(element) {
    const sheets = document.styleSheets;
    const elementrules = [];

    // eslint-disable-next-line no-param-reassign
    element.matches = element.matches ||
        element.webkitMatchesSelector ||
        element.mozMatchesSelector ||
        element.msMatchesSelector ||
        element.oMatchesSelector;

    Array.from(sheets).forEach((sheet) => {
        const rules = sheet.rules || sheet.cssRules;
        Array.from(rules).forEach((rule) => {
            if (element.matches(rule.selectorText)) {
                elementrules.push(rule.cssText);
            }
        });
    });

    return elementrules;
}

export function getCssRulesForElementDeep(element) {
    const set = new Set();
    getCssRulesForElement(element)
        .forEach((rule) => set.add(rule));

    Array.from(element.querySelectorAll('*'))
        .map(getCssRulesForElement)
        .forEach((rules) => rules.forEach((rule) => set.add(rule)));

    return Array.from(set);
}
