import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { lightTheme } from './lightTheme';
import { darkTheme } from './darkTheme';

const GistViewer = ({ gistId }) => {
  const [gistContent, setGistContent] = useState(null);
  const [error, setError] = useState(null);
  const [theme, setTheme] = useState(darkTheme); // Default to dark theme
  const [bgColor, setBgColor] = useState('#007bff'); // Initial button background color

  useEffect(() => {
    const fetchGist = async () => {
      try {
        const response = await axios.get(`https://api.github.com/gists/${gistId}`);
        const gistFiles = response.data.files;
        const file = Object.keys(gistFiles)[0]; // Assume we want the first file
        setGistContent(gistFiles[file].content);
      } catch (err) {
        setError('Error fetching Gist');
      }
    };

    fetchGist();
  }, [gistId]);

  const toggleTheme = () => {
    setTheme(theme === darkTheme ? lightTheme : darkTheme);
  };

  const handleMouseEnter = () => {
    setBgColor('#026b5a'); // Change to a new color on hover
  };

  const handleMouseLeave = () => {
    setBgColor('#007bff'); // Revert to original color when not hovering
  };

  if (error) {
    return <div>{error}</div>;
  }

  const divStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '1rem',
    alignItems: 'center',
  };

  return (
    <div>
      <div style={divStyle}>
        <button
          onClick={toggleTheme}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            padding: '0.5rem 1rem',
            borderRadius: '1rem',
            cursor: 'pointer',
            backgroundColor: bgColor,
            color: 'white',
            border: 'none',
          }}
        >
          Change Mode
        </button>

        <a target='_blank' rel='noopener noreferrer' href="https://buymeacoffee.com/sagarsuri">
          <button
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
              padding: '0.5rem 1rem',
              borderRadius: '1rem',
              cursor: 'pointer',
              backgroundColor: bgColor,
              color: 'white',
              border: 'none',
            }}
          >
            Donate
          </button>
        </a>
      </div>

      {gistContent ? (
        <SyntaxHighlighter language="javascript" style={theme}>
          {gistContent}
        </SyntaxHighlighter>
      ) : (
        <div>Loading Gist...</div>
      )}
    </div>
  );
};

export default GistViewer;
