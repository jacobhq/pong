// @ts-expect-error
export const fetcher = (...args) => fetch(...args).then(res => res.json())