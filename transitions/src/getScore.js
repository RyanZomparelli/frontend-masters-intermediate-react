export default async function getScore(game) {
  const res = await fetch("/score?game=" + game);
  const score = await res.json();
  return score;
}
