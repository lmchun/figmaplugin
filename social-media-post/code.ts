figma.loadAllPagesAsync()
figma.showUI(__html__);

figma.ui.resize(500,500);

figma.ui.onmessage = pluginMessage => {

    const postComponentSet = figma.root.findOne(node => node.type == "COMPONENT_SET" && node.name == "post") as ComponentSetNode;
    const defaultVariant = postComponentSet.defaultVariant as ComponentNode;
    const defaultDark = postComponentSet.findOne(node => node.type == "COMPONENT" && node.name == "Image=none, Dark mode=true") as ComponentNode;
    const defaultDark2 = postComponentSet.findOne(node => node.type == "COMPONENT" && node.name == "Image=single, Dark mode=true") as ComponentNode;

    console.log(pluginMessage.imageVariant);


    // figma.createRectangle();
    if(pluginMessage.darkModeState === true){
        switch(pluginMessage.imageVariant){
            case "2":
                defaultDark2.createInstance();
                break;
            case "3":
                break;
            default: 
            defaultDark.createInstance();
            break;    
        }
      

    }else{
        switch(pluginMessage.imageVariant){
            case "2":
                
                break;
            case "3":
                break;
            default: 
        defaultVariant.createInstance();
            break;   
        }
        // defaultVariant.createInstance();
    }
   
    // add back in when done developing
    // figma.closePlugin();
}