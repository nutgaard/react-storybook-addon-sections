/* eslint-env browser */
import specificity from 'specificity';

function calculateSpecificity(selector, minThreshold) {
    return !!specificity.calculate(selector)
        .map((r) => parseInt(r.specificity.replace(/,/g, ''), 10))
        .find((r) => r >= minThreshold);
}

export function getCssRulesForElement(element, minThreshold) {
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
        Array.from(rules)
            .filter((rule) => calculateSpecificity(rule.selectorText, minThreshold))
            .forEach((rule) => {
                if (element.matches(rule.selectorText)) {
                    elementrules.push(rule.cssText);
                }
            });
    });

    return elementrules;
}

export function getCssRulesForElementDeep(element, minThreshold) {
    const set = new Set();
    getCssRulesForElement(element, minThreshold)
        .forEach((rule) => set.add(rule));

    Array.from(element.querySelectorAll('*'))
        .map((e) => getCssRulesForElement(e, minThreshold))
        .forEach((rules) => rules.forEach((rule) => set.add(rule)));

    return Array.from(set);
}
