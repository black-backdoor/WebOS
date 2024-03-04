# app-window
```html
<app-window class="info" window-title="INFO">
    <h1>CONTENT</h1>
</app-window>
```

## Parameters
- window-title: The title of the window. (default: "Window")


## JS
interact with the window using the following code:

#### set the title
```javascript
document.querySelector('app-window').window_title = "Title";
```

#### get the title
```javascript
document.querySelector('app-window').window_title;
```


## Styling
> NOTE: The app-window contains some default styling. You can override the default styling.

The app-window applies default styling to itself and its children when these elements are inside the app-window.
- **iframe** (changes window background & iframe size)
