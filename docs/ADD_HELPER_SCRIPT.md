# Add Helper Script + Open / Update the PR

This short guide walks through how to add the helper script (`scripts/show-peer.sh`) and open or update the Pull Request.
It’s written for quick use — no filler, just what you actually need.

---

## Plan Overview

1. Pull the latest `add-starter-scaffold` branch
2. Add the helper script (`scripts/show-peer.sh`)
3. Make it executable and test locally
4. Commit and push your changes
5. Create or update the PR

---

## 1. Pull and Set Up the Branch

```bash
git fetch origin
git checkout add-starter-scaffold
git pull origin add-starter-scaffold
```

(Optional) If you want to isolate this change, make a topic branch:

```bash
git checkout -b add-helper-script
```

---

## 2. Add the Helper Script

Create a new file at `scripts/show-peer.sh` with the following content:

```bash
#!/usr/bin/env bash
set -euo pipefail

# Usage: ./scripts/show-peer.sh [N]
# Default N=1. Shows the peerN.conf and prints a QR code if qrencode is installed.

PEER_NUM="${1:-1}"
PEER_DIR="config/wireguard/peer${PEER_NUM}"
CONF="$PEER_DIR/peer${PEER_NUM}.conf"

if [[ ! -f "$CONF" ]]; then
  echo "Peer config not found at: $CONF"
  echo
  echo "Available peers (if any):"
  ls -1d config/wireguard/peer*/ 2>/dev/null || echo "  (none)"
  exit 1
fi

echo "===== Showing: $CONF ====="
cat "$CONF"
echo

if command -v qrencode >/dev/null 2>&1; then
  echo "===== QR code (utf8) ====="
  qrencode -t utf8 < "$CONF"
  echo
  echo "Tip: use your phone's WireGuard app to scan the QR code."
else
  echo "(install 'qrencode' to display a terminal QR code: sudo apt install qrencode)"
fi
```

---

## 3. Make It Executable and Test

```bash
chmod +x scripts/show-peer.sh
./scripts/show-peer.sh 1
```

If it says `Peer config not found`, start your container first:

```bash
mkdir -p config/wireguard
docker-compose up -d
docker logs -f wireguard
```

Then re-run the script to confirm it shows the peer config and QR code.

---

## 4. Commit and Push

Make sure the executable bit stays set and commit your change:

```bash
git add scripts/show-peer.sh
git commit -m "scripts: add helper script to display peer configs with QR output"
```

Push it up:

```bash
git push -u origin add-helper-script
```

If you’re pushing directly to the main working branch:

```bash
git push origin add-starter-scaffold
```

**Note:** If you added the script via GitHub’s web UI, it may lose its executable permission. Run these locally to fix that:

```bash
chmod +x scripts/show-peer.sh
git add scripts/show-peer.sh
git commit -m "fix: ensure show-peer.sh is executable"
git push
```

---

## 5. Create or Update the PR

### If a PR Already Exists

Just push your changes — they’ll automatically appear in the open PR.
Check PRs via the CLI:

```bash
gh pr status
```

### If You’re Creating a New One

Using the CLI:

```bash
gh pr create --base main --head add-helper-script \
  --title "Add helper script to show WireGuard peer configs" \
  --body "Adds scripts/show-peer.sh to print a peer config and optionally display a QR code if qrencode is installed."
```

Or manually on GitHub:

1. Push the branch if you haven’t already:
   `git push -u origin add-helper-script`
2. Go to your repo → Pull Requests → **New Pull Request**
3. Set base to `main` and compare to your branch
4. Use the title and body below

---

## PR Title and Description

**Title:**

```
Add helper script to display WireGuard peer configs
```

**Description:**

```
### What
Adds scripts/show-peer.sh to print a peer config file and show a QR code in the terminal (if 'qrencode' is available).

### Why
Speeds up setup and mobile onboarding — no need to scroll through Docker logs to grab peer configs.

### Testing
- docker-compose up -d starts correctly
- Peer configs generated under config/wireguard/peer*/peer*.conf
- ./scripts/show-peer.sh 1 works as expected
- QR output verified with qrencode

### Notes
- config/wireguard remains .gitignored
- chmod +x preserved to allow direct execution
```

---
