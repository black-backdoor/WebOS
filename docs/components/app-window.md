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



