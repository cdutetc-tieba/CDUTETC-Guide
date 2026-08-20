---
title: 校园地图
description: 校园功能场所交互式地图导览。
---

<script setup>
import { campusMarkers } from '../../.vitepress/theme/mapData'
</script>

# 校园地图

筛选地点类型或打开地点列表，点击地图标记查看具体位置和说明。

> 📍 校内食堂坐标待补充，欢迎同学提供

<Amap
  :center="[103.7315, 29.5598]"
  :zoom="17"
  :showControls="true"
  :markers="campusMarkers"
  height="500px"
/>
