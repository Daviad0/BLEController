var bleno = require('@abandonware/bleno');

/*
RUN ON RPI:
    <INSTALL NODE>
    sudo apt-get install bluetooth bluez libbluetooth-dev libudev-dev
    sudo systemctl stop bluetooth
    sudo hciconfig hci0 up
    sudo setcap cap_net_raw+eip $(eval readlink -f `which node`)
*/

var serviceName = "tcsP";
var serviceUUID = "AAAA";

bleno.on("stateChange", function(state) {
    console.log(state);
    bleno.startAdvertising(serviceName, [serviceUUID]);
});

// these are your options for the different characteristics, feel free to change
var validDirection = ["FORWARD", "BACKWARD", "LEFT", "RIGHT"];
var validSpeed = ["STOP", "SLOW", "NORMAL", "FAST", "FASTEST"];
var validData = ["STOPONDISCONNECT", "NODATA", "PATROL"];


var currentData = "";
var dataCharacteristic = new bleno.Characteristic({
    uuid: 'ffffffff-ffff-ffff-ffff-fffffffffff1',
    properties: ['read', 'write', 'writeWithoutResponse', 'notify'],
    value: null,
    onWriteRequest: function(data, offset, withoutResponse, callback) {
        if(validData.indexOf(data.toString('utf-8').toUpperCase()) > -1) {
            currentData = data.toString('utf-8');
            console.log("SET DATA STATE TO: " + currentData);
        }else{
            console.log("INVALID DATA STATE PROVIDED: " + data.toString('utf-8'));
        }
        callback(this.RESULT_SUCCESS);
    },
    onReadRequest: function(offset, callback) {
        console.log("onReadRequest: " + currentData);
        callback(this.RESULT_SUCCESS, new Buffer(currentData));
    }
});

var currentDirection = "";
var directionCharacteristic = new bleno.Characteristic({
    uuid: 'ffffffff-ffff-ffff-ffff-fffffffffff2',
    properties: ['read', 'write', 'writeWithoutResponse', 'notify'],
    value: null,
    onWriteRequest: function(data, offset, withoutResponse, callback) {
        if(validDirection.indexOf(data.toString('utf-8').toUpperCase()) > -1) {
            currentDirection = data.toString('utf-8');
            console.log("SET DIRECTION STATE TO: " + currentDirection);
        }else{
            console.log("INVALID DIRECTION STATE PROVIDED: " + data.toString('utf-8'));
        }
        callback(this.RESULT_SUCCESS);
    },
    onReadRequest: function(offset, callback) {
        console.log("onReadRequest: " + currentDirection);
        callback(this.RESULT_SUCCESS, new Buffer(currentDirection));
    }
});

var currentSpeed = "";
var speedCharacteristic = new bleno.Characteristic({
    uuid: 'ffffffff-ffff-ffff-ffff-fffffffffff3',
    properties: ['read', 'write', 'writeWithoutResponse', 'notify'],
    value: null,
    onWriteRequest: function(data, offset, withoutResponse, callback) {
        if(validSpeed.indexOf(data.toString('utf-8').toUpperCase()) > -1) {
            currentSpeed = data.toString('utf-8');
            console.log("SET SPEED STATE TO: " + currentSpeed);
        }else{
            console.log("INVALID SPEED STATE PROVIDED: " + data.toString('utf-8'));
        }
        callback(this.RESULT_SUCCESS);
    },
    onReadRequest: function(offset, callback) {
        console.log("onReadRequest: " + currentSpeed);
        callback(this.RESULT_SUCCESS, new Buffer(currentSpeed));
    }
});

const PrimaryService = bleno.PrimaryService;

var s1 = new PrimaryService({
    uuid: serviceUUID,
    characteristics: [dataCharacteristic, directionCharacteristic, speedCharacteristic]
});


bleno.on('advertisingStart', function(error) {
    var services = [s1];
    bleno.setServices(services);
});