const fs = require('fs');
const path = require('path');
const https = require('https');

const IMG_DIR = path.join(__dirname, 'assets', 'img');

// Đảm bảo thư mục assets/img tồn tại
if (!fs.existsSync(IMG_DIR)) {
  fs.mkdirSync(IMG_DIR, { recursive: true });
}

// Danh sách các file ảnh cần tải
const files = [
  'hero-bus.jpg',
  'hotel-1.jpg',
  'hotel-2.jpg',
  'hotel-3.jpg',
  'hotel-4.jpg',
  'hotel-5.jpg',
  'room-photo-1.jpg',
  'room-photo-2.jpg',
  'room-photo-3.jpg',
  'tb-game-1.jpg',
  'tb-game-2.jpg',
  'ex-0.jpg',
  'ex-1.jpg',
  'ex-2.jpg',
  'ex-3.jpg',
  'ex-4.jpg',
  'ex-5.jpg',
  'ex-6.jpg',
  'ex-7.jpg',
  'ex-8.jpg',
  'ex-9.jpg',
  'food-0.jpg',
  'food-1.jpg',
  'food-2.jpg',
  'food-3.jpg',
  'food-4.jpg',
  'food-5.jpg',
  'btc-0.jpg',
  'btc-1.jpg',
  'btc-2.jpg',
  'btc-3.jpg'
];

function downloadFile(fileName) {
  return new Promise((resolve, reject) => {
    const fileUrl = baseUrl + fileName;
    const destPath = path.join(IMG_DIR, fileName);
    const file = fs.createWriteStream(destPath);

    console.log(`Đang tải: ${fileName}...`);

    https.get(fileUrl, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Lỗi tải file ${fileName}: HTTP Status ${response.statusCode}`));
        return;
      }
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Đã tải xong: ${fileName}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(destPath, () => {}); // Xóa file lỗi
      reject(err);
    });
  });
}

async function downloadAll() {
  console.log('Bắt đầu tải toàn bộ tài nguyên hình ảnh từ Netlify...');
  for (const file of files) {
    try {
      await downloadFile(file);
    } catch (err) {
      console.error(`Không tải được file ${file}:`, err.message);
    }
  }
  console.log('Hoàn tất quá trình tải ảnh!');
}

downloadAll();
