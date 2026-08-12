import test from "node:test";import assert from "node:assert/strict";import fs from "node:fs";
const app=fs.readFileSync(new URL("../app/OceanPlayApp.tsx",import.meta.url),"utf8");
test("upper dock excludes home",()=>{const header=app.match(/<header>(.*?)<\/header>/s)?.[1]??"";assert.doesNotMatch(header,/Home|🏠/)});
test("lower dock has Home, Map, Rewards and Progress",()=>{const nav=app.match(/<nav.*?>(.*?)<\/nav>/s)?.[1]??"";assert.equal((nav.match(/<span>Home<\/span>/g)||[]).length,1);assert.equal((nav.match(/<span>Map<\/span>/g)||[]).length,1);assert.doesNotMatch(nav,/<span>Games<\/span>/);assert.match(nav,/<span>Rewards<\/span>/);assert.match(nav,/<span>Progress<\/span>/)});
