//右下角提示消息
function floatMessage(msg, timeOut) {
    
	timeOut = timeOut||5000;
	//初始化
	iziToast.settings({
				timeout: timeOut,
				pauseOnHover: true,
				close: true,
				progressBar: true,
			});
	if ($("#floatMessage").length < 1) {
		$("body").append("<div id='floatMessage'><a href='#'   style='display: none' class='trigger-info' data-iziToast>.</a></div>")
	}
	$(".trigger-info").on('click', function (event) {
        event.preventDefault();
        iziToast.info({
            title: '消息:',
            message: msg,
            position: 'bottomRight',
            transitionIn: 'bounceInRight',
            onOpen: function () {
            },
            onClose: function () {
            }
        });
        //防止冒泡
        $("#floatMessage").remove()
    })
}