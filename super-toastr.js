var waf = {
    superToastr: (toaster_id_) => {
        let toaster_id = toaster_id_;
        let counter = 0;
        let toastIds = [];
        let currentToastID = null;
        let total = {
            errors: 0,
            warnings: 0,
            success: 0
        };

        let createToastContainer = (toast_id, config) => {
            var toastElement = document.createElement("DIV");    
            
            toastElement.id = toast_id;
            toastIds.push(toast_id);
            currentToastID = toast_id;
            counter++;
        
            toastElement.style.position = 'absolute'; 
            toastElement.style.background = config.background || 'white'; 
            toastElement.style.border = '1px solid black'; 
            toastElement.style.padding = '20px'; 
            toastElement.style.setProperty("-webkit-transition", "top 5s linear");
            toastElement.style.right = '0';   
            toastElement.style.zIndex = '102';
            toastElement.style.maxWidth = '250px';  
            toastElement.style.minWidth = config.minWidth || '250px';  
            toastElement.style.margin = '10px';  
            const res = toastElement.animate([
                {transform: 'translate(0)'},
                {transform: 'translate(0, 100px)'}
            ], 500);
            res.addEventListener('finish', function() {
                toastElement.style.transform = 'translate(0, 100px)';
            });

            return toastElement;
        };

        let addContent = (toastElement, content) => {
            toastElement.innerHTML = content;
        };

        let addCloseBtn = (toastElement, toast_id_) => {
            var closeElement = document.createElement('div');  
            closeElement.textContent = 'X';
            closeElement.style.cursor = 'pointer';
            closeElement.style.pointerEvents = 'auto';
            closeElement.style.position = 'absolute';
            closeElement.style.background = 'white'; 
            closeElement.style.zIndex = '102';
            closeElement.style.top = '0';
            closeElement.style.right = '0';
            closeElement.style.padding = '3px';

            closeElement.addEventListener('click', function() {
                const currentToastIndex = toastIds.findIndex(
                (element) => {
                    return element === currentToastID;
                }
                ); 
        
                if (currentToastIndex > 0) {
                    currentToastID = toastIds[currentToastIndex - 1];
                } else if (toastIds.length > 1) {
                    currentToastID = toastIds[currentToastIndex + 1];
                } else {
                    currentToastID = null;
                }
        
                if (currentToastID) {
                    const newNodeToastToRender = document.getElementById(currentToastID + '');
                    newNodeToastToRender.style.zIndex = '102';
                }
        
                toastIds = toastIds.filter(toastId => toastId !== toast_id_);
                toastElement.style.display = 'none';
        
                self.updateTotalsPerType();
            }, false);
            toastElement.appendChild(closeElement); 
        };

        var self = {
            addToast: (config = {}) => {
               
                const __toast_id = config.type + '#' + counter;
                
                var toastElement = createToastContainer(__toast_id, config);

                addContent(toastElement, config.content || '');

                if (config.closeBtn) {
                    addCloseBtn(toastElement, __toast_id);  
                }
                
                document.getElementById('toasts-container').appendChild(toastElement);
            },
            
            /*
            updateTotalsPerType: () => {
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
            },
            */

            nextToast: () => {
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
            },
            
            previousToast: () => {
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
        }
        return self;
    }
}