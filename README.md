# Ghostnet — WireGuard VPN

This repository includes a **runnable WireGuard VPN setup** using `docker-compose` (linuxserver/wireguard). The container automatically generates server and peer configs in `./config/wireguard`.  

**Important:** Do **not** commit private keys or generated config files to the repo.

---

## Quick Start

1. **Copy the example environment file**

```bash
cp .env.example .env
````

2. **Edit `.env`** and configure at least the following:

* `SERVERURL` → your public IP or DNS name
* `SERVERPORT` → default is `51820`
* `PEERS` → number of client configs to generate
* `PUID` / `PGID` → usually `1000/1000`
* `PEERDNS` → e.g., `1.1.1.1`

3. **Create the config directory** (if not existing)

```bash
mkdir -p config/wireguard
```

4. **Start the VPN container**

```bash
docker-compose up -d
```

5. **Check container logs** — peer configs and QR codes are printed on first run:

```bash
docker logs -f wireguard
```

6. **Retrieve peer configs**

* Files are available in `./config/wireguard/peerX/peerX.conf`
* Or scan the QR code printed in logs to add peers to your mobile client

---

## Helper Script

To simplify fetching peer configs, there’s a helper script: `scripts/show-peer.sh`. It prints the peer config in your terminal and optionally shows a QR code (requires `qrencode`).

**Usage:**

```bash
# Show peer 1
./scripts/show-peer.sh 1
```

**Make it executable:**

```bash
chmod +x scripts/show-peer.sh
```

This avoids hunting through logs and makes mobile client setup easier.

---

## Notes & Security

* Host must support WireGuard kernel module (modern Linux kernels usually do)
* Do **not** commit generated configs or private keys (`config/wireguard` is `.gitignore`d)
* If exposing `SERVERPORT` on cloud providers, ensure the UDP port is open in your firewall/security group
* For full traffic routing, enable IPv4 forwarding on the host and set up NAT/masquerading

---

## Troubleshooting

* **Container fails to start:** Ensure Docker Engine and `docker-compose` are installed, and your kernel supports WireGuard
* **Peer configs not generated:** Check container logs and folder permissions

---

## Files Added

* `docker-compose.yml`
* `.env.example`
* `LICENSE`
* `.gitignore`
