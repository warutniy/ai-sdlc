# Farmart — Online Grocery Store

## Business Goals
- เพิ่มยอดขายออนไลน์ (Increase online sales)
- กระตุ้นให้ลูกค้ากลับมาซื้อซ้ำผ่านระบบสมาชิก (Drive repeat purchases via membership)
- ลดภาระงานหน้าร้าน (Reduce in-store workload)

---

## Research / Context Gathering (ก่อนเริ่ม Implementation)
- [ ] Research พฤติกรรมลูกค้าร้านขายของชำออนไลน์ในไทย (เช่น Makro Pro, Tops online, Big C online) เพื่อดู pattern UX ที่คุ้นเคย
- [ ] สำรวจ competitor: หน้า Home, หน้า Category, หน้า Product Detail, หน้า Cart, หน้า Checkout
- [ ] กำหนด tech stack (frontend framework, backend/API, database, payment gateway) และ constraint ด้าน infra
- [ ] กำหนด data model เบื้องต้น: Product, Category, Promotion, Review/Rating, Cart, Member, Order
- [ ] ตรวจสอบ non-functional requirements: performance (โหลดหน้าแรกเร็ว), responsive (mobile-first เพราะลูกค้าซื้อผ่านมือถือเยอะ), accessibility
- [ ] กำหนด scope MVP vs Phase ถัดไป (เช่น Checkout/Payment อาจอยู่นอก scope รอบแรก ถ้า requirement เน้นแค่ discovery-to-cart)

---

## Phase 1: Product Discovery & Browsing (หน้าแรก + หมวดสินค้า)

### Category Navigation
- [ ] กำหนดหมวดสินค้าหลัก: ผัก, ผลไม้, เนื้อสัตว์, นมและผลิตภัณฑ์, เครื่องดื่ม, ของใช้ในบ้าน ฯลฯ
- [ ] ออกแบบ/สร้าง category bar หรือ sidebar บนหน้าแรก
- [ ] Category filter + breadcrumb บนหน้า listing สินค้า
- [ ] ทำระบบค้นหาด้วย keyword + filter ตามหมวดสินค้า
- [ ] รองรับ autocomplete/suggestion ตอนพิมพ์ค้นหา (ถ้าอยู่ใน scope)

### Homepage Engagement
- [ ] ออกแบบ Hero/Banner โปรโมชันเด่นบนสุดของหน้าแรก
- [ ] Section "สินค้าลดราคา / โปรโมชัน" (Deals/Promotions)
- [ ] Section หมวดสินค้าแบบ grid/icon ให้กดเข้าไปเลือกซื้อง่าย
- [ ] Responsive layout สำหรับ mobile/tablet/desktop

---

## Phase 2: Product Listing & Decision Making

### Product Card / Listing
- [ ] แสดงราคาปกติ + ราคาหลังส่วนลด (ถ้ามี) พร้อม badge % ส่วนลด
- [ ] แสดง rating/review score (ดาว) บน product card
- [ ] ปุ่ม "หยิบใส่ตะกร้า" (Add to Cart) ที่ product card ทันทีโดยไม่ต้องเข้าหน้า detail
- [ ] แสดงสถานะสต็อกสินค้า (พร้อมขาย/หมด) บน card
- [ ] Pagination หรือ infinite scroll สำหรับหน้า listing

### Product Detail Page
- [ ] หน้ารายละเอียดสินค้า: รูป, คำอธิบาย, ราคา, ส่วนลด, rating, จำนวนรีวิว
- [ ] แสดงรายการรีวิวลูกค้า (comment + rating)
- [ ] ปุ่มเลือกจำนวน + Add to Cart บนหน้า detail

---

## Phase 3: Sales-Boosting Zones (โซนกระตุ้นยอด)

### Best Seller / Top Saver
- [ ] Section "Best Seller" บนหน้าแรก (จัดอันดับตามยอดขาย)
- [ ] Section "Top Saver" (สินค้าที่ลดราคาสูงสุด/คุ้มค่าที่สุด)
- [ ] Logic การจัดอันดับ/ดึงข้อมูลสินค้าขายดี (batch job หรือ real-time)

### Membership & Signup Incentive
- [ ] ออกแบบ flow สมัครสมาชิก (signup form)
- [ ] Promotion "ส่วนลด 15% สำหรับสมาชิกใหม่" — สร้าง coupon/logic ผูกกับบัญชีใหม่
- [ ] แสดง banner/CTA ชวนสมัครสมาชิกบนหน้าแรก
- [ ] ระบบจัดเก็บสถานะสมาชิก (member tier, คะแนนสะสม ถ้ามี) เพื่อรองรับ repeat purchase ในอนาคต

---

## Phase 4: Shopping Cart Management

### Cart Functionality
- [ ] เพิ่มสินค้าเข้าตะกร้า (Add)
- [ ] แก้ไขจำนวนสินค้าในตะกร้า (Update quantity)
- [ ] ลบสินค้าออกจากตะกร้า (Remove)
- [ ] แสดงยอดรวมทั้งหมด (Subtotal, ส่วนลด, ยอดสุทธิ) แบบ real-time
- [ ] แสดง cart icon + จำนวนสินค้าที่ header ตลอดเวลา
- [ ] Persist cart state (localStorage หรือ backend session) เผื่อ refresh หน้า
- [ ] Empty cart state (UI เมื่อไม่มีสินค้าในตะกร้า)

### Path to Checkout (ถ้าอยู่ใน scope)
- [ ] ปุ่ม "ดำเนินการสั่งซื้อ" จากหน้าตะกร้าไปหน้า checkout
- [ ] สรุปคำสั่งซื้อก่อนยืนยัน (order summary)

---

## Phase 5: Cross-cutting / Non-functional
- [ ] Responsive design ทุกหน้า (mobile-first)
- [ ] Performance: lazy-load รูปสินค้า, cache ข้อมูล promotion/category
- [ ] SEO พื้นฐานสำหรับหน้าสินค้า/หมวดสินค้า
- [ ] Analytics tracking (ติดตาม conversion, add-to-cart rate, signup rate)
- [ ] Testing: unit test สำหรับ cart logic, e2e test สำหรับ user flow หลัก (browse → add to cart → view cart)

---

## Success Metrics (เพื่อวัดผลตาม Business Goals)
- [ ] กำหนด KPI ยอดขายออนไลน์ (เช่น GMV, จำนวน order/เดือน)
- [ ] กำหนด KPI อัตราการสมัครสมาชิกใหม่ และอัตรา repeat purchase ของสมาชิก
- [ ] กำหนด KPI conversion rate จาก view product → add to cart → checkout
