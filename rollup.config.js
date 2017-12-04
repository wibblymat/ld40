import babili from 'rollup-plugin-babili';
import typescript from 'rollup-plugin-typescript';
import ts from 'typescript';

function glsl() {
  return {
    transform(code, id) {
      if (!/\.glsl$/.test(id)) {
        return;
      }

      const transformedCode = 'export default ' + JSON.stringify(
        code
          .replace( /[ \t]*\/\/.*\n/g, '' )
          .replace( /[ \t]*\/\*[\s\S]*?\*\//g, '' )
          .replace( /\n{2,}/g, '\n' )
      ) + ';';
      return {
        code: transformedCode,
        map: {mappings: ''},
      };
    },
  };
}

function text() {
  return {
    transform(code, id) {
      if (/\.txt$/.test(id)) {
        // TODO: Might want to do a replace on ` so that I can use them in text
        // files
        return {
          code: 'export default `' + code + '`;',
          map: {mappings: ''},
        };
      }
    },
  };
}

function buildInfo() {
  return {
    load(id) {
      if (id === 'build-info') {
        return `export const buildTime = ${Date.now()};`;
      }
    },
    resolveId(id) {
      if (id === 'build-info') {
        return 'build-info';
      }
    }
  }
}

export default {
  entry: 'src/index.ts',
  format: 'cjs',
  plugins: [
    typescript({
      typescript: ts,
    }),
    glsl(),
    text(),
    babili({
      comments: false,
    }),
    buildInfo(),
  ],
  dest: 'public/app.min.js',
  sourceMap: true,
};
