# Add Helper Script + Open / Update the PR

This guide walks you through adding the helper script (`scripts/show-peer.sh`) to your branch and creating or updating the Pull Request (PR).
No fluff — just clear, working steps.

---

## Quick Plan

1. Fetch the `add-starter-scaffold` branch and create a topic branch.
2. Add `scripts/show-peer.sh` (make it executable) and test it locally.
3. Commit and push your changes.
4. Create or update the PR.
5. Add a short README note and checklist.

---

## 1. Get the Branch and Update It

```bash
git fetch origin
git checkout add-starter-scaffold
git pull origin add-starter-scaffold
```

Optionally, create a topic branch for this change:

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

## 3. Make It Executable and Test Locally

```bash
chmod +x scripts/show-peer.sh
./scripts/show-peer.sh 1
```

If you see "Peer config not found", start your container first:

```bash
mkdir -p config/wireguard
docker-compose up -d
docker logs -f wireguard
```

Then test again:

```bash
./scripts/show-peer.sh 1
```

---

## 4. Commit and Push

Ensure the executable bit is preserved, then commit and push:

```bash
git add scripts/show-peer.sh
git commit -m "scripts: add helper script to display/QR peer configs"
```

If you created a topic branch:

```bash
git push -u origin add-helper-script
```

If committing directly to `add-starter-scaffold`:

```bash
git push origin add-starter-scaffold
```

**Note:** If you used the GitHub web editor, executable permissions might not be preserved.
Fix it locally:

```bash
chmod +x scripts/show-peer.sh
git add scripts/show-peer.sh
git commit -m "scripts: add helper script (ensure executable)"
git push
```

---

## 5. Create or Update the Pull Request (PR)

### Option A – Update Existing PR

If there’s already a PR open from `add-starter-scaffold`, your new commits will automatically appear there once pushed.

Check PRs via CLI:

```bash
gh pr status
```

---

### Option B – Create a New PR

Using the GitHub CLI:

```bash
gh pr create --base main --head add-helper-script \
  --title "Add helper script to show WireGuard peer configs" \
  --body "Adds scripts/show-peer.sh to print a peer's config and show a QR (if qrencode is available). Tested: docker-compose up -d, peer1.conf generation, ./scripts/show-peer.sh 1."
```

Or manually via the web:

1. Push your branch:

   ```bash
   git push -u origin add-helper-script
   ```
2. Go to your repository → **Pull Requests → New Pull Request**
3. Choose the base and compare branches
4. Copy-paste the title and body below

---

## Suggested PR Title and Body

**Title:**

```
Add helper script to display WireGuard peer configs (scripts/show-peer.sh)
```

**Body:**

```
### What
- Adds scripts/show-peer.sh to print a peerN.conf and display a terminal QR code if 'qrencode' is installed.

### Why
- Simplifies fetching and scanning WireGuard peer configs for developers and operators.
- Eliminates the need to inspect Docker logs to find generated peers.

### Testing
- docker-compose up -d successfully starts container
- Peer configs appear under config/wireguard/peer*/peer*.conf
- ./scripts/show-peer.sh 1 outputs correct config and QR (with qrencode)

### Notes
- config/wireguard is .gitignored to avoid committing generated configs
- chmod +x preserved to ensure script runs directly after clone
```

---
