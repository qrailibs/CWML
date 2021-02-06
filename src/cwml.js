//-----------------------
// API
//-----------------------
const cwml = {
    // Tags...
    tags: [],
    registerTag: function(_tag, _descriptor = new CwmlTagDescriptor()) {
        window.customElements.define(_tag.toLowerCase(), 
            class CwmlTag extends HTMLElement {
                tag = '';
                descriptor = new CwmlTagDescriptor();

                constructor(){
                    super(); 

                    this.tag = _tag;
                    this.descriptor = _descriptor;

                    // Add observed events
                    for(var event_name in this.descriptor.eventsObserved) {
                        var event_func = this.descriptor.eventsObserved[event_name];

                        //Default listeners
                        if(!event_name.startsWith('__')) {
                            this.addEventListener(event_name, event_func);
                        }
                    }
                }

                // Common events
                connectedCallback() {
                    //If event callback defined
                    if(this.descriptor.eventsObserved['__added__'] !== undefined) {
                        this.descriptor.eventsObserved['__added__'](this);
                    }
                }
                disconnectedCallback() {
                    //If event callback defined
                    if(this.descriptor.eventsObserved['__removed__'] !== undefined) {
                        this.descriptor.eventsObserved['__removed__'](this);
                    }
                }
                adoptedCallback() {
                    //If event callback defined
                    if(this.descriptor.eventsObserved['__adopted__'] !== undefined) {
                        this.descriptor.eventsObserved['__adopted__'](this);
                    }
                }

                attributeChangedCallback(attrName, oldVal, newVal) {
                    
                }
            }
        );
        this.tags.push(_tag)
    },
    isTagSupported: function(tag) {
        return tags[tag] !== undefined;
    },

    // Logging...
    log: [],
    writeLog: function(type,message) {
        this.log.push({
            'type': type,
            'message':message
        });
    },
    writeInfo: function(text) {
        console.log('CWML Info:' + text);
        this.writeLog('info', text);
    },
    writeWarn: function(text) {
        console.warn('CWML Warning:' + text);
        this.writeLog('warning', text);
    },
    writeError: function(text) {
        console.error('CWML Error:' + text);
        this.writeLog('error', text);
    },

    // Testing...

}

//-----------------------
// Classes
//-----------------------
class CwmlTagDescriptor {
    constructor(events={}, attrs={}) {
        this.eventsObserved = events;
        this.attrsObserved = attrs;
    }

    // Events...
    eventsObserved = {};
    whenEvent(event, func) {
        this.eventsObserved[event] = func;
    }
    whenClick(func) {
        this.whenEvent('click', func);
    }
    whenAdded(func) {
        this.whenEvent('__added__', func);
    }
    whenRemoved(func) {
        this.whenEvent('__removed__', func);
    }
    whenAdopted(func) {
        this.whenEvent('__adopted__', func);
    }

    // Attributes...
    attrsObserved = {};
    registerAttr(attr, whenChanged=function(oldVal,newVal){}) {
        this.attrsObserved[attr] = whenChanged;
    }

    // Content...
    //TODO
}
