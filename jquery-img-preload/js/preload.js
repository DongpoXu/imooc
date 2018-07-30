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
            order: 'unordered',     //unordered loading is used by default
            each: null,     //do the function when each image down
            all: null       //do the function when all images down
        };
        //加载在原型链中避免重复
        Preload.prototype._ordered = function () {        //ordered preload
            let opts = this.opts,
                img = this.imgs,
                len = img.length,
                count = 0;

            //ordered preload
            function load() {
                //用一个图片对象对需要的图片进行预加载
                let imgObj = new Image();
                $(imgObj).on('load error', function () {
                    opts.each && opts.each(count);
                    if (count >= len) {
                        //all images are loaded
                        opts.all && opts.all();
                    } else {
                        load();
                    }
                    count++;
                });
                imgObj.src = imgs[count];
            }

            load();     //do load
        };
        Preload.prototype._unordered = function () {        //unordered preload
            let img = this.imgs,
                opts = this.opts,
                len = img.length,
                count = 0;

            $.each(img, function (i, src) {
                if (typeof src !== 'string') return;
                let imgObj = new Image();
                //Event: load error
                $(imgObj).on('load error', function () {
                    //If we have each, do it
                    opts.each && opts.each(count);
                    if (count >= len - 1) {
                        //If we have all, do it
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