# EgoStarSea 多模态聊天 API 文档

## 概述

EgoStarSea 多模态聊天 API 提供了一个强大的对话接口，支持文本、语音和图像输入，让用户能够以最自然的方式与 AI 助手进行交流。

## 端点信息

- **URL**: `/v1/chat/multimodal`
- **方法**: `POST`
- **Content-Type**: `application/json`

## 请求格式

### 基本请求结构

```json
{
  "model": "gpt-4o-mini",
  "user": "用户唯一标识符",
  "messages": [
    {
      "role": "user",
      "content": "用户消息内容"
    }
  ],
  "audio_base64": "可选：base64编码的音频数据",
  "image_base64": "可选：base64编码的图像数据", 
  "image_url": "可选：图像URL地址",
  "return_audio": false,
  "temperature": 0.7,
  "max_tokens": null
}
```

### 参数说明

| 参数 | 类型 | 必需 | 说明 |
|------|------|------|------|
| `model` | string | 否 | 使用的模型名称，默认使用环境配置 |
| `user` | string | 是 | 用户唯一标识符，用于记忆管理 |
| `messages` | array | 否 | 对话历史消息数组 |
| `audio_base64` | string | 否 | base64编码的音频文件 |
| `image_base64` | string | 否 | base64编码的图像文件 |
| `image_url` | string | 否 | 图像的URL地址 |
| `return_audio` | boolean | 否 | 是否返回语音回复，默认false |
| `temperature` | float | 否 | 生成温度，默认0.7 |
| `max_tokens` | integer | 否 | 最大生成token数 |

## 使用示例

### 1. 纯文本对话

```json
{
  "model": "gpt-4o-mini",
  "user": "user123",
  "messages": [
    {
      "role": "user", 
      "content": "你好，我今天心情不太好"
    }
  ]
}
```

### 2. 语音输入

```json
{
  "model": "gpt-4o-mini",
  "user": "user123",
  "audio_base64": "UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBSuBzvLZiTYIG2m98OScTgwOUarm7blmGgU7k9n1unEiBC13yO/eizEIHWq+8+OWT...",
  "return_audio": true
}
```

### 3. 图像输入（base64）

```json
{
  "model": "gpt-4o-mini",
  "user": "user123",
  "image_base64": "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8/5+hHgAHggJ/PchI7wAAAABJRU5ErkJggg==",
  "messages": [
    {
      "role": "user",
      "content": "这张图片让我想起了什么？"
    }
  ]
}
```

### 4. 图像输入（URL）

```json
{
  "model": "gpt-4o-mini", 
  "user": "user123",
  "image_url": "https://example.com/image.jpg",
  "messages": [
    {
      "role": "user",
      "content": "帮我分析一下这张图片的情感色彩"
    }
  ]
}
```

### 5. 多模态组合输入

```json
{
  "model": "gpt-4o-mini",
  "user": "user123", 
  "audio_base64": "语音数据...",
  "image_base64": "图像数据...",
  "messages": [
    {
      "role": "user",
      "content": "结合我的语音和这张图片，给我一些建议"
    }
  ],
  "return_audio": true
}
```

## 响应格式

```json
{
  "id": "chatcmpl-xxxxx",
  "object": "chat.completion",
  "created": 1234567890,
  "model": "gpt-4o-mini",
  "choices": [
    {
      "index": 0,
      "message": {
        "role": "assistant",
        "content": "AI助手的回复内容"
      },
      "finish_reason": "stop",
      "audio_base64": "可选：语音回复的base64编码"
    }
  ],
  "usage": {
    "prompt_tokens": 0,
    "completion_tokens": 0, 
    "total_tokens": 0
  }
}
```

## 支持的文件格式

### 音频格式
- flac, m4a, mp3, mp4, mpeg, mpga, oga, ogg, wav, webm

### 图像格式  
- JPEG, PNG, GIF, WebP

## 错误处理

### 常见错误码

- `400`: 请求参数错误
- `422`: 请求格式不正确
- `500`: 服务器内部错误

### 错误响应示例

```json
{
  "detail": "无有效用户输入（文本、音频或图像）"
}
```

## 注意事项

1. **用户标识符**: `user` 字段用于记忆管理，请确保为每个用户使用唯一且一致的标识符
2. **文件大小**: 建议音频和图像文件不超过 10MB
3. **并发限制**: 建议控制并发请求数量以获得最佳性能
4. **记忆持久化**: 系统会自动保存对话历史，无需手动管理
5. **多模态优先级**: 当同时提供多种输入时，系统会智能组合处理

## Python 客户端示例

```python
import aiohttp
import asyncio
import base64

async def chat_with_ego(user_id, message, image_path=None, audio_path=None):
    url = "http://localhost:8081/v1/chat/multimodal"
    
    payload = {
        "model": "gpt-4o-mini",
        "user": user_id,
        "messages": [{"role": "user", "content": message}]
    }
    
    # 添加图像
    if image_path:
        with open(image_path, "rb") as f:
            image_data = base64.b64encode(f.read()).decode()
            payload["image_base64"] = image_data
    
    # 添加音频
    if audio_path:
        with open(audio_path, "rb") as f:
            audio_data = base64.b64encode(f.read()).decode()
            payload["audio_base64"] = audio_data
    
    async with aiohttp.ClientSession() as session:
        async with session.post(url, json=payload) as response:
            return await response.json()

# 使用示例
result = await chat_with_ego("user123", "你好，我需要一些建议")
print(result["choices"][0]["message"]["content"])
```
