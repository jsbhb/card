/**
 * Created by linpengteng on 2017/5/19.
 */

'use strict';

define([
    "bower.jquery",
    "bower.can"
], function ($, can) {

    /**
     *  @description  储存图片的区域
     */
    var imgPrefix = "/app/images/test/";


    /**
     *  @description 限制渲染范围
     */
    can.mustache.registerHelper(
        'setRenderRange', function(index, count, options) {
            var index = typeof index=='function'? index(): index;
            if((index||index == 0) && count){
                var bool = index>count-1;
                return bool? options.inverse(options.context): options.fn(options.context);
            }
        }
    );


    /**
     *  @description 判断是否存在
     */
    can.mustache.registerHelper('isExist', function(content, options) {
        var tempContent = typeof content=='function'? content(): content;
        var bool = tempContent?((tempContent.length>0||tempContent.length==undefined)?true:false):false;
        return bool? options.fn(options.context): options.inverse(options.context);
    });


    /**
     *  @description 将string类型的字符串的空白转换为"/"
     */
    can.mustache.registerHelper('convertStr', function(str, type) {
        var tempStr = typeof str=='function'? str(): str;
        var tempType = typeof type=='function'? type(): typeof type=='string'? type: null;
        if(tempStr||tempStr == 0){
            return tempType?
                can.mustache.safeString( tempStr.trim().replace(/\s+/gi,tempType) ):
                can.mustache.safeString( tempStr.trim().replace(/\s+/gi,"/")) ;
        }
    });


    /**
     *  @description  z-index 依次降序
     */
    can.mustache.registerHelper(
        'zIndexDesc', function(index, zIndexVal, options) {
            var index = typeof index=='function'? index(): index;
            if((index||index == 0) && zIndexVal){
                return zIndexVal-index*1;
            }
        }
    );


    /**
     *  @description  z-index 依次升序
     */
    can.mustache.registerHelper(
        'zIndexAsc', function(index, zIndexVal, options) {
            var index = typeof index=='function'? index(): index;
            if((index||index == 0) && zIndexVal){
                return zIndexVal+index*1;
            }
        }
    );


    /**
     *  @description 判定父元素的第n个子元素添加class
     */
    can.mustache.registerHelper(
        'addElementClass', function(index, number, className, options) {
            var index = typeof index=='function'? index(): index;
            if((index||index == 0) && (number||number == 0) && className){
                return index == number? className: null;
            }
        }
    );


    /**
     *  @description 获取储存图片的区域，与图片名称生成完整的图片路径
     */
    can.mustache.registerHelper('getImgUrl', function(imgName, suffix, other) {
        var tempImgName = typeof imgName=='function'? imgName(): imgName;
        var tempSuffix =  typeof suffix=='function'? suffix(): typeof suffix=='string'? suffix: null;
        var reg = new RegExp("^http");
        if(tempImgName && reg.test(tempImgName)){
            return can.mustache.safeString(tempImgName);
        }else if(tempImgName){
            return tempSuffix?
                can.mustache.safeString( imgPrefix + tempImgName + "." + tempSuffix ):
                can.mustache.safeString( imgPrefix + tempImgName );
        }else if(typeof other){
            return can.mustache.safeString( "/app/images/"+ other );
        }
    });


    /**
     *  @description 价格(使用￥符号, 保留两位小数)
     */
    can.mustache.registerHelper('format_Money', function(price, options) {
        var temp = typeof price=='function'? price(): price;
        if(temp||temp == 0){
            return can.mustache.safeString( "￥"+(temp*1).toFixed(2) );
        }
    });


});