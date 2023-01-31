import { contains } from 'lib/string/stringUtil';

export default function findMatchingKey(object: Record<string, string>, pattern: string): string {
    const keys = Object.keys(object);

    if (keys.length) {
        for (const key of keys) {
            if (contains(object[key], pattern)) return key;
        }
    }

    return null;
}
