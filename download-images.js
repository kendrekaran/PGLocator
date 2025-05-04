const https = require('https');
const fs = require('fs');
const path = require('path');

// Image URLs from Pinterest
const imageUrls = [
  {
    url: 'https://i.pinimg.com/736x/5d/be/b8/5dbeb8a2c6fc81e5640ea34ee4c32cf0.jpg',
    destination: 'pg-kharghar.jpg',
    description: 'PG in Kharghar with striped wall'
  },
  {
    url: 'https://i.pinimg.com/736x/a3/4f/cf/a34fcf76f14fe88fc3c0d5d9d539e73e.jpg',
    destination: 'pg-single-room.jpg',
    description: 'Single Room PG with purple sheets'
  },
  {
    url: 'https://i.pinimg.com/736x/78/06/0d/78060d456fcf26c58f1d4a31fffce2e8.jpg',
    destination: 'pg-girls-kolkata.jpg',
    description: 'PG Accommodation for Girls with guitar'
  }
];

const downloadImage = (imageData) => {
  return new Promise((resolve, reject) => {
    const destinationPath = path.join(__dirname, 'public', imageData.destination);
    const file = fs.createWriteStream(destinationPath);

    https.get(imageData.url, (response) => {
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${imageData.description} to ${destinationPath}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(destinationPath, () => {}); // Delete the file if there was an error
      console.error(`Error downloading ${imageData.description}: ${err.message}`);
      reject(err);
    });
  });
};

async function downloadAllImages() {
  try {
    for (const imageData of imageUrls) {
      await downloadImage(imageData);
    }
    console.log('All images downloaded successfully');
  } catch (error) {
    console.error('Error downloading images:', error);
  }
}

downloadAllImages(); 