---
layout: ../../layouts/MarkdownTutorial.astro
title: "Proxmox VM: Ubuntu Server 26.04 Template and Setup"
description: How to build a reusable Ubuntu Server 26.04 LTS template in Proxmox VE and set up VMs cloned from it.
---

# Proxmox VM: Ubuntu Server 26.04 Template and Setup

Date Created: 10-19-2026

How to build a reusable Ubuntu Server 26.04 LTS template in Proxmox VE, then clone and set up new VMs from it.

## Table of Contents

1. [Overview](#overview)
1. [Step 1: Create the Template VM](#step-1-create-the-template-vm)
1. [Step 2: Run the Ubuntu Installer](#step-2-run-the-ubuntu-installer)
1. [Step 3: First Boot Cleanup](#step-3-first-boot-cleanup)
1. [Step 4: Convert to a Template](#step-4-convert-to-a-template)
1. [Step 5: Clone a VM from the Template](#step-5-clone-a-vm-from-the-template)
1. [References](#references)

## Overview

Installing Ubuntu by hand for every VM gets old fast. Building one template named `ubuntu-base` and making full clones of it means the install and cleanup only happen once, and each new VM only needs a few first-boot fixes.

You'll need:

- A Proxmox VE host with a storage pool for VM disks (mine is named `vm-storage`; swap in your own)
- The [Ubuntu Server 26.04 LTS ISO](https://ubuntu.com/download/server) uploaded to `local > ISO Images`

## Step 1: Create the Template VM

Click `Create VM` (top right) and fill in each tab:

| Tab     | Setting                                                           | Why                                                                                           |
| ------- | ----------------------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| General | Name `ubuntu-base`, default VM ID, `Start at boot` off            | A template can't be started, so only the clones need `Start at boot`.                         |
| OS      | Ubuntu ISO, type `Linux`, version `6.x`                           | Lets Proxmox pick sensible defaults for a modern Linux kernel.                                |
| System  | Machine `q35`, BIOS `OVMF (UEFI)`, `Add EFI Disk` on `vm-storage` | Modern chipset and UEFI boot. The EFI disk stores the boot settings.                          |
| System  | SCSI controller `VirtIO SCSI single`, `Qemu Agent` on             | Fast disk I/O, and Proxmox can see the VM's IP and shut it down cleanly.                      |
| Disks   | Bus `SCSI`, `vm-storage`, `60 GB`, `Discard` and `IO thread` on   | Discard returns freed space to the host. IO thread speeds up the disk. Clones can grow later. |
| CPU     | `2` cores, type `host`                                            | `host` passes through the real CPU's features. Each clone can change the count.               |
| Memory  | `4096 MB`                                                         | Enough to install. Each clone can change it.                                                  |
| Network | Bridge `vmbr0`, model `VirtIO`                                    | VirtIO is the fastest virtual network card.                                                   |

## Step 2: Run the Ubuntu Installer

Click `Start`, then `Console`. Click inside the console so it captures the keyboard.

| Screen              | Choice                                                                   | Why                                                                                |
| ------------------- | ------------------------------------------------------------------------ | ---------------------------------------------------------------------------------- |
| Language / keyboard | Your usual                                                               |                                                                                    |
| Type of install     | `Ubuntu Server` (not minimized)                                          | The minimized install leaves out everyday tools.                                   |
| Network             | DHCP, note the IP                                                        | You'll SSH in with it in the next step.                                            |
| Proxy and mirror    | Defaults                                                                 |                                                                                    |
| Storage             | `Use an entire disk` with `LVM`                                          | LVM makes resizing easy. The root volume only gets half the disk, fixed in Step 3. |
| Profile             | Your name, username (e.g. `kspice`), server name `ubuntu-base`, password |                                                                                    |
| Ubuntu Pro          | Skip                                                                     |                                                                                    |
| SSH                 | `Install OpenSSH server`, optionally import your GitHub key              | Remote access from the start. With a key, password login can be turned off later.  |
| Featured snaps      | None                                                                     | Install things like Docker from their own apt repos instead of snaps.              |

When it finishes, choose `Reboot Now`. If it boots back into the installer, shut the VM down, set `Hardware > CD/DVD Drive` to `Do not use any media`, and start it again.

## Step 3: First Boot Cleanup

Log in on the console or over SSH and run:

```bash
# patch everything
sudo apt update && sudo apt full-upgrade -y

# lets Proxmox see the VM's IP and shut it down cleanly
sudo apt install -y qemu-guest-agent
sudo systemctl enable --now qemu-guest-agent

# give the root volume the rest of the disk
sudo lvextend -r -l +100%FREE /dev/ubuntu-vg/ubuntu-lv
df -h /
```

`df -h /` should now show close to the full 60 GB.

## Step 4: Convert to a Template

Once that looks good, clear out everything that has to be unique per machine. The VM shuts itself down at the end:

```bash
sudo apt update && sudo apt full-upgrade -y

# clones re-run first-boot setup
sudo cloud-init clean --logs

# clones generate their own machine ID (otherwise they can all get the same DHCP IP)
sudo truncate -s 0 /etc/machine-id

# clones get their own SSH host keys
sudo rm -f /etc/ssh/ssh_host_*

sudo poweroff
```

Then in Proxmox, right-click `ubuntu-base` and choose `Convert to template`.

## Step 5: Clone a VM from the Template

1. Right-click the template, choose `Clone`, set `Mode: Full Clone`, and give it a name. A full clone is a standalone copy, so it doesn't depend on the template.
1. With the clone powered off, set its CPU, RAM, and disk in the `Hardware` tab. The template's sizes are only a starting point. To grow the disk, select it and use `Disk Action > Resize`.
1. Start the clone and log in on the Proxmox console with the user from the base install.

Then run these on the clone. Set `NAME` to the clone's hostname first so the rest can be pasted as is:

```bash
NAME=<hostname>
```

**Grow the disk.** If you resized the disk in Proxmox, the partition, LVM, and filesystem inside still need to grow into it:

```bash
lsblk
sudo growpart /dev/sda 3
sudo pvresize /dev/sda3
sudo lvextend -r -l +100%FREE /dev/ubuntu-vg/ubuntu-lv
df -h /
```

**Set the hostname.** The clone still calls itself `ubuntu-base`. Fixing `/etc/hosts` too stops `sudo` from warning that it can't resolve the host:

```bash
sudo hostnamectl set-hostname "$NAME"
sudo sed -i "s/ubuntu-base/$NAME/g" /etc/hosts
grep 127.0.1.1 /etc/hosts
```

**Check the SSH host keys.** They were deleted from the template, so each clone should have made its own:

```bash
ls /etc/ssh/ssh_host_*
# if empty:
sudo dpkg-reconfigure openssh-server
sudo systemctl restart ssh
```

**Check it's unique.** The machine ID and IP should differ from any other clone:

```bash
cat /etc/machine-id
ip -4 a show ens18
# if machine-id is empty:
sudo systemd-machine-id-setup && sudo reboot
```

**Reserve the IP and SSH in.** Add a DHCP reservation for the clone's MAC (shown under `Hardware > Network Device`) on the router so its IP never changes, then reboot it. From your PC:

```bash
ssh-keygen -R <ip>        # only if you get a host key warning
ssh <username>@<ip>
```

Repeat this step for every new Ubuntu VM.

## References

- [Proxmox VE: Qemu/KVM Virtual Machines](https://pve.proxmox.com/wiki/Qemu/KVM_Virtual_Machines)
- [Ubuntu Server](https://ubuntu.com/download/server)
- [Proxmox VM: Windows 11 Pro Template and Setup](/programming/proxmox-windows-11-pro-vm-template)
