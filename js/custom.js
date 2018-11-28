(function ($) {
    $(document).ready(function () {
        let lastPage = '';
        const source = $('.source');


        $('#new-quote-button').on('click', function (event) {
            event.preventDefault();
            lastPage = document.URL;

            $.ajax({

                method: 'GET',
                url: qod_vars.rest_url + 'wp/v2/posts?filter[orderby]=rand&filter[posts_per_page]=1',

                success: function (data) {
                    const post = data.shift();

                    $('.entry-content').html(post.content.rendered);
                    $('.entry-title').html(post.title.rendered);

                    if (post._qod_quote_source !== '' && post._qod_quote_source_url !== '') {
                        source.html(', <a href="' + post._qod_quote_source_url + '" target="_blank">' + post._qod_quote_source + '</a>');
                    }

                    else if (post._qod_quote_source !== '' && post._qod_quote_source_url === '') {
                        source.html(', ' + post._qod_quote_source);
                    }

                    else {
                        source.html('');
                    }


                    history.pushState(null, null, qod_vars.home_url + '/' + post.slug);

                }

            });
        })
        $(window).on('popstate', function () {
            window.location.replace(lastPage);
        });


        $('#submit').on('click', function (event) {
            event.preventDefault();

            let title = $('#quote-author').val();
            const content = $('#quote-content').val();
            const source = $('#quote-source').val();
            const sourceURL = $('#quote-source-url').val();

            const JSONData = {
                'title': title,
                'content': content,
                'source': source,
                'source_url': sourceURL,
                status: 'pending',
            };

            $.ajax({
                type: 'POST',
                url: qod_vars.rest_url + 'wp/v2/posts',
                dataType: 'json',
                data: JSONData,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader('X-WP-Nonce', qod_vars.nonce);
                },

                success: function () {

                    $('#quote-submission-form').slideUp(1500);
                    $('.quote-submission-wrapper').append('<p>' + qod_vars.success + '</p>');
                },

                error: function () {
                    $('#quote-submission-form').slideUp(1500);
                    $('.quote-submission-wrapper').append('<p>' + qod_vars.failure + '</p>');
                }

            });

        });

    })
})(jQuery);



