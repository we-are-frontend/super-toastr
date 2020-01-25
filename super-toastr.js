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

        const positions = {
            top_right: 'top_right', 
            bottom_right: 'bottom_right',
            bottom_left: 'bottom_left',
            top_left: 'top_left', 
            top_full_width: 'top_full_width',
            bottom_full_width: 'bottom_full_width' , 
            top_center: 'top_center',
            bottom_center: 'bottom_center'
        };

        function updateCounter() {
            toastIds.forEach(toastId => {
                const toastIndexElement = document.getElementById(toastId + '_current-index');
                const currentToastIndex = toastIds.findIndex(
                    (element) => {
                    return element === toastId;
                    }
                );
                toastIndexElement.textContent = (currentToastIndex + 1) + ' / ' + toastIds.length;
            })
        }

        function getTranslation(position, toastElement) {
            let translate = {};
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

        let createToastContainer = (toast_id, config) => {
            var toastElement = document.createElement("DIV");    
            
            toastElement.id = toast_id;
            toastIds.push(toast_id);
            currentToastID = toast_id;
            counter++;
        
            toastElement.style.position = 'absolute'; 
            toastElement.style.background = config.background || 'white'; 
            //toastElement.style.border = '1px solid black';
            toastElement.style.borderRadius = '5px';
            toastElement.style.boxShadow = '0 2px 2px 0 rgba(0,0,0,0.14),0 3px 1px -2px rgba(0,0,0,0.12),0 1px 5px 0 rgba(0,0,0,0.2)';
            toastElement.style.padding = '20px'; 
            toastElement.style.setProperty("-webkit-transition", "top 5s linear"); 
            toastElement.style.zIndex = '102';
            toastElement.style.maxWidth = '250px';  
            toastElement.style.minWidth = config.minWidth || '250px';  
            toastElement.style.margin = '10px';  

            let translate = getTranslation(config.position, toastElement)
            const res = toastElement.animate([
                {transform: 'translate(0)'},
                {transform: translate}
            ], 500);
            res.addEventListener('finish', function() {
                toastElement.style.transform = translate;
            });

            return toastElement;
        };

        let addContent = (toastElement, content) => {
            toastElement.innerHTML = content;
        };

        let addNextPrevious = (toastElement) => {
            var footerElement = document.createElement('div'); 
            footerElement.style.display = 'flex'; 
            footerElement.style.padding = '5px 0 0 0';

            // PREVIOUS
            var previousElement = document.createElement('div'); 
            previousElement.innerHTML = '<'; 
            previousElement.style.pointerEvents = 'auto';
            previousElement.style.paddingRight = '10px';
            previousElement.style.cursor = 'pointer';
            previousElement.addEventListener('click', function() {
                self.previousToast();
            }, false);

            footerElement.appendChild(previousElement); 

            // COUNTER
            var counterElement = document.createElement('div');
            counterElement.id = toastElement.id + '_current-index';
            footerElement.appendChild(counterElement); 

            // NEXT
            var nextElement = document.createElement('div'); 
            nextElement.innerHTML = '>'; 
            nextElement.style.pointerEvents = 'auto';
            nextElement.style.paddingLeft = '10px';
            nextElement.style.cursor = 'pointer';
            nextElement.addEventListener('click', function() {
                console.log('next toast');
                self.nextToast();
            }, false);

            footerElement.appendChild(nextElement); 

            toastElement.appendChild(footerElement); 
        }

        let addCloseBtn = (toastElement, toast_id_) => {
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

                updateCounter();
            }, false);
            toastElement.appendChild(closeElement); 
        };

        var self = {
            addToast: (config = {}) => {
               
                const __toast_id = config.type + '#' + counter;
                
                var toastElement = createToastContainer(__toast_id, config);

                addContent(toastElement, config.content || '');

                addNextPrevious(toastElement);

                if (config.closeBtn) {
                    addCloseBtn(toastElement, __toast_id);  
                }
                
                document.getElementById('toasts-container').appendChild(toastElement);

                updateCounter();
            },

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