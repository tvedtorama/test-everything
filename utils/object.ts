
export const fromPairs = (arr: {reduce: (a, b) => {[index: string]: any}}) => arr.reduce((acc, val) => (acc[val[0]] = val[1], acc), {})

export const omit = <T, Y extends keyof T>(item: T, elms: Y[]): Omit<T, Y> => elms.reduce((x, y) => (({[y]: _d, ...rest}) => rest)(x), item) // <Omit<T, Y>>fromPairs(toPairs(item).filter(([key]) => elms.indexOf(<Y>key) === -1))

export const pick = <T extends object, U extends keyof T>(item: T, paths: Array<U>): Pick<T, U> => paths.filter(p => p in item).reduce((x, y) => ({...x, [y]: item[y]}), {}) as Pick<T, U>