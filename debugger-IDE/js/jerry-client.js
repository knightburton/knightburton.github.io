var JERRY_DEBUGGER_CONFIGURATION = 1;
var JERRY_DEBUGGER_PARSE_ERROR = 2;
var JERRY_DEBUGGER_BYTE_CODE_CP = 3;
var JERRY_DEBUGGER_PARSE_FUNCTION = 4;
var JERRY_DEBUGGER_BREAKPOINT_LIST = 5;
var JERRY_DEBUGGER_BREAKPOINT_OFFSET_LIST = 6;
var JERRY_DEBUGGER_RESOURCE_NAME = 7;
var JERRY_DEBUGGER_RESOURCE_NAME_END = 8;
var JERRY_DEBUGGER_FUNCTION_NAME = 9;
var JERRY_DEBUGGER_FUNCTION_NAME_END = 10;
var JERRY_DEBUGGER_RELEASE_BYTE_CODE_CP = 11;
var JERRY_DEBUGGER_BREAKPOINT_HIT = 12;
var JERRY_DEBUGGER_BACKTRACE = 13;
var JERRY_DEBUGGER_BACKTRACE_END = 14;

var JERRY_DEBUGGER_FREE_BYTE_CODE_CP = 1;
var JERRY_DEBUGGER_UPDATE_BREAKPOINT = 2;
var JERRY_DEBUGGER_STOP = 3;
var JERRY_DEBUGGER_CONTINUE = 4;
var JERRY_DEBUGGER_STEP = 5;
var JERRY_DEBUGGER_NEXT = 6;
var JERRY_DEBUGGER_GET_BACKTRACE = 7;

var client = {
  socket : null,
  debuggerObj : null,
};

var env = {
  editor : ace.edit("editor"),
  fileName : null,
  numberOfHiddenPanel : 0,
  isBacktracePanelActive : true,
  isContActive : true,
  breakpointIds : [],
  commandLine : $("#command"),
};

var marker = {
  executed : null,
  lastMarked : null,
};

var keybindings = {
  ace: null,
  vim: "ace/keyboard/vim",
  emacs: "ace/keyboard/emacs",
  custom: null, // Create own bindings here.
};

var Logger = function(panelId)
{
  var panel = $("#" + panelId);
  function log(str)
  {
    panel.append($("<span class='log data'>" + str + "</span>"));
    scrollDownToBottom(panel);
  }

  function err(str)
  {
    panel.append($("<span class='error data'>" + str + "</span>"));
    scrollDownToBottom(panel);
  }

  this.log = log;
  this.err = err;
};

var logger = new Logger("console-panel");

function disableButtons(disable)
{
  if (disable)
  {
    // Enable the connection button.
    $("#connect-to-button").removeClass("disabled");
    $("#host-address").removeAttr("disabled");

    // Disable the debugger buttons.
    $(".debugger-buttons .btn-default").addClass("disabled");
  }
  else
  {
    // Disable the connection button.
    $("#connect-to-button").addClass("disabled");
    $("#host-address").attr("disabled", true);

    // Enable the debugger buttons.
    $(".debugger-buttons .btn-default").removeClass("disabled");
  }
}

function updateContinueStopButton(str) {
  switch (str)
  {
    case "stop":
    {
      env.isContActive = false;
      $("#continue-stop-button i").removeClass("fa-play");
      $("#continue-stop-button i").addClass("fa-stop");
    } break;
    case "continue":
    {
      $("#continue-stop-button i").removeClass("fa-stop");
      $("#continue-stop-button i").addClass("fa-play");
      env.isContActive = true;
    } break;
  }
}

function scrollDownToBottom(element)
{
  element.scrollTop(element.prop("scrollHeight"));
}

function resetPanel(element)
{
  element.empty();
}

function updateInvalidLines()
{
  if (client.debuggerObj)
  {
    var lines = client.debuggerObj.getBreakpointLines().sort(function(a, b){ return a - b} );

    for (var i = env.editor.session.getLength(); i > 0; i--) {
      if (lines.includes(i) === false)
      {
        //editor.session.removeGutterDecoration(i - 1, "invalid-gutter-cell");
        env.editor.session.addGutterDecoration(i - 1, "invalid-gutter-cell");
      }
    }
  }
}

function getbacktrace()
{
  var max_depth = 0;
  var user_depth = $("#backtrace-depth").val();

  if (user_depth != 0)
  {
    if (/[1-9][0-9]*/.exec(user_depth))
    {
      max_depth = parseInt(user_depth);
    }
    else
    {
      logger.err("Invalid maximum depth argument.");
      return true;
    }
  }

  logger.log("Backtrace:");

  client.debuggerObj.encodeMessage("BI", [ JERRY_DEBUGGER_GET_BACKTRACE, max_depth ]);
}

function highlightCurrentLine(lineNumber) {
  lineNumber--;
  unhighlightCurrentLine();
  var Range = ace.require("ace/range").Range;
  marker.executed = env.editor.session.addMarker(new Range(lineNumber, 0, lineNumber, 1), "execute-marker", "fullLine");

  env.editor.session.addGutterDecoration(lineNumber, "execute-gutter-cell-marker");
  marker.lastMarked = lineNumber;
}

function unhighlightCurrentLine(){
  env.editor.getSession().removeMarker(marker.executed);
  env.editor.session.removeGutterDecoration(marker.lastMarked, "execute-gutter-cell-marker");
}

function updateBacktracePanel(frame, info)
{
  var resource = info.func.resource || info;
  var line = info.line || "-";
  var func = info.func.name || "-";

  var panel = $("#backtrace-content");
  panel.append("\
    <div class='list-row'>\
      <div class='list-col list-col-0'>" + frame + "</div>\
      <div class='list-col list-col-1'>" + resource + "</div>\
      <div class='list-col list-col-2'>" + line + "</div>\
      <div class='list-col list-col-3'>" + func + "</div>\
    </div>\
  ");
  scrollDownToBottom(panel);
}

function updateBreakpointsPanel()
{
  var panel = $("#breakpoints-content");
  resetPanel(panel);

  var activeBreakpoints = client.debuggerObj.getActiveBreakpoints();

  for (var i in activeBreakpoints)
  {
    var resource = activeBreakpoints[i].func.resource || "-";
    var line = activeBreakpoints[i].line || "-";
    var id = activeBreakpoints[i].activeIndex || "-";
    var func = activeBreakpoints[i].func.name || "-";

    panel.append("\
      <div class='list-row' id='br-" + line + "-" + id + "'>\
        <div class='list-col list-col-0'>" + resource + "</div>\
        <div class='list-col list-col-1'>" + line + "</div>\
        <div class='list-col list-col-2'>" + id + "</div>\
        <div class='list-col list-col-3'>" + func + "</div>\
      </div>\
    ");
  }

  scrollDownToBottom(panel);
}

$(document).ready(function()
{
  // Init the ACE editor.
  env.editor.setTheme("ace/theme/chrome");
  var JavaScriptMode = ace.require("ace/mode/javascript").Mode;
  env.editor.session.setMode(new JavaScriptMode());
  env.editor.setShowInvisibles(false);

  // Workaround for the auto scrolling when set the document value.
  // This is gonna be fixed in the next version of ace.  
  env.editor.$blockScrolling = Infinity;

  // Editor settings button event.
  $("#editor-settings-button").on("click", function() {
    $(".control-panel-wrapper").toggleClass("block-control-panel-wrapper");
  });

  // File load button event.
  $("#open-file-button").on("click", function() {
    // Check for the various File API support.
    if (window.File && window.FileReader && window.FileList && window.Blob) {
      // Great success! All the File APIs are supported.
      // Open the file browser.
      $("#hidden-file-input").trigger("click");

      // Manage the file input change
      $("#hidden-file-input").on("change", function(evt) {
        // FileList object
        var files = evt.target.files;
        var file = files[0];

        // Only process javascript files.
        if (file.type.match("application/javascript")) {
          // Refresh the status bar text.
          $("#status-bar-content").html("<span>" + file.name + "</span>");
          env.fileName = file.name;

          // Read the data into the memory.
          var reader = new FileReader();
          reader.readAsText(file, "utf-8");

          // Handle success, and errors.
          reader.onload = function(evt) {
            // Obtain the read file data.
            var fileText = evt.target.result;

            // Add the text to the editor.
            env.editor.setValue(fileText);
            env.editor.clearSelection();
            env.editor.gotoLine(1, 0, false);

            // Reset the input field value.
            $("#hidden-file-input").val("");
          };

          reader.onerror = function(evt) {
            if(evt.target.error.name == "NotReadableError") {
              alert("The file could not be read.");
            }
          };

        } else {
          alert("You must choose a Javascript file.");
        }
      });
    } else {
      alert("The File APIs are not fully supported in this browser.");
    }
  });

  /**
  * Editor setting events.
  */
  $("#theme").on("change", function() {
    env.editor.setTheme(this.value);
  });

  $("#fontsize").on("change", function() {
    env.editor.setFontSize(this.value); 
  });

  $("#folding").on("change", function() {
    env.editor.session.setFoldStyle(this.value);
  });

  $("#keybinding").on("change", function() {
    env.editor.setKeyboardHandler(keybindings[this.value]);
  });

  $("#soft_wrap").on("change", function() {
    env.editor.setOption("wrap", this.value);
  });

  $("#select_style").on("change", function() {
    env.editor.setOption("selectionStyle", this.checked ? "line" : "text");
  });

  $("#highlight_active").on("change", function() {
    env.editor.setHighlightActiveLine(this.checked);
  });

  $("#display_indent_guides").on("change", function() {
    env.editor.setDisplayIndentGuides(this.checked);
  });

  $("#show_hidden").on("change", function() {
    env.editor.setShowInvisibles(this.checked);
  });

  $("#show_hscroll").on("change", function() {
    env.editor.setOption("hScrollBarAlwaysVisible", this.checked);
  });

  $("#show_vscroll").on("change", function() {
    env.editor.setOption("vScrollBarAlwaysVisible", this.checked);
  });

  $("#animate_scroll").on("change", function() {
    env.editor.setAnimatedScroll(this.checked);
  });

  $("#show_gutter").on("change", function() {
    env.editor.renderer.setShowGutter(this.checked);
  });

  $("#show_print_margin").on("change", function() {
    env.editor.renderer.setShowPrintMargin(this.checked);
  });

  $("#soft_tab").on("change", function() {
    env.editor.session.setUseSoftTabs(this.checked);
  });

  $("#highlight_selected_word").on("change", function() {
    env.editor.setHighlightSelectedWord(this.checked);
  });

  $("#enable_behaviours").on("change", function() {
    env.editor.setBehavioursEnabled(this.checked);
  });

  $("#fade_fold_widgets").on("change", function() {
    env.editor.setFadeFoldWidgets(this.checked);
  });

  $("#read_only").on("change", function() {
    env.editor.setReadOnly(this.checked);
  });

  $("#scrollPastEnd").on("change", function() {
    env.editor.setOption("scrollPastEnd", this.checked);
  });

  /**
  * Layout setting events.
  */
  $(".panel-switch").on("change", function(e)
  {
    var panel = e.target.id.split("-")[0];
    if ($(e.target).is(":checked"))
    {
      if (panel === "backtrace")
      {
        env.isBacktracePanelActive = true;
      }
      $("#" + panel + "-wrapper").show();
      env.numberOfHiddenPanel--;
    }
    else
    {
      if (panel === "backtrace")
      {
        env.isBacktracePanelActive = false;
      }
      $("#" + panel + "-wrapper").hide();
      env.numberOfHiddenPanel++;
    }

    if (env.numberOfHiddenPanel < $("#debugger-panel").children().length)
    {
      $("#editor-wrapper").removeClass("col-lg-12");
      $("#editor-wrapper").addClass("col-lg-6");
      $("#debugger-panel").show();
    }
    else
    {
      $("#editor-wrapper").removeClass("col-lg-6");
      $("#editor-wrapper").addClass("col-lg-12");
      $("#debugger-panel").hide();
    }
  });

  /**
  * Debugger action events.
  */
  $("#connect-to-button").on("click", function(e)
  {
    if ($(this).hasClass("disabled"))
    {
      return true;
    }

    if (client.debuggerObj)
    {
      logger.log("Debugger is connected.");
      return true;
    }

    if ($("#host-address").val() == "")
    {
      logger.err("IP address expected.");
      return true;
    }

    logger.log("Connect to: " + $("#host-address").val());
    client.debuggerObj = new DebuggerClient($("#host-address").val());

    return true;
  });

  // Update the breakpoint lines after editor changes.
  env.editor.session.on("change", function()
  {
    updateInvalidLines();
  });

  $("#continue-stop-button").on("click", function()
  {
    if ($(this).hasClass("disabled"))
    {
      return true;
    }

    if (env.isContActive)
    {
      updateContinueStopButton("stop");
      client.debuggerObj.encodeMessage("B", [ JERRY_DEBUGGER_CONTINUE ]);
    }
    else
    {
      updateContinueStopButton("continue");
      client.debuggerObj.encodeMessage("B", [ JERRY_DEBUGGER_STOP ]);
    }
  });

  $("#step-button").on("click", function() 
  {
    if ($(this).hasClass("disabled"))
    {
      return true;
    }

    client.debuggerObj.encodeMessage("B", [ JERRY_DEBUGGER_STEP ]);
  });

  $("#next-button").on("click", function()
  {
    if ($(this).hasClass("disabled"))
    {
      return true;
    }

    client.debuggerObj.encodeMessage("B", [ JERRY_DEBUGGER_NEXT ]);
  });

  // Use the editor to add a breakpoint.
  env.editor.on("guttermousedown", function(e) {
    if (client.debuggerObj)
    {
      var target = e.domEvent.target; 
      if (target.className.indexOf("ace_gutter-cell") == -1) {
        return; 
      }

      if (!env.editor.isFocused()) {
        return;
      }

      if (e.clientX > 25 + target.getBoundingClientRect().left) {
        return;
      }

      var breakpoints = e.editor.session.getBreakpoints(row, 0);
      var row = e.getDocumentPosition().row;
      var lines = client.debuggerObj.getBreakpointLines();

      if (lines.includes(row+1))
      {
        if(typeof breakpoints[row] === typeof undefined) {
          env.editor.session.setBreakpoint(row);
          env.breakpointIds[row] = client.debuggerObj.getNextBreakpointIndex();
          client.debuggerObj.setBreakpoint(env.fileName + ":" + parseInt(row + 1));
        } else {
          client.debuggerObj.deleteBreakpoint(env.breakpointIds[row]);
          env.editor.session.clearBreakpoint(row);

          updateBreakpointsPanel();
        }
      }

      e.stop();
    }
  });
});

function DebuggerClient(ipAddr)
{
  logger.log("ws://" + ipAddr + ":5001/jerry-debugger");

  var parseObj = null;
  var maxMessageSize = 0;
  var cpointerSize = 0;
  var littleEndian = true;
  var functions = { };
  var lineList = new Multimap();
  var activeBreakpoints = { };
  var nextBreakpointIndex = 1;
  var backtraceFrame = 0;

  function assert(expr)
  {
    if (!expr)
    {
      throw new Error("Assertion failed.");
    }
  }

  /* Concat the two arrays. The first byte (opcode) of nextArray is ignored. */
  function concatUint8Arrays(baseArray, nextArray)
  {
    if (nextArray.byteLength <= 1)
    {
      /* Nothing to append. */
      return baseArray;
    }

    if (!baseArray)
    {
      /* Cut the first byte (opcode). */
      return nextArray.slice(1);
    }

    var baseLength = baseArray.byteLength;
    var nextLength = nextArray.byteLength - 1;

    var result = new Uint8Array(baseArray.byteLength + nextArray.byteLength);
    result.set(nextArray, baseArray.byteLength - 1);

    /* This set overwrites the opcode. */
    result.set(baseArray);

    return result;
  }

  function cesu8ToString(array)
  {
    if (!array)
    {
      return "";
    }

    var length = array.byteLength;

    var i = 0;
    var result = "";

    while (i < length)
    {
      var chr = array[i];

      ++i;

      if (chr >= 0x7f)
      {
        if (chr & 0x20)
        {
          /* Three byte long character. */
          chr = ((chr & 0xf) << 12) | ((array[i] & 0x3f) << 6) | (array[i + 1] & 0x3f);
          i += 2;
        }
        else
        {
          /* Two byte long character. */
          chr = ((chr & 0x1f) << 6) | (array[i] & 0x3f);
          ++i;
        }
      }

      result += String.fromCharCode(chr);
    }

    return result;
  }

  function breakpointToString(breakpoint)
  {
    var name = breakpoint.func.name;

    var result = breakpoint.func.resource;

    if (!result)
    {
      result = "<unknown>";
    }

    result += ":" + breakpoint.line;

    if (breakpoint.func.name)
    {
      result += " (in " + breakpoint.func.name + ")";
    }

    return result;
  }

  function Multimap()
  {
    /* Each item is an array of items. */

    var map = { };

    this.get = function(key)
    {
      var item = map[key];
      return item ? item : [ ];
    }

    this.insert = function(key, value)
    {
      var item = map[key];

      if (item)
      {
        item.push(value);
        return;
      }

      map[key] = [ value ];
    }

    this.delete = function(key, value)
    {
      var array = map[key];

      assert(array);

      var newLength = array.length - 1;
      var i = array.indexOf(value);

      assert(i != -1);

      array.splice(i, 1);

      array.length = newLength;
    }
  }

  client.socket = new WebSocket("ws://localhost:5001/jerry-debugger");
  client.socket.binaryType = 'arraybuffer';

  function abortConnection(message)
  {
    assert(client.socket && client.debuggerObj);

    client.socket.close();
    client.socket = null;
    client.debuggerObj = null;

    logger.err("Abort connection: " + message);
    throw new Error(message);
  }

  client.socket.onerror = function(event)
  {
    if (client.socket)
    {
      client.socket = null;
      client.debuggerObj = null;
      logger.log("Connection closed.");
      disableButtons(true);
    }
  }
  client.socket.onclose = client.socket.onerror;

  client.socket.onopen = function(event)
  {
    logger.log("Connection created.");
    disableButtons(false);
  }

  function getFormatSize(format)
  {
    var length = 0;

    for (var i = 0; i < format.length; i++)
    {
      if (format[i] == "B")
      {
        length++;
        continue;
      }

      if (format[i] == "C")
      {
        length += cpointerSize;
        continue;
      }

      assert(format[i] == "I")

      length += 4;
    }

    return length;
  }

  function decodeMessage(format, message, offset)
  {
    /* Format: B=byte I=int32 C=cpointer.
     * Returns an array of decoded numbers. */

    var result = []
    var value;

    if (!offset)
    {
      offset = 0;
    }

    if (offset + getFormatSize(format) > message.byteLength)
    {
      abortConnection("received message too short.");
    }

    for (var i = 0; i < format.length; i++)
    {
      if (format[i] == "B")
      {
        result.push(message[offset])
        offset++;
        continue;
      }

      if (format[i] == "C" && cpointerSize == 2)
      {
        if (littleEndian)
        {
          value = message[offset] | (message[offset + 1] << 8);
        }
        else
        {
          value = (message[offset] << 8) | message[offset + 1];
        }

        result.push(value);
        offset += 2;
        continue;
      }

      assert(format[i] == "I" || (format[i] == "C" && cpointerSize == 4));

      if (littleEndian)
      {
        value = (message[offset] | (message[offset + 1] << 8)
                 | (message[offset + 2] << 16) | (message[offset + 3] << 24));
      }
      else
      {
        value = ((message[offset] << 24) | (message[offset + 1] << 16)
                 | (message[offset + 2] << 8) | message[offset + 3] << 24);
      }

      result.push(value);
      offset += 4;
    }

    return result;
  }

  function encodeMessage(format, values)
  {
    /* Format: B=byte I=int32 C=cpointer.
     * Sends a message after the encoding is completed. */

    var length = getFormatSize(format);

    var message = new Uint8Array(length);

    var offset = 0;

    for (var i = 0; i < format.length; i++)
    {
      var value = values[i];

      if (format[i] == "B")
      {
        message[offset] = value;
        offset++;
        continue;
      }

      if (format[i] == "C" && cpointerSize == 2)
      {
        if (littleEndian)
        {
          message[offset] = value & 0xff;
          message[offset + 1] = (value >> 8) & 0xff;
        }
        else
        {
          message[offset] = (value >> 8) & 0xff;
          message[offset + 1] = value & 0xff;
        }

        offset += 2;
        continue;
      }

      if (littleEndian)
      {
        message[offset] = value & 0xff;
        message[offset + 1] = (value >> 8) & 0xff;
        message[offset + 2] = (value >> 16) & 0xff;
        message[offset + 3] = (value >> 24) & 0xff;
      }
      else
      {
        message[offset] = (value >> 24) & 0xff;
        message[offset + 1] = (value >> 16) & 0xff;
        message[offset + 2] = (value >> 8) & 0xff;
        message[offset + 3] = value & 0xff;
      }

      offset += 4;
    }

    client.socket.send(message);
  }

  this.encodeMessage = encodeMessage;

  function ParseSource()
  {
    var resourceName = null;
    var functionName = null;
    var stack = [ { name: '', lines: [], offsets: [] } ];
    var newFunctions = [ ];

    this.receive = function(message)
    {
      switch (message[0])
      {
        case JERRY_DEBUGGER_PARSE_ERROR:
        {
          /* Parse error occured in JerryScript. */
          parseObj = null;
          return;
        }

        case JERRY_DEBUGGER_RESOURCE_NAME:
        case JERRY_DEBUGGER_RESOURCE_NAME_END:
        {
          if ((typeof resourceName) == "string")
          {
            abortConnection("unexpected message.");
          }

          resourceName = concatUint8Arrays(resourceName, message);

          if (message[0] == JERRY_DEBUGGER_RESOURCE_NAME_END)
          {
            resourceName = cesu8ToString(resourceName);
          }
          return;
        }

        case JERRY_DEBUGGER_FUNCTION_NAME:
        case JERRY_DEBUGGER_FUNCTION_NAME_END:
        {
          functionName = concatUint8Arrays(functionName, message);
          return;
        }

        case JERRY_DEBUGGER_PARSE_FUNCTION:
        {
          if (resourceName == null)
          {
            resourceName = "";
          }
          else if ((typeof resourceName) != "string")
          {
            abortConnection("unexpected message.");
          }

          stack.push({ name: cesu8ToString(functionName), resource: resourceName, lines: [], offsets: [] });
          functionName = null;
          return;
        }

        case JERRY_DEBUGGER_BREAKPOINT_LIST:
        case JERRY_DEBUGGER_BREAKPOINT_OFFSET_LIST:
        {
          var array;

          if (message.byteLength < 1 + 4)
          {
            abortConnection("message too short.");
          }

          if (message[0] == JERRY_DEBUGGER_BREAKPOINT_LIST)
          {
            array = stack[stack.length - 1].lines;
          }
          else
          {
            array = stack[stack.length - 1].offsets;
          }

          for (var i = 1; i < message.byteLength; i += 4)
          {
            array.push(decodeMessage("I", message, i)[0]);
          }
          return;
        }

        case JERRY_DEBUGGER_BYTE_CODE_CP:
        {
          var func = stack.pop();
          func.byte_code_cp = decodeMessage("C", message, 1)[0];

          lines = {}
          offsets = {}

          func.firstLine = (func.lines.length > 0) ? func.lines[0] : -1;

          for (var i = 0; i < func.lines.length; i++)
          {
            var breakpoint = { line: func.lines[i], offset: func.offsets[i], func: func, activeIndex: -1 };

            lines[breakpoint.line] = breakpoint;
            offsets[breakpoint.offset] = breakpoint;
          }

          func.lines = lines;
          func.offsets = offsets;

          newFunctions.push(func);

          if (stack.length > 0)
          {
            return;
          }

          func.resource = resourceName;
          break;
        }

        default:
        {
          abortConnection("unexpected message.");
          return;
        }
      }

      for (var i = 0; i < newFunctions.length; i++)
      {
        var func = newFunctions[i];

        functions[func.byte_code_cp] = func

        for (var j in func.lines)
        {
          lineList.insert(j, func);
        }
      }

      parseObj = null;
    }
  }

  client.socket.onmessage = function(event)
  {
    var message = new Uint8Array(event.data);

    if (message.byteLength < 1)
    {
      abortConnection("message too short.");
    }

    if (cpointerSize == 0)
    {
      if (message[0] != JERRY_DEBUGGER_CONFIGURATION
          || message.byteLength != 4)
      {
        abortConnection("the first message must be configuration.");
      }

      maxMessageSize = message[1]
      cpointerSize = message[2]
      littleEndian = (message[3] != 0);

      if (cpointerSize != 2 && cpointerSize != 4)
      {
        abortConnection("compressed pointer must be 2 or 4 byte long.");
      }

      config = false;
      return;
    }

    if (parseObj)
    {
      parseObj.receive(message)
      return;
    }

    switch (message[0])
    {
      case JERRY_DEBUGGER_PARSE_ERROR:
      case JERRY_DEBUGGER_BYTE_CODE_CP:
      case JERRY_DEBUGGER_PARSE_FUNCTION:
      case JERRY_DEBUGGER_BREAKPOINT_LIST:
      case JERRY_DEBUGGER_RESOURCE_NAME:
      case JERRY_DEBUGGER_RESOURCE_NAME_END:
      case JERRY_DEBUGGER_FUNCTION_NAME:
      case JERRY_DEBUGGER_FUNCTION_NAME_END:
      {
        parseObj = new ParseSource()
        parseObj.receive(message)
        return;
      }

      case JERRY_DEBUGGER_RELEASE_BYTE_CODE_CP:
      {
        var byte_code_cp = decodeMessage("C", message, 1)[0];

        var func = functions[byte_code_cp];

        for (var i in func.lines)
        {
          lineList.delete(i, func);

          var breakpoint = func.lines[i];

          assert(i == breakpoint.line);

          if (breakpoint.activeIndex >= 0)
          {
            delete activeBreakpoints[breakpoint.activeIndex];
          }
        }

        delete functions[byte_code_cp];

        message[0] = JERRY_DEBUGGER_FREE_BYTE_CODE_CP;
        client.socket.send(message);
        return;
      }

      case JERRY_DEBUGGER_BREAKPOINT_HIT:
      {
        var breakpoint = decodeMessage("CI", message, 1);

        breakpoint = functions[breakpoint[0]].offsets[breakpoint[1]];

        breakpointIndex = "";

        if (breakpoint.activeIndex >= 0)
        {
          breakpointIndex = "breakpoint:" + breakpoint.activeIndex + " ";
          updateContinueStopButton("continue");
        }

        logger.log("Stopped at " + breakpointIndex + breakpointToString(breakpoint));
        updateContinueStopButton("continue");
        updateInvalidLines();
        if (env.isBacktracePanelActive)
        {
          getbacktrace();
        }
        highlightCurrentLine(breakpoint.line);
        return;
      }

      case JERRY_DEBUGGER_BACKTRACE:
      case JERRY_DEBUGGER_BACKTRACE_END:
      {
        resetPanel($("#backtrace-content"));
        for (var i = 1; i < message.byteLength; i += cpointerSize + 4)
        {
          var breakpoint = decodeMessage("CI", message, i);

          var func = functions[breakpoint[0]];
          var best_offset = -1;

          for (var offset in func.offsets)
          {
            if (offset <= breakpoint[1] && offset > best_offset)
            {
              best_offset = offset;
            }
          }

          if (best_offset >= 0)
          {
            breakpoint = func.offsets[best_offset];
            logger.log("  frame " + backtraceFrame + ": " + breakpointToString(breakpoint));
            updateBacktracePanel(backtraceFrame, breakpoint);
          }
          else if (func.name)
          {
            logger.log("  frame " + backtraceFrame + ": " + func.name + "()");
            updateBacktracePanel(backtraceFrame, func.name + "()");
          }
          else
          {
            logger.log("  frame " + backtraceFrame + ": <unknown>()");
            updateBacktracePanel(backtraceFrame, "<unknown>()");
          }

          ++backtraceFrame;
        }

        if (message[0] == JERRY_DEBUGGER_BACKTRACE_END)
        {
          backtraceFrame = 0;
        }
        return;
      }

      default:
      {
        abortConnection("unexpected message.");
        return;
      }
    }
  }

  function insertBreakpoint(breakpoint)
  {
    if (breakpoint.activeIndex < 0)
    {
      breakpoint.activeIndex = nextBreakpointIndex;
      activeBreakpoints[nextBreakpointIndex] = breakpoint;
      nextBreakpointIndex++;

      var values = [ JERRY_DEBUGGER_UPDATE_BREAKPOINT,
                     1,
                     breakpoint.func.byte_code_cp,
                     breakpoint.offset ];

      encodeMessage("BBCI", values);
    }

    logger.log("Breakpoint " + breakpoint.activeIndex + " at " + breakpointToString(breakpoint));
    updateBreakpointsPanel();
  }

  this.setBreakpoint = function(str)
  {
    line = /^(.+):([1-9][0-9]*)$/.exec(str);

    if (line)
    {
      var functionList = lineList.get(line[2]);

      for (var i = 0; i < functionList.length; ++i)
      {
        var func = functionList[i];
        var resource = func.resource;

        if (resource == line[1]
            || resource.endsWith("/" + line[1])
            || resource.endsWith("\\" + line[1]))
        {
          insertBreakpoint(func.lines[line[2]]);
        }
      }
    }
    else
    {
      for (var i in functions)
      {
        var func = functions[i];

        if (func.name == str && func.firstLine >= 0)
        {
          insertBreakpoint(func.lines[func.firstLine]);
        }
      }
    }
  }

  this.deleteBreakpoint = function(index)
  {
    breakpoint = activeBreakpoints[index];

    if (!breakpoint)
    {
      logger.err("No breakpoint found with index " + index);
      return;
    }

    assert(breakpoint.activeIndex == index);

    delete activeBreakpoints[index];
    breakpoint.activeIndex = -1;

    var values = [ JERRY_DEBUGGER_UPDATE_BREAKPOINT,
                   0,
                   breakpoint.func.byte_code_cp,
                   breakpoint.offset ];

    encodeMessage("BBCI", values);

    logger.log("Breakpoint " + index + " is deleted.");
  }

  this.listBreakpoints = function()
  {
    logger.log("List of active breakpoints:");
    var found = false;

    for (var i in activeBreakpoints)
    {
      logger.log("  breakpoint " + i + " at " + breakpointToString(activeBreakpoints[i]));
      found = true;
    }

    if (!found)
    {
      logger.log("  no active breakpoints");
    }
  }

  this.dump = function()
  {
    for (var i in functions)
    {
      var func = functions[i];
      var resource = func.resource;

      if (resource == '')
      {
        resource = "<unknown>";
      }

      logger.log("Function 0x" + Number(i).toString(16) + " '" + func.name + "' at " + resource + ":" + func.firstLine);

      for (var j in func.lines)
      {
        var active = "";

        if (func.lines[j].active >= 0)
        {
          active = " (active: " + func.lines[j].active + ")";
        }

        logger.log("  Breatpoint line: " + j + " at memory offset: " + func.lines[j].offset + active);
      }
    }
  }

  this.getActiveBreakpoints = function ()
  {
    return activeBreakpoints;
  }

  this.getNextBreakpointIndex = function ()
  {
    return nextBreakpointIndex;
  }

  this.getBreakpointLines = function()
  {
    var result = [];
    for (var i in functions)
    {
      var func = functions[i];
      for (var j in func.lines)
      {
        result.push(parseInt(j));
      }
    }
    return result;
  }
}

// Command line illusion
function debuggerCommand(event)
{
  if (event.keyCode != 13)
  {
    return true;
  }

  var command = env.commandLine.val().trim();

  args = /^([a-zA-Z]+)(?:\s+([^\s].*)|)$/.exec(command);

  if (!args)
  {
    logger.err("Invalid command");
    env.commandLine.val('');
    return true;
  }

  if (!args[2])
  {
    args[2] = "";
  }

  if (args[1] == "help")
  {
    logger.log("Debugger commands:\n" +
              "   connect IP - connect to server\n" +
              "   break|b file_name:line|function_name - set breakpoint\n" +
              "   delete|d id - delete breakpoint\n" +
              "   list - list breakpoints\n" +
              "   continue|c - continue execution\n" +
              "   step|s - step-in execution\n" +
              "   next|n - connect to server\n" +
              "   backtrace|bt [max-depth] - get backtrace\n" +
              "   dump - dump all breakpoint data");

    env.commandLine.val('');
    return true;
  }

  if (args[1] == "connect")
  {
    if (client.debuggerObj)
    {
      logger.log("Debugger is connected");
      return true;
    }

    if (args[2] == "")
    {
      logger.err("IP address expected");
      return true;
    }

    logger.log("Connect to: " + args[2]);

    client.debuggerObj = new DebuggerClient(args[2]);

    env.commandLine.val('');
    return true;
  }

  if (!client.debuggerObj)
  {
    logger.err("Debugger is NOT connected");

    env.commandLine.val('');
    return true;
  }

  switch(args[1])
  {
    case "b":
    case "break":
      updateContinueStopButton("stop");
      client.debuggerObj.setBreakpoint(args[2]);
      break;

    case "d":
    case "delete":
      updateContinueStopButton("stop");
      client.debuggerObj.deleteBreakpoint(args[2]);
      break;

    case "stop":
      updateContinueStopButton("stop");
      client.debuggerObj.encodeMessage("B", [ JERRY_DEBUGGER_STOP ]);
      break;

    case "c":
    case "continue":
      updateContinueStopButton("continue");
      client.debuggerObj.encodeMessage("B", [ JERRY_DEBUGGER_CONTINUE ]);
      break;

    case "s":
    case "step":
      updateContinueStopButton("stop");
      client.debuggerObj.encodeMessage("B", [ JERRY_DEBUGGER_STEP ]);
      break;

    case "n":
    case "next":
      updateContinueStopButton("stop");
      client.debuggerObj.encodeMessage("B", [ JERRY_DEBUGGER_NEXT ]);
      break;

    case "bt":
    case "backtrace":
      updateContinueStopButton("stop");
      max_depth = 0;

      if (args[2])
      {
        if (/[1-9][0-9]*/.exec(args[2]))
        {
          max_depth = parseInt(args[2]);
        }
        else
        {
          logger.err("Invalid maximum depth argument.");
          break;
        }
      }

      logger.log("Backtrace:");

      client.debuggerObj.encodeMessage("BI", [ JERRY_DEBUGGER_GET_BACKTRACE, max_depth ]);
      break;

    case "list":
      client.debuggerObj.listBreakpoints();
      break;

    case "dump":
      client.debuggerObj.dump();
      break;

    default:
      logger.err("Unknown command: " + args[1]);
  }

  env.commandLine.val("");
  return true;
}