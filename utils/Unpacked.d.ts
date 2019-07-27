
/** Fetches array type or promise type or return type.  Example from TS doc */
export type Unpacked<T> =
    T extends (infer U)[] ? U :
    T extends (...args: any[]) => infer U ? U :
    T extends Promise<infer U> ? U :
	T;
