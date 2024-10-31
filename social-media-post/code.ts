figma.loadAllPagesAsync()
figma.showUI(__html__);

figma.ui.resize(500,500);

figma.ui.onmessage = async pluginMessage => {

    await figma.loadFontAsync({ family: "Rubik", style: "Regular" }); 

    const nodes:SceneNode[] = [];

    const postComponentSet = figma.root.findOne(node => node.type == "COMPONENT_SET" && node.name == "post") as ComponentSetNode;
    
    let selectedVariant;

    const currentDate: Date = new Date();
    const year: number = currentDate.getFullYear();
    // const month: number = currentDate.getMonth() + 1; 
    const monthIndex: number = currentDate.getMonth();
    const monthNames: string[] = [
        "January", "February", "March", "April", "May", "June", 
        "July", "August", "September", "October", "November", "December"
    ];
    const day: number = currentDate.getDate();
    const month: string = monthNames[monthIndex];


    // figma.createRectangle();
    if(pluginMessage.darkModeState === true){
        switch(pluginMessage.imageVariant){
            case "2":
                selectedVariant = postComponentSet.findOne(node => node.type == "COMPONENT" && node.name == "Image=single, Dark mode=true") as ComponentNode;
                break;
            case "3":
                selectedVariant = postComponentSet.findOne(node => node.type == "COMPONENT" && node.name == "Image=carousel, Dark mode=true") as ComponentNode;
                break;
            default: 
            selectedVariant = postComponentSet.findOne(node => node.type == "COMPONENT" && node.name == "Image=none, Dark mode=true") as ComponentNode;
            break;    
        }
    }else{
        switch(pluginMessage.imageVariant){
            case "2":
                selectedVariant = postComponentSet.findOne(node => node.type == "COMPONENT" && node.name == "Image=single, Dark mode=false") as ComponentNode;
                break;
            case "3":
                selectedVariant = postComponentSet.findOne(node => node.type == "COMPONENT" && node.name == "Image=carousel, Dark mode=false") as ComponentNode;
                break;
            default: 
            selectedVariant = postComponentSet.findOne(node => node.type == "COMPONENT" && node.name == "Image=none, Dark mode=false") as ComponentNode;
            break;   
        }
    }

    const newPost = selectedVariant.createInstance();
    const templateName = newPost.findOne(node => node.name == "displayName" && node.type == "TEXT") as TextNode;
    const templateUsername = newPost.findOne(node => node.name == "@username" && node.type == "TEXT") as TextNode;
    const templateDescription = newPost.findOne(node => node.name == "description" && node.type == "TEXT") as TextNode;
    const numLikes = newPost.findOne(node => node.name === "likesLabel" && node.type === "TEXT") as TextNode;
    const numComments = newPost.findOne(node => node.name === "commentsLabel" && node.type === "TEXT") as TextNode;
    const templateDate = newPost.findOne(node => node.name == "datestamp" && node.type == "TEXT") as TextNode;
    
    templateName.characters = pluginMessage.name;
    templateUsername.characters = pluginMessage.username;
    templateDescription.characters = pluginMessage.description;
    numLikes.characters = (Math.floor(Math.random() * 1000) + 1).toString();
    numComments.characters = (Math.floor(Math.random() * 1000) + 1).toString();

    templateDate.characters = month + " "+ day+ ", " + year;

    // console.log(templateName + " aka " + templateUsername + " said" +templateDescription )
    nodes.push(newPost);
    
    // console.log(`Current Date: ${year}-${month}-${day}`);

    figma.viewport.scrollAndZoomIntoView(nodes);
    
    // add back in when done developing
    // figma.closePlugin();
}