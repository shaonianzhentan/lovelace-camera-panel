# lovelace-camera-panel
在HA里使用的摄像监控控制面板

# 引入到HA
```

resources:
  - type: js
    url: /local/camera-panel.js

```

# 配置卡片

```

title: 卧室的摄像头
type: 'custom:camera-panel'
url: 'https://video-dev.github.io/streams/x36xhzz/x36xhzz.m3u8'
left:
  domain: mqtt
  service: publish
  data:
    topic: /homeassistant/onvif/move
    payload: left
right:
  domain: mqtt
  service: publish
  data:
    topic: /homeassistant/onvif/move
    payload: right
up:
  domain: mqtt
  service: publish
  data:
    topic: /homeassistant/onvif/move
    payload: up
down:
  domain: mqtt
  service: publish
  data:
    topic: /homeassistant/onvif/move
    payload: down
minus:
  domain: mqtt
  service: publish
  data:
    topic: /homeassistant/onvif/move
    payload: zoom_in
plus:
  domain: mqtt
  service: publish
  data:
    topic: /homeassistant/onvif/move
    payload: zoom_out


```