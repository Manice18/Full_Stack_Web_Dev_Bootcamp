import React from "react";
import emojipedia from "../emojipedia";
import Emoji from "./Emoji";

function createBlock(block) {
  return (
    <Emoji
      key={block.key}
      icon={block.emoji}
      title={block.name}
      des={block.meaning}
    />
  );
}

function App() {
  return (
    <div>
      <h1>
        <span>emojipedia</span>
      </h1>

      <dl className="dictionary">{emojipedia.map(createBlock)}</dl>
    </div>
  );
}

export default App;
