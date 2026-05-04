---
title: Connecting to Integrated Lights Out (iLO), Assigning Static IP, and Installing ProxMox (without Subscription)
listSummary: >-
  Configuring the HP ProLiant DL380 Gen9 through static IP assignment and using the iLO.
published: 2026-05-02
---

## Table of Contents

1. [Overview](#overview)
1. [Step 1: Power On and Connect to iLO](#step-1-power-on-and-connect-to-ilo)
1. [Step 2: Adding ProxMox as the Server OS](#step-2-adding-proxmox-as-the-server-os)
1. [Step 3: Updating the ProxMox OS](#step-3-updating-the-proxmox-os)
1. [Glossary](#glossary)
1. [References](#references)

## Overview

- This write up is to document reaching the HP ProLiant **Integrated Lights-Out (iLO)** from my laptop (Lenovo ThinkPad running Windows 11) for the first time.
- I received the server with working components and just needed to figure out how to connect to the **iLO** to be able to fetch or assign a static ip address.

## Step 1: Power On and Connect to iLO

- First I connected the server to my home router so the server would have an IP address assigned. I did this by connected an ethernet cable from my router directly to one of the NIC ports at the rear of the server.
- Next, I connected an ethernet cable from my Lenovo Laptop to the iLO port on the rear of the server. The HP ProLiant DL380 has a dedicated iLO port which is separate from the rest of the machine allowing remote management of power settings and some administrative tasks.
- I checked the addresses on my home network and saw the newly added server IP. I was able to remote into the iLO, using the iLO html 5 remote console, and poke around the server settings. I navigated to the network settings and assigned a static IP address, so I could take the server offline to learn about the system and install Proxmox as the OS.

## Step 2: Adding ProxMox as the Server OS

- I created a bootable usb with ProxMox using `rufus`, installed via `chocolatey` package manager with `choco install rufus`. The process was simple and intuitive.
- Inserted the configured usb into the server's internal USB 3.0 connector on the system board and ProxMox immediately booted up.
- I simply followed the prompts, named server `wonka.pve`, and the OS installed with no problems.
- Once complete, I was able to connect to the `pve` using HTTPS (`https:\\xxx.xxx.xx.xx:8006`).

## Step 3: Updating the ProxMox OS

- Connected to the ProxMox HTTPS interface
- Attempted initial system update using `apt update`
- Encountered repository and security errors: Unsigned or insecure repository warnings, missing “Release” files, failed connections to package sources.
- Investigated APT configuration and identified issues with package sources and repository paths
- Manually modified APT source lists:
  - Edited repository files under `/etc/apt/sources.list` and `/etc/apt/sources.list.d/`
  - Removed invalid or incorrect Proxmox repository entries
- Corrected repository URLs and distribution paths
- Cleared package cache to eliminate corrupted/stale metadata:
  - Updated with `apt update`
  - Full upgrade with `apt full-upgrade -y`
- Verified system packages and Proxmox components updated successfully

**NOTE:** I was required to modify the default enterprise url paths (required active subscription) to the non-subscription repository urls. 

```sh
# /etc/apt/sources.list

# subscription path (default)
https://enterprise.proxmox.com/debian/pve

# non-subscription path
deb http://download.proxmox.com/debian/pve bookworm pve-no-subscription
```

## Glossary  

1. **Integrated Lights-Out (iLO)**: is a separate management subsystem on ProLiant servers. It stays on when the main server is off or booting, as long as the machine has AC power (and typically a small amount of standby power to the iLO). It’s mainly for out-of-band control so you don’t need a keyboard, monitor, and physical access to the box for many tasks.

2. **POST (Power-On Self-Test)**: is the firmware startup phase right after main power-on and before the OS loads. The System ROM checks and initializes core hardware, then hands off to the configured boot device.

3. **/etc/apt/sources.list**: is the primary APT file on Debian-based systems that lists package repositories: where apt should fetch software and which suite or component to use. `apt update` reads it, together with files under **/etc/apt/sources.list.d/**, to refresh the local package index, so edits there change which mirrors and tracks your system uses.

## References

- [Proxmox Repositories](https://pve.proxmox.com/pve-docs/chapter-sysadmin.html)


