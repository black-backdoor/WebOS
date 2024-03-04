# progress-bar
```html
<progress-bar percent="82"></progress-bar>
```

## Parameters
- percent: The percentage of the progress bar. (0-100)
- bar-style: The style of the progress bar. (**round**, other)

### additional
some values can be changed via css variables

- progressbar-color: The color of the progress bar. (default: #007bff)
- progressbar-height: The height of the progress bar. (default: 1rem)
- progressbar-background: The background color of the progress bar. (default: transparent)
- progressbar-border-color: The border color of the progress bar. (default: transparent)


## JS
interact with the progress bar using the following code:

#### set the percent
```javascript
document.querySelector('progress-bar').percent = 50;
```

#### get the percent
```javascript
document.querySelector('progress-bar').percent;
```



