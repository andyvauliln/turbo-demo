const { json } = require('stream/consumers');
const axios = require('axios');
const base64 = require('base-64');

const githubToken = process.env.GITHUB_TOKEN
const repoOwner = 'andyvauliln'; // Replace with the repository owner's username
const repoName = 'turbo-demo'; // Replace with the repository name
const filePath = 'apps/web/api/functions/new.js';

console.log(process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG, 'data');
console.log(process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER, 'data');
console.log(process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF, 'data');
console.log(process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA, 'data');
console.log(process.env.NEXT_PUBLIC_VERCEL_URL, 'data');
console.log(process.env.NEXT_PUBLIC_VERCEL_BRANCH_URL, 'data');
console.log(process.env.GITHUB_TOKEN, 'token');
console.log(process.env, 'ENV');

const jsCode = `
export default function handler(req, res) {
    res.end('ok');
}
`;


export default async function handler(req, res) {
    let str = "ok"
    console.log('2', 'data');
    try {
        await commitFileToGithub(str);
        res.end(str)
    } catch (error) {
        console.log(error, "error")
        res.end(JSON.stringify(error))
    }
}

async function commitFileToGithub(str) {
    try {
        const response = await axios({
            method: 'put',
            url: `https://api.github.com/repos/${repoOwner}/${repoName}/contents/${filePath}`,
            headers: {
                Authorization: `token ${githubToken}`,
                'Content-Type': 'application/json'
            },
            data: {
                message: 'Created new file via API',
                content: base64.encode(jsCode)
            }
        });
        console.log('3', response, 'data');
        str += JSON.stringify(response.data)
        console.log(response.data);
    } catch (error) {
        console.log(error);
    }
}