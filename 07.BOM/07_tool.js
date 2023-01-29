// 製作動畫函數
function move(obj, attr, target, speed, callback) {

    // 關閉上一個定時器
    clearInterval(obj.timer);

    // 獲取元素目前的位置
    var current = parseInt(getComputedStyle(obj, null)[attr]);

    // 判斷速度的正負值
    // 如果從0向800，則speed為正
    // 如果從800向0，則speed為負
    if (current > target) {
        speed = -speed;
    }

    // 開啟定時器用來執行動畫效果
    // 向執行動畫的對象中添加timer屬性用來讓他保存自己定時器的標識
    obj.timer = setInterval(function () {

        // 獲取box1原來的left值
        var oldValue = parseInt(getComputedStyle(obj, null)[attr]);

        // 在舊值的基礎上增加
        var newValue = oldValue + speed;

        // 判斷newValue是否大於等於800
        // 向左移動時，需要判斷 newValue 是否小於target
        // 向右移動時，需要判斷 newValue 是否大於target
        if (speed < 0 && newValue < target || speed > 0 && newValue > target) {
            newValue = target;
        }

        // 將新值設置為box1
        obj.style[attr] = newValue + "px";

        // 當元素移動到800px時，使其停止動畫
        if (newValue == target) {
            clearInterval(obj.timer);
            // 動畫執行完畢，調用回調函數
            callback && callback();
        }

    }, 30);
};


/*
    定義一個函數用來向一個元素中添加一個class屬性值
    參數：
        1. obj 要添加class屬性的元素
        2. cn 要添加的class值 
*/
function addClass(obj, cn) {

    // 檢查obj裏面是否含有cn
    if (!hasClass(obj, cn)) {
        obj.className += " " + cn;
    }
};

/*
    判斷一個函數中是否含有指定的class屬性值
    參數：
        1. obj 要添加class屬性的元素
        2. cn 要添加的class值
    如果有，該class返回true，沒有則返回false
*/
function hasClass(obj, cn) {

    // 判斷obj中有沒有cn的class
    // 創建一個正則表達式
    // var reg = /\bb2\b/;
    var reg = new RegExp("\\b" + cn + "\\b");
    return reg.test(obj.className);
};

/*
    刪除一個元素中指定的class屬性值
    參數：
        1. obj 要添加class屬性的元素
        2. cn 要添加的class值
 
*/
function removeClass(obj, cn) {

    // 創建正則表達式
    var reg = new RegExp("\\b" + cn + "\\b");

    // 刪除class
    obj.className = obj.className.replace(reg, "");
};

/*
    切換一個類
        - 如果元素中具有該類，則刪除
        - 如果元素中沒有該類，則添加
*/
function toggleClass(obj, cn) {
    if (hasClass(obj, cn)) {
        // 有則刪除
        removeClass(obj, cn);
    } else {
        // 沒有則添加
        addClass(obj, cn);
    }
};
