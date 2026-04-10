---
layout: ../../layouts/MarkdownTutorial.astro
title: Aliases tutorial
description: Tutorial on various aliases - kspice.dev.
---

# Aliases

Date Created: 04-10-2026

How to create and use aliases in the following shell environments: bash, PowerShell, and Windows Command Prompt.

## Table of Contents

1. [Overview](#overview)
    1. [What are aliases?](#what-are-aliases)
    1. [Why do we use them?](#why-do-we-use-them)
    1. [Example Usage](#example-usage)
1. [Bash](#bash)
    1. [What is ~/.bashrc?](#what-is-bashrc)
    1. [What is ~/.bash_aliases?](#what-is-bash_aliases)
    1. [Sourcing](#sourcing)
    1. [How to Create Aliases](#how-to-create-aliases)
1. [PowerShell](#powershell)
    1. [What is $PROFILE?](#what-is-profile)
    1. [Enabling Scripts](#enabling-scripts)
    1. [Source the $PROFILE](#source-the-profile)
    1. [Aliases in PowerShell](#aliases-in-powershell)
    1. [Example Adding and Using PowerShell Aliases](#example-adding-and-using-powershell-aliases)

1. [Command Prompt](#command-prompt)
1. [References](#references)

# Overview

## What are aliases?

An alias is a short name you use instead of something longer, usually a short command that runs a longer command (in the shell), or sometimes another name for the same type or import in code.

## Why do we use them?

Programmers use aliases mainly to work faster (fewer keystrokes for commands they run all day), make fewer mistakes (less retyping of long flags and paths), and keep habits consistent (the same shortcut every time, often for Git or navigation).

## Example Usage

```bash
# alias definition to change directory to project directory
alias p="cd /home/user/Deskstop/project/"

# default location with new terminal
user@user-cpu:/home/$  

# enter alias
user@user-cpu:/home/$  p  

# alias changes directory to project repo.
user@user-cpu:/home/user/Desktop/project$    
```

# Bash

**Please Note:** Examples are using Ubuntu 24.04 environment.

## What is ~/.bashrc?

`~/.bashrc` is a shell startup file Bash reads for interactive shells. It’s where people put aliases, prompt tweaks, functions, and PATH changes so every new terminal session behaves the same.

On some systems, login shells read `~/.bash_profile` or `~/.profile` instead or first. Many distros make those files `source .bashrc` so everything still loads. If something only works in some terminals, that split is often why.

## What is .bash_aliases?

`~/.bash_aliases` is a separate file that only holds alias ... lines. Keeping aliases out of .bashrc makes the file easier to read and sometimes easier to sync between machines.

You use it by sourcing it from `.bashrc` (see below).

## Sourcing

- Sourcing loads the file in the current shell. 
- Most terminals pick up changes automatically next time they start. 
- Current terminal needs source (or close and reopen).

```bash
source ~/.bashrc
or
. ~/.bashrc
```

## How to Create Aliases

1. In your home directory, create `.bashrc` and `.bash_aliases` if the do not exist. 

    ```bash
    # Please Note: ~/.bashrc exists by default in Ubuntu 24.04.
    sudo vim ~/.bashrc && sudo vim ~/.bash_aliases
    ```
2. In `.bash_aliases`, add some aliases and save the file.
    
    ```bash
    alias d="cd /home/user/Desktop"
    alias gs="git status"
    alias v="source .venv/bin/activate"
    alias s="source ~/.bash_aliases"
    ```

3. Source the `.bash_aliases file to load the changes.

    ```bash  
    source ~/.bash_aliases
    ```

4. Use your aliases.

    - Your aliases will not be available for use in your current and future bash terminal sessions. 
    - Simply use them by entering the alias in the bash terminal.

    ```bash
    # example changing directory to Desktop using d alias
    user@user-cpu:/home/$ d
    user@user-cpu:/home/user/Desktop$
    ```

    **Optional**: In `.bashrc`, add the following snippet to always source `.bash_aliases` with new shell instance.

    ```bash
    if [ -f ~/.bash_aliases ]; then
        . ~/.bash_aliases
    fi
    ```

# PowerShell

- **Please Note:** Examples are using Windows 11 Pro and PowerShell v5.1.26100.7920
- PowerShell scripts use the `.ps1` extension.
- `$PROFILE` is your per-user startup script for that PowerShell host
- Each new terminal session loads it once
- create/edit the .ps1 at $PROFILE
-  reload with . $PROFILE
-  use functions for “aliases” that need arguments.

## What is $PROFILE?

In PowerShell, `$PROFILE` is the path to your personal profile script (a `.ps1` file). When an interactive session starts, PowerShell runs that script once for each new terminal and loads the profile (if profiles are enabled).

There are actually four profile paths (user, all users, current host, all hosts). The `$PROFILE` alone usually means current user or current host.

## Enabling Scripts

If execution policy blocks your profile from running, you’ll need an appropriate policy for your machine (often RemoteSigned for CurrentUser is enough). Without that, the profile file may exist but never run.

```ps1
# check execution policy
C:\Users\user> Get-ExecutionPolicy
Restricted

# change to allow script execution (if needed)
C:\Users\user> Set-ExecutionPolicy RemoteSigned

# validate execution policy change
C:\Users\user> Get-ExecutionPolicy
RemoteSigned
```

## Source the $PROFILE

- Source the update $PROFILE script to reload without closing the window.

```ps1
. $PROFILE  
```

## Aliases in PowerShell

The `Set-Alias` command only creates an alias to a cmdlet in the current PowerShell session, not arguments. So it’s fine for something like mapping `np` for `notepad`, but not for changing directory paths.

For anything with arguments, use a PowerShell function:

```ps1
# add to $PROFILE script
function d { Set-Location "$HOME$\Desktop"}
```

## Example Adding and Using PowerShell Aliases

```ps1
# open current user profile script
notepad $PROFILE

# add PowerShell function (alias)
function d { Set-Location "$HOME$\Desktop }

# save and source updated profile script or open a new PowerShell
. $PROFILE

# use your new alias
C:\Users\user> d
C:\Users\user\Desktop>
```

# Command Prompt

# References

1. [Bash Introduction - W3Schools](https://www.w3schools.com/bash/bash_intro.php)
1. [Bash Aliases - W3Schools](https://www.w3schools.com/bash/bash_alias.php)
1. [PowerShell Profiles - MSDN](https://learn.microsoft.com/en-us/powershell/module/microsoft.powershell.core/about/about_profiles?view=powershell-7.6)
1. [Customizing PowerShell Environment - MSDN](#https://learn.microsoft.com/en-us/powershell/scripting/learn/shell/creating-profiles?view=powershell-7.6)

<!-- Put image files in `public/images/tutorials/aliases/` (served from the site root). Reference them in Markdown like this: -->

<!-- ```markdown
![Short description of the image](/images/tutorials/aliases/your-file.png)
``` -->

