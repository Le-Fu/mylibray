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

/**
 * 使用类似jQuery的$函数做为选择器的函数名
 */
/*function $(selector, context){
    switch(selector.charAt(0)){
        case '#':
            return [id(selector.substring(1))];
            break;
        case '.':
            return getByClass(selector.substring(1), context);
            break;
        default:
            return tag(selector, context);
    }
}*/

/**
 * 修改或获取一个元素的属性
 * @param elem 要修改的元素对象
 * @param name 属性名
 * @param value 属性值
 */
function attr(elem, name, value) {
    // Make sure that a valid name was provided
    if ( !name || name.constructor != String ) return '';
    // Figure out if the name is one of the weird naming cases
    name = { 'for': 'htmlFor', 'class': 'className' }[name] || name;
    // If the user is setting a value, also
    if ( value != null ) {
        // Set the quick way first
        elem[name] = value;
        // If we can, use setAttribute
        if ( elem.setAttribute )
            elem.setAttribute(name,value);
    }
    // Return the value of the attribute
    return elem[name] || elem.getAttribute(name) || '';
}

/**
 * 修改或获取一个元素的value
 * @param elem 要修改的元素对象
 * @param value value属性的值
 */
function val(elem, value){
    if(!value) return elem.value || "";

    if(typeof value != "string" 
        && typeof value != "number" 
        && typeof value != "boolean")
        return "";
    elem.value = value;
}

/**
 * 修改或获取一个元素的样式
 * @param elem 要修改的元素对象
 * @param name 属性名
 * @param value 属性值
 */
function css(elem, attr, value){
    if(!elem || typeof elem != "object") return;
    if(arguments.length == 2){
        if(typeof attr == "string"){
            return _getStyle(elem, attr);//elem.style[attr];
        }else if(typeof attr == "object"){
            for(prop in attr){
                setCss(prop, attr[prop]);
                // elem.style[prop] = attr[prop];
            }
        }
    }else if(arguments.length == 3){
        setCss(attr, value);
    }

    function setCss(attr, value){
        switch(attr){
            case 'width':
            case 'height':
            case 'padding':
            case 'paddingLeft':
            case 'paddingRight':
            case 'paddingTop':
            case 'paddingBottom':
                value = /\%/.test(value)?value:Math.max(parseInt(value), 0) + 'px';
                break;
            case 'left':
            case 'top':
            case 'bottom':
            case 'right':
            case 'margin':
            case 'marginLeft':
            case 'marginRight':
            case 'marginTop':
            case 'marginBottom':
                value = /\%/.test(value)?value:parseInt(value) + 'px';
                break;
        }
        elem.style[attr] = value;
    }
}

function _getStyle( elem, name ) {//text-align, textAlign
    // If the property exists in style[], 
    //   then it’s been set recently (and is current)
    //先将text-align => textAlign
    name = name.replace(/-[a-z]/g, function(word){
        return word.substring(1).toUpperCase();
    });

    if (elem.style[name])
        return elem.style[name];

    // Otherwise, try to use IE’s method
    else if (elem.currentStyle)
        return elem.currentStyle[name];

    // Or the W3C’s method, if it exists
    else if (document.defaultView && document.defaultView.getComputedStyle) {
        // It uses the traditional ‘text-align’ style of rule writing, 
        //   instead of textAlign
        name = name.replace(/([A-Z])/g, "-$1");// textAlign =>  text-Align
        name = name.toLowerCase(); //text-Align => text-align

        // Get the style object and get the value of the property (if it exists)
        var s = document.defaultView.getComputedStyle(elem,"");
        return s && s.getPropertyValue(name);

    // Otherwise, we’re using some other browser
    } else
        return null;
}

/**
 * 为元素添加class
 * @param elem 要修改的元素对象
 * @param className 要添加的类名
 */
function addClass(elem, className){
    if(!elem || typeof className != "string") return;

    if(hasClass(elem, className)) return;

    elem.className = elem.className + " " + className;
}


/**
 * 判断元素是否包含指定的class
 * @param elem 要查找的元素对象
 * @param className 要判断的类名
 */
function hasClass(elem, className){
    var re = new RegExp("\\b" + className + "\\b");
    return re.test(elem.className);
}

/**
 * 为元素移除class
 * @param elem 要修改的元素对象
 * @param className 要移除的类名
 */
function removeClass(elem, className){
    if(!elem || typeof className != "string") return;

    // if(!hasClass(elem, className)) return;
    var re = new RegExp("\\b" + className + "\\b");
    elem.className = trim(elem.className.replace(re, ""));
}

/**
 * 为指定字符串去首尾空格
 * @param str 将要去除空格的原字符串
 */
function trim(str){
    return str.replace(/^\s+|\s+$/g, '');
}

/**
 * 获取指定元素的高度
 * @param elem 元素对象
 * @return 元素的高度，不带单位
 */
function getHeight(elem){
    return parseInt(_getStyle(elem, 'height'));
}

/**
 * 获取指定元素的宽度
 * @param elem 元素对象
 * @return 元素的宽度，不带单位
 */
function getWidth(elem){
    return parseInt(_getStyle(elem, 'width'));
}

/**
 * 获取指定元素的完整的高度
 * @param elem 元素对象
 * @return 元素的高度，不带单位
 */
// Find the full, possible, height of an element (not the actual,
// current, height)
function fullHeight( elem ) {
    // If the element is being displayed, then offsetHeight
    // should do the trick, barring that, getHeight() will work
    if ( _getStyle( elem, 'display' ) != 'none' )
        return elem.offsetHeight || getHeight( elem );

    // Otherwise, we have to deal with an element with a display
    // of none, so we need to reset its CSS properties to get a more
    // accurate reading
    var old = resetCSS( elem, {
        display: 'block',
        visibility: 'hidden',
        position: 'absolute'
    });
    // Figure out what the full height of the element is, using clientHeight
    // and if that doesn't work, use getHeight
    var h = elem.offsetHeight || getHeight( elem );
    // Finally, restore the CSS properties back to what they were
    restoreCSS( elem, old );

    // and return the full height of the element
    return h;
}

// Find the full, possible, width of an element (not the actual,
// current, width)
function fullWidth( elem ) {
    // If the element is being displayed, then offsetWidth
    // should do the trick, barring that, getWidth() will work
    if ( _getStyle( elem, 'display' ) != 'none' )
        return elem.offsetWidth || getWidth( elem );

    // Otherwise, we have to deal with an element with a display
    // of none, so we need to reset its CSS properties to get a more
    // accurate reading
    var old = resetCSS( elem, {
        display: 'block',
        visibility: 'hidden',
        position: 'absolute'
    });

    // Figure out what the full width of the element is, using clientWidth
    // and if that doesn't work, use getWidth
    var w = elem.offsetWidth || getWidth( elem );

    // Finally, restore the CSS properties back to what they were
    restoreCSS( elem, old );

    // and return the full width of the element
    return w;
}


// A function used for setting a set of CSS properties, which
// can then be restored back again later
function resetCSS( elem, prop ) {
    var old = {};

    // Go through each of the properties
    for ( var i in prop ) { //1.display
        // Remember the old property value
        old[ i ] = elem.style[ i ];

        // And set the new value
        elem.style[ i ] = prop[i];
    }

    // Retun the set of changed values, to be used by restoreCSS
    return old;
}

// A function for restoring the side effects of the resetCSS function
function restoreCSS( elem, prop ) {
    // Reset all the properties back to their original values
    for ( var i in prop )
        elem.style[ i ] = prop[ i ];
}

/**
 * 获取浏览器可视区高度
 * @return 浏览器可视区高度，不带单位
 */
// Find the height of the viewport
function windowHeight() {
    // A shortcut, in case we’re using Internet Explorer 6 in Strict Mode
    var de = document.documentElement;

    // If the innerHeight of the browser is available, use that
    return self.innerHeight ||

        // Otherwise, try to get the height off of the root node
        ( de && de.clientHeight ) ||

        // Finally, try to get the height off of the body element
        document.body.clientHeight;
}

/**
 * 获取浏览器可视区宽度
 * @return 浏览器可视区宽度，不带单位
 */
function windowWidth() {
    // A shortcut, in case we’re using Internet Explorer 6 in Strict Mode
    var de = document.documentElement;

    // If the innerWidth of the browser is available, use that
    return self.innerWidth ||

        // Otherwise, try to get the width off of the root node
        ( de && de.clientWidth ) ||

        // Finally, try to get the width off of the body element
        document.body.clientWidth;
}

/**
 * 获取页面的实际高度
 * @return 浏览器可视区高度，不带单位
 */
// Returns the height of the web page
// (could change if new content is added to the page)
function pageHeight() {
    return document.body.scrollHeight;
}