(function ($) {
    "use strict";
    
    /**
     * @desc 注意；！！ let的作用域是："之后"+"内部"，内部互相引用了，注意第26行引用了PageSwitch
     * @date 2018/8/3
     * @author XDP
     */ 
    let PageSwitch,
        _prefix;

    /*说明:获取浏览器前缀*/
    /*实现：判断某个元素的css样式中是否存在transition属性*/
    /*参数：dom元素*/
    /*返回值：boolean，有则返回浏览器样式前缀，否则返回false*/
    _prefix = (function (temp) {
        let aPrefix = ["webkit", "Moz", "o", "ms"],
            props = "";
        for (let i in aPrefix) {
            props = aPrefix[i] + "Transition";
            if (temp.style[props] !== undefined) {
                return "-" + aPrefix[i].toLowerCase() + "-";
            }
        }
        return false;
    })(document.createElement(PageSwitch));

    PageSwitch = (function () {
        function PageSwitch(element, options) {
            this.settings = $.extend(true, $.fn.PageSwitch.defaults, options || {});
            this.element = element;
            this.init();
        }

        PageSwitch.prototype = {
            /**
             * @desc 初始化插件：初始化DOM结构，布局，分页及绑定事件
             * @date 2018/8/2
             * @author XDP
             */
            init: function () {
                let self = this;
                self.selectors = self.settings.selectors;
                self.sections = self.element.find(self.selectors.sections);
                self.section = self.sections.find(self.selectors.section);

                self.direction = self.settings.direction === "vertical" ? true : false;
                self.pagesCount = self.pagesCount();
                self.index = (self.settings.index >= 0 && self.settings.index <= self.pagesCount) ? self.settings.index : 0;

                self.canscroll = true;

                if (!self.direction) {
                    self._initLayout();
                }

                if (self.settings.pagination) {
                    self._initPaging();
                }

                self._initEvent();
            },
            /**
             * @desc 获取滑动页面数量
             * @date 2018/8/2
             * @author XDP
             */
            pagesCount: function () {
                return this.section.length;
            },
            /**
             * @desc 获取滑动的宽度（横屏滑动）和高度（竖屏滑动）
             * @date 2018/8/2
             * @author XDP
             */
            switchLength: function () {
                return this.direction ? this.element.height() : this.element.width();
            },
            /**
             * @desc 向上滑动
             * @date 2018/8/2
             * @author XDP
             */
            prev: function () {
                let self = this;
                if (self.index > 0) {
                    self.index--;
                } else if (self.settings.loop) {
                    self.index = self.pagesCount - 1;
                }
                self._scrollPage();
            },
            /**
             * @desc 向下滑动
             * @date 2018/8/2
             * @author XDP
             */
            next: function () {
                let self = this;
                if (self.index < self.pagesCount) {
                    self.index++;
                } else if (self.settings.loop) {
                    self.index = 0;
                }
                self._scrollPage();
            },
            /**
             * @desc 主要针对横屏情况对页面进行布局
             * @date 2018/8/2
             * @author XDP
             */
            _initLayout: function () {
                let self = this;
                if (!self.direction) {
                    let width = (self.pagesCount * 100) + '%',
                        cellWidth = (100 / self.pagesCount).toFixed(2) + '%';
                    self.sections.width(width);
                    self.section.width(cellWidth).css("float", "left");
                }
                if (self.index) {
                    self._scrollPage(true);
                }
            },
            /**
             * @desc 实现分页的dom结构以及css样式
             * @date 2018/8/2
             * @author XDP
             */
            _initPaging: function () {
                let self = this,
                    pagesClass = self.selectors.page.substring(1);
                self.activeClass = self.selectors.active.substring(1);
                let pageHtml = "<ul class=" + pagesClass + ">";
                for (let i = 0; i < self.pagesCount; i++) {
                    pageHtml += "<li></li>";
                }
                pageHtml += "</ul>";
                self.element.append(pageHtml);
                let pages = self.element.find(self.selectors.page);
                self.pageItem = pages.find("li");
                self.pageItem.eq(self.index).addClass(self.activeClass);
                if (self.direction) {
                    pages.addClass("vertical");
                } else {
                    pages.addClass("horizontal");
                }
            },
            /**
             * @desc 初始化插件事件
             * @date 2018/8/2
             * @author XDP
             */
            _initEvent: function () {
                let self = this;
                /*绑定分页click事件*/
                self.element.on("click", self.selectors.page + " li", function () {
                    self.index = $(this).index();
                    self._scrollPage();
                });
                /*绑定鼠标滚轮事件*/
                self.element.on("mousewheel DOMMouseScroll", function (e) {
                    e.preventDefault();
                    let delta = e.originalEvent.wheelDelta || -e.originalEvent.detail;
                    if (self.canscroll) {
                        if (delta > 0 && (self.index && !self.settings.loop || self.settings.loop)) {
                            self.prev();
                        } else if (delta < 0 && (self.index < (self.pagesCount - 1) && !self.settings.loop || self.settings.loop)) {
                            self.next();
                        }
                    }
                });
                /*绑定键盘按下事件*/
                if (self.settings.keyboard) {
                    $(window).on("keydown", function (e) {
                        let keyCode = e.keyCode;
                        if (keyCode === 37 || keyCode === 38) {
                            self.prev();
                        } else if (keyCode === 39 || keyCode === 40) {
                            self.next();
                        }
                    })
                }
                /*绑定窗口改变事件*/
                /*为了不频繁调用resize的回调方法，做了延迟*/
                let resizeId;
                $(window).resize(function () {
                    clearTimeout(resizeId);
                    resizeId = setTimeout(function () {
                        let currentLength = self.switchLength();
                        let offset = self.settings.direction ?
                            self.section.eq(self.index).offset().top :
                            self.section.eq(self.index).offset().left;
                        if (Math.abs(offset) > currentLength / 2 && self.index < (self.pagesCount - 1)) {
                            self.index++;
                        }
                        if (self.index) {
                            self._scrollPage();
                        }
                    }, 500);
                });
                /*支持CSS3动画的浏览器，绑定transitionend事件(即在动画结束后调用起回调函数)*/
                if (_prefix) {
                    self.sections.on("transitionend webkitTransitionEnd oTransitionEnd otransitionend", function () {
                        self.canscroll = true;
                        if (self.settings.callback && $.type(self.settings.callback) === "function") {
                            self.settings.callback();
                        }
                    });
                }
            },
            /*滑动动画*/
            _scrollPage: function (init) {
                let self = this,
                    dist = self.section.eq(self.index).position();
                if (!dist) return;

                self.canscroll = false;
                if (_prefix) {
                    let translate = self.direction ? "translateY(-" + dist.top + "px)" : "translateX(-" + dist.left + "px)";
                    self.sections.css(_prefix + "transition", "all " + self.settings.duration + "ms " + self.settings.easing);
                    self.sections.css(_prefix + "transform", translate);
                } else {
                    let animateCss = self.direction ? {top: -dist.top} : {left: -dist.left};
                    self.sections.animate(animateCss, self.settings.duration, function () {
                        self.canscroll = true;
                        if (self.settings.callback) {
                            self.settings.callback();
                        }
                    });
                }
                if (self.settings.pagination && !init) {
                    self.pageItem.eq(self.index)
                        .addClass(self.activeClass)
                        .siblings("li")
                        .removeClass(self.activeClass);
                }
            },
        };
        return PageSwitch;
    })();

    $.fn.PageSwitch = function (options) {
        return this.each(function () {
            let self = $(this),
                instance = self.data("PageSwitch");
            if (!instance) {
                self.data("PageSwitch", (instance = new PageSwitch(self, options)));
            }
            if ($.type(options) === "string") return instance[options]();
        });
    };
    $.fn.PageSwitch.defaults = {
        selectors: {
            sections: ".sections",
            section: ".section",
            page: ".pages",
            active: ".active",
        },
        index: 0,
        easing: "ease",
        duration: 500,
        loop: false,
        pagination: true,
        keyboard: true,
        direction: "vertical",  //horizontal
        callback: "",
    };
    $(function () {
        $('[data-PageSwitch]').PageSwitch({
            loop: true,
            direction: "horizontal",
        });
    });
})(jQuery);