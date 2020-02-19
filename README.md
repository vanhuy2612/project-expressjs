# project-expressjs
Tạo app shop quần áo đơn giản (thêm, sửa, xóa, đăng nhập)

// Sql query to calculate return of items by itemID
SELECT itemID,SUM(price*quantity) AS total 
FROM `tblbooking`
GROUP BY itemID
ORDER BY total DESC