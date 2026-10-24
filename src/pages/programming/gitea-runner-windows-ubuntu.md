---
layout: ../../layouts/MarkdownTutorial.astro
title: "Gitea Runner: Download and Install on Windows and Ubuntu"
description: How to download, register, and run a self-hosted Gitea Actions runner as a service on Windows 11 and Ubuntu Server.
---

# Gitea Runner: Download and Install on Windows and Ubuntu

Date Created: 10-24-2026

How to download, register, and run a self-hosted Gitea Actions runner as a service on Windows 11 and Ubuntu Server 26.04 LTS.

## Table of Contents

1. [Overview](#overview)
1. [Before You Start](#before-you-start)
1. [Windows](#windows)
1. [Ubuntu](#ubuntu)
1. [Updating the Runner](#updating-the-runner)
1. [References](#references)

## Overview

A Gitea Actions runner polls a Gitea instance for workflow jobs, runs them on your machine, and reports the results back. These steps use `https://gitea.com`; swap in your own URL if you self-host Gitea.

The runner is `gitea-runner` (formerly `act_runner`, so older guides use that name). Written against version `5.2.2`. For a newer release, change `VERSION` in the commands below. Releases are listed on the [releases page](https://gitea.com/gitea/runner/releases).

## Before You Start

**Get a registration token.** On Gitea, open `User Settings > Actions > Runners > Create new runner` (the runner serves all your repos) or `<repo> > Settings > Actions > Runners` (that repo only), and copy the token. Anyone with it can attach a runner to your account, so don't share it. If it leaks, use `Reset registration token`; runners already registered keep working.

**Pick a label.** `--labels` decides which jobs a runner takes and how it runs them:

- `<name>:host`: jobs run directly on the machine, using its installed tools.
- `<name>:docker://<image>`: each job runs in a throwaway container. Needs Docker.

A workflow's `runs-on: <name>` sends jobs to that runner. Using the machine's own name as the label makes it obvious where jobs land.

## Windows

Run everything in an admin PowerShell. Replace `<name>` with the runner's name.

**1. Download and create the config.**

```powershell
$VERSION = "5.2.2"
New-Item -ItemType Directory -Force C:\gitea-runner | Out-Null
cd C:\gitea-runner
Invoke-WebRequest "https://gitea.com/gitea/runner/releases/download/v$VERSION/gitea-runner-$VERSION-windows-amd64.exe" -OutFile gitea-runner.exe
.\gitea-runner.exe --version
.\gitea-runner.exe config init
```

**2. Register.** Paste the token when asked:

```powershell
$token = Read-Host "Token"
.\gitea-runner.exe register --no-interactive --config config.yaml --instance https://gitea.com --token $token --name <name> --labels <name>:host
Remove-Variable token
```

It should print `Runner registered successfully` and create a `.runner` file holding the runner's credentials. Don't delete it.

**3. Test.** Run it in the foreground, check that it shows as `Idle` under `Actions > Runners` on Gitea, then press `Ctrl+C`:

```powershell
.\gitea-runner.exe daemon --config config.yaml
```

**4. Install as a service.** `gitea-runner` can't install itself as a Windows service, so [NSSM](https://nssm.cc) wraps it:

```powershell
winget install -e --id NSSM.NSSM
```

Then, in a new admin PowerShell so `nssm` is on the `PATH`:

```powershell
nssm install gitea-runner C:\gitea-runner\gitea-runner.exe daemon --config C:\gitea-runner\config.yaml
nssm set gitea-runner AppDirectory C:\gitea-runner
nssm start gitea-runner
Get-Service gitea-runner
```

It should show `Running`, and stay `Idle` on Gitea after a reboot.

Two things to know about the service:

- It runs as `LocalSystem`, which has its own `PATH` and profile. If a build works by hand but fails as a job, set the service to log on as your account (`nssm edit gitea-runner`, `Log on` tab).
- It only sees the `PATH` from when it started. After installing a new tool, run `nssm restart gitea-runner`.

## Ubuntu

Replace `<name>` with the runner's name. For `docker://` labels, install [Docker Engine](https://docs.docker.com/engine/install/ubuntu/) first.

**1. Download and install.**

```bash
VERSION=5.2.2
wget -O gitea-runner "https://gitea.com/gitea/runner/releases/download/v$VERSION/gitea-runner-$VERSION-linux-amd64"
chmod +x gitea-runner
sudo mv gitea-runner /usr/local/bin/
gitea-runner --version
```

**2. Create a `runner` user and its config.** Jobs then don't run as your login or as root. Its home is closed to other users, so commands that need to be in it run as `runner` with `sh -c`:

```bash
sudo useradd --system --create-home --home-dir /var/lib/gitea-runner --shell /usr/sbin/nologin runner
sudo usermod -aG docker runner    # only for docker:// labels
sudo -u runner sh -c 'cd /var/lib/gitea-runner && gitea-runner config init'
```

**3. Register.** Paste the token when asked (it won't show on screen, and stays out of your shell history):

```bash
read -rsp "Token: " TOKEN; echo
sudo -u runner sh -c "cd /var/lib/gitea-runner && gitea-runner register --no-interactive --config config.yaml --instance https://gitea.com --token $TOKEN --name <name> --labels <name>:docker://gitea/runner-images:ubuntu-latest"
unset TOKEN
```

It should print `Runner registered successfully` and create a `.runner` file holding the runner's credentials. The `WARN Runner in user-mode` line just means it isn't running as root, which is intended. For jobs that need the machine itself, use `<name>:host` instead.

**4. Test.** Run it in the foreground, check that it shows as `Idle` under `Actions > Runners` on Gitea, then press `Ctrl+C`:

```bash
sudo -u runner sh -c 'cd /var/lib/gitea-runner && gitea-runner daemon --config config.yaml'
```

**5. Install as a service.**

```bash
sudo tee /etc/systemd/system/gitea-runner.service <<'EOF'
[Unit]
Description=Gitea Actions runner
After=network-online.target docker.service
Wants=network-online.target

[Service]
User=runner
WorkingDirectory=/var/lib/gitea-runner
ExecStart=/usr/local/bin/gitea-runner daemon --config /var/lib/gitea-runner/config.yaml
Restart=always
RestartSec=5

[Install]
WantedBy=multi-user.target
EOF

sudo systemctl daemon-reload
sudo systemctl enable --now gitea-runner
systemctl is-active gitea-runner
```

It should print `active`, and stay `Idle` on Gitea after a reboot. Follow its log with `journalctl -u gitea-runner -f`.

## Updating the Runner

Set `VERSION` to the new release, then replace the binary. The config and `.runner` file stay as they are.

Windows (admin PowerShell):

```powershell
$VERSION = "<new version>"
nssm stop gitea-runner
Invoke-WebRequest "https://gitea.com/gitea/runner/releases/download/v$VERSION/gitea-runner-$VERSION-windows-amd64.exe" -OutFile C:\gitea-runner\gitea-runner.exe
nssm start gitea-runner
```

Ubuntu:

```bash
VERSION=<new version>
wget -O gitea-runner "https://gitea.com/gitea/runner/releases/download/v$VERSION/gitea-runner-$VERSION-linux-amd64"
chmod +x gitea-runner
sudo systemctl stop gitea-runner
sudo mv gitea-runner /usr/local/bin/
sudo systemctl start gitea-runner
```

## References

- [Gitea Docs: Runner](https://docs.gitea.com/runner/)
- [Gitea Runner releases](https://gitea.com/gitea/runner/releases)
- [NSSM](https://nssm.cc)
- [Docker Engine on Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
