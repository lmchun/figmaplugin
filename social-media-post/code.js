"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
figma.loadAllPagesAsync();
figma.showUI(__html__);
figma.ui.resize(500, 500);
figma.ui.onmessage = (pluginMessage) => __awaiter(void 0, void 0, void 0, function* () {
    yield figma.loadFontAsync({ family: "Rubik", style: "Regular" });
    const nodes = [];
    const postComponentSet = figma.root.findOne(node => node.type == "COMPONENT_SET" && node.name == "post");
    let selectedVariant;
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    // const month: number = currentDate.getMonth() + 1; 
    const monthIndex = currentDate.getMonth();
    const monthNames = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];
    const day = currentDate.getDate();
    const month = monthNames[monthIndex];
    // figma.createRectangle();
    if (pluginMessage.darkModeState === true) {
        switch (pluginMessage.imageVariant) {
            case "2":
                selectedVariant = postComponentSet.findOne(node => node.type == "COMPONENT" && node.name == "Image=single, Dark mode=true");
                break;
            case "3":
                selectedVariant = postComponentSet.findOne(node => node.type == "COMPONENT" && node.name == "Image=carousel, Dark mode=true");
                break;
            default:
                selectedVariant = postComponentSet.findOne(node => node.type == "COMPONENT" && node.name == "Image=none, Dark mode=true");
                break;
        }
    }
    else {
        switch (pluginMessage.imageVariant) {
            case "2":
                selectedVariant = postComponentSet.findOne(node => node.type == "COMPONENT" && node.name == "Image=single, Dark mode=false");
                break;
            case "3":
                selectedVariant = postComponentSet.findOne(node => node.type == "COMPONENT" && node.name == "Image=carousel, Dark mode=false");
                break;
            default:
                selectedVariant = postComponentSet.findOne(node => node.type == "COMPONENT" && node.name == "Image=none, Dark mode=false");
                break;
        }
    }
    const newPost = selectedVariant.createInstance();
    const templateName = newPost.findOne(node => node.name == "displayName" && node.type == "TEXT");
    const templateUsername = newPost.findOne(node => node.name == "@username" && node.type == "TEXT");
    const templateDescription = newPost.findOne(node => node.name == "description" && node.type == "TEXT");
    const numLikes = newPost.findOne(node => node.name === "likesLabel" && node.type === "TEXT");
    const numComments = newPost.findOne(node => node.name === "commentsLabel" && node.type === "TEXT");
    const templateDate = newPost.findOne(node => node.name == "datestamp" && node.type == "TEXT");
    templateName.characters = pluginMessage.name;
    templateUsername.characters = pluginMessage.username;
    templateDescription.characters = pluginMessage.description;
    numLikes.characters = (Math.floor(Math.random() * 1000) + 1).toString();
    numComments.characters = (Math.floor(Math.random() * 1000) + 1).toString();
    templateDate.characters = month + " " + day + ", " + year;
    // console.log(templateName + " aka " + templateUsername + " said" +templateDescription )
    nodes.push(newPost);
    // console.log(`Current Date: ${year}-${month}-${day}`);
    figma.viewport.scrollAndZoomIntoView(nodes);
    // add back in when done developing
    // figma.closePlugin();
});
