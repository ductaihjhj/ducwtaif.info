# 🎵 Thư mục nhạc

Bỏ file MP3 và ảnh bìa vào đây.

## Cách thêm bài hát

1. Copy file `.mp3` vào thư mục này (ví dụ: `bai-hat-1.mp3`)
2. Copy ảnh bìa vào thư mục này (ví dụ: `bai-hat-1.jpg`)
3. Mở file `js/main.js`, tìm phần `playlist` và thêm/sửa bài hát:

```js
const playlist = [
  {
    title: "Tên bài hát",
    artist: "Tên ca sĩ",
    src: "./music/bai-hat-1.mp3",
    cover: "./music/bai-hat-1.jpg",
  },
  // ... thêm bài khác
];
```

## Lưu ý
- Hỗ trợ format: `.mp3`, `.ogg`, `.wav`
- Ảnh bìa: `.jpg`, `.png`, `.webp`
- Nếu không có ảnh bìa, sẽ hiện icon Spotify mặc định
