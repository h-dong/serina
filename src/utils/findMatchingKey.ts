import contains from './contains';

export default function findMatchingKey(object, pattern): string {
    const keys = Object.keys(object);

    if (keys.length) {
        for (const key of keys) {
            if (contains(object[key], pattern)) return key;
        }
    }

    return null;
}
