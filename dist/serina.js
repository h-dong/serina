(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('dayjs')) :
	typeof define === 'function' && define.amd ? define(['dayjs'], factory) :
	(global.Serina = factory(global.dayjs));
}(this, (function (dayjs) { 'use strict';

dayjs = dayjs && dayjs.hasOwnProperty('default') ? dayjs['default'] : dayjs;

var Helper = (function () {
    function Helper() {
    }
    Helper.parse = function (text, match) {
        var originalText = text;
        var regex = new RegExp(match, 'g');
        if (originalText.match(regex)) {
            return {
                original: text,
                text: text.replace(match, ''),
                isValid: true,
                dateTime: dayjs().toDate()
            };
        }
        return {
            original: text,
            text: '',
            isValid: false,
            dateTime: null
        };
    };
    Helper.trimWhiteSpaces = function (text) {
        return text.trim();
    };
    return Helper;
}());

var serina = function (text) {
    var parsedData = {
        original: text,
        text: '',
        isValid: false,
        dateTime: null
    };
    parsedData = Helper.parse(text, 'tomorrow');
    parsedData.text = Helper.trimWhiteSpaces(parsedData.text);
    return parsedData;
};

return serina;

})));
