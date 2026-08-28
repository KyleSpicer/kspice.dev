---
layout: ../../layouts/MarkdownTutorial.astro
title: "Sensor Watch Build: Casio F-91W for TOTP"
description: How to build a Sensor Watch firmware for your personal 2FA TOTP Keys.
---

# Sensor Watch Build: Casio F-91W for TOTP

Date Created: 08-27-2026

How to build a Sensor Watch firmware for your personal 2FA TOTP keys.

## Table of Contents
1. [Overview](#overview)
    1. [What is Sensor Watch?](#what-is-sensor-watch)
    1. [What is TOTP](#what-is-totp)
    1. [Why TOTP on a watch](#why-totp-on-a-watch)
1. [Hardware Requirements](#hardware-requirements)
1. [Software Requirements](#software-requirements)
    1. [Download Sensor Watch Source Code](#download-sensor-watch-source-code)
    1. [Install Emulator For Testing](#install-emulator-for-testing)
1. [Adding Personal Keys to Movement Library Walkthrough](#adding-personal-keys-to-movement-library-walkthrough)
    1. [Configure Desired Watch Faces](#configure-desired-watch-faces)
    1. [Add Personal TOTP Secrets](#add-personal-totp-secrets)
1. [Compile Test and Firmware Builds](#compile-test-and-firmware-builds)
    1. [Compile and Test](#compile-and-test)
    1. [Compile Firmware](#compile-firmware)
1. [Assembly and Disassembly](#assembly-and-disassembly)
1. [Flashing the Firmware](#flashing-the-firmware)
1. [Demo](#demo)
1. [References](#references)


## Overview

### What is Sensor Watch?

**Sensor Watch** is a drop-in replacement board for the classic **Casio F-91W/A158W** wristwatch that swaps the original quartz movement for a modern ARM microcontroller while keeping the iconic case and display. It's paired with **Movement**, an open-source community firmware framework written in C, which lets you pick and customize watch faces, build your own firmware, test it in a browser-based emulator, and flash it to the watch over USB with a simple drag-and-drop.

### What is TOTP?

**TOTP (Time-based One-Time Password)** is the algorithm behind the 6-digit codes in authenticator apps. When you enroll, the service (Google, for example) generates a shared secret key and hands it to you via the QR code or the text setup key, and that secret then lives on both Google's servers and your device. Each side independently **computes a code by hashing the secret with the current time, rounded to a 30-second window, so both arrive at the same 6 digits without ever communicating.** When you log in, Google just checks that your code matches its own calculation. Because the code depends on the time, it expires as the window rolls over, which is also why a device with the right secret but a wrong clock produces codes that look valid yet get rejected.

### Why TOTP on a watch?

Putting **TOTP** on a dumb watch solves a real gap in secure environments: two-factor authentication usually assumes you have your phone, but in a SCIF or other secured facility, personal phones are not permitted. A **Sensor Watch** has none of the properties that make phones prohibited. There is no camera, no microphone, no Wi-Fi, no Bluetooth, and no storage or transmission capability beyond a segment LCD and a coin cell battery. The codes are computed entirely on-wrist from a stored secret and the clock, requiring no network connection at all, which means you can still authenticate to accounts that mandate 2FA without stepping out to retrieve your phone. It is also always on, runs for a year on a battery, and looks like the ordinary Casio it is, making it a practical everyday token rather than another gadget to manage.

## Hardware Requirements

- [Casio F91W Watch - Amazon](https://amzn.to/4xc9YBF)
- [Sensor Watch Lite Hardware](https://www.crowdsupply.com/oddly-specific-objects/sensor-watch)
- A usb-b cable

## Software Requirements

For this walkthrough, I used WSL2 (Ubuntu 24.04) on a Windows 11 Pro machine.

### Download Sensor Watch Source Code

```sh
git clone https://github.com/joeycastillo/Sensor-Watch.git
cd Sensor-Watch
git submodule update --init --recursive
```

### Install Emulator For Testing

The emulator Emscripten is used to test firmware builds before flashing hardware.

NOTE: The `source` line only applies to the current shell. Re-run or add to `~/.bashrc` if desired.

```sh
git clone https://github.com/emscripten-core/emsdk.git
cd emsdk
./emsdk install latest
./emsdk activate latest
source ./emsdk_env.sh
```

**NOTE:** You must `source ./emsdk_env.sh` in every new shell instance.

## Adding Personal Keys to Movement Library Walkthrough

The following steps are what I did to add my personal secret keys to the code base before compiling and creating the firmware. The **Movement** library has dozens of possible watch faces, but for this tutorial I kept it minimal

### Configure Desired Watch Faces

In the **Movement** source code edit `movement/movement_config.h` and replace `watch_faces[]` array:

```c
const watch_face_t watch_faces[] = {
    simple_clock_face,   // standard watch
    totp_face,           // 2FA codes
    stopwatch_face,      // stopwatch
    preferences_face,    // settings (12/24h, LED, etc.)
    set_time_face,       // change clock
};
```

### Add Personal TOTP Secrets

In the **Movement** library, edit the `Sensor-Watch/movement/watch_faces/complication/totp_face.c` file with the following:

```c
static totp_t credentials[] = {
    CREDENTIAL(GO, "YOURGOOGLESECRETBASE32HERE", SHA1, 30),
    CREDENTIAL(GH, "YOURGITHUBSECRETBASE32HERE", SHA1, 30),
    CREDENTIAL(MD, "YOURMALDEVSECRETBASE32HERE", SHA1, 30),
};
```

- NOTE: All secret keys must be uppercase and with no spaces.
- NOTE: Each site has different methods of retrieving your generated authentication secret.

## Compile Test and Firmware Builds

After updating source code, you can now compile and test the build using `make`.

### Compile and Test

```sh
cd Sensor-Watch/movement/make
source path-to/emsdk/emsdk_env.sh   # if not already done this session
emmake make COLOR=BLUE
python3 -m http.server -d build-sim 8000
```

```sh
# To clean and rebuild
emmake make clean COLOR=GREEN
```

NOTE: For emulator builds, I could not get the `COLOR=GREEN` LED build working so I tested with BLUE. For the actual firmware build, `COLOR=GREEN` worked as expected.

### Compile Firmware

The actual watch firmware will be placed in `Sensor-Watch/movement/make/build` and is named `watch.uf2`

To compile the actual watch firmware, follow these steps:

```sh
cd Sensor-Watch/movement/make
make COLOR=GREEN
```

## Assembly and Disassembly

I used the [Sensor Watch Video Walkthrough](https://youtu.be/Zr0pKeC2VFU?si=-UmsYUvwNdbv6OYb) for step-by-step disassembly and reassembly.

## Flashing the Firmware

Once you have your `watch.uf2` firmware file, follow these steps to flash your drive.

1. Connect Sensor Watch board to computer using **usb-b** cable.
1. Double-tap the **RESET** button on the Sensor Watch board. (The LED will stay illuminated.)
1. Find the `WATCHBOOT` removable drive, then drag and drop the `watch.uf2` file into the `WATCHBOOT` drive.
1. That's it! The firmware is now flashed onto the Sensor Watch chip.
1. Reassemble the watch.
1. Set the Year, Month, Day
1. Set the proper time zone for your location.
1. Use a world timer to set the time as accurately as possible. I used [Seconds Clock](https://secondsclock.com/)
1. Verify your TOTPs on your watch match with your authenticator app.

## Demo

This demo video shows the complete firmware and cycling through my Google, Maldev Academy, and GitHub TOTP codes.

<video controls width="100%">
  <source src="/videos/tutorials/sensor-watch-totp-demo.mp4" type="video/mp4" />
</video>

## References

1. [Sensor Watch Website](https://www.sensorwatch.net/)
1. [Sensor Watch Crowd Supply](https://www.crowdsupply.com/oddly-specific-objects/sensor-watch)
1. [Sensor Watch Assembly Video](https://youtu.be/Zr0pKeC2VFU?si=-UmsYUvwNdbv6OYb)
1. [Sensor Watch Source Code by Joey Castillo](https://github.com/joeycastillo/Sensor-Watch.git)
1. [Sensor Watch Docs](https://www.sensorwatch.net/docs/)
1. [Seconds Clock](https://secondsclock.com/)