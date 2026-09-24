import { useEffect, useState } from 'react';
import { getMovies } from '../api/tmdb';
// ลบ import data.js ทิ้ง (ถ้าเหลือไว้แต่ไม่ได้ใช้ Vercel จะ build ล้มเพราะ warning)

function Home() {
  const [picks, setPicks] = useState([]);   // เริ่มว่าง รอข้อมูลจาก API แล้วค่อยสุ่ม

  // ใช้ getMovies() ตัวเดียวกับหน้า Movies ถ้าวันนี้เคยโหลดแล้วจะได้จาก localStorage ทันที
  useEffect(() => {
    let ignore = false;
    getMovies()
      .then(list => { if (!ignore) setPicks(shuffle(list)); })
      .catch(() => { if (!ignore) setPicks([]); });   // พลาดก็แค่ไม่มีหนังแนะนำ หน้าแรกไม่ควรพัง
    return () => { ignore = true; };
  }, []);
  // ...ส่วน return เหมือนเดิมทุกบรรทัด
}