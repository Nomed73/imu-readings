// utils/dataUtils.js
export async function loadIMUData(file) {
    const response = await fetch(file);
    const rawData = await response.json(); // Parse JSON directly
  
    return rawData;
  }
  