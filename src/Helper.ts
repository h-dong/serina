import dayjs from 'dayjs';

export default class Helper {
    static parse(text: string, match: string): SerinaSchema {
        const originalText = text;
        const regex = new RegExp(match, 'g');

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
    }

    static trimWhiteSpaces(text: string): string {
        return text.trim();
    }
}
