# ELIF - A VS Code Extension

ELIF is a vscode extension that makes your vscode application more interactive and intelligent. With ELIF, your theme will adapt based on the sun position in your place. In addition, you will become healthier with the ELIF reminders and more productive with GitHub management all in one place and calendar reminders. ELIF is your assistant for a better vscode experience. 

## Features

### 1 - Set Reminders with ELIF

ELIF offers a functionality to set reminders within VS Code without changing windows. To make things easier for the user, the reminders can be written in natural language with the time mentioned.

*For example:*

- Drink water in 1 hour
- Attend meeting in 30 minutes

#### Recurring Reminders

To make the reminders recurring, one needs to add the word "repeat" after the reminder.

*For example:*

- Drink water in 1 hour repeat
- Attend meeting in 30 minutes repeat

This will make the reminder recurring and the user will receive an alert every 1 hour to drink water.

#### How does it work?

To detect the natural language while setting the reminders, we made use of SherlockJs, which is a natural language parser for JavaScript.
We also made use of the date-fns library which provides a simple tool set for manipulating JavaScript dates.
After getting the reminder input from the user, we parse it using SherlockJs to get the event title and the event time. We then set the timer for the reminder starting from the local time and notify the user at the time of the reminder.

#### Screenshots

<img src="https://user-images.githubusercontent.com/51206050/128220011-098c5fa7-e1a5-45c1-9211-ee29af977458.png" width="500" class="jop-noMdConv"> 
<img src="https://user-images.githubusercontent.com/51206050/128220040-0f9585f6-ebe1-4613-88c2-0e2ff846480d.png" width="500" class="jop-noMdConv">


### 2 - Change Theme with ELIF

Elif can switch your theme automatically between dark and light based on the position of the sun at your own place. When it gets dark at your place, ELIF protects your eyes by switching to your dark theme. When the sun comes back, ELIF switches the lights back for you with your prefered light theme.

#### How does it work?

Simply switch the “Change Theme Automatically” button and all will be set.  

#### Screenshots

<img src="https://user-images.githubusercontent.com/51206050/129241648-fcfe4842-4559-49f7-9655-db63f4d5b139.PNG" width="500" class="jop-noMdConv"> 
<img src="https://user-images.githubusercontent.com/51206050/129241657-d61bf7df-da1f-41c8-89ba-49dd8fa76978.PNG" width="500" class="jop-noMdConv">



### 3 - Manage your Github with ELIF

ELIF provides the user with the facility to manage their GitHub notifications. The user can authenticate with Github and create issues from the extension itself. They also have the option to fetch all the comments on a particular issue in a specified interval of time.

#### How does it work?
  

#### Screenshots


## Future Scope

The future scope of ELIF includes the addition of new features to make the life of a developer easier. Some of such features are,

### 1. Manage your meetings with ELIF
This feature will change the vscode theme 5-10 mins before any scheduled meeting. We'll provide the integration with Google & Apple Calendar. Users will have the option to customise the application and decide the color to which the theme should be changed.

### 2. Play Music with ELIF
This feature will allow the user to select and play music while developing without changing any windows. This will help the user concentrate better and be more productive.

## Resources

- https://github.com/neilgupta/Sherlock
- https://date-fns.org/
- https://github.com/cg-cnu/vscode-remind-me



<hr>

## Requirements

If you have any requirements or dependencies, add a section describing those and how to install and configure them.

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `myExtension.enable`: enable/disable this extension
* `myExtension.thing`: set to `blah` to do something

## Known Issues

Calling out known issues can help limit users opening duplicate issues against your extension.

## Release Notes

Users appreciate release notes as you update your extension.

### 1.0.0

Initial release of ...

### 1.0.1

Fixed issue #.

### 1.1.0

Added features X, Y, and Z.

-----------------------------------------------------------------------------------------------------------
## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

* [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

**Note:** You can author your README using Visual Studio Code.  Here are some useful editor keyboard shortcuts:

* Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux)
* Toggle preview (`Shift+CMD+V` on macOS or `Shift+Ctrl+V` on Windows and Linux)
* Press `Ctrl+Space` (Windows, Linux) or `Cmd+Space` (macOS) to see a list of Markdown snippets

### For more information

* [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
* [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)



**Enjoy!**
