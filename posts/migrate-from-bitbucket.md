---
title: "BitbucketからGithubへの移行"
date: "2020-07-25"
description: "BitbucketからGithubへの移行用のスクリプト書きました（雑）"
---

2020年4月15日にGithubのOrganizationに新たなFreeプランが発表されたので、これを機にBitbucketから移行しようと決意した。

## 移行方法

1. Bitbucketのリポジトリをローカルにクローン
2. 同名のリポジトリをGithubに空で作成
3. 1で取得したローカルのリポジトリからGithubへmasterブランチをプッシュ

せっかくなので2の部分はGithub APIで作成することにする

## GraphQL使ってみる

### API tokenの取得
Settings > Developer settings > Personal access tokensを開き、トークンを作成する。    
scopesはrepoを選択する。


### mutationの実行
実装はNode.jsで行う。`node-fetch`を利用する。

```shell
$ yarn add node-fetch dotenv
```

以下のindex.jsを作成。

```js
const fetch = require("node-fetch");
const fs = require("fs");
const path = require("path");
const { execSync } = require("child_process");
const envJsonRaw = fs.readFileSync("./.env.json");
const envJson = JSON.parse(envJsonRaw);

const headers = {
  "Content-Type": "application/json",
  Authorization: `token ${envJson.token}`,
};

const createRepositoryMutation = `
mutation ($repoName: String!) {
    createRepository(input: {
        name: $repoName,
        visibility: PRIVATE}) {
        repository {
            sshUrl
        }
    }
}
`;

async function postQuery(query, variables) {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    body: JSON.stringify({
      query,
      variables,
    }),
    headers,
  });

  const json = await res.json();
  if (json.errors) {
    console.error(json.errors);
    return;
  }
  return json;
}

async function createGithubRepoFromBitbucketRepo(repoName) {
  // 自分の場合、ghqを利用してcloneしていたので、bitbucketのリポジトリは全て同一のディレクトリにある
  const sourcePath = path.join(envJson.sourceDir, repoName);
  if (!fs.existsSync(sourcePath)) {
    console.log(`${repoName} doesn't exist.`);
    return;
  }
  console.log(`start create -- ${sourcePath}`);
  const data = await postQuery(createRepositoryMutation, { repoName });
  console.log(data);
  if (!data) {
    return;
  }
  const sshUrl = data.data.createRepository.repository.sshUrl;
  // 作成したGithubのリポジトリのSSH URLを元にBitbucketのmasterブランチをプッシュ
  execSync(
    `cd ${sourcePath} && git checkout master && git remote add hub ${sshUrl} && git push hub master`
  );
  console.log(`end create -- ${repoName}`);
}

const repoName = process.argv[2];

createGithubRepoFromBitbucketRepo(repoName);

```
 
.env.jsonファイルも作成しておく。アクセストークンを記載するため、.env.jsonファイルはgitignoreに入れておく。
```json
{
  "token": "xxxx",
  "sourceDir": "yyyyy"
}
```

 
該当のBitbucketリポジトリのmasterブランチをGithubリポジトリに作成する。
```shell
$ node index.js repoName
```

後は自分のローカルの環境に合わせてスクリプトを拡張すれば良い。

## 参考
- https://docs.github.com/en/graphql
