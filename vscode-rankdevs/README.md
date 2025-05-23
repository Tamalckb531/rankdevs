# vscode-rankdevs

Track your programming time inside VS Code and sync it with [RankDevs](https://www.rankdevs.com). Useful for developers who want to measure productivity or share coding stats.

---

## Features

- ⏱️ Tracks how long you're coding in VS Code
- 🔐 Lets you set and clear your personal RankDevs API Key
- 📊 Prepares usage stats to sync with your RankDevs profile

> You can trigger commands via Command Palette:
>
> - `RankDevs: Set Api Key`
> - `RankDevs: Clear Api Key`

---

## Requirements

- Node.js >= 16
- A [RankDevs](https://www.rankdevs.com) account
- API Key from your profile (used inside the extension)

---

## Extension Settings

No custom VS Code settings added (yet).

---

## Known Issues

- Doesn't handle multiple workspaces yet
- Only one use api key
- No automatic sync retry if offline

---

## Release Notes

### 0.0.1

- Initial release
- Set/Clear API Key commands
- Time tracking and sending reports to backend

---

## Development

Run this to compile:

```bash
npm run compile

```

**Enjoy!**
