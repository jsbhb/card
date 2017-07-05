/**
 * Created by linpengteng on 2017/5/19.
 */

'use strict';

define([
    "bower.jquery",
    "bower.underscore",
    "bower.can",
    "config.path"
], function ($, _, can, path) {

    /**
     *  @description 获取储存图片的区域，与图片名称生成完整的图片路径
     */
    can.mustache.registerHelper('getImgUrl', function(imgName, suffix) {
        var tempImgName = typeof imgName=='function'? imgName(): imgName;
        var tempSuffix =  typeof suffix=='function'? suffix(): typeof suffix=='string'? suffix: null;
        var reg = new RegExp("^http");
        if(reg.test(tempImgName)){
            return can.mustache.safeString( tempImgName );
        }else if(tempImgName){
            return tempSuffix?
                can.mustache.safeString( path.imgPrefix + tempImgName + "." + tempSuffix ):
                can.mustache.safeString( path.imgPrefix + tempImgName );
        }
    });


    /**
     *  @description 限制渲染范围
     */
    can.mustache.registerHelper(
        'setRenderRange', function(index, count, options) {
            var index = typeof index=='function'? index(): index;
            if(index && count){
                var bool = index>count-1;
                return bool? options.inverse(options.context): options.fn(options.context);
            }
        }
    );


    /**
     *  @description 将string类型的字符串的空白转换为"/"
     */
    can.mustache.registerHelper('convertStr', function(str, type) {
        var tempStr = typeof str=='function'? str(): str;
        var tempType = typeof type=='function'? type(): typeof type=='string'? type: null;
        if(tempStr){
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
            if(index && zIndexVal){
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
            if(index && zIndexVal){
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
            if(index && number && className){
                return index == number? className: null;
            }
        }
    );


    /**
     *  @description 价格(使用￥符号, 保留两位小数)
     */
    can.mustache.registerHelper('format_Money', function(price, options) {
        var temp = typeof price=='function'? price(): price;
        if(temp){
            return can.mustache.safeString( "￥"+(temp*1).toFixed(2) );
        }
    });


});