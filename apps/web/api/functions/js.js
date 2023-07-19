const { json } = require('stream/consumers');
const base64 = require('base-64');

const githubToken = process.env.GITHUB_TOKEN
const repoOwner = 'andyvauliln'; // Replace with the repository owner's username
const repoName = 'turbo-demo'; // Replace with the repository name
const filePath = 'apps/web/api/functions/new2.js';

console.log(process.env, 'data');
// console.log(process.env, 'ENV');

const jsCode = `
export default function handler(req, res) {
    res.end('ok');
}
`;


export default async function handler(req, res) {
    let str = "ok"
    try {
        await commitFileToGithub(str);
        res.end(str)
    } catch (error) {
        console.log(error, "error")
        res.end("not ok")

    }
}

async function commitFileToGithub(str) {
    try {
        const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`, {
            method: 'PUT',
            headers: {
                Authorization: `token ${githubToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: 'Created new file via API',
                content: base64.encode(jsCode)
            })
        });
        console.log('3', response, 'data');;
    } catch (error) {
        console.log(error);
    }
}