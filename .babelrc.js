module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    [
      '@babel/plugin-transform-runtime',
      {
        regenerator: true,
      },
    ],
    ['styled-components', { displayName: true, preprocess: false }],
    ['inline-react-svg', { ignorePattern: /^((?![.]inline[.]svg).)*$/ }],
  ],
};
