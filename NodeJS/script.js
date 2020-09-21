function wait(ms) {
    var start = new Date().getTime();
    var end = start;
    while (end < start + ms) {
        end = new Date().getTime();
    }
}

var line = [];
var rows = 25;
var currentLine = 1;
var defaultColor = "#CCCCCC"
for (let x = 1; x <= rows; x++) {
    var para = document.createElement("p");
    para.setAttribute("id", x);
    para.setAttribute("style", "color: " + defaultColor)
    document.getElementById("terminalList").appendChild(para);
    line[x] = document.getElementById(x);
}

var interval = 1;
const delay = ms => new Promise(res => setTimeout(res, ms));
const splashinit = async () => {
    if (document.addEventListener) {
        document.addEventListener('keydown', BIOSHandler, false);
    }
    else if (document.attachEvent) {
        document.attachEvent('onkeydown', BIOSHandler);
    }
    foregroundcolor("aqua");
    writeLine(" _______  _______  ___      _______  _______  _______  __   __ ");
    foregroundcolor("aqua");
    writeLine("|       ||       ||   |    |       ||       ||       ||  |_|  |");
    foregroundcolor("aqua");
    writeLine("|_     _||    ___||   |    |    ___||       ||   _   ||       |");
    foregroundcolor("aqua");
    writeLine("  |   |  |   |___ |   |    |   |___ |       ||  | |  ||       |");
    foregroundcolor("aqua");
    writeLine("  |   |  |    ___||   |___ |    ___||      _||  |_|  ||       |");
    foregroundcolor("aqua");
    writeLine("  |   |  |   |___ |       ||   |___ |     |_ |       || ||_|| |");
    foregroundcolor("aqua");
    writeLine("  |___|  |_______||_______||_______||_______||_______||_|   |_|");
    writeLine("<br>");
    writeLine("<br>");
    writeLine("TComBIOS(TM) i986 Version 1.01.E ");
    await delay(1000*interval);
    writeLine("Copyright (C) 2020 TCom LtD.");
    writeLine("All Rights Reserved.");
    writeLine("<br>");
    await delay(2000 * interval);
    writeLine("Keyboard detected and functional!");
    write("Checking all memory banks . . .");
    await delay(2000 * interval);
    writeLine("<marquee width='300' scrollamount='300' scrolldelay='500'> Completed! All OK!</marquee>");
    await delay(1000 * interval);
    writeLine("<br>");

    writeLine("Starting TeleDOS . . .");
    writeLine("<br>");
    writeLine("TelcomsNetworking Disk Operating System v1.0-a")

    writeLine("Copyright (c) 2020, TelecomsNetworking, All rights reserved.")
    writeLine("<br>");
    await delay(1000 * interval);
    write("Testing extended memory . . . ");
    await delay(1000 * interval);
    writeLine("Done! ");
    writeLine("Initializing 6000 BAUD TeleDOS modem connection . . .");
    await delay(500 * interval);
    writeLine("<br");
    writeLine("Dialing into default gateway: 192.168.1.1 [OK]");
    await delay(500 * interval);
    writeLine("Enabling TCP access driver . . .          [OK]");
    await delay(500 * interval);
    writeLine("Enabling UDP access driver . . .          [OK]");
    await delay(500 * interval);
    writeLine("Dialing into TeleNET networking systems   ");
    await delay(1500 * interval);
    write("[OK]");
    await delay(1000 * interval);
    writeLine("<br>");
    setTimeout(mainConsole(), 1000);
    // clearScreen();
}
var keyString = "";
var prompt = "$";
var initialColor = defaultColor;
function mainConsole() {
    foregroundcolor("#00F");
    writeLine("Welcome to ");
    write("<div style='background-color: #FFF; display: inline-block' id=scrollText>TeleDOS v1.020-a</div>");
    write("<div id=wrapText>                 connected to the </div>")
    write("<div style='background-color: #FFF; color: #F00' id=scrollText> TeleNET personal Network! </div > ");
    writeLine(prompt);
    foregroundcolor(initialColor);
   // write(prompt);
    if (document.addEventListener) {
        document.addEventListener('keydown', keydownHandler, false);
    }
    else if (document.attachEvent) {
        document.attachEvent('onkeydown', keydownHandler);
    }

}
var interrupt = false;
function loadFile(filePath) {
    var result = null;
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("GET", filePath, false);
    xmlhttp.send();
    if (xmlhttp.status == 200) {
        result = xmlhttp.responseText;
    }
    return result;
}
var baud = 6000;
const commandHandler = async (cmd) => {
    if (currentLine != rows) {
        writeLine(" ");
    }
    if (cmd.trim().length == 0) {
        //   currentLine;
    } else if (cmd.startsWith("cls")) {
        clearScreen();
    } else if (cmd.startsWith("echo ")) {

        writeLine(cmd.slice(5, cmd.length));
    }
    else if (cmd.startsWith("help")) {
        prompt = "";
        interrupt = true;
        var help = loadFile("help.txt");
        writeLine("")
        for (let i = 0; i < help.length; i++) {
            if (help.charCodeAt(i) == 13) {
                
                writeLine("");
            } else if (help.charCodeAt(i) != 10){
                
                write(help.charAt(i))
                await delay(1000 / baud);
            }
        }
        interrupt = false;
        prompt = "$";
        
        
    } else {

        writeLine("Bad command or file name");

    }
    if (currentLine == rows) {
        writeLine(" ");
    }
    //    writeLine("");
}
function BIOSHandler(e) {
    if (e.key == "F8") {
        interval = 0;
    }
    
        e.preventDefault();
    
}
function keydownHandler(e) {
    if (interrupt == false) {
        foregroundcolor(initialColor);
        // console.log(e);

        if (e.keyCode == 8) {
            e.preventDefault();
            keyString = keyString.slice(0, -1);

        }
        if (e.keyCode == 13) {

            console.log(currentLine);
            commandHandler(keyString);

            keyString = "";
        }
        if (e.key.length == 1) {
            keyString = keyString + e.key;
        }

        line[currentLine].innerHTML = prompt + keyString;
    }
}

function clearScreen() {
    for (let x = 1; x <= rows; x++) {
        line[x].innerHTML = "";
        
        line[x].setAttribute("style", "color: " + defaultColor);
        
        currentLine = 1;
    }
}

function writeLine(text) {
    if (text == "") { text = " " };
    if (currentLine >= rows) {
        for (let y = 2; y < rows + 1; y++) {
            line[y - 1].innerHTML = line[y].innerHTML;
            line[y - 1].setAttribute("style", line[y].getAttribute("style"));
        }
        currentLine = rows;
        line[currentLine].innerHTML = text;
    } else {
        line[currentLine].innerHTML += text;
        currentLine++;
    }

}
function write(text) {
    line[currentLine].innerHTML += text;
}
function foregroundcolor(color) {
    line[currentLine].setAttribute("style", "color: " + color);
}


splashinit();
//mainConsole();
