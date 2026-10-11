---
title: "HomeLab Blog: HomeLab Redesign and Reimplementation"
listSummary: >-
  Starting my HomeLab over from scratch to understand and document every piece in more detail.
published: 2026-10-10
---

<img src="/images/homelab/wonderland.png" alt="Wonderland Proxmox node" width="960" height="480" style="image-rendering:pixelated">

## Table of Contents

1. [Overview](#overview)
1. [Why Start Over?](#why-start-over)
1. [The Setup](#the-setup)
1. [What's Next](#whats-next)

## Overview

I'm rebuilding my HomeLab from scratch so I can understand, and document, each piece in more detail.
<br>
<br>
This server is for learning and exploring:
  - Self-hosting services with Docker
  - CI/CD pipelines in Gitea/GitHub that build Unix and Windows release packages
  - Testing in the pipeline: unit, integration, and system tests, plus quality gates
  - Deployment orchestration with Kubernetes
  - Terraform
  - Observability with OpenTelemetry and Grafana
  - Running it all in the cloud on AWS, GCP, and Azure, including identity management
  - Ludus

The goal is to learn how to build and operate products at enterprise scale, not just write capabilities.

## Why Start Over?

We recently moved from Georgia to Hawaii, and with the move I wanted to start everything fresh and document my steps for others to see and use.

## The Setup

<img src="/images/homelab/server-rack.jpg" alt="HP ProLiant DL380 Gen9 and Tripp-Lite UPS in the VEVOR 12U open frame rack" width="640" height="619">

  - **Server:** HP ProLiant DL380 Gen9
  - **Hypervisor:** Proxmox VE
  - **Kernel:** `6.17.2-1-pve`
  - **Host node:** `wonderland`
  - **Naming theme:** *Alice in Wonderland*

## What's Next

Build out the first virtual machines on `wonderland`:
  - `rabbit`: Ubuntu Server 26.04 LTS with Docker, hosting Gitea
  - `tweedledee`: Ubuntu Server 26.04 LTS runner for Unix release packages
  - `tweedledum`: Windows 11 Pro 25H2 runner for Windows release packages

The first project to get a release package will be **SNAILNET**, my Win32 API TCP latency tool. `tweedledum` will build it and publish the package to its repository's package registry in Gitea.
