var element = $('.floating-chat');

setTimeout(function () {
    element.addClass('enter');
}, 1000);

element.click(openElement);

function openElement() {
    var messages = element.find('.messages');
    var textInput = element.find('.text-box');
    element.find('>i').hide();
    element.addClass('expand');
    element.find('.chat').addClass('enter');
    textInput.keydown(onMetaAndEnter).prop("disabled", false).focus();
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
    element.find('.text-box').off('keydown', onMetaAndEnter).prop("disabled", true).blur();
    setTimeout(function () {
        element.find('.chat').removeClass('enter').show()
        element.click(openElement);
    }, 500);
}

function sendNewMessage(e) {
    var userInput = $('.text-box');
    var newMessage = userInput.html().replace(/\<div\>|\<br.*?\>/ig, '\n').replace(/\<\/div\>/g, '').trim().replace(/\n/g, '<br>');

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
    userInput.html('');
var requestUrl = $('#msg').data('text');

    $.ajax({
        url: requestUrl,
        type: "post",
        dataType:'json',
        contentType: 'application/json',
        xhrFields: {withCredentials: true},
        headers:{
            "accept": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        crossDomain: true,
        data: JSON.stringify({
            "Utterance": newMessage
        }),
        // url: 'https://api.quotable.io/random?msg="hellooo"',
        success: function (response) {
            setTimeout(function () {
                console.log('response', response)
                messagesContainer.find('li.self:last-child').remove();
                messagesContainer.append([
                    '<li class="self">',
                    response.split(0,20),
                    '</li>'
                ].join(''));
                messagesContainer.finish().animate({
                    scrollTop: messagesContainer.prop("scrollHeight")
                }, 250);
            }, 2000);
        },
        error: function (errror) {
            console.log(errror)
            console.log('ERROR')

            e.preventDefault();
        }
    });

    userInput.focus();
}

function onMetaAndEnter(event) {
    if ((event.metaKey || event.ctrlKey) && event.keyCode == 13) {
        sendNewMessage();
    }
}