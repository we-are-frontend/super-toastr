(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["SuperToastrLib"] = factory();
	else
		root["SuperToastrLib"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./super-toastr.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./super-toastr.js":
/*!*************************!*\
  !*** ./super-toastr.js ***!
  \*************************/
/*! exports provided: createToaster */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createToaster", function() { return createToaster; });
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function getToastId(toasterId, toastType, toastCounter) {
  return toasterId + '#' + toastType + '#' + toastCounter;
}

var SuperToastr =
/*#__PURE__*/
function () {
  function SuperToastr(instanceId) {
    _classCallCheck(this, SuperToastr);

    this.instanceId = instanceId;
    this.counter = 0;
    this.toastIds = [];
    this.currentToastID = null;
    this.total = {
      errors: 0,
      warnings: 0,
      success: 0
    };
    this.positions = {
      top_right: 'top_right',
      bottom_right: 'bottom_right',
      bottom_left: 'bottom_left',
      top_left: 'top_left',
      top_full_width: 'top_full_width',
      bottom_full_width: 'bottom_full_width',
      top_center: 'top_center',
      bottom_center: 'bottom_center'
    };
  }

  _createClass(SuperToastr, [{
    key: "removeAllToasts",
    value: function removeAllToasts() {
      this.toastIds.forEach(function (toastId) {
        var toastElement = document.getElementById(toastId + '');
        toastElement.remove();
      });
      this.toastIds = [];
    }
  }, {
    key: "removeToastById",
    value: function removeToastById(toastIdToRemove) {
      if (this.currentToastID !== toastIdToRemove) {
        var _oldToast = document.getElementById(toastIdToRemove + '');

        if (_oldToast) {
          _oldToast.remove();

          var r = this.toastIds.filter(function (item) {
            return item != toastIdToRemove;
          });
          this.toastIds = r;
          this.updateCounter();
        }

        return this.currentToastID;
      }

      var oldToast = document.getElementById(toastIdToRemove + '');

      if (oldToast) {
        var currentToastIndex = this.toastIds.findIndex(function (element) {
          return element === toastIdToRemove;
        });

        if (currentToastIndex > 0) {
          this.currentToastID = this.toastIds[currentToastIndex - 1];
        } else if (this.toastIds.length > 1) {
          this.currentToastID = this.toastIds[currentToastIndex + 1];
        } else {
          this.currentToastID = null;
        } // remove


        oldToast.remove();

        var _r = this.toastIds.filter(function (item) {
          return item != toastIdToRemove;
        });

        this.toastIds = _r; // show new if needed

        if (this.currentToastID) {
          var newNodeToastToRender = document.getElementById(this.currentToastID + '');
          newNodeToastToRender.style.zIndex = '102';
          newNodeToastToRender.style.display = 'block';
        }

        this.updateCounter();
      }

      return this.currentToastID;
    }
  }, {
    key: "addToast",
    value: function addToast() {
      var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var __toast_id = getToastId(this.instanceId, config.type, this.counter);

      var toastElement = this.createToastContainer(__toast_id, config);
      this.addContent(toastElement, config.content || '');
      this.addNextPrevious(toastElement);

      if (config.closeBtn) {
        this.addCloseBtn(toastElement, __toast_id);
      }

      document.getElementById('toasts-container').appendChild(toastElement);
      this.updateCounter();
      return __toast_id;
    }
  }, {
    key: "nextToast",
    value: function nextToast() {
      var _this = this;

      var currentToastIndex = this.toastIds.findIndex(function (element) {
        return element === _this.currentToastID;
      });

      if (currentToastIndex + 1 < this.toastIds.length) {
        var currentDisplayedNode = document.getElementById(this.currentToastID + '');
        this.currentToastID = this.toastIds[currentToastIndex + 1];
        var newNodeToastToRender = document.getElementById(this.currentToastID + '');
        currentDisplayedNode.style.display = 'none';
        newNodeToastToRender.style.zIndex = '102';
        newNodeToastToRender.style.display = 'block';
      }
    }
  }, {
    key: "previousToast",
    value: function previousToast() {
      var _this2 = this;

      var currentToastIndex = this.toastIds.findIndex(function (element) {
        return element === _this2.currentToastID;
      });

      if (currentToastIndex - 1 > -1) {
        var currentDisplayedNode = document.getElementById(this.currentToastID + '');
        this.currentToastID = this.toastIds[currentToastIndex - 1];
        var newNodeToastToRender = document.getElementById(this.currentToastID + '');
        currentDisplayedNode.style.display = 'none';
        newNodeToastToRender.style.zIndex = '102';
        newNodeToastToRender.style.display = 'block';
      }
    }
  }, {
    key: "updateCounter",
    value: function updateCounter() {
      var _this3 = this;

      this.toastIds.forEach(function (toastId) {
        var toastIndexElement = document.getElementById(toastId + '_current-index');

        var currentToastIndex = _this3.toastIds.findIndex(function (element) {
          return element === toastId;
        });

        toastIndexElement.textContent = currentToastIndex + 1 + ' / ' + _this3.toastIds.length;
      });
    }
  }, {
    key: "getTranslation",
    value: function getTranslation(position, toastElement) {
      var translate = {};

      if (position === this.positions.top_right) {
        toastElement.style.top = '0';
        toastElement.style.right = '0';
        translate = 'translate(0, 100px)';
      } else if (position === this.positions.bottom_right) {
        toastElement.style.bottom = '0';
        toastElement.style.right = '0';
        translate = 'translate(0, -100px)';
      } else if (position === this.positions.bottom_left) {
        toastElement.style.bottom = '0';
        toastElement.style.left = '0';
        translate = 'translate(0, -100px)';
      } else if (position === this.positions.top_left) {
        toastElement.style.top = '0';
        toastElement.style.left = '0';
        translate = 'translate(0, 100px)';
      } else if (position === this.positions.top_center) {
        console.log('top_center');
        toastElement.style.top = '0';
        toastElement.style.left = '0';
        toastElement.style.right = '0';
        toastElement.style.margin = '0 auto';
        translate = 'translate(0, 100px)';
      } else if (position === this.positions.bottom_center) {
        toastElement.style.bottom = '0';
        toastElement.style.left = '0';
        toastElement.style.right = '0';
        toastElement.style.margin = '0px auto';
        translate = 'translate(0, -100px)';
      }

      return translate;
    }
  }, {
    key: "createToastContainer",
    value: function createToastContainer(toast_id, config) {
      var toastElement = document.createElement('DIV');
      var cacheID = this.currentToastID;
      toastElement.id = toast_id;
      this.toastIds.push(toast_id);
      this.currentToastID = toast_id;
      this.counter++;
      toastElement.style.position = 'absolute';
      toastElement.style.background = config.background || 'white';
      toastElement.style.borderRadius = '5px';
      toastElement.style.boxShadow = '0 2px 2px 0 rgba(0,0,0,0.14),0 3px 1px -2px rgba(0,0,0,0.12),0 1px 5px 0 rgba(0,0,0,0.2)';
      toastElement.style.padding = '20px';
      toastElement.style.zIndex = '102';
      toastElement.style.maxWidth = '250px';
      toastElement.style.minWidth = config.minWidth || '250px';
      toastElement.style.margin = '0'; // Animation to move div

      var translate = this.getTranslation(config.position, toastElement);
      var res = toastElement.animate([// keyframes
      {
        transform: 'none'
      }, {
        transform: translate
      }], {
        duration: 500,
        iterations: '1',
        fill: 'forwards'
      });
      res.addEventListener('finish', function () {
        if (cacheID) {
          var oldToast = document.getElementById(cacheID + '');
          oldToast.style.display = 'none';
        }
      }, false);
      return toastElement;
    }
  }, {
    key: "addContent",
    value: function addContent(toastElement, content) {
      toastElement.innerHTML = content;
    }
  }, {
    key: "addNextPrevious",
    value: function addNextPrevious(toastElement) {
      var _this4 = this;

      var footerElement = document.createElement('div');
      footerElement.style.display = 'flex';
      footerElement.style.flexDirection = 'row';
      footerElement.style.justifyContent = 'space-between';
      footerElement.style.padding = '5px 0 0 0'; // PREVIOUS

      var previousElement = document.createElement('div');
      previousElement.id = 'previous-arrow';
      previousElement.style.userSelect = 'none';
      previousElement.style.pointerEvents = 'auto';
      previousElement.style.paddingRight = '10px';
      previousElement.style.cursor = 'pointer';
      previousElement.addEventListener('click', function () {
        _this4.previousToast();
      }, false);
      footerElement.appendChild(previousElement); // COUNTER

      var counterElement = document.createElement('div');
      counterElement.id = toastElement.id + '_current-index';
      counterElement.style.userSelect = 'none';
      counterElement.style.fontWeight = '500';
      footerElement.appendChild(counterElement); // NEXT

      var nextElement = document.createElement('div');
      nextElement.id = 'next-arrow';
      nextElement.style.userSelect = 'none';
      nextElement.style.pointerEvents = 'auto';
      nextElement.style.paddingLeft = '10px';
      nextElement.style.cursor = 'pointer';
      nextElement.addEventListener('click', function () {
        _this4.nextToast();
      }, false);
      footerElement.appendChild(nextElement);
      toastElement.appendChild(footerElement);
    }
  }, {
    key: "addCloseBtn",
    value: function addCloseBtn(toastElement, toast_id_) {
      var _this5 = this;

      var closeElement = document.createElement('div');
      closeElement.textContent = 'X';
      closeElement.style.userSelect = 'none';
      closeElement.style.cursor = 'pointer';
      closeElement.style.pointerEvents = 'auto';
      closeElement.style.position = 'absolute';
      closeElement.style.color = 'black';
      closeElement.style.zIndex = '102';
      closeElement.style.top = '0';
      closeElement.style.right = '0';
      closeElement.style.padding = '3px';
      closeElement.addEventListener('click', function () {
        _this5.removeToastById(toast_id_);
      }, false);
      toastElement.appendChild(closeElement);
    }
  }, {
    key: "getAllToastIds",
    value: function getAllToastIds() {
      return [].concat([this.toastIds]);
    }
  }]);

  return SuperToastr;
}();

var createToaster = function createToaster(id) {
  return new SuperToastr(id);
};



/***/ })

/******/ });
});
//# sourceMappingURL=super-toastr.bundle.js.map