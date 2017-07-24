/**
 * Created by linpengteng on 2017/5/19.
 */

'use strict';

define([
    "bower.jquery",
    "bower.can",
    "config.system"
], function ($, can, system) {

    /**
     *  @description 方法工具
     */
    function getContent(content, contType){
        var tempContent = typeof content==='function'? content(): content;
        if(contType === "object"){
            tempContent = typeof tempContent==='function'? tempContent(): tempContent;
        }
        else{
            tempContent = typeof tempContent==='function'? tempContent():
                              typeof tempContent!=='object'? tempContent: '';
        }
        return tempContent!==undefined? tempContent: '';
    }


    /**
     *  @description 获取储存图片的区域，生成完整的图片路径
     */
    can.mustache.registerHelper('getMemberImg', function(imgName, memberId, defaultImg) {
        var reg1 = /^http/i;
        var tempImgName = getContent(imgName);
        var tempMemberId = getContent(memberId);
        var tempDefaultImg = getContent(defaultImg);
        var tempCatalog = system.imgCatalog["member"] || "";
        var memberCatalog = tempCatalog.replace("/memberId/", "/"+tempMemberId+"/");
        return tempImgName && reg1.test(tempImgName)?
            can.mustache.safeString(tempImgName): tempImgName?
                can.mustache.safeString(memberCatalog + tempImgName):
                can.mustache.safeString("/app/images/members/default/" + tempDefaultImg);
    });
    can.mustache.registerHelper('getShopImg', function(imgName, memberId, commodityId, defaultImg) {
        var reg1 = /^http/i;
        var tempImgName = getContent(imgName);
        var tempMemberId = getContent(memberId);
        var tempCommodityId = getContent(commodityId);
        var tempDefaultImg = getContent(defaultImg);
        var tempCatalog = system.imgCatalog["shop"] || "";
        var shopCatalog = tempCatalog.replace("/memberId/", "/"+tempMemberId+"/");
            shopCatalog = shopCatalog.replace("/commodityId/", "/"+tempCommodityId+"/");
        return tempImgName && reg1.test(tempImgName)?
            can.mustache.safeString(tempImgName): tempImgName?
                can.mustache.safeString(shopCatalog + tempImgName):
                can.mustache.safeString("/app/images/members/default/" + tempDefaultImg);
    });
    can.mustache.registerHelper('getTestImg', function(imgName, defaultImg) {
        var reg1 = /^http/i;
        var tempImgName = getContent(imgName);
        var tempDefaultImg = getContent(defaultImg);
        var testCatalog = system.imgCatalog["test"] || "";
        console.log(tempImgName);
        return tempImgName && reg1.test(tempImgName)?
            can.mustache.safeString(tempImgName): tempImgName?
                can.mustache.safeString(testCatalog + tempImgName):
                can.mustache.safeString("/app/images/test/default/" + tempDefaultImg);
    });
    can.mustache.registerHelper('getPlatformImg', function(imgName, catalog, defaultImg) {
        var reg1 = /^http/i;
        var tempImgName = getContent(imgName);
        var tempCatalog = getContent(catalog);
        var tempDefaultImg = getContent(defaultImg);
        var testCatalog = system.imgCatalog["platform"] || "";
        return tempImgName && reg1.test(tempImgName)?
            can.mustache.safeString(tempImgName): tempImgName?
                can.mustache.safeString(testCatalog + tempCatalog + "/" + tempImgName):
                can.mustache.safeString("/app/images/platform/default/" + tempDefaultImg);
    });


    /**
     *  @description 限制渲染范围
     */
    can.mustache.registerHelper(
        'setRenderRange', function(index, count, options) {
            var tempIndex = getContent(index);
            var tempCount = getContent(count, "object");
            if((tempIndex||tempIndex === 0) && tempCount){
                var bool = index>tempCount-1;
                return bool? options.inverse(options.context): options.fn(options.context);
            }
        }
    );


    /**
     *  @description 判断是否存在
     */
    can.mustache.registerHelper('isExist', function(content, options) {
        var tempContent = getContent(content, "object");
        var bool = tempContent && (tempContent.length===undefined || tempContent.length>0)? true: false;
        return bool? options.fn(tempContent): options.inverse(tempContent);
    });


    /**
     *  @description 将string类型的字符串的空白转换为"/"
     */
    can.mustache.registerHelper('convertStr', function(str, type) {
        var tempStr = getContent(str);
        var tempType = getContent(type);
        if(tempStr){
            return tempType?
                can.mustache.safeString( tempStr.trim().replace(/\s(?!color)+/gi,tempType)):
                can.mustache.safeString( tempStr.trim().replace(/\s(?!color)+/gi,"/"));
        }
    });


    /**
     *  @description  z-index 依次降序
     */
    can.mustache.registerHelper(
        'zIndexDesc', function(index, zIndexVal) {
            var tempIndex = getContent(index);
            var tempzIndexVal = getContent(zIndexVal);
            if(tempIndex>=0 && tempzIndexVal){
                return tempzIndexVal-tempIndex*1;
            }
        }
    );


    /**
     *  @description  z-index 依次升序
     */
    can.mustache.registerHelper(
        'zIndexAsc', function(index, zIndexVal) {
            var tempIndex = getContent(index);
            var tempzIndexVal = getContent(zIndexVal);
            if(tempIndex>=0 && tempzIndexVal){
                return tempzIndexVal+tempIndex*1;
            }
        }
    );


    /**
     *  @description 判定父元素的第n个子元素添加class
     */
    can.mustache.registerHelper(
        'addElementClass', function(index, number, className) {
            var tempIndex = getContent(index);
            var tempNumber = getContent(number);
            var tempClassName = getContent(className);
            if(tempIndex>=0 && tempNumber && tempClassName){
                return tempIndex === tempNumber? tempClassName: '';
            }
        }
    );


    /**
     *  @description 价格(使用￥符号, 保留两位小数)
     */
    can.mustache.registerHelper('format_Money', function(price) {
        var tempPrice = getContent(price);
        if(tempPrice>=0){
            return can.mustache.safeString( "￥"+(tempPrice*1).toFixed(2) );
        }
    });


});