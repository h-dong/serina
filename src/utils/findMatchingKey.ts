import contains from './contains';

export default function findMatchingKey(object, pattern): string {
    const keys = Object.keys(object);

    if (keys.length) {
        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            if (contains(object[key], pattern)) return key;
        }
    }

    return null;
}
