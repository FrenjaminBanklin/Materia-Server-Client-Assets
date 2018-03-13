Namespace('Materia').Engine = do ->
	_baseUrl = null
	_instance = null
	_lastHeight = -1
	_mediaUrl = null
	_resizeInterval = null
	_widgetClass = null

	_onPostMessage = (e) ->
		msg = JSON.parse(e.data)
		switch msg.type
			when 'initWidget'
				_baseUrl = msg.data[2]
				_mediaUrl = msg.data[3]
				_initWidget msg.data[0], msg.data[1]
			else
				throw new Error "Error: Engine Core received unknown post message: #{msg.type}"

	_sendPostMessage = (type, data) ->
		parent.postMessage JSON.stringify({type:type, data:data}), '*'

	# Called by Materia.Player when your widget Engine should start the user experience
	_initWidget = (qset, instance) ->
		_widgetClass.start instance, qset.data, qset.version
		_instance = instance;

	start = (widgetClass) ->
		# setup the postmessage listener
		switch
			when addEventListener? then addEventListener 'message', _onPostMessage, false
			when attachEvent? then attachEvent 'onmessage', _onPostMessage

		if widgetClass.manualResize? and widgetClass.manualResize is false
			_resizeInterval = setInterval () ->
				setHeight()
			, 300

		_widgetClass = widgetClass
		_sendPostMessage 'initialize'
		_sendPostMessage 'start', null

	sendStorage = ->
		_sendPostMessage 'sendStorage', arguments[0]

	addLog = (type = '', item_id = 0, text = '', value) ->
		_sendPostMessage 'addLog', {type:type, item_id:item_id, text:text, value:value}

	alert = (title, msg, type = 1) ->
		_sendPostMessage 'alert', {title: title, msg: msg, type: type}

	getImageAssetUrl = (mediaId) ->
		"#{_mediaUrl}/#{mediaId}"

	end = (showScoreScreenAfter = yes) ->
		_sendPostMessage 'end', showScoreScreenAfter

	sendPendingLogs = ->
		_sendPostMessage 'sendPendingLogs', {}

	setHeight = (h) ->
		unless h
			h = parseInt(window.getComputedStyle(document.documentElement).height, 10)
		if h isnt _lastHeight
			_sendPostMessage 'setHeight', [h]
			_lastHeight = h

	disableResizeInterval = -> clearInterval _resizeInterval

	escapeScriptTags = (text) ->
		text.replace(/</g, '&lt;').replace(/>/g, '&gt;')

	start:start
	addLog:addLog
	alert:alert
	getImageAssetUrl:getImageAssetUrl
	end:end
	sendPendingLogs:sendPendingLogs
	sendStorage:sendStorage
	disableResizeInterval:disableResizeInterval
	setHeight:setHeight # allows the widget to resize its iframe container to fit the height of its contents
	escapeScriptTags:escapeScriptTags