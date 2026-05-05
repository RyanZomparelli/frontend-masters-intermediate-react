import img from "../images/luna.jpg";

const JANK_DELAY = 500;

export default function DisplayImage({ filterStyle }) {
  const expensiveRender = () => {
    const start = performance.now();
    while (performance.now() - start < JANK_DELAY) {}
    return null;
  };

  return (
    <>
      {expensiveRender()}
      <img src={img} alt="Luna" style={{ filter: filterStyle }} />
      <p>Last Render: {Date.now()}</p>
    </>
  );
}
