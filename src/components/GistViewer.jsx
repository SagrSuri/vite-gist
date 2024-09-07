import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import lightSyntax from 'react-syntax-highlighter/dist/esm/styles/prism/prism';
import darkSyntax from 'react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus';
import { MdDarkMode, MdLightMode, MdOutlineTextDecrease, MdOutlineTextIncrease } from "react-icons/md";

const GistViewer = ({
  gistId,
  buttonClassName = '',
  donateButtonClassName = '',
  containerClassName = '',
  themeStyle = lightSyntax, // Default to light theme
  showLineNumbers = true, // Enable line numbers
  fontSize = '1rem', // Default font size
  codeBackgroundColor = '#f5f5f5' // Default background color for code blocks
}) => {
  const [gistContent, setGistContent] = useState(null);
  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentFontSize, setCurrentFontSize] = useState(fontSize);

  useEffect(() => {
    const fetchGist = async () => {
      try {
        const response = await axios.get(`https://api.github.com/gists/${gistId}`);
        const gistFiles = response.data.files;
        const file = Object.keys(gistFiles)[0];
        setGistContent(gistFiles[file].content);
      } catch (err) {
        setError('Error fetching Gist');
      }
    };

    fetchGist();
  }, [gistId]);

  // Toggle dark mode based on user preference or system setting
  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  // Handle font size increase
  const increaseFontSize = () => {
    setCurrentFontSize(prevSize => {
      const newSize = parseFloat(prevSize) + 0.1;
      return `${newSize}rem`;
    });
  };

  // Handle font size decrease
  const decreaseFontSize = () => {
    setCurrentFontSize(prevSize => {
      const newSize = parseFloat(prevSize) - 0.1;
      return `${newSize}rem`;
    });
  };

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className={`flex flex-col gap-2 p-2 rounded-sm ${containerClassName}`}>
     

      {/* Font Size Adjustment Buttons */}
      <div className="m-1 flex justify-between px-5 gap-2">
        <div className="flex justify-center gap-3">
          <button
            onClick={decreaseFontSize}
            className={`${buttonClassName}`}
          >
            <MdOutlineTextDecrease className='text-3xl' />
          </button>

          <button
            onClick={increaseFontSize}
            className={`${buttonClassName}`}
          >
            <MdOutlineTextIncrease className='text-3xl' />
          </button>
        </div>
        
         {/* Toggle Dark Mode Button */}
      <button
        onClick={() => setIsDarkMode(prevMode => !prevMode)}
        className={`${buttonClassName}`}
      >
        {isDarkMode ? <MdLightMode className='text-3xl' /> : <MdDarkMode className='text-3xl text-black'/>}
      </button>
      </div>

      {/* Display Gist Content */}
      {gistContent ? (
        <SyntaxHighlighter
          language="javascript"
          style={isDarkMode ? darkSyntax : lightSyntax}
          showLineNumbers={showLineNumbers} // Enable line numbers
          customStyle={{
            fontSize: currentFontSize, // Apply dynamic font size
            backgroundColor: codeBackgroundColor // Apply background color
          }}
          className="p-4 rounded-md"
        >
          {gistContent}
        </SyntaxHighlighter>
      ) : (
        <div>Loading Gist...</div>
      )}

      {/* Donate Button */}
      <div className="flex justify-center">
        <a target='_blank' rel='noopener noreferrer' href="https://buymeacoffee.com/sagarsuri">
          <button
            className={`py-2 px-4 bg-green-400 dark:to-blue-600 rounded-md cursor-pointer transition-colors duration-300 font-serif `} /*{${donateButtonClassName}} */
          >
          Buy me a coffee
          </button>
        </a>
      </div>
    </div>
  );
};

export default GistViewer;
