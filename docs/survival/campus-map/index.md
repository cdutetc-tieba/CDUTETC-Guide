---
title: 校园地图
description: 校园功能场所交互式地图导览。
---

# 校园地图

点击标记查看详情，使用顶部按钮筛选不同类型地点。

> 📍 校内食堂坐标待补充，欢迎同学提供

<Amap
  :center="[103.7315, 29.5598]"
  :zoom="17"
  :showControls="true"
  :markers="[
    { position: [103.7315, 29.5598], title: '成都理工大学工程技术学院', category: 'landmark', categoryLabel: '地标', categoryColor: '#722ed1', desc: '学校主校区，乐山市市中区肖坝路222号' },
    { position: [103.7268, 29.5591], title: '西南门（正门）', category: 'landmark', categoryColor: '#722ed1', desc: '学校正门，位于肖坝路' },
    { position: [103.7344, 29.5610], title: '1号教学楼', category: 'teach', categoryLabel: '教学楼', categoryColor: '#52c41a', desc: '主教学楼' },
    { position: [103.7357, 29.5627], title: '8号教学楼', category: 'teach', categoryColor: '#52c41a', desc: '8号教学楼' },
    { position: [103.7336, 29.5601], title: '图书馆', category: 'study', categoryLabel: '学习场所', categoryColor: '#1890ff', desc: '学校图书馆，自习需早到占座', tags: ['自习', '借阅'] },
    { position: [103.7314, 29.5592], title: '学生浴室', category: 'life', categoryLabel: '生活服务', categoryColor: '#13c2c2', desc: '校内学生浴室' },
    { position: [103.7335, 29.5590], title: '晨曦园（宿舍区）', category: 'dorm', categoryLabel: '宿舍', categoryColor: '#fa8c16', desc: '学生宿舍区' },
    { position: [103.7283, 29.5613], title: '万景园', category: 'dorm', categoryColor: '#fa8c16', desc: '学生宿舍区' },
    { position: [103.7292, 29.5581], title: 'X32男生公寓', category: 'dorm', categoryColor: '#fa8c16', desc: '男生公寓' },
    { position: [103.7322, 29.5581], title: '南坡', category: 'life', categoryColor: '#13c2c2', desc: '南坡区域，有校园超市' },
    { position: [103.7352, 29.5578], title: '南坡校园超市', category: 'shop', categoryLabel: '购物', categoryColor: '#eb2f96', desc: '校内超市' },
    { position: [103.7345, 29.5594], title: '瑞幸咖啡（校内店）', category: 'food', categoryLabel: '餐饮', categoryColor: '#fa541c', desc: '校内瑞幸咖啡' },
    { position: [103.7320, 29.5592], title: '半亩园', category: 'food', categoryColor: '#fa541c', desc: '校内餐饮' },
    { position: [103.7293, 29.5580], title: '会议服务中心', category: 'admin', categoryLabel: '行政', categoryColor: '#fadb14', desc: '学校会议服务中心' }
  ]"
  height="500px"
/>

## 校园总览

![校园路引图](/images/校园路引.jpg)
