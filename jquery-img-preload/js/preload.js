// img preload
(function ($) {
        function Preload(img, options) {
            this.imgs = (typeof img === 'string') ? [img] : img;
            this.opts = $.extend({}, Preload.DEFAULTS, options);

            if ('ordered' === this.opts.order) {
                this._ordered();
            } else {
                this._unordered();
            }
        }



        Preload.DEFAULTS = {
            order: 'unordered',     //默认使用无序预加载
            each: null,     //每一张图片加载完毕后执行
            all: null       //所有图片加载完毕后执行
        };
        Preload.prototype._ordered = function () {        //有序加载
            let opts = this.opts,
                img = this.imgs,
                len = img.length,
                count = 0;

            //有序预加载
            function load() {
                let imgObj = new Image();
                $(imgObj).on('load error', function () {
                    opts.each && opts.each(count);
                    if (count >= len) {
                        //所有图片已经加载完毕
                        opts.all && opts.all();
                    } else {
                        load();
                    }
                    count++;
                });
                imgObj.src = imgs[count];
            }

            load();
        };
        Preload.prototype._unordered = function () {        //无序加载
            let img = this.imgs,
                opts = this.opts,
                len = img.length,
                count = 0;

            $.each(img, function (i, src) {
                if (typeof src !== 'string') return;
                let imgObj = new Image();
                // load error
                $(imgObj).on('load error', function () {
                    opts.each && opts.each(count);

                    if (count >= len - 1) {
                        opts.all && opts.all();
                    }
                    count++;
                });
                imgObj.src = src;
            });
        };
        $.extend({
            preload: function (img, opts) {
                new Preload(img, opts);
            }
        });
    }
)(jQuery);