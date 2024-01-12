"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable complexity */
/* eslint-disable max-depth */
var WebSocket = require("ws");
var prismaClient_1 = require("./service/prismaClient");
var wss = new WebSocket.Server({ port: 8000 });
var clientSockets = new Map();
wss.on('connection', function (ws, request) {
    var queryString = request.url.split('?')[1];
    var urlParams = new URLSearchParams(queryString);
    var userId = urlParams.get('userId');
    clientSockets.set(userId, ws);
    console.log("\u30AF\u30E9\u30A4\u30A2\u30F3\u30C8\u3068\u306E\u63A5\u7D9A\u304C\u78BA\u7ACB\u3055\u308C\u307E\u3057\u305F: ".concat(userId));
    ws.on('message', function (message) { return __awaiter(void 0, void 0, void 0, function () {
        var msgData, userImageUrl, roomId, userId_1, content, room, targetUserId, clientWebSocket, roomId, userId_2, userNumber, url, gameTitle, gameId, date, time, room, clientWebSocket, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 6, , 7]);
                    msgData = JSON.parse(message);
                    if (!(msgData.type === 'message')) return [3 /*break*/, 3];
                    userImageUrl = msgData.userImageUrl, roomId = msgData.roomId, userId_1 = msgData.userId, content = msgData.content;
                    console.log('メッセージを受信しました:', msgData);
                    return [4 /*yield*/, prismaClient_1.prismaClient.room.findUnique({
                            where: { id: roomId },
                        })];
                case 1:
                    room = _a.sent();
                    // コメントを保存
                    return [4 /*yield*/, prismaClient_1.prismaClient.comment.create({
                            data: {
                                content: content,
                                userId: userId_1,
                                roomId: roomId,
                            },
                        })];
                case 2:
                    // コメントを保存
                    _a.sent();
                    targetUserId = void 0;
                    console.log(userId_1, 'wadawdad');
                    if (userId_1 === room.hostId) {
                        targetUserId = room.participantId;
                    }
                    else if (userId_1 === room.participantId) {
                        targetUserId = room.hostId;
                    }
                    clientWebSocket = clientSockets.get(targetUserId);
                    if (clientWebSocket && clientWebSocket.readyState === WebSocket.OPEN) {
                        clientWebSocket.send(JSON.stringify({ type: 'new-message', content: content, userImageUrl: userImageUrl }));
                    }
                    return [3 /*break*/, 5];
                case 3:
                    if (!(msgData.type === 'apply')) return [3 /*break*/, 5];
                    roomId = msgData.roomId, userId_2 = msgData.userId, userNumber = msgData.userNumber, url = msgData.url, gameTitle = msgData.gameTitle, gameId = msgData.gameId, date = msgData.date, time = msgData.time;
                    return [4 /*yield*/, prismaClient_1.prismaClient.room.findUnique({
                            where: { id: roomId },
                        })];
                case 4:
                    room = _a.sent();
                    console.log(gameTitle, 'wadawdad');
                    console.log(gameId, 'wadawdad');
                    console.log(date, 'wadawdad');
                    console.log(time, 'wadawdad');
                    console.log(room, 'wadawdad');
                    console.log(room.hostId, 'wadawdad');
                    console.log(userId_2, 'wadawda333d');
                    if (room) {
                        console.log("\u627F\u8AFE\u7528URL\u3092\u53D7\u4FE1\u3057\u307E\u3057\u305F1: ".concat(url));
                        clientWebSocket = clientSockets.get(room.hostId);
                        console.log("\u627F\u8AFE\u7528URL\u3092\u9001\u4FE1\u3057\u307E\u30592: ".concat(url));
                        if (clientWebSocket) {
                            console.log("\u627F\u8AFE\u7528URL\u3092\u9001\u4FE1\u3057\u307E\u3059: ".concat(url));
                            // URLを対象のクライアントに送信
                            clientWebSocket.send(JSON.stringify({ type: 'url', url: url, gameTitle: gameTitle, gameId: gameId, date: date, time: time, userNumber: userNumber, userId: userId_2 }));
                        }
                        else {
                            console.log("\u6307\u5B9A\u3055\u308C\u305F\u30E6\u30FC\u30B6\u30FCID\u306B\u95A2\u9023\u4ED8\u3051\u3089\u308C\u305FWebSocket\u30AF\u30E9\u30A4\u30A2\u30F3\u30C8\u304C\u898B\u3064\u304B\u308A\u307E\u305B\u3093\u3067\u3057\u305F: ".concat(userId_2));
                        }
                    }
                    else {
                        // roomが見つからないか、hostIdがuserIdと一致しない場合の処理
                        console.log('条件に一致する部屋が見つかりませんでした。');
                    }
                    _a.label = 5;
                case 5: return [3 /*break*/, 7];
                case 6:
                    e_1 = _a.sent();
                    console.log('受信したメッセージ:', message);
                    return [3 /*break*/, 7];
                case 7:
                    ws.on('close', function () {
                        console.log('クライアントとの接続が閉じられました');
                    });
                    ws.on('error', function (e) {
                        console.error('WebSocketエラー:', e);
                    });
                    return [2 /*return*/];
            }
        });
    }); });
});
console.log('WebSocketサーバーがポート8000で起動しています...');
