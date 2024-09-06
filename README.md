### GistViewer In React. 

##Install

```bash
  
  npm i vite-gist

```


```Javascript

import React from 'react';
import GistViewer from 'vite-gist';

const App = () => {
  const gistId = 'your-gist-id'; // Replace with your Gist ID

  return (
    <div>
      <h1>My Gist Viewer</h1>
      <GistViewer gistId={gistId} />
    </div>
  );
};

export default App;

```