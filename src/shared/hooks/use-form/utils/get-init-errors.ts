export const getInitErrors: <V extends { [K in keyof V]: V[K] }>(x: V) => {
  [K in keyof typeof x]: string
} = (initValues) => Object
  .keys(initValues)
  .reduce((acc, key) => ({ ...acc, [key]: '' }), <typeof initValues>{})
