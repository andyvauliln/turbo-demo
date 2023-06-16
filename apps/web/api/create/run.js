const fs = require('fs-extra');

console.log("1")
const jsCode = `
export default function handler(req, res) {
    res.end('ok');
}`

export default async function handler(req, res) {

  const funcFolder = `.vercel/output/functions/test.func`;
  await fs.ensureDir(funcFolder);
  console.log("2")
  try {

    await fs.writeFileSync(`${funcFolder}/index.js`, jsCode)

    await fs.writeJson(`${funcFolder}/.vc-config.json`, {
      runtime: "nodejs18.x",
      handler: "index.js",
      launcherType: "Nodejs",
      shouldAddHelpers: true,
    });
    res.end("ok")
  } catch (e) {
    console.error(e);
    res.end(error)
  }
}