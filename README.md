# 🐺 coc-wolfram

A coc.nvim extension for the official [Wolfram LSP](https://github.com/WolframResearch/LSPServer).

Replacement for the now-archived [coc-lsp-wl](https://github.com/voldikss/coc-lsp-wl?tab=readme-ov-file) extension, originally built for the (unofficial) [lsp-wl](https://github.com/kenkangxgwe/lsp-wl).

## ⚙️ Setup in Neovim

1. Install by running

   ```
   :CocInstall coc-wolfram
   ```
2. Enable the extension:

   ```json
   {
     // Run :CocConfig and add:
     "coc-wolfram.enabled": true
   }
   ```

## 🛠 Troubleshooting

* ⏳ The Wolfram kernel may take a few seconds to fully initialize after opening a wl file.
* 📦 The extension should automatically install necessary Wolfram paclets. If it doesn't, install them manually in a Mathematica notebook:

   ```wolfram
   PacletInstall["CodeParser"]
   PacletInstall["CodeInspector"]
   PacletInstall["CodeFormatter"]
   PacletInstall["LSPServer"]
   ```
