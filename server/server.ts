/* eslint-disable complexity */
/* eslint-disable max-depth */
import * as WebSocket from 'ws';
import { prismaClient } from './service/prismaClient';
const wss = new WebSocket.Server({ port: 8000 });

const clientSockets = new Map();

wss.on('connection', (ws, request) => {
  const queryString = request.url.split('?')[1];
  const urlParams = new URLSearchParams(queryString);
  const userId = urlParams.get('userId');
  clientSockets.set(userId, ws);
  console.log(`クライアントとの接続が確立されました: ${userId}`);
  ws.on('message', async (message: string) => {
    try {
      const msgData = JSON.parse(message);

      if (msgData.type === 'message') {
        const { imageurl,roomId, userId, content } = msgData;
        console.log('メッセージを受信しました:', msgData);

        const room = await prismaClient.room.findUnique({
          where: { id: roomId },
        });

        // コメントを保存
        await prismaClient.comment.create({
          data: {
            content,
            userId,
            roomId,
          },
        });
        // 条件に基づいたクライアントへのメッセージ送信
        let targetUserId;
        console.log(userId, 'wadawdad');
        if (userId === room.hostId) {
          targetUserId = room.participantId;
        } else if (userId === room.participantId) {
          targetUserId = room.hostId;
        }

        const clientWebSocket = clientSockets.get(targetUserId);
        if (clientWebSocket && clientWebSocket.readyState === WebSocket.OPEN) {
          clientWebSocket.send(JSON.stringify({ type: 'new-message', content, imageurl }));
        }
      } else if (msgData.type === 'apply') {
        const { roomId, userId, userNumber, url } = msgData;

        const room = await prismaClient.room.findUnique({
          where: { id: roomId },
        });

        console.log(room, 'wadawdad');
        console.log(room.hostId, 'wadawdad');
        console.log(userId, 'wadawda333d');

        if (room) {
          console.log(`承諾用URLを受信しました1: ${url}`);

          const clientWebSocket = clientSockets.get(room.hostId);
          console.log(`承諾用URLを送信します2: ${url}`);
          if (clientWebSocket) {
            console.log(`承諾用URLを送信します: ${url}`);
            // URLを対象のクライアントに送信
            clientWebSocket.send(JSON.stringify({ type: 'url', url }));
          } else {
            console.log(
              `指定されたユーザーIDに関連付けられたWebSocketクライアントが見つかりませんでした: ${userId}`
            );
          }
        } else {
          // roomが見つからないか、hostIdがuserIdと一致しない場合の処理
          console.log('条件に一致する部屋が見つかりませんでした。');
        }
      }
    } catch (e) {
      console.log('受信したメッセージ:', message);
    }

    ws.on('close', () => {
      console.log('クライアントとの接続が閉じられました');
    });

    ws.on('error', (e) => {
      console.error('WebSocketエラー:', e);
    });
  });
});

console.log('WebSocketサーバーがポート8000で起動しています...');
