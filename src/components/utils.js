/* eslint-env browser */
import specificity from 'specificity';

export const clsBase = 'storybook-addons-sections';

export function classNames(...cls) {
    return cls
        .filter((cl) => cl && cl.length > 0)
        .map((cl) => `${clsBase}__${cl}`).join(' ');
}

function groupBy(key, defaultKeyvalue) {
    return (acc, el) => {
        const groupKey = el[key] || defaultKeyvalue;
        const group = acc[groupKey] || [];
        group.push(el);
        acc[groupKey] = group;
        return acc;
    };
}

function calculateSpecificity(minThreshold) {
    return (rule) => {
        const selector = rule.rule.selectorText;
        return selector && !!specificity.calculate(selector)
                .map((r) => parseInt(r.specificity.replace(/,/g, ''), 10))
                .find((r) => r >= minThreshold);
    };
}

function inversionOfCSSRules(rule, extraProps) {
    if (rule.type === CSSRule.STYLE_RULE) {
        return [{ rule, ...extraProps }];
    } else {
        return Array.from(rule.cssRules)
            .map((childRule) => inversionOfCSSRules(childRule, { media: rule.conditionText, parentRule: rule }))
            .reduce((accRules, rules) => [...accRules, ...rules], []);
    }
}

function getRules() {
    return Array.from(document.styleSheets)
        .map((sheet) => Array.from(sheet.rules || sheet.cssRules))
        .reduce((accRules, rules) => [...accRules, ...rules], [])
        .filter((rule) => rule.type === CSSRule.STYLE_RULE || rule.type === CSSRule.MEDIA_RULE)
        .map(inversionOfCSSRules)
        .reduce((accRules, rules) => [...accRules, ...rules], []);
}


function matches(elements) {
    const body = document.body;
    const matches = body.matches ||
        body.webkitMatchesSelector ||
        body.mozMatchesSelector ||
        body.msMatchesSelector ||
        body.oMatchesSelector;


    return (rule) => elements.find((element) => matches.call(element, rule.rule.selectorText));
    //return (rule) => elements.find((element) => element.matches(rule.rule.selectorText));
}

export function getCssRulesForElementDeep(element, minThreshold) {
    console.group('css');
    console.time('whole');
    const set = new Set();
    console.time('elements');
    const elements = [element, ...Array.from(element.querySelectorAll('*'))];
    console.timeEnd('elements');
    console.time('rules');
    const cssRules = getRules()
        .filter(calculateSpecificity(minThreshold))
        .filter(matches(elements))
        .reduce(groupBy('media', 'global'), {});
    console.timeEnd('rules');

    const { global, ...mediaQueries } = cssRules;


    global.forEach((ruleDesc) => {
        set.add(ruleDesc.rule.cssText);
    });
    Object.entries(mediaQueries).forEach(([mediaQuery, rules]) => {
        set.add(`@media ${mediaQuery} { ${rules.map((ruleDesc) => ruleDesc.rule.cssText).join('') } }`);
    });
    console.timeEnd('whole');
    console.groupEnd('css');
    return Array.from(set);
}
