import React, { useState, useEffect } from 'react';
import GistViewer from './components/GistViewer';

// Import syntax highlighter styles
import lightSyntax from 'react-syntax-highlighter/dist/esm/styles/prism/prism';
import darkSyntax from 'react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus';

const App = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [fontSize, setFontSize] = useState('1rem'); // State for font size

  // Toggle dark mode by adding/removing 'dark' class from document's root (html element)
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Handle font size change
  const handleFontSizeChange = (event) => {
    setFontSize(event.target.value);
  };

  return (
    <div className={`p-4 ${isDarkMode ? 'dark' : ''}`}>
      {/* Toggle button */}
      <button
        onClick={toggleDarkMode}
        className={`py-2 px-4 mb-4 rounded-md ${
          isDarkMode ? 'bg-gray-800 text-white' : 'bg-gray-200 text-black'
        }`}
      >
        Toggle {isDarkMode ? 'Light' : 'Dark'} Mode
      </button>

      {/* Font size selector */}
      <div className="mb-4">
        <label className="mr-2">Font Size:</label>
        <select value={fontSize} onChange={handleFontSizeChange} className="p-2 border rounded-md">
          <option value="0.5rem">Small</option>
          <option value="1rem">Normal</option>
          <option value="1.5rem">Large</option>
        </select>
      </div>

      {/* GistViewer Component */}
      <GistViewer 
        gistId="ca470df8811bcb90a37ab2233861bb04"
        containerClassName="bg-white dark:bg-black" // Light: white background, Dark: black background
        buttonClassName="dark:text-white" // Light: blue button, Dark: darker blue button
        // donateButtonClassName="bg-green-500 dark:bg-green-700 text-white" // Light: green button, Dark: darker green button
        themeStyle={isDarkMode ? darkSyntax : lightSyntax} // Switch syntax highlighting theme based on dark mode
        fontSize={fontSize} // Pass font size
        codeBackgroundColor={isDarkMode ? '#1e1e1e' : '#f5f5f5'} // Background color for code blocks
      />
    </div>
  );
};

export default App;
