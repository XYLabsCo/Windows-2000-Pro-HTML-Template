$(function() {
    // Initialize draggable windows and hide them
    $(".window").draggable({ handle: "#window-titlebar" }).hide();
    $("#start-menu").hide();
});

$("#start-menu-button").on("click", function() {
    // Toggle the start menu visibility
    $("#start-menu").toggle();
});

// Close start menu when clicking anywhere outside of it
$(document).on("click", function(event) {
    if (!$(event.target).closest("#start-menu-button, #start-menu").length) {
        $("#start-menu").hide();
    }
});

// Handle submenu hover
$(function() {
    $(".has-submenu").hover(function() {
        $(this).find('.submenu').show();
    }, function() {
        $(this).find('.submenu').hide();
    });
});

// Minimize window
$("#window-minimize").click(function() {
    $("#window").hide();
    // Add window to taskbar
    var taskbarWindow = $('<button class="taskbarmin" id="taskbar-window"></button>');
    var iconImage = $('<img src="img/my-computer.ico" class="taskbar-icon">');
    var buttonText = $('<span>My Computer</span>');
    taskbarWindow.append(iconImage, buttonText);
    $("#taskbar").append(taskbarWindow);
});

var isMaximized = false;
var oldWindowParams = { width: "300px", height: "350px", left: "50%", top: "50%", transform: "translate(-50%, -50%)" };

// Maximize window
$("#window-maximize").click(function() {
    if (!isMaximized) {
        oldWindowParams = { width: $(".window").css("width"), height: $(".window").css("height"), left: $(".window").css("left"), top: $(".window").css("top") };
        $(".window").css({ width: "100%", height: "100%", left: "0", top: "0", transform: "none" });
        isMaximized = true;
    } else {
        $(".window").css(oldWindowParams);
        isMaximized = false;
    }
});

// Close window
$("#window-close").click(function() {
    $("#window").hide();
    // Remove window from taskbar
    $("#taskbar-window").remove();
});

// Handle clicking the window in the taskbar
$("#taskbar").on("click", "#taskbar-window", function() {
    $("#window").show();
    $(this).remove();
});

// Handle clicking the "My Computer" icon
$("#my-computer").click(function() {
    // Check if the window is already open
    if (!$("#window").is(":visible")) {
        // Show the window
        $("#window").show();

        // Remove window from taskbar if it's there
        $("#taskbar-window").remove();
    }
});

// Handle clicking the window in the taskbar
$("#taskbar").on("click", "#taskbar-window", function() {
    // Show the window
    $("#window").show();

    // Remove the button from the taskbar
    $(this).remove();
});

$(function() {
    // Make windows resizable with specified handles and minimum dimensions
    $(".window").resizable({
        handles: "n, e, s, w, ne, se, sw, nw",
        minWidth: 300,
        minHeight: 350
    });
});

// Function to update the current time
function updateCurrentTime() {
    var currentDate = new Date();
    var hours = currentDate.getHours();
    var minutes = currentDate.getMinutes();
    var amOrPm = hours >= 12 ? "PM" : "AM";

    // Convert the hours to 12-hour format
    hours = hours % 12;
    hours = hours ? hours : 12;

    // Format the time
    var formattedTime = hours + ":" + addLeadingZero(minutes) + " " + amOrPm;

    // Update the "current-date" element with the current time
    $("#current-date").text(formattedTime);
}

// Call the updateCurrentTime function initially to display the current time
updateCurrentTime();

// Update the current time every minute
setInterval(updateCurrentTime, 60000);  // 60000 milliseconds = 1 minute

// Select the element you want to make scrollable
const scrollableElement = document.getElementById("window-content");

// Add the 'overflow: auto' CSS property to make it scrollable
scrollableElement.style.overflow = "auto";

