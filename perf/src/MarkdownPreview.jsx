import { memo } from "react";
const JANK_DELAY = 300;

// memo tells React: if this component's props are the same as last render,
// skip re-rendering it even if the parent component re-renders.
export default memo(function MarkdownPreview({ render, options }) {
  const expensiveRender = () => {
    // performance is a browser API.
    const start = performance.now();
    // Artificially blocks the main thread to simulate an expensive render.
    // This makes unnecessary re-renders easy to feel and measure.
    while (performance.now() - start < JANK_DELAY) {}
    return null;
  };

  return (
    <div>
      {/* This timestamp makes each MarkdownPreview re-render visible. */}
      <h1>Last Render: {Date.now()}</h1>
      <div
        className="markdown-preview"
        dangerouslySetInnerHTML={{ __html: render(options.text) }}
        style={{ color: options.theme }}
      ></div>
      {/* Forces the component to do expensive work whenever it renders. */}
      {expensiveRender()}
    </div>
  );
});
