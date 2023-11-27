module.exports = api => {
  api.cache(true)

  return {
    presets: [
      'module:metro-react-native-babel-preset',
      'module:react-native-dotenv',
    ],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            Assets: './src/Assets',
            Components: './src/Components',
            Config: './src/Config',
            Constants: './src/Constants',
            Helpers: './src/Helpers',
            Images: './src/Images',
            Navigation: './src/Navigation',
            Redux: './src/Redux',
            Themes: './src/Themes',
            I18N: './src/I18N',
            Services: './src/Services',
          },
          extensions: ['.ios.js', '.android.js', '.js', '.json'],
        },
      ],
    ],
  }
}
