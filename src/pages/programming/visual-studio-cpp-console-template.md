---
layout: ../../layouts/MarkdownTutorial.astro
title: Visual Studio Template from Configured C/C++ Console App
description: How to create a new C/C++ console app, adjust personal settings, add .clang-format, and convert to template for repeated use.
---

# Visual Studio Template from Configured C/C++ Console App

Date Created: 05-05-2026

## Overview

The purpose of this writeup is to document how I configure a simple C project and generate a reusable template for future projects. This tutorial will go over creating a C/Cpp Console App, adjusting default settings to better fit my needs, adding C/C++ formatting files to keep code consistent, and finally exporting the skeleton project to a Visual Studio template for repeated use.

## Table of Contents

1. [Create a new C/C++ console app](#create-a-new-cc-console-app)
1. [Adjust Project Settings](#adjust-project-settings)
    - [Add Main.c and sample source code](#add-mainc-and-sample-source-code)
    - [Update Default Output and Intermediate Directories](#update-default-output-and-intermediate-directories)
1. [Add .clang-format](#add-clang-format)
1. [Export as a Visual Studio template](#export-as-a-visual-studio-template)
1. [Using the template](#using-the-template)
1. [References](#references)

## System Requirements

- IDE Version: Microsoft Visual Studio 2022 Version 17.14.14.
- OS Version: Windows 11 Pro  

## Create a new C/C++ console app

Below are the steps to create a new Visual Studio C/C++ console app:

1. Open Visual Studio IDE
2. Select **Create New Project**
3. Search for `cpp console app` and select the proper project, then click **Next**.
    ![Search for cpp console app](../../tutorials-notes/visual-studio-cpp-console-template/1-search-cpp-console-app.png)
4. Configure the Template Project Settings, the click **Create**
    ![Configure template project settings](../../tutorials-notes/visual-studio-cpp-console-template/2-save-project-template-name.png)
5. Visual Studio IDE will then open your default `CppTemplate` project with the generic `Hello World` written in Cpp.

## Adjust Project Settings

### Add Main.c and sample source code

1. Rename `CppTemplate.c` file to `Main.c`
2. Replace the contents of the new `Main.c` with the following code: 
    ```c
    #include <Windows.h>

    INT wmain(INT iArgc, PWCHAR* pwcArgv)
    {
        return 0;

    } /* wmain */

    /* end of file */
    ```
3. Your project should look similar to the following image:
    ![Basic Project Setup](../../tutorials-notes/visual-studio-cpp-console-template/3-basic-main.png)

### Update Default Output and Intermediate Directories

By default, when Visual Studio builds your programs, the x64|x86 directories are created separately and placed next to the project settings files. Once you expand your project to include multiple static libraries, etc., the generated files are scattered all throughout your repository. I prefer to alter two project settings (Output Directory, Intermediate Directory) placing all generated build files into the same path for easy use and cleanup.

1. Navigate to the Solution Explorer and right click `CppTemplate` project.
1. Click `properties`
1. Ensure `All configurations` is selected, if this is your preference.
1. Update `Configuration Properties > General > Output Directory` to the following
    
    ```c
    $(ShortProjectName)Build\$(Platform)\$(Configuration)\
    ```
1. Update `Configuration Properties > General > Intermediate Directory` to the following: 
    
    ```c
    $(ShortProjectName)Build\Intermediate\$(Platform)\$(Configuration)\
    ```

1. Click `Apply` and now you project will place all build artifacts in a single folder and subfolder for easy use later on.

![Example with Output and Intermediate Directory Paths updated](../../tutorials-notes/visual-studio-cpp-console-template/4-output-directories.png)

### Add Build Hardening with Warning Level 4 and Address Sanitizer

1. Right click the `CppTemplate` project and select `properties`
1. Ensure `All Configurations` is selected
1. Update `Configuration Properties > C/C++ > Warning Level` to `Warning Level 4`
1. Update `Configuration Properties > C/C++ > Enable Address Saniter` to `Yes (/fsanitize=address)`

![Example update build hardening](../../tutorials-notes/visual-studio-cpp-console-template/5-c-settings-update.png)

## Add `.clang-format`

## Export as a Visual Studio template

## Using the template

## References
