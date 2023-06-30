export const copyObj = (origin: Record<string, any>) => {
    const obj = {} as Record<keyof typeof origin, unknown>;

    for (const key in origin) {
        if (typeof origin[key] === 'object' && typeof origin[key] !== null) {
            obj[key] = copyObj(origin[key]);
        } else {
            obj[key] = origin[key];
        }
    }

    return obj;
};
