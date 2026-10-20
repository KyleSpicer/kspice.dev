---
layout: ../../layouts/MarkdownTutorial.astro
title: "Gitea Runner: Download and Install on Windows and Ubuntu"
description: How to download, register, and run a self-hosted Gitea Actions runner as a service on Windows 11 and Ubuntu Server.
---

# Gitea Runner: Download and Install on Windows and Ubuntu

Date Created: 10-19-2026

How to download, register, and run a self-hosted Gitea Actions runner as a service on Windows 11 and Ubuntu Server 26.04 LTS.

## Table of Contents

1. [Overview](#overview)
    1. [Which File to Download](#which-file-to-download)
    1. [Get a Registration Token](#get-a-registration-token)
    1. [Labels](#labels)
1. [Windows](#windows)
    1. [Install the Runner on Windows](#install-the-runner-on-windows)
    1. [Register the Runner on Windows](#register-the-runner-on-windows)
    1. [Test the Runner on Windows](#test-the-runner-on-windows)
    1. [Run as a Windows Service](#run-as-a-windows-service)
1. [Ubuntu](#ubuntu)
    1. [Install the Runner on Ubuntu](#install-the-runner-on-ubuntu)
    1. [Register the Runner on Ubuntu](#register-the-runner-on-ubuntu)
    1. [Test the Runner on Ubuntu](#test-the-runner-on-ubuntu)
    1. [Run as a systemd Service](#run-as-a-systemd-service)
1. [Updating the Runner](#updating-the-runner)
1. [References](#references)

## Overview

A Gitea Actions runner is a small program that polls a Gitea instance for workflow jobs, runs them, and reports the results back. Running your own means jobs run on your hardware, with whatever toolchains you install. The steps here use `https://gitea.com`; swap in your own instance's URL if you self-host Gitea.

The runner is now called `gitea-runner`. It used to be `act_runner`, so older guides use that name. These steps were written against `gitea-runner` 5.1.1.

### Which File to Download

Download from the [releases page](https://gitea.com/gitea/act_runner/releases). Each release has several files per platform:

| File                                       | What it is                                   |
| ------------------------------------------ | -------------------------------------------- |
| `gitea-runner-<version>-<os>-<arch>`       | The program itself. This is the one you want. |
| `gitea-runner-<version>-<os>-<arch>.xz`    | The same program, compressed.                 |
| `...sha256`                                | Checksums for verifying a download.           |

Pick `windows-amd64` (the `.exe`) for Windows or `linux-amd64` for Ubuntu, unless the machine has an ARM CPU (`arm64`).

### Get a Registration Token

On Gitea, open one of:

- `User Settings > Actions > Runners > Create new runner`: the runner can take jobs from all of your repos.
- `<repo> > Settings > Actions > Runners > Create new runner`: the runner only takes jobs from that repo.

The same token can register more than one runner until it's reset. Anyone with the token can attach a runner to your account, so keep it private.

### Labels

When registering, `--labels` decides which jobs the runner picks up and how it runs them. Each label is `<name>:<how>`:

- `<name>:host`: jobs run directly on the machine, using its installed tools.
- `<name>:docker://<image>`: each job runs in a throwaway container from that image. Needs Docker installed.

A workflow's `runs-on: <name>` then sends its jobs to that runner. Using the machine's own name as the label makes it obvious where a job will land.

## Windows

Run these in an admin PowerShell.

### Install the Runner on Windows

Move the download into its own folder and drop the version from the name, so the service doesn't have to change when the runner is updated:

```powershell
New-Item -ItemType Directory -Force C:\gitea-runner | Out-Null
Move-Item "$HOME\Downloads\gitea-runner-<version>-windows-amd64.exe" C:\gitea-runner\gitea-runner.exe
cd C:\gitea-runner
.\gitea-runner.exe --version
```

Optionally, check the download against the release's `.exe.sha256` file:

```powershell
(Get-FileHash .\gitea-runner.exe -Algorithm SHA256).Hash
```

The printed hash should match the one in that file.

Then create the config file:

```powershell
.\gitea-runner.exe config init
```

`config init` writes the `config.yaml` to edit. `config generate` is different: it prints every option with its default, all commented out, as a reference. Save that under another name if you want it around:

```powershell
.\gitea-runner.exe config generate | Out-File -Encoding utf8 config.reference.yaml
```

### Register the Runner on Windows

```powershell
.\gitea-runner.exe register --no-interactive --config config.yaml --instance https://gitea.com --token <token> --name <name> --labels <name>:host
```

Windows jobs usually run with `host`, since they need the tools installed on the machine. Registering creates a `.runner` file in `C:\gitea-runner` that holds the runner's credentials, so don't delete it.

### Test the Runner on Windows

Run it in the foreground first:

```powershell
.\gitea-runner.exe daemon --config config.yaml
```

The runner should show as `Idle` on the Runners page in Gitea. Press `Ctrl+C` to stop it.

### Run as a Windows Service

`gitea-runner` doesn't install itself as a Windows service, so [NSSM](https://nssm.cc) wraps it:

```powershell
winget install NSSM.NSSM
```

Then, in a new admin PowerShell so `nssm` is on the `PATH`:

```powershell
nssm install gitea-runner C:\gitea-runner\gitea-runner.exe daemon --config C:\gitea-runner\config.yaml
nssm set gitea-runner AppDirectory C:\gitea-runner
nssm start gitea-runner
Get-Service gitea-runner
```

It should show `Running`, and the runner should still be `Idle` in Gitea after a reboot.

The service runs as `LocalSystem`, which has its own `PATH` and profile. If a build works by hand but fails as a job, run the service as your own account instead (`nssm edit gitea-runner`, `Log on` tab) and restart it.

The service also only sees the `PATH` it had when it started. After installing a new tool, restart it with `nssm restart gitea-runner` so jobs can find the tool.

## Ubuntu

### Install the Runner on Ubuntu

Copy the link to the `linux-amd64` file from the releases page, then download it as `gitea-runner`:

```bash
wget -O gitea-runner "<link to gitea-runner-<version>-linux-amd64>"
chmod +x gitea-runner
sudo mv gitea-runner /usr/local/bin/
gitea-runner --version
```

Create a dedicated `runner` user so jobs don't run as your login or as root. Add it to the `docker` group if you'll use `docker://` labels (that needs [Docker Engine](https://docs.docker.com/engine/install/ubuntu/) installed first):

```bash
sudo useradd --system --create-home --home-dir /var/lib/gitea-runner --shell /usr/sbin/nologin runner
sudo usermod -aG docker runner    # only for docker:// labels
```

Then create the config file in the runner's home:

```bash
cd /var/lib/gitea-runner
sudo -u runner gitea-runner config init
```

### Register the Runner on Ubuntu

```bash
cd /var/lib/gitea-runner
sudo -u runner gitea-runner register --no-interactive --config config.yaml \
  --instance https://gitea.com --token <token> \
  --name <name> --labels <name>:docker://gitea/runner-images:ubuntu-latest
```

That label runs each job in a fresh Ubuntu container, so builds can't leave a mess on the VM. Use `<name>:host` instead for jobs that need the machine itself. Like on Windows, registering creates a `.runner` file with the runner's credentials.

### Test the Runner on Ubuntu

```bash
cd /var/lib/gitea-runner
sudo -u runner gitea-runner daemon --config config.yaml
```

The runner should show as `Idle` in Gitea. Press `Ctrl+C` to stop it.

### Run as a systemd Service

Create the unit file:

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
```

Then start it and enable it at boot:

```bash
sudo systemctl daemon-reload
sudo systemctl enable --now gitea-runner
systemctl status gitea-runner --no-pager
```

It should show `active (running)`. Follow its log with `journalctl -u gitea-runner -f`.

## Updating the Runner

Stop the service, replace the binary with the new download, and start it again. The config and `.runner` file stay as they are.

Windows:

```powershell
nssm stop gitea-runner
Move-Item -Force "$HOME\Downloads\gitea-runner-<version>-windows-amd64.exe" C:\gitea-runner\gitea-runner.exe
nssm start gitea-runner
```

Ubuntu:

```bash
sudo systemctl stop gitea-runner
wget -O gitea-runner "<link to the new linux-amd64 file>"
chmod +x gitea-runner
sudo mv gitea-runner /usr/local/bin/
sudo systemctl start gitea-runner
```

## References

- [Gitea Docs: Act Runner](https://docs.gitea.com/usage/actions/act-runner)
- [Gitea Runner releases](https://gitea.com/gitea/act_runner/releases)
- [NSSM](https://nssm.cc)
- [Docker Engine on Ubuntu](https://docs.docker.com/engine/install/ubuntu/)
