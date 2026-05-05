import { defineStore } from "pinia";

const createDefaultNewsArr = () => [
  { label: "哔哩哔哩", name: "bilibili", order: 0, show: true },
  { label: "微博", name: "weibo", order: 1, show: true },
  { label: "抖音", name: "douyin", order: 2, show: true },
  { label: "知乎", name: "zhihu", order: 3, show: true },
  { label: "36氪", name: "36kr", order: 4, show: true },
  { label: "百度", name: "baidu", order: 5, show: true },
  { label: "少数派", name: "sspai", order: 6, show: true },
  { label: "IT之家", name: "ithome", order: 7, show: true },
  { label: "澎湃新闻", name: "thepaper", order: 8, show: true },
  { label: "今日头条", name: "toutiao", order: 9, show: true },
  { label: "百度贴吧", name: "tieba", order: 10, show: true },
  { label: "稀土掘金", name: "juejin", order: 11, show: true },
  { label: "腾讯新闻", name: "qq-news", order: 12, show: true },
  { label: "豆瓣电影", name: "douban-movie", order: 13, show: true },
  { label: "原神", name: "genshin", order: 14, show: true },
  { label: "LOL", name: "lol", order: 15, show: true },
  { label: "崩坏：星穹铁道", name: "starrail", order: 16, show: true },
  { label: "网易新闻", name: "netease-news", order: 17, show: true },
  { label: "微信读书", name: "weread", order: 18, show: true },
  { label: "豆瓣讨论小组", name: "douban-group", order: 19, show: true },
  { label: "NGA", name: "ngabbs", order: 20, show: true },
  { label: "HelloGitHub", name: "hellogithub", order: 21, show: true },
  { label: "简书", name: "jianshu", order: 22, show: true },
  { label: "知乎日报", name: "zhihu-daily", order: 23, show: true },
  { label: "AcFun", name: "acfun", order: 24, show: true },
  { label: "快手", name: "kuaishou", order: 25, show: true },
  { label: "GitHub 趋势", name: "github", order: 26, show: true },
  { label: "虎扑", name: "hupu", order: 27, show: true },
  { label: "果壳", name: "guokr", order: 28, show: true },
  { label: "爱范儿", name: "ifanr", order: 29, show: true },
  { label: "数字尾巴", name: "dgtle", order: 30, show: true },
  { label: "CSDN", name: "csdn", order: 31, show: true },
  { label: "虎嗅", name: "huxiu", order: 32, show: true },
  { label: "新水木", name: "newsmth", order: 33, show: true },
  { label: "NodeSeek", name: "nodeseek", order: 34, show: true },
  { label: "Linux.do", name: "linuxdo", order: 35, show: true },
  { label: "GeekPark", name: "geekpark", order: 36, show: true },
  { label: "GameRes", name: "gameres", order: 37, show: true },
  { label: "HostLoc", name: "hostloc", order: 38, show: true },
  { label: "吾爱破解", name: "52pojie", order: 39, show: true },
  { label: "酷安", name: "coolapk", order: 40, show: true },
  { label: "什么值得买", name: "smzdm", order: 41, show: true },
  { label: "新浪新闻", name: "sina-news", order: 42, show: true },
  { label: "新浪", name: "sina", order: 43, show: true },
  { label: "纽约时报", name: "nytimes", order: 44, show: true },
  { label: "Hacker News", name: "hackernews", order: 45, show: true },
  { label: "Product Hunt", name: "producthunt", order: 46, show: true },
  { label: "IT之家 喜加一", name: "ithome-xijiayi", order: 47, show: true },
  { label: "米游社", name: "miyoushe", order: 48, show: true },
  { label: "崩坏3", name: "honkai", order: 49, show: true },
  { label: "历史上的今天", name: "history", order: 50, show: true },
  { label: "中国地震台", name: "earthquake", order: 51, show: true },
  { label: "中央气象台", name: "weatheralarm", order: 52, show: true },
  { label: "游研社", name: "yystv", order: 53, show: true },
  { label: "V2EX", name: "v2ex", order: 54, show: true },
  { label: "51CTO", name: "51cto", order: 55, show: true },
];

const mergeNewsArr = (defaults, current = []) => {
  const currentMap = new Map(current.map((item) => [item.name, item]));
  return defaults.map((item) => {
    const existed = currentMap.get(item.name);
    return existed
      ? {
          ...item,
          ...existed,
          label: item.label,
          name: item.name,
          order: item.order,
        }
      : item;
  });
};

export const mainStore = defineStore("mainData", {
  state: () => {
    const defaultNewsArr = createDefaultNewsArr();
    return {
      // 系统主题
      siteTheme: "light",
      siteThemeAuto: true,
      // 新闻类别
      defaultNewsArr,
      newsArr: [],
      // 链接跳转方式
      linkOpenType: "open",
      // 页头固定
      headerFixed: true,
      // 时间数据
      timeData: null,
      // 字体大小
      listFontSize: 16,
    };
  },
  getters: {},
  actions: {
    // 更改系统主题
    setSiteTheme(val) {
      $message.info(`已切换至${val === "dark" ? "深色模式" : "浅色模式"}`, {
        showIcon: false,
      });
      this.siteTheme = val;
      this.siteThemeAuto = false;
    },
    // 检查更新
    checkNewsUpdate() {
      const mergedNewsArr = mergeNewsArr(this.defaultNewsArr, this.newsArr);
      const updatedNum = mergedNewsArr.filter(
        (item) => !this.newsArr.some((news) => news.name === item.name)
      ).length;
      this.newsArr = mergedNewsArr;
      if (updatedNum) {
        $message.success(`成功补充 ${updatedNum} 个榜单`);
      }
    },
  },
  persist: [
    {
      storage: localStorage,
      paths: [
        "siteTheme",
        "siteThemeAuto",
        "newsArr",
        "linkOpenType",
        "headerFixed",
        "listFontSize",
      ],
    },
  ],
});
