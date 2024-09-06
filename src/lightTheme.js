import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';

export const lightTheme = {
  ...prism,
  'code[class*="language-"]': {
    color: '#333',
    background: '#f5f5f5',
    fontFamily: 'Consolas, Monaco, monospace',
    fontSize: '14px',
  },
  'pre[class*="language-"]': {
    background: '#f5f5f5',
    padding: '1em',
    borderRadius: '0.5em',
    overflowX: 'auto',
    fontFamily: 'Consolas, Monaco, monospace',
    fontSize: '14px',
  },
  // Add other token styles here
};
