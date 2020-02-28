const theme =  {
    breakpoints: ['40em', '52em', '64em'],
    fontSizes: [
        12, 14, 16, 20, 24, 32, 48, 64,
    ],
    palette: {

    },
    colors: {
        background: '#212121',
        level1: '#303030',
        level2: '#424242',
        blue: '#07c',
        lightgray: '#f6f6ff',
        primary: 'white',
        text: 'white',
        secondaryText: '#FFFFFF70',
        primaryAccent: '#BB86FC',
        secondaryAccent: '#03DAC5',
    },
    space: [
        0, 4, 8, 16, 32, 64, 128, 256,
    ],
    fonts: {
        sans: 'Montserrat',
        heading: 'Montserrat, ',
        monospace: 'Montserrat, ',
    },
    fontWeights: {
        body: 400,
        heading: 700,
        bold: 700,
    },
    lineHeights: {
        body: 1.5,
        heading: 1.25,
    },
    shadows: {
        small: '0 0 4px rgba(0, 0, 0, .125)',
        large: '0 0 24px rgba(0, 0, 0, .125)',
    },
    variants: {},
    link: {
        color: 'primary',
        textDecoration: 'none',

    },
    nav: {
        color: 'primary',
        textDecoration: 'none',
        fontVariant: 'small-caps',
        marginLeft: '0.2em',
    },
    h3: {
        color: 'white',
    },
    text: {
        color: 'white',
        h3: 'white',
    },
    buttons: {
        primary: {
            color: 'primary',
            bg: 'secondaryAccent',
        },
    },
};

export const mq = [576, 768, 992, 1200].map(
    (bp) => `@media (max-width: ${bp}px)`,
  );

export type Theme = typeof theme;

export default theme;
