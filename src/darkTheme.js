import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const darkTheme = {
  ...prism,
  'code[class*="language-"]': {
    color: '#ffffff',
    background: '#000000',
    fontFamily: 'Consolas, Monaco, monospace',
    fontSize: '1rem',
  },
  'pre[class*="language-"]': {
    background: '#000000',
    padding: '1em',
    borderRadius: '0.5em',
    overflowX: 'auto',
    fontFamily: 'Consolas, Monaco, monospace',
    fontSize: '14px',
  },
  // Add other token styles here
};
