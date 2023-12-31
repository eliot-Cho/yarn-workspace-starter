import path from 'path';

import type { StorybookConfig } from '@storybook/react-webpack5';
const config: StorybookConfig = {
    stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
    addons: [
        path.dirname(require.resolve(path.join('@storybook/addon-links', 'package.json'))),
        path.dirname(require.resolve(path.join('@storybook/addon-essentials', 'package.json'))),
        path.dirname(require.resolve(path.join('@storybook/addon-interactions', 'package.json'))),
        {
            name: path.dirname(
                require.resolve(path.join('@storybook/addon-styling', 'package.json')),
            ),
            options: {
                postCss: true,
            },
        },
    ],
    framework: {
        name: path.dirname(require.resolve(path.join('@storybook/react-webpack5', 'package.json'))),
        options: {},
    },
    docs: {
        autodocs: 'tag',
    },
};
export default config;
