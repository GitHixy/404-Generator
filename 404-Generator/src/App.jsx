import { useState, useRef, useEffect } from 'react';
import './App.css';
import { default404Data } from './models/404Model';
import { generate404Html } from './controllers/404Controller';
import Page404Preview from './views/Page404Preview';

const EMOJI_LIST = [
  '😵', '😱', '🚫', '🧑‍🎨', '🦄', '🤖', '👾', '🌈', '🔥', '💥', '😬', '😢', '🙈', '🧩', '🎨', '🦉', '🦋', '🌌', '🛸', '🧙‍♂️', '🧸', '🦕', '🦖', '🦜', '🦩', '🦚', '🦄', '🦔', '🦦', '🦥', '🦨', '🦡', '🦫', '🦦', '🦭', '🦈', '🦑', '🦐', '🦞', '🦀', '🦋', '🦗', '🦟', '🦠', '🧬', '🧫', '🧪', '🧲', '🧯', '🧰', '🧱', '🧲', '🧪', '🧫', '🧬', '🦠', '🦟', '🦗', '🦋', '🦀', '🦞', '🦐', '🦑', '🦈', '🦭', '🦦', '🦫', '🦡', '🦨', '🦥', '🦦', '🦔', '🦄', '🦚', '🦩', '🦜', '🦖', '🦕', '🧸', '🧙‍♂️', '🛸', '🌌', '🎨', '🧩', '🙈', '😢', '😬', '💥', '🔥', '🌈', '👾', '🤖', '🦄', '🧑‍🎨', '🚫', '😱', '😵'
];

function App() {
  const [data, setData] = useState(default404Data);
  const [downloadUrl, setDownloadUrl] = useState(null);
  const [showEmojiMenu, setShowEmojiMenu] = useState(false);
  const emojiMenuRef = useRef(null);
  const emojiBtnRef = useRef(null);
  const colorRefs = {
    background: useRef(null),
    text: useRef(null),
    accent: useRef(null)
  };

  // Close emoji menu on outside click
  useEffect(() => {
    if (!showEmojiMenu) return;
    function handleModalClick(e) {
      if (
        emojiMenuRef.current &&
        !emojiMenuRef.current.contains(e.target) &&
        emojiBtnRef.current &&
        !emojiBtnRef.current.contains(e.target)
      ) {
        setShowEmojiMenu(false);
      }
    }
    document.addEventListener('mousedown', handleModalClick);
    return () => document.removeEventListener('mousedown', handleModalClick);
  }, [showEmojiMenu]);

  // Handle input changes
  function handleChange(e) {
    const { name, value } = e.target;
    if (name.startsWith('color-')) {
      setData(prev => ({
        ...prev,
        colors: { ...prev.colors, [name.replace('color-', '')]: value }
      }));
    } else {
      setData(prev => ({ ...prev, [name]: value }));
    }
  }

  // Generate and download HTML file
  function handleDownload() {
    const html = generate404Html(data);
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    setDownloadUrl(url);
    setTimeout(() => URL.revokeObjectURL(url), 10000);
  }

  function handleEmojiSelect(emoji) {
    setData(prev => ({ ...prev, emoji }));
    setShowEmojiMenu(false);
  }

  // Prevent label click from triggering color input except on input itself
  function stopLabelMouseDown(e) {
    if (e.target.tagName !== 'INPUT') {
      e.preventDefault();
    }
  }

  return (
    <div className="app-container">
      <h1 className="app-title">404 Page Generator</h1>
      <div className="app-subtitle">
        by <a href="https://github.com/GitHixy" target="_blank" rel="noopener noreferrer">GitHixy</a>
      </div>
      <form className="generator-form" onSubmit={e => e.preventDefault()}>
        <div className="input-row">
          <div className="input-label">
            <span>Emoji</span>
            <button
              type="button"
              className="emoji-trigger"
              ref={emojiBtnRef}
              onClick={() => setShowEmojiMenu(v => !v)}
            >
              {data.emoji}
            </button>
          </div>
        </div>
        <div className="input-row">
          <div className="input-label">
            <span>Message</span>
            <input name="message" value={data.message} onChange={handleChange} className="input-message" />
          </div>
        </div>
        <div className="input-row color-row">
          <div className="input-label color-label">
            <span>Background</span>
            <input
              id="color-background"
              type="color"
              name="color-background"
              value={data.colors.background}
              onChange={handleChange}
              className="input-color"
              ref={colorRefs.background}
            />
          </div>
          <div className="input-label color-label">
            <span>Text</span>
            <input
              id="color-text"
              type="color"
              name="color-text"
              value={data.colors.text}
              onChange={handleChange}
              className="input-color"
              ref={colorRefs.text}
            />
          </div>
          <div className="input-label color-label">
            <span>Accent</span>
            <input
              id="color-accent"
              type="color"
              name="color-accent"
              value={data.colors.accent}
              onChange={handleChange}
              className="input-color"
              ref={colorRefs.accent}
            />
          </div>
        </div>
        <button type="button" className="download-btn" onClick={handleDownload}>
          Generate & Download
        </button>
        {downloadUrl && (
          <a href={downloadUrl} download="404.html" className="download-link">
            Click here if download does not start
          </a>
        )}
      </form>
      {/* Emoji Picker Modal */}
      {showEmojiMenu && (
        <div className="emoji-modal-overlay">
          <div className="emoji-modal" ref={emojiMenuRef}>
            <button className="emoji-modal-close" onClick={() => setShowEmojiMenu(false)}>&times;</button>
            <div className="emoji-modal-title">Choose an emoji</div>
            <div className="emoji-menu-modal-grid">
              {EMOJI_LIST.map((emoji, i) => (
                <button key={i} type="button" className="emoji-btn" onClick={() => handleEmojiSelect(emoji)}>
                  {emoji}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
      <h2 className="preview-title">Live Preview</h2>
      <div className="preview-container">
        <Page404Preview data={data} />
      </div>
    </div>
  );
}

export default App;
