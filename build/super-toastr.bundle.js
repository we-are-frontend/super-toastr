var SuperToastrLib =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./super-toastr.js":
/*!*************************!*\
  !*** ./super-toastr.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

var superToastr = function superToastr(toaster_id_) {
  var toaster_id = toaster_id_;
  var counter = 0;
  var toastIds = [];
  var currentToastID = null;
  var total = {
    errors: 0,
    warnings: 0,
    success: 0
  };
  var positions = {
    top_right: 'top_right',
    bottom_right: 'bottom_right',
    bottom_left: 'bottom_left',
    top_left: 'top_left',
    top_full_width: 'top_full_width',
    bottom_full_width: 'bottom_full_width',
    top_center: 'top_center',
    bottom_center: 'bottom_center'
  };

  function updateCounter() {
    toastIds.forEach(function (toastId) {
      var toastIndexElement = document.getElementById(toastId + '_current-index');
      var currentToastIndex = toastIds.findIndex(function (element) {
        return element === toastId;
      });
      toastIndexElement.textContent = currentToastIndex + 1 + ' / ' + toastIds.length;
    });
  }

  function getTranslation(position, toastElement) {
    var translate = {};

    if (position === positions.top_right) {
      toastElement.style.top = '0';
      toastElement.style.right = '0';
      translate = 'translate(0, 100px)';
    }

    if (position === positions.bottom_right) {
      toastElement.style.bottom = '0';
      toastElement.style.right = '0';
      translate = 'translate(0, -100px)';
    }

    if (position === positions.bottom_left) {
      toastElement.style.bottom = '0';
      toastElement.style.left = '0';
      translate = 'translate(0, -100px)';
    }

    if (position === positions.top_left) {
      toastElement.style.top = '0';
      toastElement.style.left = '0';
      translate = 'translate(0, 100px)';
    }

    if (position === positions.top_center) {
      toastElement.style.top = '0';
      toastElement.style.left = '0';
      toastElement.style.right = '0';
      toastElement.style.margin = '0 auto';
      translate = 'translate(0, 100px)';
    }

    if (position === positions.bottom_center) {
      toastElement.style.bottom = '0';
      toastElement.style.left = '0';
      toastElement.style.right = '0';
      toastElement.style.margin = '0 auto';
      translate = 'translate(0, -100px)';
    }

    return translate;
  }

  var createToastContainer = function createToastContainer(toast_id, config) {
    var toastElement = document.createElement("DIV");
    toastElement.id = toast_id;
    toastIds.push(toast_id);
    currentToastID = toast_id;
    counter++;
    toastElement.style.position = 'absolute';
    toastElement.style.background = config.background || 'white'; //toastElement.style.border = '1px solid black';

    toastElement.style.borderRadius = '5px';
    toastElement.style.boxShadow = '0 2px 2px 0 rgba(0,0,0,0.14),0 3px 1px -2px rgba(0,0,0,0.12),0 1px 5px 0 rgba(0,0,0,0.2)';
    toastElement.style.padding = '20px';
    toastElement.style.setProperty("-webkit-transition", "top 5s linear");
    toastElement.style.zIndex = '102';
    toastElement.style.maxWidth = '250px';
    toastElement.style.minWidth = config.minWidth || '250px';
    toastElement.style.margin = '10px';
    var translate = getTranslation(config.position, toastElement);
    var res = toastElement.animate([{
      transform: 'translate(0)'
    }, {
      transform: translate
    }], 500);
    res.addEventListener('finish', function () {
      toastElement.style.transform = translate;
    });
    return toastElement;
  };

  var addContent = function addContent(toastElement, content) {
    toastElement.innerHTML = content;
  };

  var addNextPrevious = function addNextPrevious(toastElement) {
    var footerElement = document.createElement('div');
    footerElement.style.display = 'flex';
    footerElement.style.padding = '5px 0 0 0'; // PREVIOUS

    var previousElement = document.createElement('div');
    previousElement.innerHTML = '<';
    previousElement.style.pointerEvents = 'auto';
    previousElement.style.paddingRight = '10px';
    previousElement.style.cursor = 'pointer';
    previousElement.addEventListener('click', function () {
      self.previousToast();
    }, false);
    footerElement.appendChild(previousElement); // COUNTER

    var counterElement = document.createElement('div');
    counterElement.id = toastElement.id + '_current-index';
    footerElement.appendChild(counterElement); // NEXT

    var nextElement = document.createElement('div');
    nextElement.innerHTML = '>';
    nextElement.style.pointerEvents = 'auto';
    nextElement.style.paddingLeft = '10px';
    nextElement.style.cursor = 'pointer';
    nextElement.addEventListener('click', function () {
      console.log('next toast');
      self.nextToast();
    }, false);
    footerElement.appendChild(nextElement);
    toastElement.appendChild(footerElement);
  };

  var addCloseBtn = function addCloseBtn(toastElement, toast_id_) {
    var closeElement = document.createElement('div');
    closeElement.textContent = 'X';
    closeElement.style.cursor = 'pointer';
    closeElement.style.pointerEvents = 'auto';
    closeElement.style.position = 'absolute';
    closeElement.style.color = 'black';
    closeElement.style.zIndex = '102';
    closeElement.style.top = '0';
    closeElement.style.right = '0';
    closeElement.style.padding = '3px';
    closeElement.addEventListener('click', function () {
      var currentToastIndex = toastIds.findIndex(function (element) {
        return element === currentToastID;
      });

      if (currentToastIndex > 0) {
        currentToastID = toastIds[currentToastIndex - 1];
      } else if (toastIds.length > 1) {
        currentToastID = toastIds[currentToastIndex + 1];
      } else {
        currentToastID = null;
      }

      if (currentToastID) {
        var newNodeToastToRender = document.getElementById(currentToastID + '');
        newNodeToastToRender.style.zIndex = '102';
      }

      toastIds = toastIds.filter(function (toastId) {
        return toastId !== toast_id_;
      });
      toastElement.style.display = 'none';
      updateCounter();
    }, false);
    toastElement.appendChild(closeElement);
  };

  var self = {
    addToast: function addToast() {
      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var __toast_id = config.type + '#' + counter;

      var toastElement = createToastContainer(__toast_id, config);
      addContent(toastElement, config.content || '');
      addNextPrevious(toastElement);

      if (config.closeBtn) {
        addCloseBtn(toastElement, __toast_id);
      }

      document.getElementById('toasts-container').appendChild(toastElement);
      updateCounter();
    },
    nextToast: function nextToast() {
      console.log(' nextToast currentToastID: ', currentToastID);
      var currentToastIndex = toastIds.findIndex(function (element) {
        return element === currentToastID;
      });

      if (currentToastIndex + 1 < toastIds.length) {
        var currentDisplayedNode = document.getElementById(currentToastID + '');
        currentToastID = toastIds[currentToastIndex + 1];
        var newNodeToastToRender = document.getElementById(currentToastID + '');
        currentDisplayedNode.style.zIndex = '100';
        newNodeToastToRender.style.zIndex = '102';
      }

      console.log(' nextToast END currentToastID: ', currentToastID);
      console.log('toastIds', toastIds);
    },
    previousToast: function previousToast() {
      console.log(' previousToast currentToastID: ', currentToastID);
      var currentToastIndex = toastIds.findIndex(function (element) {
        return element === currentToastID;
      });

      if (currentToastIndex - 1 > -1) {
        var currentDisplayedNode = document.getElementById(currentToastID + '');
        currentToastID = toastIds[currentToastIndex - 1];
        var newNodeToastToRender = document.getElementById(currentToastID + '');
        currentDisplayedNode.style.zIndex = '100';
        newNodeToastToRender.style.zIndex = '102';
      }

      console.log(' previousToast END currentToastID: ', currentToastID);
    }
  };
  return self;
};

module.exports = {
  createToaster: function createToaster() {
    return superToastr();
  }
};

/***/ }),

/***/ 0:
/*!*******************************!*\
  !*** multi ./super-toastr.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./super-toastr.js */"./super-toastr.js");


/***/ })

/******/ });
//# sourceMappingURL=super-toastr.bundle.js.map