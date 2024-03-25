/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{html,ts,scss}'],
    darkMode: 'class',
    theme: {
        extend: {
            colors: {
                primary: {
                    50: '#fef7ec',
                    100: '#fdf0d9',
                    200: '#fbe8c5',
                    300: '#f9dd9f',
                    400: '#f8d28c',
                    500: '#f6ca79',
                    600: '#f4bb52',
                    700: '#f2ae2e',
                    800: '#e69b0f',
                    900: '#c0810c',
                },
                secondary: {
                    50: '#8ac2e5',
                    100: '#68b1de',
                    200: '#47a0d7',
                    300: '#2c8dc9',
                    400: '#2575a7',
                    500: '#1d5e86',
                    600: '#164664',
                    700: '#0e2d40',
                    800: '#0b2332',
                    900: '#071721',
                },
                tertiary: {
                    50: '#f1f8f9',
                    100: '#d5eaec',
                    200: '#b8dcdf',
                    300: '#9cced3',
                    400: '#80c0c6',
                    500: '#64b2b9',
                    600: '#4ca1a9',
                    700: '#3f858c',
                    800: '#2c5e63',
                    900: '#193638',
                },
                info: {
                    50: '#ecf9fe',
                    100: '#d9f3fc',
                    200: '#b3e8f9',
                    300: '#a0e2f8',
                    400: '#7ad6f5',
                    500: '#56ccf2',
                    600: '#41c5f1',
                    700: '#1bb9ee',
                    800: '#10a0d1',
                    900: '#0d83ab',
                },
                success: {
                    50: '#f1f9f3',
                    100: '#e3f3e6',
                    200: '#d4ecda',
                    300: '#c6e6cd',
                    400: '#aadab4',
                    500: '#8ecd9b',
                    600: '#7cc58c',
                    700: '#63bb76',
                    800: '#4baa5f',
                    900: '#3e8e4f',
                },
                warning: {
                    50: '#fdfaed',
                    100: '#fbf5da',
                    200: '#f9f1c8',
                    300: '#f7ecb6',
                    400: '#f3e291',
                    500: '#efd96c',
                    600: '#ecd351',
                    700: '#e9cb35',
                    800: '#dcbc18',
                    900: '#b89c14',
                },
                error: {
                    50: '#fdecec',
                    100: '#fcd9d9',
                    200: '#fac7c7',
                    300: '#f7a1a1',
                    400: '#f47c7c',
                    500: '#f05656',
                    600: '#ef4444',
                    700: '#eb1e1e',
                    800: '#ce1212',
                    900: '#a90f0f',
                },
            },
        },
    },
    plugins: [require('@tailwindcss/forms')],
};
