emojify.setConfig({
    img_dir          : 'img/emoji',  // Directory for emoji images
    ignored_tags     : {                // Ignore the following tags
        'SCRIPT'  : 1,
        'TEXTAREA': 1,
        'PRE'     : 1,
        'CODE'    : 1
    }
});
emojify.run();