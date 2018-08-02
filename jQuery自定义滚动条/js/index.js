/**
 * @desc 用立即执行函数包住函数作用域
 * @date 2018/8/2
 * @author XDP
*/ 
(function (win, doc, $) {
    function CusScrollBar(options) {
        this._init(options)
            ._initDomEvent()
            ._initSliderDragEvent()
            ._initArticleHeight()
            ._initTabEvent()
            ._bindContScroll()
            ._bindMouseWheel();
    }

    $.extend(CusScrollBar.prototype, {
        /**
         * @desc 总体初始化
         * @date 2018/8/1
         * @author XDP
         */
        _init: function (options) {
            let self = this;
            self.options = {
                scrollDir: "y",     //滚动方向
                contSelector: "",   //滚动内容区域选择器
                barSelector: "",    //滚动条选择器
                sliderSelector: "", //滚动滑块选择器
                wheelStep: 10,      //滚轮步长
                tabItemSelector: ".tab-item",       //标签选择器
                tabActiveClass: "tab-active",       //选中标签类名
                anchorSelector: ".anchor",          //锚点选择器
                correctSelector: ".correct-bot",    //校正元素
                articleSelector: ".scroll-ol",      //文章选择器
            };
            $.extend(true, self.options, options || {});    //深拷贝将传入元素覆盖

            return self;
        },
        /**
         * @desc 初始化DOM引用
         * @date 2018/8/1
         * @author XDP
         */
        _initDomEvent: function () {
            let self = this;
            let opts = self.options;
            //滚动内容对象
            self.$cont = $(opts.contSelector);
            //滚动条滑块对象
            self.$slider = $(opts.sliderSelector);
            //滚动条对象
            self.$bar = opts.barSelector ? $(opts.barSelector) : self.$slider.parent();
            //获取文档对象
            self.$doc = $(doc);
            //标签项
            self.$tabItem = $(opts.tabItemSelector);
            //锚点项
            self.$anchor = $(opts.anchorSelector);
            //正文
            self.$artical = $(opts.articleSelector);
            //校正元素对象
            self.$correct = $(opts.correctSelector);
            return self;
        },
        /**
         * @desc 初始化滑块拖动功能
         * @date 2018/8/1
         * @author XDP
         */
        _initSliderDragEvent: function () {
            console.info(this);
            let self = this,
                slider = self.$slider,
                sliderEl = slider[0];
            if (sliderEl) {
                let doc = self.$doc,
                    dragStartPagePosition,
                    dragStartScrollPosition,
                    dragContBarRate;

                function mousemoveHandler(e) {
                    e.preventDefault();
                    console.info('mousemove');
                    if (dragStartPagePosition === null) {
                        return;
                    }
                    self.scrollTo(dragStartScrollPosition + (e.pageY - dragStartPagePosition) * dragContBarRate);
                }

                slider.on('mousedown', function (e) {
                    e.preventDefault();

                    dragStartPagePosition = e.pageY;
                    dragStartScrollPosition = self.$cont[0].scrollTop;
                    dragContBarRate = self.getMaxScrollPosition() / self.getMaxSliderPosition();
                    doc.on('mousemove.scroll', mousemoveHandler)
                        .on('mouseup.scroll', function () {
                            doc.off('.scroll');
                        });
                });
            }
            return self;
        },
        /**
         * @desc 初始化标签切换功能
         * @date 2018/8/1
         * @author XDP
         */
        _initTabEvent: function () {
            let self = this;
            self.$tabItem.on('click', function (e) {
                e.preventDefault();
                let index = $(this).index();
                self.changeTabSelect(index);
                //已经滚出可视区的内容高度+指定锚点与内容容器的距离
                self.scrollTo(self.$cont[0].scrollTop + self.getAnchorPosition(index));
            });
            return self;
        },
        /**
         * @desc 初始化文档高度
         * @date 2018/8/1
         * @author XDP
         */
        _initArticleHeight: function () {
            let self = this,
                lastArticle = self.$artical.last();
            let lastArticleHeight = lastArticle.height(),
                contHeight = self.$cont.height();
            if (lastArticleHeight < contHeight) {
                self.$correct[0].style.height = contHeight - lastArticleHeight - self.$anchor.outerHeight() + 'px';
            }
            return self;
        },
        /**
         * @desc 监听内容的滚动，同步滑块位置
         * @date 2018/8/1
         * @author XDP
         */
        _bindContScroll: function () {
            let self = this;
            self.$cont.on('scroll', function () {
                let sliderEl = self.$slider && self.$slider[0];
                if (sliderEl) {
                    sliderEl.style.top = self.getSliderPosition() + 'px';
                }
            });
            return self;
        },
        /**
         * @desc 绑定鼠标滚动事件
         * @date 2018/8/1
         * @author XDP
         */
        _bindMouseWheel: function () {
            let self = this;
            self.$cont.on('mousewheel DomMouseScroll', function (e) {
                e.preventDefault();
                let oEv = e.originalEvent,
                    wheelRange = oEv.wheelDelta ? -oEv.wheelDelta / 120 : (oEv.detail || 0) / 3;
                self.scrollTo(self.$cont[0].scrollTop + wheelRange * self.options.wheelStep);
            });
            return self;
        },
        //切换标签的选中
        changeTabSelect: function (index) {
            let self = this,
                active = self.options.tabActiveClass;
            return self.$tabItem.eq(index).addClass(active).siblings().removeClass(active);
        },
        //获取指定锚点到上边界的像素数
        getAnchorPosition: function (index) {
            return this.$anchor.eq(index).position().top;
        },
        //获取每个锚点位置信息数组
        getAllAnchorPosition: function () {
            let self = this,
                allPositionArr = [];
            for (let i = 0; i < self.$anchor.length; i++) {
                allPositionArr.push(self.$cont[0].scrollTop + self.getAnchorPosition(i));
            }
            return allPositionArr;
        },
        //计算滑块当前位置
        getSliderPosition: function () {
            let self = this,
                maxSliderPosition = self.getMaxSliderPosition();

            return Math.min(maxSliderPosition, maxSliderPosition *
                self.$cont[0].scrollTop / self.getMaxScrollPosition());
        },
        //内容可滚动高度
        getMaxScrollPosition: function () {
            let self = this;
            return Math.max(self.$cont.height(), self.$cont[0].scrollHeight) - self.$cont.height();
        },
        //滑块可移动距离
        getMaxSliderPosition: function () {
            let self = this;
            return self.$bar.height() - self.$slider.height();
        },
        //移动
        scrollTo: function (positionVal) {
            let self = this;
            let posArr = self.getAllAnchorPosition();

            //滚动条位置与tab标签对应
            function getIndex(positionVal) {
                for (let i = posArr.length - 1; i >= 0; i--) {
                    if (positionVal >= posArr[i]) {
                        return i;
                    }
                }
            }

            if (posArr.length === self.$tabItem.length) {
                self.changeTabSelect(getIndex(positionVal));
            }
            self.$cont.scrollTop(positionVal);
        }
    });
    win.CusScrollBar = CusScrollBar;
})(window, document, jQuery);

let scroll = new CusScrollBar({
    contSelector: ".scroll-cont",       //滚动内容区选择器
    barSelector: ".scroll-bar",         //滚动条选择器
    sliderSelector: ".scroll-slider",   //滚动滑块选择器
});
