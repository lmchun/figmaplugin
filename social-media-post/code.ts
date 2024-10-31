figma.loadAllPagesAsync()
figma.showUI(__html__);

figma.ui.resize(500,500);

figma.ui.onmessage = pluginMessage => {

    const postComponentSet = figma.root.findOne(node => node.type == "COMPONENT_SET" && node.name == "post") as ComponentSetNode;
    const defaultVariant = postComponentSet.defaultVariant as ComponentNode;
    const defaultDark = postComponentSet.findOne(node => node.type == "COMPONENT" && node.name == "Image=none, Dark mode=true") as ComponentNode;
// this needs to exactly match the component on the file for both of these


    // defaultVariant.createInstance();
    // console.log(postComponentSet);
    // console.log(postComponentSet.children);
    // console.log(postComponentSet.name);
    // console.log(pluginMessage.name)

    // figma.createRectangle();
    if(pluginMessage.darkModeState === true){
        // console.log("dark")
        defaultDark.createInstance();
    }else{
        // console.log("light")
        defaultVariant.createInstance();
    }
    //at 26:46 on part 4
    // add back in when done developing
    // figma.closePlugin();
}