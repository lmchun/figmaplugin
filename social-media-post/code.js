"use strict";
figma.showUI(__html__);
figma.ui.resize(500, 500);
figma.ui.onmessage = pluginMessage => {
    console.log(pluginMessage.name);
    figma.createRectangle();
    if (pluginMessage.darkModeState === true) {
        console.log("dark");
    }
    else {
        console.log("light");
    }
    //at 26:46 on part 4
    // add back in when done developing
    // figma.closePlugin();
};
