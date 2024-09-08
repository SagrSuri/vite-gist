import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import lightSyntax from 'react-syntax-highlighter/dist/esm/styles/prism/prism';
import darkSyntax from 'react-syntax-highlighter/dist/esm/styles/prism/vsc-dark-plus';
import { MdDarkMode, MdLightMode, MdOutlineTextDecrease, MdOutlineTextIncrease } from "react-icons/md";

const GistViewer = ({
  gistId,
  buttonClassName = '', // Class for buttons
  donateButtonClassName = '', // Class for donate button
  containerClassName = '', // Class for the container
  fontSizeButtonContainerClassName = '', // Class for font size buttons container
  toggleButtonClassName = '', // Class for dark mode toggle button
  loaderClassName = '', // Class for loading state
  codeContainerClassName = '', // Class for the code block container
  themeStyle = lightSyntax, // Default to light theme
  showLineNumbers, // Controlled by user, no default
  fontSize, // Controlled by user, no default
  codeBackgroundColor, // Controlled by user, no default
}) => {
  const [gistContent, setGistContent] = useState(null);
  const [error, setError] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [currentFontSize, setCurrentFontSize] = useState(fontSize || '1rem');

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

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDarkMode);
  }, [isDarkMode]);

  const increaseFontSize = () => {
    setCurrentFontSize(prevSize => {
      const newSize = parseFloat(prevSize) + 0.1;
      return `${newSize}rem`;
    });
  };

  const decreaseFontSize = () => {
    setCurrentFontSize(prevSize => {
      const newSize = parseFloat(prevSize) - 0.1;
      return `${newSize}rem`;
    });
  };

  if (error) {
    return <div>{error}</div>;
  }

// ******************* THIS IS FOR DONATE BUTTON**************//
  const [isHovered, setIsHovered] = useState(false);
  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
 const styleDonatebtn={
    // backgroundColor: 'lightblue',
    color: 'darkblue',
    display: 'flex',
    justifyContent: 'center',
    margin: '2px auto',
    width: '100%',
    padding: '5px 1rem',
    borderRadius: '5px',
    fontSize: '1rem',
  }

  const styleAncor={
    backgroundColor: isHovered ? '#2af58f' : '#5bf5e5',
    textAlign: 'center', display: 'block', width: '10rem' ,
    transition: 'background-color 0.3s ease',
    padding: '5px 10px' , borderRadius: '2rem'
  }
// ********************************** //


  return (
    <div className={containerClassName}>
      {/* Font Size Adjustment Buttons */}
      <div className={fontSizeButtonContainerClassName}>
        <div>
          <button onClick={decreaseFontSize} className={buttonClassName}>
            <MdOutlineTextDecrease />
          </button>
          <button onClick={increaseFontSize} className={buttonClassName}>
            <MdOutlineTextIncrease />
          </button>
        </div>

        {/* Toggle Dark Mode Button */}
        <button
          onClick={() => setIsDarkMode(prevMode => !prevMode)}
          className={toggleButtonClassName}
        >
          {isDarkMode ? <MdLightMode /> : <MdDarkMode />}
        </button>
      </div>

      {/* Display Gist Content */}
      {gistContent ? (
        <SyntaxHighlighter
          language="javascript"
          style={isDarkMode ? darkSyntax : lightSyntax}
          showLineNumbers={showLineNumbers} // Controlled by user
          customStyle={{
            fontSize: currentFontSize, // Controlled by user
            backgroundColor: codeBackgroundColor, // Controlled by user
          }}
          className={codeContainerClassName}
        >
          {gistContent}
        </SyntaxHighlighter>
      ) : (
        <div className={loaderClassName}>Loading Gist...</div>
      )}

      {/* Donate Button */}
      <div  style={styleDonatebtn}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave} >
        <a target='_blank' style={styleAncor} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} rel='noopener noreferrer' href="https://buymeacoffee.com/sagarsuri">
          <button style={{ textAlign: 'center' }} >
            Please Donate {/* className={donateButtonClassName} */}
          </button>
        </a>
      </div>
    </div>
  );
};

export default GistViewer;
