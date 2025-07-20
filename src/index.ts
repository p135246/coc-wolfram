import {
  ExtensionContext,
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  services,
  workspace,
} from "coc.nvim";
import * as os from "os";
import * as fs from "fs";
import * as path from "path";

export async function activate(context: ExtensionContext): Promise<void> {
  const config = workspace.getConfiguration("coc-wolfram");

  const isEnable = config.get<boolean>("enabled", true);
  if (!isEnable) return;

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

  const serverOptions: ServerOptions = {
    command: "wolfram",
    args: ["-script", startScript],
  };

  const clientOptions: LanguageClientOptions = {
    documentSelector: ["wl", "mma"],
    outputChannelName: "wolfram-lsp",
  };

  const client = new LanguageClient(
    "coc-wolfram",
    "Wolfram Language Server",
    serverOptions,
    clientOptions,
  );

  context.subscriptions.push(services.registLanguageClient(client));
}
