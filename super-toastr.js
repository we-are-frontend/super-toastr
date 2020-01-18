counter = 0;
toastIds = [];
currentToastID = null;

total = {
    errors: 0,
    warnings: 0,
    success: 0
};

function nextToast() {
    console.log(' nextToast currentToastID: ', currentToastID);
    const currentToastIndex = toastIds.findIndex(
        (element) => {
        return element === currentToastID;
        }
    );

    if (currentToastIndex + 1 < toastIds.length) {
        const currentDisplayedNode = document.getElementById(currentToastID + '');
        currentToastID = toastIds[currentToastIndex + 1];
        const newNodeToastToRender = document.getElementById(currentToastID + '');

        currentDisplayedNode.style.zIndex = '100';
        newNodeToastToRender.style.zIndex = '102';
    }

    console.log(' nextToast END currentToastID: ', currentToastID);
    console.log('toastIds', toastIds);
}

function previousToast() {
    console.log(' previousToast currentToastID: ', currentToastID);
    const currentToastIndex = toastIds.findIndex(
        (element) => {
        return element === currentToastID;
        }
    );

    if (currentToastIndex - 1 >  -1) {
        const currentDisplayedNode = document.getElementById(currentToastID + '');
        currentToastID = toastIds[currentToastIndex - 1];
        const newNodeToastToRender = document.getElementById(currentToastID + '');

        currentDisplayedNode.style.zIndex = '100';
        newNodeToastToRender.style.zIndex = '102';
    }

    console.log(' previousToast END currentToastID: ', currentToastID);
}

function addToast(type, color) {
    var node = document.createElement("DIV");    

    const __id = type + '#' + counter;
    node.id = __id;
    toastIds.push(__id);
    currentToastID = __id;
    counter++;

    node.style.position = 'absolute'; 
    node.style.background = color; 
    node.style.border = '1px solid black'; 
    node.style.padding = '20px'; 
    node.style.setProperty("-webkit-transition", "top 5s linear");
    node.style.right = '0';   
    node.style.zIndex = '102';
    node.style.maxWidth = '250px';  
    node.style.margin = '10px';  
    const res = node.animate([
        {transform: 'translate(0)'},
        {transform: 'translate(0, 100px)'}
    ], 500);
    res.addEventListener('finish', function() {
        node.style.transform = 'translate(0, 100px)';
    });


    var textnode = document.createTextNode((new Date()).toString());         

    var Xnode = document.createElement('div');  
    Xnode.textContent = 'X';
    Xnode.id = __id;
    Xnode.style.cursor = 'pointer';
    Xnode.style.pointerEvents = 'auto';
    Xnode.style.position = 'absolute';
    Xnode.style.background = 'white'; 
    Xnode.style.zIndex = '102';
    Xnode.style.top = '0';
    Xnode.style.right = '0';
    Xnode.style.padding = '3px';
    var self = this;
    Xnode.addEventListener('click', function() {
        const currentDisplayedNode = self.document.getElementById(__id + '');

        const currentToastIndex = self.toastIds.findIndex(
        (element) => {
            return element === self.currentToastID;
        }
        ); 

        if (currentToastIndex > 0) {
        self.currentToastID = self.toastIds[currentToastIndex - 1];
        } else if (self.toastIds.length > 1) {
        self.currentToastID = self.toastIds[currentToastIndex + 1];
        } else {
        self.currentToastID = null;
        }

        if (self.currentToastID) {
            const newNodeToastToRender = self.document.getElementById(self.currentToastID + '');
            newNodeToastToRender.style.zIndex = '102';
        }

        self.toastIds = self.toastIds.filter(toastId => toastId !== __id);
        currentDisplayedNode.style.display = 'none';

        self.updateTotalsPerType();
    }, false);
    node.appendChild(Xnode); 

    node.appendChild(textnode);  
    document.getElementById('toasts-container').appendChild(node);

    console.log(' addToastWarning currentToastID: ', currentToastID);

    updateTotalsPerType();
}

function addToastWarning() {
    addToast('WAR', 'yellow');
}

function addToastSuccess() {
    addToast('SUC', '#7FFFD4');
}

function addToastError() {
    addToast('ERR', 'red');
}

function updateTotalsPerType() {
    total = {
        errors: 0,
        warnings: 0,
        success: 0
    }

    toastIds.forEach(toastId => {
        if (toastId.includes('ERR#')) {
        total.errors++;
        }
        if (toastId.includes('SUC#')) {
        total.success++;
        }
        if (toastId.includes('WAR#')) {
        total.warnings++;
        }
    });
}