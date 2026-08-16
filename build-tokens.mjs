import StyleDictionary from 'style-dictionary';

const config = {
  source: ['tokens.json', 'tokens.dark.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'dist/tokens/',
      files: [
        { destination: 'nova2-light.css', format: 'css/variables', options: { selector: ':root' } },
        { destination: 'nova2-dark.css', format: 'css/variables', options: { selector: '.dark' } },
      ],
    },
    json: {
      transformGroup: 'js',
      buildPath: 'dist/tokens/',
      files: [
        { destination: 'nova2-light.json', format: 'json/flat' },
        { destination: 'nova2-dark.json', format: 'json/flat' },
      ],
    },
    typescript: {
      transformGroup: 'js',
      buildPath: 'src/tokens/generated/',
      files: [
        { destination: 'nova2-light.ts', format: 'typescript/module-declarations' },
        { destination: 'nova2-dark.ts', format: 'typescript/module-declarations' },
      ],
    },
  },
};

const sd = new StyleDictionary(config);
await sd.buildAllPlatforms();
console.log('✅ Style Dictionary build complete');