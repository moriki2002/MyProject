var LAppDefine = {
   
    //这里配置canvsa元素的id
    CANVAS_ID: "live2d",

    //是否允许拖拽，默认为true
    IS_DRAGABLE: true,

    //绑定按钮元素id
    BUTTON_ID: "Change",

    TEXURE_BUTTON_ID: "texure",
    /**
     *  模型定义
        自定义配置模型，同一数组内放置同个模型的不同皮肤，换肤时按照顺序依次显示
        这里请用相对路径配置
     */
    MODELS: [
        ["src/assets/model/haru.model.json"],
		["src/assets/tia/model.json"]
        
    ]
}