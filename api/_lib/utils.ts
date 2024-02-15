export function firstValue(query: string | string[] | undefined): string | undefined {
    return Array.isArray(query) ? query[0] : query
}

export function _throw(error: any): never {
    throw error
}

export async function run<T>(fn: () => T): Promise<T> {
    return fn()
}
