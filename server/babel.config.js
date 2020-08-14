module.exports = {
  plugins: ['babel-plugin-root-import'],
  presets: [
    '@babel/preset-env',
    {
      targets: {
        esmodules: true,
      },
    },
  ],
};
