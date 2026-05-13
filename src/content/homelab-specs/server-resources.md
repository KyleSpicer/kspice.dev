---
title: Current Server Resources
listSummary: >-
  Inventory and current specs for the HP ProLiant DL380 Gen9.
updated: 2026-05-13
---

## Table of Contents
1. [Current Server Resources](#current-server-resources)
1. [Uninterruptible Power Supply (UPS)](#uninterruptible-power-supply-ups)
1. [References](#references)

## Current Server Resources

<table style="border-collapse:collapse;width:100%;margin:0 0 1rem;font-size:1.0625rem">
  <thead>
    <tr>
      <th style="border:1px solid var(--border, #ccc);padding:0.45rem 0.65rem;text-align:left;background:var(--bg-elevated, #f5f5f5)">Component</th>
      <th style="border:1px solid var(--border, #ccc);padding:0.45rem 0.65rem;text-align:left;background:var(--bg-elevated, #f5f5f5)">Information</th>
      <th style="border:1px solid var(--border, #ccc);padding:0.45rem 0.65rem;text-align:left;background:var(--bg-elevated, #f5f5f5)">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border:1px solid var(--border, #ccc);padding:0.45rem 0.65rem;vertical-align:center">Server</td>
      <td style="border:1px solid var(--border, #ccc);padding:0.45rem 0.65rem;vertical-align:center">HP ProLiant DL380 Gen9</td>
      <td style="border:1px solid var(--border, #ccc);padding:0.45rem 0.65rem;vertical-align:center">2U dual-socket Intel Xeon rack server.</td>
    </tr>
    <tr>
      <td style="border:1px solid var(--border, #ccc);padding:0.45rem 0.65rem;vertical-align:center">CPUs</td>
      <td style="border:1px solid var(--border, #ccc);padding:0.45rem 0.65rem;vertical-align:center">Intel(R) Xeon(R) CPU E5-2620 v3 @ 2.40GHz (2 Sockets, two physical CPUs installed)</td>
      <td style="border:1px solid var(--border, #ccc);padding:0.45rem 0.65rem;vertical-align:center">The server has two physical processors, one per socket. That is 12 physical cores in total (6 per CPU). With Hyper-Threading, each core runs two hardware threads, so the total thread count is 24.</td>
    </tr>
    <tr>
      <td style="border:1px solid var(--border, #ccc);padding:0.45rem 0.65rem;vertical-align:center">Memory (RAM)</td>
      <td style="border:1px solid var(--border, #ccc);padding:0.45rem 0.65rem;vertical-align:center">128 GB DDR4 ECC RDIMM</td>
      <td style="border:1px solid var(--border, #ccc);padding:0.45rem 0.65rem;vertical-align:center">8 x 16 GB DDR4 server RDIMMs ECC 2Rx4 (dual rank, x4 chips). <br>P/N: 809081-081</td>
    </tr>
    <tr>
      <td style="border:1px solid var(--border, #ccc);padding:0.45rem 0.65rem;vertical-align:center">Storage</td>
      <td style="border:1px solid var(--border, #ccc);padding:0.45rem 0.65rem;vertical-align:center">6 TB SSD</td>
      <td style="border:1px solid var(--border, #ccc);padding:0.45rem 0.65rem;vertical-align:center">6 x 1TB SATA 2.5-inch SSD (Crucial & PNY)</td>
    </tr>
    <tr>
      <td style="border:1px solid var(--border, #ccc);padding:0.45rem 0.65rem;vertical-align:center">Power Configuration</td>
      <td style="border:1px solid var(--border, #ccc);padding:0.45rem 0.65rem;vertical-align:center">2 x 500W hot-plug redundant PSUs. Model: 720478-B21</td>
      <td style="border:1px solid var(--border, #ccc);padding:0.45rem 0.65rem;vertical-align:center">Dual HPE Flex Slot power supplies in a 1+1 redundant setup. Each unit is rated for 500W and can be hot-swapped.</td>
    </tr>
    <tr>
      <td style="border:1px solid var(--border, #ccc);padding:0.45rem 0.65rem;vertical-align:center">Networking (NIC)</td>
      <td style="border:1px solid var(--border, #ccc);padding:0.45rem 0.65rem;vertical-align:center">Broadcom NetXtreme BCM5719, 4 x 1GbE (14e4:1657)</td>
      <td style="border:1px solid var(--border, #ccc);padding:0.45rem 0.65rem;vertical-align:center">Broadcom BCM5719 quad-port 1GbE NIC; nic1 is the active uplink and is attached to vmbr0, while nic0/nic2/nic3 are currently down.</td>
    </tr>
  </tbody>
</table>

## Uninterruptible Power Supply (UPS)

<table style="border-collapse:collapse;width:100%;margin:0 0 1rem;font-size:1.0625rem">
  <thead>
    <tr>
      <th style="border:1px solid var(--border, #ccc);padding:0.45rem 0.65rem;text-align:left;background:var(--bg-elevated, #f5f5f5)">Spec</th>
      <th style="border:1px solid var(--border, #ccc);padding:0.45rem 0.65rem;text-align:left;background:var(--bg-elevated, #f5f5f5)">Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="border:1px solid var(--border, #ccc);padding:0.45rem 0.65rem;vertical-align:center">Manufacturer</td>
      <td style="border:1px solid var(--border, #ccc);padding:0.45rem 0.65rem;vertical-align:center">Tripp-Lite</td>
    </tr>
    <tr>
      <td style="border:1px solid var(--border, #ccc);padding:0.45rem 0.65rem;vertical-align:center">Model</td>
      <td style="border:1px solid var(--border, #ccc);padding:0.45rem 0.65rem;vertical-align:center">SMART500RT1U</td>
    </tr>
    <tr>
      <td style="border:1px solid var(--border, #ccc);padding:0.45rem 0.65rem;vertical-align:center">Series</td>
      <td style="border:1px solid var(--border, #ccc);padding:0.45rem 0.65rem;vertical-align:center">AG-03AA</td>
    </tr>
    <tr>
      <td style="border:1px solid var(--border, #ccc);padding:0.45rem 0.65rem;vertical-align:center">AC Input</td>
      <td style="border:1px solid var(--border, #ccc);padding:0.45rem 0.65rem;vertical-align:center">120VAC, 60Hz, 10A</td>
    </tr>
    <tr>
      <td style="border:1px solid var(--border, #ccc);padding:0.45rem 0.65rem;vertical-align:center">AC Output</td>
      <td style="border:1px solid var(--border, #ccc);padding:0.45rem 0.65rem;vertical-align:center">120VAC, 60Hz, 4.2A — 500VA / 300W</td>
    </tr>
    <tr>
      <td style="border:1px solid var(--border, #ccc);padding:0.45rem 0.65rem;vertical-align:center">Surge-Only Output</td>
      <td style="border:1px solid var(--border, #ccc);padding:0.45rem 0.65rem;vertical-align:center">120VAC, 60Hz, 10A</td>
    </tr>
    <tr>
      <td style="border:1px solid var(--border, #ccc);padding:0.45rem 0.65rem;vertical-align:center">Total Output Current</td>
      <td style="border:1px solid var(--border, #ccc);padding:0.45rem 0.65rem;vertical-align:center">10A max</td>
    </tr>
  </tbody>
</table>

## References

- [HPE ProLiant DL380 Gen9 Server User Guide (PDF)](https://www.theserverstore.com/assets/images/HPE_c04436966_ProLiant_DL380_Gen9_Server_User_Guide-TheServerStore.pdf) - hosted copy on TheServerStore (HPE part **c04436966**).
- [Corsair DIMM Definitions](https://www.corsair.com/us/en/explorer/diy-builder/memory/dimm-vs-udimm-vs-rdimm-vs-sodimm-vs-cudimm-whats-the-difference/?srsltid=AfmBOorzvB0hWiMO86ySe8o0DUmSJQE0JwOK1T36g4ecnsNRU22CaGg3)