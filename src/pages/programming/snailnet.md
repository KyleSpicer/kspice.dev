---
layout: ../../layouts/MarkdownTutorial.astro
title: "SnailNet: A Windows TCP Proxy for Testing High-Latency Links"
description: Introducing SnailNet v1.0.0, a lightweight Win32 TCP proxy I wrote that injects configurable latency into a connection.
---

# SnailNet: A Windows TCP Proxy for Testing High-Latency Links

Date Created: 11-24-2026

Introducing SnailNet v1.0.0, a lightweight Win32 TCP proxy I wrote that injects configurable latency into a connection. It is open source under the MIT license, and the code is on my [GitHub](https://github.com/KyleSpicer/SNAILNET).

![SnailNet logo](../../tutorials-notes/snailnet/snailnet-logo.png)

## Table of Contents
1. [Overview](#overview)
    1. [What is SnailNet?](#what-is-snailnet)
    1. [Why build it?](#why-build-it)
1. [Download](#download)
1. [How It Works](#how-it-works)
1. [Using the Window](#using-the-window)
1. [Command Line Mode](#command-line-mode)
1. [Example: Local Loopback with ncat](#example-local-loopback-with-ncat)
1. [Limits Worth Knowing](#limits-worth-knowing)
1. [Building from Source](#building-from-source)
1. [Demo](#demo)
1. [References](#references)

## Overview

### What is SnailNet?

**SnailNet** is a small Windows TCP proxy that I designed, wrote, and released on November 14, 2026. It holds traffic back by a fixed number of milliseconds. You put it between a client and a server to see how software behaves over a slow or high-latency link, without changing the network or either program. It is written in C against Winsock2, has no dependencies beyond the Windows SDK, and ships as a single executable with both a GUI and a headless command line mode.

### Why build it?

Software that works well on a fast local network can behave very differently over a slow link: timeouts fire, retries pile up, and UIs freeze while they wait on a response. To test that properly, you need a way to slow a connection down on purpose, so I built SnailNet to do it with one `.exe`. There is no installer, no driver, and nothing to change on the network. You point your client at SnailNet instead of the real server and choose how long to delay the traffic.

## Download

Grab the latest release from the [SnailNet GitHub Releases page](https://github.com/KyleSpicer/SNAILNET/releases). Each release includes:

- `SnailNet.exe`: the program itself, with no installer or Visual C++ redistributable required
- `userguide.pdf`: the full User Guide
- `cli-report.html`: the command line test report from CI

**Requirements:** Windows 10 or later, 64-bit. It has been tested on Windows 11 Pro 25H2 and Windows 10 Pro 22H2.

Windows may show a SmartScreen prompt the first time you run it. Choose **More info**, then **Run anyway**.

## How It Works

SnailNet sits between a client and a real server. The client connects to SnailNet's **listen** address instead of the real one. SnailNet then opens its own connection to the **target** and forwards bytes between the two.

```text
     client                  SnailNet                  target
                       listen          forward
                       address         to target

        ------------------------------------------------->
                         forwarded at once

        <-------------------------------------------------
                    held for the latency, then forwarded
```

By default the delay is **one way**: only traffic heading back to the client is held, so a request and response exchange pays the latency once. You can change which direction is held:

| Delay applied | What is held | Use it to see |
|---|---|---|
| To client (default) | Replies on their way back to the client | How a client copes with a slow server or a slow download |
| To target | Requests on their way out to the target | How a server copes with a slow client, slow uploads, and its own timeouts |
| Both ways | Each direction, for the full latency | A link that is slow both ways, so a round trip pays the latency **twice** |

Each client that connects gets its own connection to the target, so several clients can be relayed at once without affecting each other's timing.

## Using the Window

Double-click `SnailNet.exe` (or run it with no arguments) to open the window. On the **Relay** tab, fill in six fields:

| Field | Meaning | Default |
|---|---|---|
| Listen address | Where SnailNet accepts connections. `127.0.0.1` keeps it on this machine; `0.0.0.0` accepts connections from the network | `127.0.0.1` |
| Listen port | The port your client connects to | `8080` |
| Target address | The real server, as an IP address or hostname | `127.0.0.1` |
| Target port | The real server's port | `80` |
| Latency (ms) | How long held traffic is delayed. `0` makes SnailNet a plain relay | `250` |
| Delay applied | **To client**, **To target**, or **Both ways** | To client |

Press **Start**, then point your client at the listen address and port. The status block shows the current settings, active and total session counts, and the reason for any error, such as a port that is already in use.

## Command Line Mode

Running `SnailNet.exe` with any argument starts the relay directly in the terminal, with no window:

```console
SnailNet.exe --listen-port 8080 --target-addr 127.0.0.1 --target-port 9000 --latency 250
```

Every flag has a short form, so this does the same thing:

```console
SnailNet.exe -lp 8080 -ta 127.0.0.1 -tp 9000 -d 250
```

| Flag | Meaning | Default |
|---|---|---|
| `-la`, `--listen-addr <address>` | Where SnailNet accepts connections | `127.0.0.1` |
| `-lp`, `--listen-port <port>` | The port your client connects to | `8080` |
| `-ta`, `--target-addr <address>` | The real server | `127.0.0.1` |
| `-tp`, `--target-port <port>` | The real server's port | `80` |
| `-d`, `--latency <ms>` | How long held traffic is delayed | `250` |
| `-dd`, `--delay-dir <direction>` | `client`, `target`, or `both` | `client` |
| `-h`, `-?`, `--help` | Show the flags and exit | |

Press **Ctrl+C** to stop. The exit code is `0` for a clean stop and `1` for a bad argument or a failure, so scripts can check `$LASTEXITCODE` (PowerShell) or `%ERRORLEVEL%` (cmd).

## Example: Local Loopback with ncat

This uses [ncat](https://nmap.org/ncat/), which comes with Nmap, as both the client and the server, so you can see the delay without a real application.

1. Start a listener to act as the real server:

    ```console
    ncat -l 9000 --keep-open
    ```

1. Start SnailNet with a two-second delay:

    ```console
    SnailNet.exe --listen-port 8080 --target-port 9000 --latency 2000
    ```

1. Connect a client to SnailNet's **listen** port, not the real server:

    ```console
    ncat 127.0.0.1 8080
    ```

1. Type in the client window and the text reaches the server instantly. Type in the server window and it takes two seconds to reach the client. That is the one-way delay.

1. Restart SnailNet with `--delay-dir target` to flip it. Now the client's text takes two seconds to reach the server and the replies come back at once.

The [User Guide](https://github.com/KyleSpicer/SNAILNET/blob/main/Docs/userguide.md) also walks through a remote example, with an Ubuntu client reaching SnailNet on a Windows machine across the LAN.

## Limits Worth Knowing

- **TCP only.** UDP traffic is not relayed.
- **The delay is fixed.** There is no jitter, packet loss, or bandwidth shaping.
- **A long delay limits throughput.** SnailNet holds at most 1 MB of delayed data per direction, per connection, so throughput tops out around 1 MB divided by the latency in seconds: about 4 MB/s at 250 ms and 0.5 MB/s at 2000 ms.
- **Stop drops in-flight data.** Anything still held when you press Stop or Ctrl+C is discarded.
- **Prefer `127.0.0.1` to `localhost`.** Windows resolves `localhost` to IPv6 `::1` first, which can add about two seconds to each connection or cause refused clients.

## Building from Source

SnailNet builds with Visual Studio 2026 (toolset `v145`) and the **Desktop development with C++** workload. The end-to-end test suite needs Python 3.11+ and Poetry.

```console
git clone https://github.com/KyleSpicer/SNAILNET.git
cd SNAILNET
pre-commit install

cd SnailNet
msbuild SnailNet.slnx /p:Configuration=Release /p:Platform=x64

cd ..\Tests
poetry install
poetry run pytest
```

The executable lands in `SnailNet/Build/x64/Release/SnailNet.exe`. If `msbuild` isn't found, use a **Developer PowerShell for VS 2026** instead of a plain terminal. See the [Developer Guide](https://github.com/KyleSpicer/SNAILNET/blob/main/Docs/developerguide.md) for the architecture, coding conventions, and how to contribute.

## Demo

[SnailNet YouTube Demonstration](https://youtu.be/Uz3TkmvdeTM?si=CJbAqyPzyHt6NEU8)

## References

1. [SnailNet GitHub Repository](https://github.com/KyleSpicer/SNAILNET)
1. [SnailNet Releases](https://github.com/KyleSpicer/SNAILNET/releases)
1. [SnailNet User Guide](https://github.com/KyleSpicer/SNAILNET/blob/main/Docs/userguide.md)
1. [SnailNet Developer Guide](https://github.com/KyleSpicer/SNAILNET/blob/main/Docs/developerguide.md)
1. [ncat](https://nmap.org/ncat/)
