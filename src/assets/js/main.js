var element = $('.floating-chat');

setTimeout(function () {
    element.addClass('enter');
}, 1000);

element.click(openElement);

function openElement() {
    var messages = element.find('.messages');
    element.find('>i').hide();
    element.addClass('expand');
    element.find('.chat').addClass('enter');
    $('.footer').find('#message')[0].focus();
    element.off('click', openElement);
    element.find('.header button').click(closeElement);
    element.find('#sendMessage').click(sendNewMessage);
    messages.scrollTop(messages.prop("scrollHeight"));
}

function closeElement() {
    element.find('.chat').removeClass('enter').hide();
    element.find('>i').show();
    element.removeClass('expand');
    element.find('.header button').off('click', closeElement);
    element.find('#sendMessage').off('click', sendNewMessage);
    setTimeout(function () {
        element.find('.chat').removeClass('enter').show();
        element.click(openElement);
    }, 500);
}

function sendNewMessage(e) {
    e.preventDefault();
    var formElement = $('.footer');
    var inputElement = formElement.find('#message')[0];
    var newMessage = inputElement.value;
    if (!newMessage) return;
    var messagesContainer = $('.messages');
    messagesContainer.append([
        '<li class="other">',
        newMessage,
        '</li>'
    ].join(''));
    messagesContainer.finish().animate({
        scrollTop: messagesContainer.prop("scrollHeight")
    }, 250);
    setTimeout(function () {
        messagesContainer.append([
            '<li class="self">',
            '...',
            '</li>'
        ].join(''));
        messagesContainer.finish().animate({
            scrollTop: messagesContainer.prop("scrollHeight")
        }, 250);
    }, 500);
    inputElement.value = '';
    var requestUrl = $('#msg').data('text');

    $.ajax({
        url: requestUrl,
        // Here is test link with api that send random text by request(to test if server is not working)
        // url: 'https://api.quotable.io/random?msg="hellooo"',
        type: "post",
        dataType: 'json',
        contentType: 'application/json',
        xhrFields: {withCredentials: true},
        headers: {
            "accept": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        crossDomain: true,
        data: JSON.stringify({
            "Utterance": newMessage
        }),
        success: function (response) {
            setTimeout(function () {
                var responseMsg = JSON.parse(response);
                messagesContainer.find('li.self:last-child').remove();
                messagesContainer.append([
                    '<li class="self">',
                    responseMsg.queryResult.fulfillmentText,
                    '</li>'
                ].join(''));
                messagesContainer.finish().animate({
                    scrollTop: messagesContainer.prop("scrollHeight")
                }, 250);
            }, 2000);
        },
        error: function (error) {
            messagesContainer.find('li.self:last-child').remove();
            console.log(error);
            console.log('ERROR');

            e.preventDefault();
        }
    });
    inputElement.focus();
}