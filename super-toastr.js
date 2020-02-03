class SuperToastr {
  constructor(instanceId) {
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
      top_right: "top_right",
      bottom_right: "bottom_right",
      bottom_left: "bottom_left",
      top_left: "top_left",
      top_full_width: "top_full_width",
      bottom_full_width: "bottom_full_width",
      top_center: "top_center",
      bottom_center: "bottom_center"
    };
  }

  removeAllToasts() {
    this.toastIds.forEach(toastId => {
      const toastElement = document.getElementById(toastId + '');
      toastElement.remove();
    });
    this.toastIds = [];
  }

  removeToastById(toastIdToRemove) {
    const oldToast = document.getElementById(toastIdToRemove + '');
    if (oldToast) {
      const currentToastIndex = this.toastIds.findIndex(element => {
        return element === toastIdToRemove;
      });

      if (currentToastIndex > 0) {
        this.currentToastID = this.toastIds[currentToastIndex - 1];
      } else if (this.toastIds.length > 1) {
        this.currentToastID = this.toastIds[currentToastIndex + 1];
      } else {
        this.currentToastID = null;
      }

      // remove
      oldToast.remove();
      const r = this.toastIds.filter(item => {
        return item != toastIdToRemove;
      })
      this.toastIds = r;

      // show new if needed
      if (this.currentToastID) {
        const newNodeToastToRender = document.getElementById(
          this.currentToastID + ""
        );
        newNodeToastToRender.style.zIndex = "102";
        newNodeToastToRender.style.display = 'block';
      }
        
      this.updateCounter();
    }

    return this.currentToastID;
  }

  addToast(config = {}) {
    const __toast_id = config.type + "#" + this.counter;

    let toastElement = this.createToastContainer(__toast_id, config);

    this.addContent(toastElement, config.content || "");

    this.addNextPrevious(toastElement);

    if (config.closeBtn) {
      this.addCloseBtn(toastElement, __toast_id);
    }

    document.getElementById("toasts-container").appendChild(toastElement);

    this.updateCounter();

    return __toast_id;
  }

  nextToast() {
    const currentToastIndex = this.toastIds.findIndex(element => {
      return element === this.currentToastID;
    });

    if (currentToastIndex + 1 < this.toastIds.length) {
      const currentDisplayedNode = document.getElementById(this.currentToastID + "");
      this.currentToastID = this.toastIds[currentToastIndex + 1];
      const newNodeToastToRender = document.getElementById(this.currentToastID + "");

      currentDisplayedNode.style.display = 'none';
      newNodeToastToRender.style.zIndex = "102";
      newNodeToastToRender.style.display = 'block';
    }
  }

  previousToast() {
    const currentToastIndex = this.toastIds.findIndex(element => {
      return element === this.currentToastID;
    });

    if (currentToastIndex - 1 > -1) {
      const currentDisplayedNode = document.getElementById(this.currentToastID + "");
      this.currentToastID = this.toastIds[currentToastIndex - 1];
      const newNodeToastToRender = document.getElementById(this.currentToastID + "");

      currentDisplayedNode.style.display = 'none';
      newNodeToastToRender.style.zIndex = "102";
      newNodeToastToRender.style.display = 'block';
    }
  }

  updateCounter() {
    this.toastIds.forEach(toastId => {
      const toastIndexElement = document.getElementById(
        toastId + "_current-index"
      );
      const currentToastIndex = this.toastIds.findIndex(element => {
        return element === toastId;
      });
      toastIndexElement.textContent =
        currentToastIndex + 1 + " / " + this.toastIds.length;
    });
  }

  getTranslation(position, toastElement) {
    let translate = {};
    if (position === this.positions.top_right) {
      toastElement.style.top = "0";
      toastElement.style.right = "0";
      translate = "translate(0, 100px)";
    } else if (position === this.positions.bottom_right) {
      toastElement.style.bottom = "0";
      toastElement.style.right = "0";
      translate = "translate(0, -100px)";
    } else if (position === this.positions.bottom_left) {
      toastElement.style.bottom = "0";
      toastElement.style.left = "0";
      translate = "translate(0, -100px)";
    } else if (position === this.positions.top_left) {
      toastElement.style.top = "0";
      toastElement.style.left = "0";
      translate = "translate(0, 100px)";
    } else if (position === this.positions.top_center) {
      toastElement.style.top = "0";
      toastElement.style.left = "0";
      toastElement.style.right = "0";
      toastElement.style.margin = "0 auto";
      translate = "translate(0, 100px)";
    } else if (position === this.positions.bottom_center) {
      toastElement.style.bottom = "0";
      toastElement.style.left = "0";
      toastElement.style.right = "0";
      toastElement.style.margin = "0px auto";
      translate = "translate(0, -100px)";
    }
    return translate;
  }

  createToastContainer(toast_id, config) {
    let toastElement = document.createElement("DIV");

    const cacheID = this.currentToastID;

    toastElement.id = toast_id;
    this.toastIds.push(toast_id);
    this.currentToastID = toast_id;
    this.counter++;

    toastElement.style.position = "absolute";
    toastElement.style.background = config.background || "white";
    toastElement.style.borderRadius = "5px";
    toastElement.style.boxShadow =
      "0 2px 2px 0 rgba(0,0,0,0.14),0 3px 1px -2px rgba(0,0,0,0.12),0 1px 5px 0 rgba(0,0,0,0.2)";
    toastElement.style.padding = "20px";
    toastElement.style.zIndex = "102";
    toastElement.style.maxWidth = "250px";
    toastElement.style.minWidth = config.minWidth || "250px";
    toastElement.style.margin = "0";

    // Animation to move div
    let translate = this.getTranslation(config.position, toastElement);
    const res = toastElement.animate(
      [
        // keyframes
        { transform: "none" },
        { transform: translate }
      ],
      {
        duration: 500,
        iterations: "1",
        fill: "forwards"
      }
    );

    res.addEventListener('finish', () => {
      if (cacheID) {
          const oldToast = document.getElementById(cacheID + '');
          oldToast.style.display = 'none';
      }
    }, false);

    return toastElement;
  }

  addContent(toastElement, content) {
    toastElement.innerHTML = content;
  }

  addNextPrevious(toastElement) {
    let footerElement = document.createElement("div");
    footerElement.style.display = "flex";
    footerElement.style.flexDirection = 'row';
    footerElement.style.justifyContent = 'space-between';
    footerElement.style.padding = "5px 0 0 0";

    // PREVIOUS
    let previousElement = document.createElement("div");
    previousElement.id = 'previous-arrow';
    previousElement.style.userSelect = 'none';
    previousElement.style.pointerEvents = "auto";
    previousElement.style.paddingRight = "10px";
    previousElement.style.cursor = "pointer";
    previousElement.addEventListener(
      "click",
      () => {
        this.previousToast();
      },
      false
    );

    footerElement.appendChild(previousElement);

    // COUNTER
    let counterElement = document.createElement("div");
    counterElement.id = toastElement.id + "_current-index";
    counterElement.style.userSelect = 'none';
    counterElement.style.fontWeight = '500';
    footerElement.appendChild(counterElement);

    // NEXT
    let nextElement = document.createElement("div");
    nextElement.id = 'next-arrow';
    nextElement.style.userSelect = 'none';
    nextElement.style.pointerEvents = "auto";
    nextElement.style.paddingLeft = "10px";
    nextElement.style.cursor = "pointer";
    nextElement.addEventListener(
      "click",
      () => {
        this.nextToast();
      },
      false
    );

    footerElement.appendChild(nextElement);

    toastElement.appendChild(footerElement);
  }

  addCloseBtn(toastElement, toast_id_) {
    let closeElement = document.createElement("div");
    closeElement.textContent = "X";
    closeElement.style.userSelect = 'none';
    closeElement.style.cursor = "pointer";
    closeElement.style.pointerEvents = "auto";
    closeElement.style.position = "absolute";
    closeElement.style.color = "black";
    closeElement.style.zIndex = "102";
    closeElement.style.top = "0";
    closeElement.style.right = "0";
    closeElement.style.padding = "3px";

    closeElement.addEventListener(
      "click",
      () => {
        this.removeToastById(toast_id_);
      },
      false
    );
    toastElement.appendChild(closeElement);
  }

  getAllToastIds() {
    return [...[], this.toastIds];
  }
}

const createToaster = id => {
  return new SuperToastr(id);
};

export { createToaster };
