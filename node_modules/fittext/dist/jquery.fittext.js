$.fn.fitText = function(maxFontSize, language) {
        var fontSize = maxFontSize;
        var container = $(this);

        if (language) container.hyphenate(language);
        else container.css('word-break', 'break-all');

        var text = container.val() || container.text();
        var getTextSize = function() {
            if (!$.fn.fitText.fakeEl) {
                $.fn.fitText.fakeEl = $('<div></div>')
                    .width(container.width())
                    .height(container.height())
                    .appendTo($('body'))
                    .css('visibility', 'hidden');
                var span = $('<span>').appendTo($.fn.fitText.fakeEl);
            }
            $.fn.fitText.fakeEl.children('span').text(text).css('font', container.css('font'));
            return $.fn.fitText.fakeEl.children('span').height();
        };

        do {
            fontSize -= 5;
            container.css('font-size', fontSize);
        }
        while(getTextSize() > container.height() && fontSize > 0);
};