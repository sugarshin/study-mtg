class ActiveNav

  $window = $(window)

  _prepareTarget = ->
    @targetOffset = []
    for a, i in @$el.find('a')
      @targetOffset[i] = $(a.getAttribute('href')).offset().top
    return

  _init = ->
    _doActive.call @

  _doActive = ->
    scrollTop = $window.scrollTop()

    @$el.find('a').removeClass @options.className

    if scrollTop < @targetOffset[1]
      @$el.find('a').eq(0).addClass @options.className

    else if @targetOffset[1] <= scrollTop < @targetOffset[2]
      @$el.find('a').eq(1).addClass @options.className

    else if @targetOffset[2] <= scrollTop < @targetOffset[3]
      @$el.find('a').eq(2).addClass @options.className

    else if @targetOffset[3] <= scrollTop
      @$el.find('a').eq(3).addClass @options.className

    return

  defaults =
    className: 'active'

  constructor: ($el, options) ->
    @$el = $el
    @options = $.extend {}, defaults, options

    _prepareTarget.call @
    _init.call @

    @addEvent()

  addEvent: ->
    _this = @
    $window.on 'scroll.activeNav', ->
      _doActive.call _this
      return
    @

  removeEvent: ->
    $window.off 'scroll.activeNav'
    @

# class ActiveNav ----------------------

$.fn.activeNav = (options) ->
  @each (i, el) ->
    $el = $(el)

    if !$el.data('activeNav')?
      activeNav = new ActiveNav $el, options
      $el.data 'activeNav', activeNav
    return

$('#gNav').activeNav()

# activeNav ----------------------------





class SmoothScroll

  defaults =
    speed: 500
    fx: 'swing'
    onScrollBefore: null
    onScrollAfter: null

  _prepareTarget = ->
    if @$el.attr('href') isnt '#'
      @$target = $(@$el.attr('href'))
    return

  _eventify = ->
    _this = @
    @$el.on 'click.smoothScroll', (ev) ->
      ev.preventDefault()
      _this.doScroll this
      return
    return

  constructor: ($el, options) ->
    @options = $.extend {}, defaults, options
    @$el = $el

    _prepareTarget.call @
    _eventify.call @

  doScroll: (el) ->
    if !@$target then return

    _this = @

    if typeof _this.options.onScrollBefore is 'function'
      _this.options.onScrollBefore el

    scrollVal = @$target.offset().top

    $('html, body')
      .stop(true, true)
      .animate(
        scrollTop: scrollVal
      , @options.speed, @options.fx
      )
      .promise()
      .done ->
        if typeof _this.options.onScrollAfter is 'function'
          _this.options.onScrollAfter el
        return
    @

# class SmoothScroll -------------------

$.fn.smoothScroll = (options) ->
  @each (i, el) ->
    $el = $(el)

    if !$el.data('smoothScroll')?
      smoothScroll = new SmoothScroll $el, options
      $el.data 'smoothScroll', smoothScroll
    return

`$.easing.easeOutExpo = function (x, t, b, c, d) {
  return (t==d) ? b+c : c * (-Math.pow(2, -10 * t/d) + 1) + b;
}`

$('a[href^="#"]').smoothScroll(
  speed: 1000
  fx: 'easeOutExpo'
  onScrollBefore: (el) ->
    $('#gNav').find('a').removeClass 'active'
    activeNav = $('#gNav').data 'activeNav'
    activeNav.removeEvent()

    $(el).addClass 'active'

    return

  onScrollAfter: (el) ->
    activeNav = $('#gNav').data 'activeNav'
    activeNav.addEvent()
    return
)

# smoothScroll -------------------------
