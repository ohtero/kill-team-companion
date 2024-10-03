import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  ...tseslint.configs.stylisticTypeChecked,
  prettierConfig,
  // eslintPluginReact.configs.recommended,
  // eslintPluginNode.lib.configs.recommended,

  {
    languageOptions: {
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname
      }
    },
    overrides: [
      {
        files: ['./backend/tests/**/*'],
        env: {
          jest: true
        }
      }
    ]
  }
);
