##Ghostnet — WireGuard VPN

This repo now includes a runnable WireGuard VPN setup using docker-compose (linuxserver/wireguard). The container generates server and peer configs in ./config/wireguard. Do NOT commit private keys or generated config files to the repo.

Quick Start

Copy the example environment file and edit:

cp .env.example .env


Open .env and set at least:

SERVERURL → your public IP or DNS name

SERVERPORT → default is 51820

PEERS → number of client configs to generate

PUID / PGID → usually 1000/1000

PEERDNS → e.g., 1.1.1.1

(Optional) Create the directory for configs:

mkdir -p config/wireguard


Start the VPN container:

docker-compose up -d


Check container logs — it prints peer configs and QR codes on the first run:

docker logs -f wireguard


Use the peer config files from ./config/wireguard/peerX/peerX.conf or scan the QR codes in the logs to add them to your mobile client.

Helper Script (optional but recommended)

To make fetching peer configs easier, there’s a helper script at scripts/show-peer.sh. It will:

Print the peer config in your terminal

Display a QR code (requires qrencode)

Example:

# show peer 1
./scripts/show-peer.sh 1


Make sure it’s executable:

chmod +x scripts/show-peer.sh


This avoids hunting through logs and lets you quickly import peers on your devices.

Notes & Security

Host must support WireGuard kernel module (modern Linux kernels usually do).

Do not commit generated configs or private keys. config/wireguard is already in .gitignore.

If exposing SERVERPORT on cloud providers, make sure the UDP port is open in your firewall or security groups.

For full traffic routing, enable IP forwarding on the host and set up NAT/masquerading.

Troubleshooting

Container fails to start → make sure Docker Engine + docker-compose are installed and your kernel supports WireGuard.

Peer configs not generated → check container logs and permissions.

Files Added

docker-compose.yml

.env.example

LICENSE

.gitignore
