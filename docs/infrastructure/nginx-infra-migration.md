# Nginx Infrastructure Migration

## Summary

The `nginx` service has been removed from this project's `docker-compose.prod.yml` and relocated to a shared infrastructure layer at `/home/deploy/infra/` on the production server. This document explains why, what changed, and how to manage nginx going forward.

## Why was nginx moved out?

The Contabo VPS now hosts multiple backend projects (SlothUI and others). Only one process can bind to ports 80 and 443 on a server. Keeping nginx inside SlothUI's Docker Compose created two problems:

1. **Coupling** — Every SlothUI deploy ran `docker compose restart nginx`, which caused a brief downtime for all projects sharing the server. Nginx config for unrelated projects would have to live inside the SlothUI repository, which is incorrect ownership.

2. **Port conflict** — A second project cannot run its own nginx on ports 80/443 alongside SlothUI's nginx. A single shared nginx that routes traffic to all backends by domain is the standard solution.

## What changed in this repository?

### `docker-compose.yml`

Added an external Docker network declaration:

```yaml
networks:
  shared-proxy:
    external: true
```

This tells Docker Compose to use an existing network (created manually on the server) rather than creating its own. The shared network allows the infrastructure nginx to reach `backend-slothui`.

### `docker-compose.prod.yml`

1. **Removed** the entire `nginx` service (container `nginx-slothui`, ports 80/443, SSL volume mounts).
2. **Added** `networks: [default, shared-proxy]` to the `backend` service so it is reachable both by internal services (db, redis via `default`) and by the infrastructure nginx (via `shared-proxy`).

### `.github/workflows/deploy-backend.yml`

Removed the line `docker compose ... restart nginx`. The deploy now only rebuilds and restarts the `backend` service. Nginx is managed independently.

### `back/nginx/nginx.conf`

**Not deleted.** The file remains in the repository as a reference. It is no longer mounted into any container. The active production config lives at `/home/deploy/infra/nginx/conf.d/slothui.conf` on the server.

## Where does nginx live now?

On the production server:

```
/home/deploy/infra/
├── docker-compose.yml            # nginx-proxy + certbot
├── nginx/
│   ├── nginx.conf                # main config (worker_processes, http block)
│   └── conf.d/
│       ├── slothui.conf          # server block for slothui.click
│       └── tattoo-shop.conf      # server block for the second project
└── certbot/
    └── conf/                     # Let's Encrypt certificates
```

The infrastructure nginx connects to the same `shared-proxy` Docker network as all backend containers and routes traffic by `server_name` (domain).

## How to update the nginx config for SlothUI

1. SSH into the server: `ssh deploy@<VPS_IP>`
2. Edit the config: `nano /home/deploy/infra/nginx/conf.d/slothui.conf`
3. Test the config: `docker compose -f /home/deploy/infra/docker-compose.yml exec nginx nginx -t`
4. Reload nginx (zero-downtime): `docker compose -f /home/deploy/infra/docker-compose.yml exec nginx nginx -s reload`

## Key difference in the nginx config

The only functional change in the migrated nginx config is the upstream hostname:

```diff
- proxy_pass http://backend:3000;
+ proxy_pass http://backend-slothui:3000;
```

When nginx was inside this project's Docker Compose, it resolved `backend` as the Compose service name. Now that nginx is in a separate Compose project connected via an external network, it resolves containers by `container_name` instead. The backend container is named `backend-slothui`, so the upstream changed accordingly.

Everything else (SSL, Cloudflare IP restoration, WebSocket proxy, security headers) is identical.

## Impact on deployments

| Action | Before | After |
|--------|--------|-------|
| Push to `main` (backend changes) | Rebuilds backend + restarts nginx | Rebuilds backend only |
| Nginx config change | Edit `back/nginx/nginx.conf`, push, deploy | SSH to server, edit, `nginx -s reload` |
| Add a new project to the server | Modify this repo's nginx config | Add a `.conf` file in `/home/deploy/infra/nginx/conf.d/` |
| SSL certificate renewal | Handled by host certbot | Handled by infra certbot container |
