import React from "react";

function Emoji(props) {
  return (
    <div className="term">
      <dt>
        <span className="emoji" role="img" aria-label="Tense Biceps">
          {props.icon}
        </span>
        <span>{props.title}</span>
      </dt>
      <dd>{props.des}</dd>
    </div>
  );
}

export default Emoji;
