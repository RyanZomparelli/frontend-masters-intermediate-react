import { useEffect, useState, useMemo, useCallback } from "react";
import { marked } from "marked";

import MarkdownPreview from "./MarkdownPreview";
import markdownContent from "./markdownContent";

export default function App() {
  const [text, setText] = useState(markdownContent);
  const [time, setTime] = useState(Date.now());
  const [theme, setTheme] = useState("green");

  // Updates time every second, causing App to re-render.
  // Without memoization, MarkdownPreview would also re-render every second,
  // even when the markdown text and theme did not change.
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(Date.now());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Every render creates a new options object and render function reference.
  // Even if their contents/logic are the same, React sees them as new props.

  // useMemo keeps the same options object reference between renders
  // unless text or theme changes. This lets memo() see stable props.
  const options = useMemo(() => ({ text, theme }), [text, theme]);
  // useCallback keeps the same render function reference between renders.
  // Without this, a new function would be created every render and memo()
  // would think MarkdownPreview received new props.
  const render = useCallback((text) => marked.parse(text), []);

  return (
    <div className="app">
      <h1>Performance with React</h1>
      <h2>Current Time: {time}</h2>
      <label htmlFor={"theme"}>
        Choose a theme:
        <select value={theme} onChange={(e) => setTheme(e.target.value)}>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
          <option value="red">Red</option>
          <option value="yellow">Yellow</option>
        </select>
      </label>
      <div className="markdown">
        <textarea
          className="markdown-editor"
          value={text}
          onChange={(e) => setText(e.target.value)}
        ></textarea>
        {/* 
          MarkdownPreview is expensive, so we protect it with:
          - memo() in MarkdownPreview.jsx
          - useMemo() for the options object
          - useCallback() for the render function
          Result: clock updates re-render App, but MarkdownPreview only
          re-renders when text or theme actually changes.
        */}
        <MarkdownPreview options={options} render={render} />
      </div>
    </div>
  );
}

// useMemo vs useCallback
// What's the difference between useCallback and useMemo? Not much. You could actually rewrite our code to look like this and it'd be equivalent.
// render and render2 are functionally equivalent
// const render = useMemo(() => (text) => marked.parse(text), []);
// const render2 = useCallback((text) => marked.parse(text), []);
// Notice there's an extra () => [fn]. useCallback is only a thin wrapper on useMemo that automatically wraps it in the additional function. It's otherwise 100% equivalent.
