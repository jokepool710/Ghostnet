# Ghostnet — WireGuard VPN

This repo now includes a runnable WireGuard VPN setup using docker-compose (linuxserver/wireguard). The container will generate server and peer configs in ./config/wireguard. Do NOT commit private keys or generated config files to the repo.

Quick start

1. Copy the example env and edit:

   cp .env.example .env
   # Edit .env and set SERVERURL to your public IP or DNS name and other values

2. Create directory for data (optional):

   mkdir -p config/wireguard

3. Start the VPN container:

   docker-compose up -d

4. Check container logs for peer configuration and QR codes (the container prints peer configs on first run):

   docker logs -f wireguard

5. Retrieve peer config files from ./config/wireguard/peerX/peerX.conf or use the QR printed in logs to add to your mobile client.

Notes and security
- The container requires kernel support for WireGuard (modern Linux). On some hosts you must load the wireguard module.
- Do NOT store generated config (private keys) in git. Add config/wireguard to .gitignore.
- If exposing SERVERPORT on cloud providers, open UDP port in firewall/security groups.

Troubleshooting
- If the container fails to start, ensure Docker Engine and docker-compose are installed and the host kernel supports WireGuard.

Files added
- docker-compose.yml
- .env.example
- LICENSE
- .gitignore

If you want, I can also add a helper script to fetch the generated peer config and print it or QR-encode it on the host.