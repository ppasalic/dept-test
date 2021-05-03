
export default async function FetchApi(...args) {
  await delay(Math.ceil(200 + Math.random() * 100));
  const res = await fetch(...args);
  const json = await res.json();
  return json;
}

function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}