### Github Gist Viewing Package.

## Install

```bash
  
  npm i vite-gist

```

```Javascript

import React from 'react';
import GistViewer from 'vite-gist';

const App = () => (
  <GistViewer 
    gistId="your-gist-id"
    containerClassName="bg-white dark:bg-black"
    buttonClassName="bg-blue-500 dark:bg-blue-700 text-white"
    themeStyle="light-theme" // Replace with actual theme style
    fontSize="1rem"
    codeBackgroundColor="#f5f5f5"
  />
);

```

```bash
  npm i vite-gist@latest
```

```bash

  npm i vite-gist@1.4.0

```


```javascript
  1. You Must Be Apply in Your React Project tailwindcss then can you also handle the design
  2. Install react-icons
  2 Install react-syntax-highlighter
```

```javascript
 /* You Need TO Install Use Tailwind Css in your project then will work properly design */
```

```javascript
1.1. Install vite-gist
They can install your package via npm or yarn:

npm install vite-gist

1.2. Install Peer Dependencies
Your package depends on react, react-dom, axios, and react-syntax-highlighter. Users need to ensure these are installed. These are usually added to their package.json automatically when installing vite-gist, but they might want to check:

npm install react react-dom axios react-syntax-highlighter


2.1. Import the Component
They should import the GistViewer component from the vite-gist package in their React component file:

import React from 'react';
import { GistViewer } from 'vite-gist';


2.2. Use the Component
They can use the GistViewer component to display a GitHub Gist. Here's an example of how to do this:

import React from 'react';
import { GistViewer } from 'vite-gist';

const App = () => {
  return (
    <div>
      <h1>My Gist Viewer</h1>
      <GistViewer
        gistId='ca470df8811bcb90a37ab2233861bb04' // Replace with a real Gist ID
        containerClassName="bg-white dark:bg-black"
        buttonClassName="bg-blue-500 dark:bg-blue-700 text-white"
        themeStyle="light-theme" // Replace with an actual theme style if needed
        fontSize="1rem"
        codeBackgroundColor="#f5f5f5"
      />
    </div>
  );
};

export default App;

Users need to install Tailwind CSS and its dependencies for our react project:

```