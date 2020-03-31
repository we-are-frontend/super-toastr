# super-toastr
**super-toastr** is a Javascript library for non-blocking notifications.
The difference between this library and others is that all toast notifications 
stack at the same spot in the screen and you can then navigate all toasts that are stacked.

# Current Version
0.0.11

# Browser support
It's fully tested with chrome. Minimum tests was done for now in IE11, EDGE it should be working fine.
More effort will be done in the futur to add automated tests and test more with all browsers.

# Demo
- Demo https://we-are-frontend.github.io/super-toastr/

# Install

## CDN
/* temporary - none minified */
https://github.com/we-are-frontend/super-toastr/blob/master/dist/super-toastr.bundle.js

## npm
```
npm i --save super-toastr
```

## yarn
```
yarn add super-toastr
```

# Usage Overview
- step 1

add a div with this html and style at the end of your body tag.
```
<div id="toasts-container-1" style="z-index: 999999; pointer-events: none; display: flex; position: fixed; top: 0; left: 0; width: 100%; height: 100%;">
</div>
```

- step 2

If you can import, just do:
```
import { createToaster } from `super-toastr`;
...
var instance = createToaster('toasts-container-1');
```

OR 

as in the demo inside `index.html` in the root of the git repo, you can import from cdn the file and use a global variable `SuperToastrLib`: 

```
var instance = SuperToastrLib.createToaster('toasts-container-1');
```

IMPORTANT: the param of createToaster call `toasts-container-1` must match the id of the div in step 1

- step 3

Using the instance created in step 2, you can check the API section to add/remvoe toasts etc...

# API

## public methods

| Method            | Return                         | Params           | Description                                                                                                                                     |
| ----------------- | ------------------------------ | ----------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| addToast          | toast id                      | Toast config             | add a new toast notification                                |                                                                                                                     |
| removeToastById   | new toast id diplayed or null                         | Toast id              | remove a toast notification                                                                                                             |
| removeAllToasts   |                          |               | Remove all toast notifications                                                                                                    |
| removeAllToastTypes   |                          |     array of types          | Remove all toast notifications by types                                                                                                |
| nextToast         |                                |                   | navigate to the next toast     
| previousToast     |                                |                   | navigate to the previous toast   

## toast config 
Please refer to demo bottom section to get the config for your toast

## customize toast UI
You can add a content as HTML inside the config

# Contributing
To do a fix or add a feature:
1. ``` yarn start ```
2. 'http://localhost:8080' in your browser to check the demo live
3. You can update the file `./super-toastr.js` and  you 'll see your change by refreshing your browser

