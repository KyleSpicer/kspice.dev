---
layout: ../../layouts/MarkdownTutorial.astro
title: "Proxmox VM: Windows 11 Pro Template and Setup"
description: How to build a reusable Windows 11 Pro 25H2 template in Proxmox VE and set up VMs cloned from it.
---

# Proxmox VM: Windows 11 Pro Template and Setup

Date Created: 10-24-2026

How to build a reusable Windows 11 Pro 25H2 template in Proxmox VE, then clone and set up new VMs from it.

## Table of Contents

1. [Overview](#overview)
1. [Step 1: Create the Template VM](#step-1-create-the-template-vm)
1. [Step 2: Install Windows 11](#step-2-install-windows-11)
1. [Step 3: Base Setup](#step-3-base-setup)
1. [Step 4: Sysprep and Convert to a Template](#step-4-sysprep-and-convert-to-a-template)
1. [Step 5: Clone a VM from the Template](#step-5-clone-a-vm-from-the-template)
1. [References](#references)

## Overview

A Windows install with drivers and updates takes a while. Doing it once in a template named `win11-base` means each new Windows VM only has to run through the short out-of-box setup. Unlike Linux, Windows has to be generalized with Sysprep before it's turned into a template, so every clone gets its own machine identity.

You'll need:

- A Proxmox VE host with a storage pool for VM disks (mine is named `vm-storage`; swap in your own)
- The [Windows 11 ISO](https://www.microsoft.com/software-download/windows11) and the [VirtIO drivers ISO](https://pve.proxmox.com/wiki/Windows_VirtIO_Drivers) (`virtio-win.iso`) uploaded to `local > ISO Images`
- A Windows 11 Pro product key for each clone you want activated

## Step 1: Create the Template VM

Click `Create VM` (top right) and fill in each tab:

| Tab     | Setting                                                                                                                                | Why                                                                                     |
| ------- | -------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------- |
| General | Name `win11-base`, default VM ID, `Start at boot` off                                                                                  | A template can't be started, so only the clones need `Start at boot`.                   |
| OS      | Windows 11 ISO, type `Microsoft Windows`, version `11/2022`, tick `Add additional drive for VirtIO drivers` and pick `virtio-win.iso` | Proxmox picks Windows defaults and mounts the drivers as a second CD.                   |
| System  | Machine `q35`, BIOS `OVMF (UEFI)`, `Add EFI Disk` on `vm-storage`, `Add TPM` (`v2.0`, on `vm-storage`)                               | Windows 11 requires UEFI and a TPM 2.0.                                                 |
| System  | SCSI controller `VirtIO SCSI single`, `Qemu Agent` on                                                                                  | Fast disk I/O, and Proxmox can see the VM's IP and shut it down cleanly.                |
| Disks   | Bus `SCSI`, `vm-storage`, `150 GB`, `Discard` and `IO thread` on                                                                       | Room for build tools. Growing a Windows disk later is awkward, so start big.            |
| CPU     | `2` cores, type `host`                                                                                                                 | `host` passes through the real CPU's features. Each clone can change the count.         |
| Memory  | `4096 MiB`                                                                                                                             | Windows 11's minimum. Each clone can change it.                                         |
| Network | Bridge `vmbr0`, model `VirtIO`                                                                                                         | VirtIO is the fastest virtual network card. Windows needs the VirtIO driver to see it. |

## Step 2: Install Windows 11

1. Start the VM, open the `Console`, and press a key when it says `Press any key to boot from CD`. It times out quickly, so be ready.
1. Pick `Windows 11 Pro`, then `Custom: Install Windows only`.
1. The disk list will be empty. Click `Load driver > Browse`, open the VirtIO CD, and choose `vioscsi\w11\amd64`. The disk then appears. Skip loading the network driver for now.
1. During setup, if it insists on a Microsoft account or internet, press `Shift+F10` and run `start ms-cxh:localonly` to get a local account. Use a throwaway name like `setup`; each clone creates its own account later.
1. After the first login, open the VirtIO CD in File Explorer and run `virtio-win-guest-tools.exe`. That installs the network driver, balloon driver, and the Qemu guest agent. Once it finishes, Proxmox should show the VM's IP on the `Summary` tab.

## Step 3: Base Setup

Run Windows Update until nothing is left, rebooting as needed. Everything installed now ends up in every clone, so this is also the place for tools every Windows VM should have.

To be able to SSH into clones, install OpenSSH from an admin PowerShell. The first command shows whether the client and server are already installed:

```powershell
Get-WindowsCapability -Online | Where-Object Name -like 'OpenSSH*'
Add-WindowsCapability -Online -Name OpenSSH.Client~~~~0.0.1.0
Add-WindowsCapability -Online -Name OpenSSH.Server~~~~0.0.1.0
```

Then set `sshd` to start automatically. Installing the server normally adds a firewall rule for port 22; the second line only creates one if it's missing:

```powershell
Set-Service -Name sshd -StartupType Automatic
if (-not (Get-NetFirewallRule -Name OpenSSH-Server-In-TCP -ErrorAction SilentlyContinue)) { New-NetFirewallRule -Name OpenSSH-Server-In-TCP -DisplayName "OpenSSH Server (sshd)" -Enabled True -Direction Inbound -Protocol TCP -Action Allow -LocalPort 22 }
```

Windows 11 also goes to sleep when it's idle, which pauses the VM and anything running on it. Turn sleep and hibernate off:

```powershell
powercfg /change standby-timeout-ac 0
powercfg /change hibernate-timeout-ac 0
```

Don't install Microsoft Store app updates or sign in to the Store. Sysprep fails if an app has been updated for one user but not provisioned for all users.

## Step 4: Sysprep and Convert to a Template

Sysprep strips out what has to be unique per machine (the security ID, computer name, and hardware-specific state) and makes the next boot run the out-of-box setup. Unmount both ISOs first (`Hardware > CD/DVD Drive > Do not use any media`), then in an admin PowerShell:

```powershell
C:\Windows\System32\Sysprep\sysprep.exe /generalize /oobe /shutdown
```

If it fails, the reason is in `C:\Windows\System32\Sysprep\Panther\setupact.log`. The usual culprit is a Store app; the log names the package, and `Remove-AppxPackage` for it followed by another Sysprep run fixes it.

Once the VM has shut down, don't start it again. Starting it would run the out-of-box setup and undo the generalize. In Proxmox, right-click `win11-base` and choose `Convert to template`.

## Step 5: Clone a VM from the Template

1. Right-click the template, choose `Clone`, set `Mode: Full Clone`, and give it a name. A full clone is a standalone copy, so it doesn't depend on the template.
1. With the clone powered off, set its CPU and RAM in the `Hardware` tab. The template's sizes are only a starting point.
1. Start the clone and open the `Console`. Windows runs the out-of-box setup: pick the region and keyboard, and create the clone's local account (`Shift+F10` and `start ms-cxh:localonly` work here too).

After the first login, open an admin PowerShell.

**Remove the setup account.** Sysprep keeps local accounts, so the template's `setup` account is still there. Signed in as the clone's new account, remove it:

```powershell
Get-LocalUser
Remove-LocalUser -Name setup
```

**Check SSH.** The server was installed in the template, so it should already be running:

```powershell
Get-Service sshd
```

**Activate Windows.** Each clone is its own Windows install and needs its own activation. Enter its product key under `Settings > System > Activation`.

**Rename it and reboot.** Sysprep gave the clone a random name:

```powershell
Rename-Computer <hostname> -Restart
```

**Reserve the IP and connect.** Add a DHCP reservation for the clone's MAC (shown under `Hardware > Network Device`) on the router so its IP never changes. Enabling Remote Desktop (`Settings > System > Remote Desktop`) makes the rest much easier, since you can work from your PC instead of the noVNC console. Or SSH in from your PC:

```bash
ssh <username>@<ip>
```

Repeat this step for every new Windows VM.

## References

- [Proxmox VE: Qemu/KVM Virtual Machines](https://pve.proxmox.com/wiki/Qemu/KVM_Virtual_Machines)
- [Proxmox VE: Windows VirtIO Drivers](https://pve.proxmox.com/wiki/Windows_VirtIO_Drivers)
- [Microsoft: Sysprep (Generalize) a Windows installation](https://learn.microsoft.com/windows-hardware/manufacture/desktop/sysprep--generalize--a-windows-installation)
- [Windows 11 system requirements](https://www.microsoft.com/windows/windows-11-specifications)
- [Proxmox VM: Ubuntu Server 26.04 Template and Setup](/programming/proxmox-ubuntu-server-2604-vm-template)
