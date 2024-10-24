figma.showUI(__html__);

figma.ui.resize(500,500);

figma.ui.onmessage = pluginMessage => {
    console.log(pluginMessage.name)

    figma.createRectangle();
    if(pluginMessage.darkModeState === true){
        console.log("dark")
    }else{
        console.log("light")
    }
    // figma.closePlugin();
}