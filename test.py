#!/usr/bin/env python

import asyncio
import datetime
import random
import websockets

async def time(websocket, path):
    while True:
        
        res = await websocket.recv()
        now = datetime.datetime.utcnow().isoformat() + 'Z'
        print(now,res)

start_server = websockets.serve(time, '127.0.0.1', 1337)
print("STARTED")
asyncio.get_event_loop().run_until_complete(start_server)
asyncio.get_event_loop().run_forever()
