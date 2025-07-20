"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  activate: () => activate
});
module.exports = __toCommonJS(src_exports);
var import_coc = require("coc.nvim");
var os = __toESM(require("os"));
var fs = __toESM(require("fs"));
var path = __toESM(require("path"));
async function activate(context) {
  const config = import_coc.workspace.getConfiguration("coc-wolfram");
  const isEnable = config.get("enabled", true);
  if (!isEnable)
    return;
  const tempDir = os.tmpdir();
  const startScript = path.join(tempDir, "wolfram-lsp-start.wls");
  const tick = String.fromCharCode(96);
  const startCode = `
If[PacletFind["CodeParser"] === {}, PacletInstall["CodeParser"]];
If[PacletFind["CodeInspector"] === {}, PacletInstall["CodeInspector"]];
If[PacletFind["CodeFormatter"] === {}, PacletInstall["CodeFormatter"]];
If[PacletFind["LSPServer"] === {}, PacletInstall["LSPServer"]];
Needs["LSPServer${tick}"];
StartServer[]
`;
  fs.writeFileSync(startScript, startCode);
  const serverOptions = {
    command: "wolfram",
    args: ["-script", startScript]
  };
  const clientOptions = {
    documentSelector: ["wl", "mma"],
    outputChannelName: "wolfram-lsp"
  };
  const client = new import_coc.LanguageClient(
    "coc-wolfram",
    "Wolfram Language Server",
    serverOptions,
    clientOptions
  );
  context.subscriptions.push(import_coc.services.registLanguageClient(client));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  activate
});
