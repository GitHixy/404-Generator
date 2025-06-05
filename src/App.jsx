import React, { useRef, useState } from 'react';

const EMOJI_LIST = ['😀', '😂', '😍', '😎', '😢', '😡'];

export default function EmojiPicker() {
  const [showEmojiMenu, setShowEmojiMenu] = useState(false);
  const [data, setData] = useState({ emoji: '😀' });
  const emojiBtnRef = useRef(null);
  const emojiMenuRef = useRef(null);

  const handleEmojiSelect = (emoji) => {
    setData({ emoji });
    setShowEmojiMenu(false);
  };

  return (
    <div className="input-label" style={{ position: 'relative', zIndex: 20 }}>
      <span>Emoji</span>
      <button
        type="button"
        className="emoji-trigger"
        ref={emojiBtnRef}
        onClick={e => {
          e.stopPropagation();
          setShowEmojiMenu(v => !v);
        }}
      >
        {data.emoji}
      </button>
      {showEmojiMenu && (
        <div className="emoji-menu" ref={emojiMenuRef} style={{ zIndex: 30 }}>
          {EMOJI_LIST.map((emoji, i) => (
            <button
              key={i}
              type="button"
              className="emoji-btn"
              tabIndex={0}
              onClick={e => {
                e.stopPropagation();
                handleEmojiSelect(emoji);
              }}
            >
              {emoji}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}