;(function ($, undefined) {

    var pluginName = 'codeBoxCopy',
        defaults = {
            tooltipText: 'Copié',
            tooltipShowTime: 1000,
            tooltipFadeInTime: 300,
            tooltipFadeOutTime: 300
        };
        
    $( "pre" ).wrap( "<div class='code-box-copy'></div>" );
    $('code').attr('id', 'example-head');
    var copyButton = "<button type='button' class='code-box-copy__btn' data-clipboard-target='#example-head' type = 'submit' title='Copier le code' aria-label='Copier le code' data-toggle='tooltip' data-placement='left auto' data-trigger='hover' data-clipboard-copy><i class='fa fa-copy'></i></button>";

 $(copyButton).prependTo(".code-box-copy");
    function Plugin( element, options ) {
        this.element = element;
        this.options = $.extend( {}, defaults, options) ;
        this._defaults = defaults;
        this._name = pluginName;
        this.init();
    }

    Plugin.prototype = {

        init: function() {

            var $btn, $tooltip, btn, tooltip, opts, clipboard;

            btn = this.element.querySelector('.code-box-copy__btn');

            if (!btn) return;

            opts = this.options;
            clipboard = new Clipboard(btn);

            clipboard.on('success', function(e) {
                $btn = $(e.trigger);
                $btn.prop('disabled', true);

                tooltip = '<span class="code-box-copy__tooltip">';
                tooltip += opts.tooltipText;
                tooltip += '</span>';
                $(tooltip).prependTo($btn);
                $tooltip = $btn.find('.code-box-copy__tooltip');
                $tooltip.fadeIn(opts.tooltipFadeInTime);

                setTimeout(function () {
                  $tooltip.fadeOut(opts.tooltipFadeOutTime, function () {
                      $tooltip.remove();
                  });
                  $btn.prop('disabled', false);
                }, opts.tooltipShowTime);
            });
        }
    };

    $.fn[pluginName] = function (options) {
        return this.each(function () {
            if (!$.data(this, 'plugin_' + pluginName)) {
                $.data(this, 'plugin_' + pluginName,
                new Plugin(this, options));
            }
        });
    };
})(jQuery);
