var bleno = require('@abandonware/bleno');


var serviceName = "tcsP";
var serviceUUID = "ffffffff-ffff-ffff-ffff-fffffffffff0";

bleno.startAdvertising(serviceName, [serviceUUID]);



var currentData = "";
var dataCharacteristic = new bleno.Characteristic({
    uuid: 'ffffffff-ffff-ffff-ffff-fffffffffff1',
    properties: ['read', 'write', 'writeWithoutResponse', 'notify'],
    value: null,
    onWriteRequest: function(data, offset, withoutResponse, callback) {
        currentData = data.toString('utf-8');
        console.log("onWriteRequest: " + data.toString('utf-8'));
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
        currentDirection = data.toString('utf-8');
        console.log("onWriteRequest: " + data.toString('utf-8'));
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
        currentSpeed = data.toString('utf-8');
        console.log("onWriteRequest: " + data.toString('utf-8'));
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

var services = [s1];
bleno.setServices(services);