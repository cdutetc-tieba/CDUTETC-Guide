export interface MapLocation {
  id: string
  position: [number, number]
  title: string
  category: keyof typeof mapCategories
  categoryLabel: string
  categoryColor: string
  desc?: string
  tags?: string[]
}

const mapCategories = {
  landmark: { label: '地标', color: '#9f2d24' },
  teach: { label: '教学楼', color: '#b05b3b' },
  study: { label: '学习场所', color: '#34777a' },
  life: { label: '生活服务', color: '#69736a' },
  dorm: { label: '宿舍', color: '#b8842f' },
  shop: { label: '购物', color: '#865467' },
  food: { label: '餐饮', color: '#c45534' },
  admin: { label: '行政', color: '#786544' },
  campus: { label: '校内', color: '#b45334' },
  outside: { label: '校外', color: '#566d78' },
} as const

function location(
  id: string,
  position: [number, number],
  title: string,
  category: keyof typeof mapCategories,
  desc?: string,
  tags?: string[]
): MapLocation {
  const meta = mapCategories[category]
  return {
    id,
    position,
    title,
    category,
    categoryLabel: meta.label,
    categoryColor: meta.color,
    desc,
    tags,
  }
}

export const campusMarkers: MapLocation[] = [
  location(
    'campus',
    [103.7315, 29.5598],
    '成都理工大学工程技术学院',
    'landmark',
    '学校主校区，乐山市市中区肖坝路222号'
  ),
  location('west-gate', [103.7268, 29.5591], '西南门（正门）', 'landmark', '学校正门，位于肖坝路'),
  location('teaching-1', [103.7344, 29.561], '1号教学楼', 'teach', '主教学楼'),
  location('teaching-8', [103.7357, 29.5627], '8号教学楼', 'teach', '8号教学楼'),
  location('library', [103.7336, 29.5601], '图书馆', 'study', '学校图书馆，自习需早到占座', [
    '自习',
    '借阅',
  ]),
  location('bathhouse', [103.7314, 29.5592], '学生浴室', 'life', '校内学生浴室'),
  location('chenxi-dorm', [103.7335, 29.559], '晨曦园（宿舍区）', 'dorm', '学生宿舍区'),
  location('wanjing-dorm', [103.7283, 29.5613], '万景园', 'dorm', '学生宿舍区'),
  location('x32-dorm', [103.7292, 29.5581], 'X32男生公寓', 'dorm', '男生公寓'),
  location('south-slope', [103.7322, 29.5581], '南坡', 'life', '南坡区域，有校园超市'),
  location('south-slope-market', [103.7352, 29.5578], '南坡校园超市', 'shop', '校内超市'),
  location('luckin-campus', [103.7345, 29.5594], '瑞幸咖啡（校内店）', 'food', '校内瑞幸咖啡'),
  location('banmuyuan', [103.732, 29.5592], '半亩园', 'food', '校内餐饮'),
  location('conference-center', [103.7293, 29.558], '会议服务中心', 'admin', '学校会议服务中心'),
]

export const buildingMarkers = campusMarkers.filter((marker) =>
  ['teach', 'study', 'admin'].includes(marker.category)
)

export const foodMarkers: MapLocation[] = [
  location(
    'luckin-campus-food',
    [103.7345, 29.5594],
    '瑞幸咖啡（校内店）',
    'campus',
    '校内瑞幸咖啡'
  ),
  location('banmuyuan-food', [103.732, 29.5592], '半亩园', 'campus', '校内餐饮'),
  location('fried-chicken', [103.7321, 29.5583], '临榆炸鸡腿', 'campus', '校内炸鸡店'),
  location('fruit-dessert', [103.7324, 29.5576], '水果捞', 'campus', '校内甜品店'),
  location(
    'luckin-south-gate',
    [103.737, 29.5581],
    '瑞幸咖啡（南门店）',
    'outside',
    '成都理工学院乐山店，位于南门外'
  ),
  location('luckin-xiaoba', [103.7321, 29.5564], '瑞幸咖啡（肖坝店）', 'outside', '肖坝路瑞幸咖啡'),
]
