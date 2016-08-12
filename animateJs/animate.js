/**
 *  根据元素的id查找元素对象
 */
function id(sId){
    return document.getElementById(sId);
}

/**
 *  根据元素的标签查找元素对象
 */
function tag(sTagName, context){
    context = context || document;
    return context.getElementsByTagName(sTagName);
}

/**
 * 根据元素的class查找元素
 * @param className 查找的类的名字
 * @param context 查找的范围
 * @param tag 限定的标签名
 */
function getByClass(className, context, tag){
    var aResult = [];
    context = context || document;//如果传了context参数，就使用该参数，否则默认document
    if(document.getElementsByClassName && !tag){
        return context.getElementsByClassName(className);
    }

    tag = tag || '*';//如果传了tag参数，就使用该参数，否则默认是所有标签
    var aElem = context.getElementsByTagName(tag);
    for(var i=0; i<aElem.length; i++){
        //if(aElem[i].className == className){
        var re = new RegExp("\\b" + className + "\\b");
        if( re.test(aElem[i].className) ){//使用正则来判断当前元素的className中是否包含指定的className
            aResult.push(aElem[i]);
        }
    }

    return aResult;
}

