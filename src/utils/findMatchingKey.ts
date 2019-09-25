import { contains } from './index';

export default function findMatchingKey(object, pattern): string {
    const keys = Object.keys(object);
    for (const key of keys) {
        if (contains(pattern, object[key])) {
            return key;
        }
    }
    return null;
}
