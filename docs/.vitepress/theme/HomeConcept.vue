<script setup lang="ts">
import {
  ArrowUpRight,
  BookOpen,
  GitFork,
  MapPinned,
  MessageCircle,
  PenLine,
  Search,
  Users,
} from '@lucide/vue'

const admissionRows = [
  { year: '2025', category: '历史类', type: '普通类', score: '484', rank: '58,853' },
  { year: '2025', category: '物理类', type: '普通类 / 不限选科', score: '438', rank: '207,063' },
  { year: '2025', category: '物理类', type: '普通类 / 必选化学', score: '446', rank: '198,330' },
  { year: '2025', category: '物理类', type: '应用型本科', score: '477', rank: '158,786' },
  { year: '2024', category: '历史类', type: '普通类', score: '485', rank: '52,184' },
  { year: '2024', category: '物理类', type: '普通类 / 应用型', score: '483', rank: '160,534' },
  { year: '2023', category: '文科', type: '普通类', score: '484', rank: '53,105' },
  { year: '2023', category: '理科', type: '普通类', score: '455', rank: '163,029' },
]

function openSearch() {
  const searchButton = document.querySelector<HTMLButtonElement>(
    '.VPNavBarSearch button, .DocSearch-Button',
  )
  searchButton?.click()
}
</script>

<template>
  <main class="concept-home">
    <section class="concept-hero" aria-labelledby="concept-title">
      <div class="concept-hero__field" aria-hidden="true">
        <span class="concept-hero__red-plane" />
        <span class="concept-hero__blue-plane" />
        <span class="concept-hero__sun" />
        <span class="concept-hero__axis concept-hero__axis--a" />
        <span class="concept-hero__axis concept-hero__axis--b" />
      </div>

      <div class="concept-hero__content">
        <div class="concept-hero__brandline">
          <span>成都理工大学工程技术学院</span>
          <span>学生共建指南</span>
        </div>

        <h1 id="concept-title" class="concept-hero__title">
          <span>生存指南</span>
          <span class="concept-hero__join">与</span>
          <span>飞跃手册</span>
        </h1>

        <p class="concept-hero__lede">
          从入学第一天到奔赴下一站，<br>
          把真实经历整理成随时能查阅的答案。
        </p>

        <div class="concept-hero__actions" aria-label="主要入口">
          <a class="concept-action concept-action--primary" href="/survival/">
            打开生存指南
            <ArrowUpRight :size="19" :stroke-width="1.8" aria-hidden="true" />
          </a>
          <a class="concept-action concept-action--secondary" href="/leap/">
            查看飞跃手册
            <ArrowUpRight :size="19" :stroke-width="1.8" aria-hidden="true" />
          </a>
        </div>
      </div>

      <figure class="concept-machine">
        <div class="concept-machine__visual">
          <div class="concept-machine__rays" aria-hidden="true">
            <span class="concept-hero__beam concept-hero__beam--1" />
            <span class="concept-hero__beam concept-hero__beam--2" />
            <span class="concept-hero__beam concept-hero__beam--3" />
            <span class="concept-hero__beam concept-hero__beam--4" />
            <span class="concept-hero__beam concept-hero__beam--5" />
          </div>
          <div class="concept-machine__crosshair" aria-hidden="true" />
          <img
            class="concept-machine__art"
            src="/images/hl1-tokamak-linework.svg"
            alt="中国环流器一号托卡马克环形主机简约线图"
          >
        </div>
        <figcaption>
          <strong>中国环流器一号</strong>
          <span>HL-1 / 451 工程 / 1984</span>
          <span>中国第一代核聚变实验装置</span>
        </figcaption>
      </figure>

      <div class="concept-hero__footer">
        <span>贴吧吧务团队运营维护</span>
        <span>开源 · 共建 · 持续修订</span>
        <a href="https://github.com/cdutetc-tieba/CDUTETC-Guide" target="_blank" rel="noreferrer">
          GitHub
          <ArrowUpRight :size="15" :stroke-width="1.8" aria-hidden="true" />
        </a>
      </div>
    </section>

    <section class="concept-directory" aria-labelledby="directory-title">
      <header class="concept-section-head">
        <h2 id="directory-title">按你现在所处的阶段，直接开始。</h2>
        <p>不必从头读完一本手册。校园生活、下一站与共同编写，各自都有清晰入口。</p>
      </header>

      <nav class="concept-entry-list" aria-label="手册入口">
        <a class="concept-entry concept-entry--red" href="/survival/">
          <span class="concept-entry__icon" aria-hidden="true">
            <MapPinned :size="30" :stroke-width="1.55" />
          </span>
          <span class="concept-entry__body">
            <span class="concept-entry__meta">CAMPUS / 在校阶段</span>
            <strong>生存指南</strong>
            <span>入学、学业、校园生活与常见问题</span>
          </span>
          <ArrowUpRight class="concept-entry__arrow" :size="25" :stroke-width="1.6" aria-hidden="true" />
        </a>

        <a class="concept-entry concept-entry--blue" href="/leap/">
          <span class="concept-entry__icon" aria-hidden="true">
            <BookOpen :size="30" :stroke-width="1.55" />
          </span>
          <span class="concept-entry__body">
            <span class="concept-entry__meta">NEXT STEP / 下一站</span>
            <strong>飞跃手册</strong>
            <span>考研、出国、就业与学长学姐经验</span>
          </span>
          <ArrowUpRight class="concept-entry__arrow" :size="25" :stroke-width="1.6" aria-hidden="true" />
        </a>

        <a class="concept-entry concept-entry--yellow" href="/contribute">
          <span class="concept-entry__icon" aria-hidden="true">
            <PenLine :size="30" :stroke-width="1.55" />
          </span>
          <span class="concept-entry__body">
            <span class="concept-entry__meta">CONTRIBUTE / 共同编写</span>
            <strong>投稿分享</strong>
            <span>把你的经验留给后来的人</span>
          </span>
          <ArrowUpRight class="concept-entry__arrow" :size="25" :stroke-width="1.6" aria-hidden="true" />
        </a>
      </nav>
    </section>

    <section class="concept-admission" aria-labelledby="admission-title">
      <div class="concept-admission__head">
        <h2 id="admission-title">近年四川省录取数据</h2>
        <p>分数与位次仅供报考参考。2024 年起为新高考物理类 / 历史类，2023 年为传统文理分科。</p>
      </div>

      <div class="concept-table-wrap" tabindex="0" role="region" aria-label="近年录取数据，可横向滚动">
        <table class="concept-table">
          <thead>
            <tr>
              <th scope="col">年份</th>
              <th scope="col">科类</th>
              <th scope="col">招生类型</th>
              <th scope="col">最低分</th>
              <th scope="col">最低位次</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in admissionRows" :key="`${row.year}-${row.category}-${row.type}`">
              <td>{{ row.year }}</td>
              <td>{{ row.category }}</td>
              <td>{{ row.type }}</td>
              <td><strong>{{ row.score }}</strong></td>
              <td>{{ row.rank }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>

    <section class="concept-statement" aria-labelledby="statement-title">
      <div class="concept-statement__copy">
        <h2 id="statement-title">把散落在帖子和经历里的信息，整理成真正能用的指南。</h2>
        <p>
          这不是官方宣传页，也不是写完就不再更新的说明书。内容来自真实校园生活，
          由贴吧吧务团队运营维护，并通过 GitHub 持续修订。
        </p>
      </div>
      <div class="concept-statement__seal" aria-hidden="true">
        <span>OPEN</span>
        <span>GUIDE</span>
        <span>2026</span>
      </div>
      <div class="concept-statement__line" aria-hidden="true" />
    </section>

    <section class="concept-participate" aria-labelledby="participate-title">
      <header class="concept-section-head concept-section-head--compact">
        <h2 id="participate-title">阅读、交流，也把你的经验留下来。</h2>
        <p>从搜索一条答案开始，也可以进入贴吧、迎新群或 GitHub 参与维护。</p>
      </header>

      <div class="concept-link-list">
        <button class="concept-link-row" type="button" aria-label="打开站内搜索" @click="openSearch">
          <Search :size="24" :stroke-width="1.6" aria-hidden="true" />
          <span><strong>站内搜索</strong><small>使用顶部搜索框快速定位内容</small></span>
          <ArrowUpRight :size="22" :stroke-width="1.6" aria-hidden="true" />
        </button>
        <a
          class="concept-link-row"
          href="https://tieba.baidu.com/f?kw=成都理工大学工程技术学院"
          target="_blank"
          rel="noopener noreferrer"
        >
          <MessageCircle :size="24" :stroke-width="1.6" aria-hidden="true" />
          <span><strong>成都理工大学工程技术学院吧</strong><small>校园资讯与同学交流</small></span>
          <ArrowUpRight :size="22" :stroke-width="1.6" aria-hidden="true" />
        </a>
        <div class="concept-link-row concept-link-row--static">
          <Users :size="24" :stroke-width="1.6" aria-hidden="true" />
          <span><strong>新生迎新群</strong><small>QQ 群：585935582</small></span>
          <span class="concept-link-row__tag">JOIN</span>
        </div>
        <a class="concept-link-row" href="https://github.com/cdutetc-tieba/CDUTETC-Guide" target="_blank" rel="noopener noreferrer">
          <GitFork :size="24" :stroke-width="1.6" aria-hidden="true" />
          <span><strong>共同维护</strong><small>修订内容或查看贡献者</small></span>
          <ArrowUpRight :size="22" :stroke-width="1.6" aria-hidden="true" />
        </a>
      </div>
    </section>
  </main>
</template>

<style>
.VPHome:has(.concept-home) {
  padding-bottom: 0;
}

.VPHome:has(.concept-home) .VPHomeContent,
.VPHome:has(.concept-home) .VPHomeContent > .container,
.VPHome:has(.concept-home) .vp-doc {
  max-width: none;
  margin: 0;
  padding: 0;
}

body:has(.concept-home) .VPNavBar {
  border-bottom-color: rgba(24, 28, 29, 0.22);
  background: rgba(225, 229, 225, 0.96);
}

body:has(.concept-home) .VPNavBar.has-sidebar .content-body,
body:has(.concept-home) .VPNavBar:not(.home.top) .content-body {
  background: transparent;
}

body:has(.concept-home) .VPFooter {
  padding: 34px 24px 38px;
  border-top: 1px solid rgba(24, 28, 29, 0.24);
  background: #e1e5e1;
}

body:has(.concept-home) .VPFooter .message,
body:has(.concept-home) .VPFooter .copyright {
  color: rgba(24, 28, 29, 0.68);
}

.concept-home {
  --concept-paper: #e1e5e1;
  --concept-paper-deep: #cfd5d1;
  --concept-white: #f5f6f2;
  --concept-ink: #181c1d;
  --concept-red: #a83e2e;
  --concept-red-dark: #852f24;
  --concept-blue: #245f71;
  --concept-blue-dark: #194a59;
  --concept-yellow: #d5aa43;
  --concept-line: rgba(24, 28, 29, 0.28);
  width: 100%;
  overflow: hidden;
  color: var(--concept-ink);
  background: var(--concept-paper);
  font-family: "Noto Sans CJK SC", "PingFang SC", "Microsoft YaHei", sans-serif;
}

.concept-home *,
.concept-home *::before,
.concept-home *::after {
  box-sizing: border-box;
}

.concept-hero {
  position: relative;
  display: grid;
  min-height: min(690px, calc(100svh - 54px));
  grid-template-columns: minmax(0, 1.04fr) minmax(430px, 0.96fr);
  isolation: isolate;
  overflow: hidden;
  border-bottom: 1px solid var(--concept-line);
  background: var(--concept-paper);
}

.concept-hero__field,
.concept-hero__red-plane,
.concept-hero__blue-plane,
.concept-hero__sun,
.concept-hero__axis {
  position: absolute;
}

.concept-hero__field {
  z-index: -1;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.concept-hero__red-plane {
  top: -7%;
  right: -12%;
  width: 62%;
  height: 112%;
  background: var(--concept-red);
  clip-path: polygon(24% 0, 100% 0, 100% 100%, 0 100%, 18% 57%);
}

.concept-hero__blue-plane {
  top: -20%;
  right: 28%;
  width: 19%;
  height: 148%;
  background: var(--concept-blue);
  clip-path: polygon(44% 0, 100% 0, 56% 100%, 0 100%);
}

.concept-hero__sun {
  top: 54px;
  right: 4.5%;
  width: 116px;
  aspect-ratio: 1;
  border: 2px solid var(--concept-yellow);
  border-radius: 50%;
}

.concept-hero__axis {
  width: 66%;
  height: 1px;
  background: rgba(245, 246, 242, 0.58);
  transform-origin: right center;
}

.concept-hero__axis--a {
  top: 28%;
  right: -4%;
  transform: rotate(-13deg);
}

.concept-hero__axis--b {
  right: -8%;
  bottom: 27%;
  transform: rotate(9deg);
}

.concept-hero__content {
  position: relative;
  z-index: 2;
  align-self: center;
  width: min(680px, calc(100% - 80px));
  margin-left: max(40px, calc((100vw - 1220px) / 2));
  padding: 70px 0 126px;
}

.concept-hero__brandline {
  display: flex;
  max-width: 560px;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  padding: 0 0 13px;
  border-bottom: 1px solid var(--concept-ink);
  font-size: 13px;
  font-weight: 800;
}

.concept-hero__title {
  display: grid;
  width: max-content;
  max-width: 100%;
  margin: 34px 0 24px;
  color: var(--concept-ink);
  font-size: 86px;
  font-weight: 950;
  line-height: 0.98;
  letter-spacing: 0;
  text-wrap: balance;
}

.concept-hero__title > span:last-child {
  padding-left: 0.72em;
}

.concept-hero__join {
  position: absolute;
  align-self: end;
  margin: 0 0 0.13em 0.08em;
  color: var(--concept-red);
  font-size: 0.48em;
  font-weight: 900;
}

.concept-hero__lede {
  max-width: 560px;
  margin: 0;
  color: rgba(24, 28, 29, 0.78);
  font-size: 18px;
  font-weight: 600;
  line-height: 1.7;
}

.concept-hero__actions {
  display: flex;
  gap: 10px;
  margin-top: 34px;
}

.concept-action {
  display: inline-flex;
  min-height: 50px;
  align-items: center;
  justify-content: space-between;
  gap: 26px;
  padding: 12px 18px;
  border: 1px solid var(--concept-ink);
  color: var(--concept-ink) !important;
  font-size: 14px;
  font-weight: 800;
  text-decoration: none !important;
  transition: background-color 180ms ease, color 180ms ease, transform 180ms ease;
}

.concept-action--primary {
  border-color: var(--concept-red);
  color: var(--concept-white) !important;
  background: var(--concept-red);
}

.concept-action:hover {
  color: var(--concept-white) !important;
  background: var(--concept-ink);
  transform: translateY(-2px);
}

.concept-machine {
  position: relative;
  z-index: 2;
  align-self: center;
  width: min(650px, 92%);
  aspect-ratio: 1.08;
  margin: 20px 5% 78px auto;
  pointer-events: none;
}

.concept-machine__crosshair {
  position: absolute;
  inset: 13% 9% 15% 10%;
  border: 1px solid rgba(245, 246, 242, 0.5);
  border-radius: 50%;
}

.concept-machine__crosshair::before,
.concept-machine__crosshair::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  background: rgba(245, 246, 242, 0.44);
  transform: translate(-50%, -50%);
}

.concept-machine__crosshair::before {
  width: 116%;
  height: 1px;
}

.concept-machine__crosshair::after {
  width: 1px;
  height: 116%;
}

.concept-machine__art {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 18px 20px rgba(58, 24, 19, 0.14));
}

.concept-machine figcaption {
  position: absolute;
  z-index: 2;
  right: 0;
  bottom: 2%;
  display: flex;
  min-width: 245px;
  flex-direction: column;
  gap: 3px;
  padding: 13px 16px;
  color: var(--concept-white);
  background: var(--concept-blue-dark);
  font-size: 12px;
  line-height: 1.5;
}

.concept-machine figcaption strong {
  font-size: 16px;
}

.concept-hero__footer {
  position: absolute;
  z-index: 3;
  right: 0;
  bottom: 0;
  left: 0;
  display: grid;
  grid-template-columns: 1fr 1fr 0.7fr;
  min-height: 66px;
  border-top: 1px solid var(--concept-line);
  font-size: 12px;
  font-weight: 700;
}

.concept-hero__footer > * {
  display: flex;
  align-items: center;
  padding: 14px 24px;
  border-right: 1px solid var(--concept-line);
}

.concept-hero__footer a {
  justify-content: flex-end;
  gap: 8px;
  border-right: 0;
  color: var(--concept-white) !important;
  background: var(--concept-blue);
  text-decoration: none !important;
}

.concept-directory,
.concept-participate {
  width: min(1220px, calc(100% - 64px));
  margin: 0 auto;
  padding: 92px 0 106px;
}

.concept-section-head {
  display: grid;
  grid-template-columns: minmax(0, 1.25fr) minmax(280px, 0.75fr);
  gap: 56px;
  align-items: end;
  margin-bottom: 46px;
}

.concept-section-head h2,
.concept-admission h2,
.concept-statement h2 {
  margin: 0;
  border: 0;
  color: inherit;
  font-size: 48px;
  font-weight: 950;
  line-height: 1.12;
  letter-spacing: 0;
  text-wrap: balance;
}

.concept-home .concept-section-head h2,
.concept-home .concept-admission h2,
.concept-home .concept-statement h2 {
  margin: 0;
  padding: 0;
  border: 0;
  color: inherit;
  font-size: clamp(48px, 3.7vw, 68px);
  line-height: 1.12;
}

.concept-home .concept-section-head h2::after,
.concept-home .concept-admission h2::after,
.concept-home .concept-statement h2::after {
  content: none;
}

.concept-section-head p,
.concept-admission__head p,
.concept-statement__copy p {
  max-width: 68ch;
  margin: 0;
  color: rgba(24, 28, 29, 0.72);
  font-size: 15px;
  line-height: 1.8;
}

.concept-entry-list {
  display: grid;
  border-top: 2px solid var(--concept-ink);
  border-bottom: 2px solid var(--concept-ink);
}

.concept-entry {
  --entry-color: var(--concept-red);
  position: relative;
  display: grid;
  min-height: 148px;
  grid-template-columns: 82px minmax(0, 1fr) 44px;
  align-items: center;
  gap: 28px;
  padding: 22px 28px 22px 0;
  border-bottom: 1px solid var(--concept-line);
  color: var(--concept-ink) !important;
  text-decoration: none !important;
  transition: color 180ms ease, background-color 180ms ease;
}

.concept-entry:last-child {
  border-bottom: 0;
}

.concept-entry--blue {
  --entry-color: var(--concept-blue);
}

.concept-entry--yellow {
  --entry-color: var(--concept-yellow);
}

.concept-entry--yellow .concept-entry__meta {
  color: #6c500f;
}

.concept-entry--yellow .concept-entry__icon {
  color: var(--concept-ink);
}

.concept-entry__icon {
  display: grid;
  width: 82px;
  height: 100%;
  min-height: 102px;
  place-items: center;
  color: var(--concept-white);
  background: var(--entry-color);
}

.concept-entry__body {
  display: grid;
  grid-template-columns: minmax(190px, 0.55fr) minmax(0, 1fr);
  gap: 4px 28px;
  align-items: baseline;
}

.concept-entry__meta {
  grid-column: 1 / -1;
  color: var(--entry-color);
  font-size: 12px;
  font-weight: 900;
}

.concept-entry__body strong {
  font-size: 30px;
  font-weight: 950;
}

.concept-entry__body > span:last-child {
  color: rgba(24, 28, 29, 0.7);
  font-size: 14px;
}

.concept-entry__arrow {
  transition: transform 180ms ease;
}

.concept-entry:hover {
  color: var(--concept-white) !important;
  background: var(--entry-color);
}

.concept-entry:hover .concept-entry__icon {
  color: var(--entry-color);
  background: var(--concept-white);
}

.concept-entry:hover .concept-entry__meta,
.concept-entry:hover .concept-entry__body > span:last-child {
  color: rgba(245, 246, 242, 0.82);
}

.concept-entry:hover .concept-entry__arrow {
  transform: translate(4px, -4px);
}

.concept-entry--yellow:hover {
  color: var(--concept-ink) !important;
}

.concept-entry--yellow:hover .concept-entry__meta,
.concept-entry--yellow:hover .concept-entry__body > span:last-child {
  color: rgba(24, 28, 29, 0.74);
}

.concept-entry--yellow:hover .concept-entry__icon {
  color: var(--concept-ink);
}

.concept-admission {
  position: relative;
  display: grid;
  grid-template-columns: minmax(290px, 0.7fr) minmax(0, 1.3fr);
  gap: 72px;
  padding: 100px max(32px, calc((100vw - 1220px) / 2));
  color: var(--concept-white);
  background: var(--concept-red);
}

.concept-admission::before {
  content: "";
  position: absolute;
  top: -52px;
  right: 0;
  width: 34%;
  height: 52px;
  background: var(--concept-red);
  clip-path: polygon(16% 0, 100% 0, 100% 100%, 0 100%);
}

.concept-admission__head {
  align-self: start;
}

.concept-admission__head p {
  margin-top: 24px;
  color: rgba(245, 246, 242, 0.82);
}

.concept-table-wrap {
  overflow-x: auto;
  outline-offset: 5px;
}

.concept-table {
  width: 100%;
  min-width: 660px;
  margin: 0;
  border: 0;
  border-collapse: collapse;
  background: transparent;
}

.concept-table tr,
.concept-table tr:nth-child(2n) {
  background: transparent !important;
}

.concept-table th,
.concept-table td {
  padding: 13px 14px;
  border: 0;
  border-bottom: 1px solid rgba(245, 246, 242, 0.36);
  color: var(--concept-white);
  background: transparent;
  font-size: 13px;
  text-align: left;
}

.concept-table th {
  border-top: 2px solid var(--concept-white);
  border-bottom-width: 2px;
  font-size: 12px;
  font-weight: 900;
}

.concept-table td strong {
  font-size: 18px;
}

.concept-statement {
  position: relative;
  display: grid;
  min-height: 430px;
  grid-template-columns: minmax(0, 1fr) 210px;
  align-items: center;
  gap: 56px;
  padding: 84px max(32px, calc((100vw - 1040px) / 2));
  overflow: hidden;
  color: var(--concept-white);
  background: var(--concept-blue);
}

.concept-statement::before {
  content: "";
  position: absolute;
  top: -58%;
  right: -9%;
  width: 540px;
  aspect-ratio: 1;
  border: 2px solid rgba(245, 246, 242, 0.28);
  border-radius: 50%;
}

.concept-statement__copy {
  position: relative;
  z-index: 1;
  max-width: 820px;
}

.concept-statement__copy p {
  margin-top: 28px;
  color: rgba(245, 246, 242, 0.84);
}

.concept-statement__seal {
  position: relative;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  aspect-ratio: 1;
  border: 2px solid var(--concept-yellow);
  border-radius: 50%;
  color: var(--concept-yellow);
  font-size: 22px;
  font-weight: 950;
  line-height: 1.1;
  transform: rotate(-8deg);
}

.concept-statement__line {
  position: absolute;
  right: -8%;
  bottom: 18%;
  width: 58%;
  height: 1px;
  background: rgba(245, 246, 242, 0.48);
  transform: rotate(-9deg);
}

.concept-section-head--compact {
  margin-bottom: 40px;
}

.concept-link-list {
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-top: 2px solid var(--concept-ink);
  border-left: 1px solid var(--concept-line);
}

.concept-link-row {
  display: grid;
  min-height: 118px;
  grid-template-columns: 32px minmax(0, 1fr) 28px;
  align-items: center;
  gap: 20px;
  padding: 24px;
  border-right: 1px solid var(--concept-line);
  border-bottom: 1px solid var(--concept-line);
  border-top: 0;
  border-left: 0;
  color: var(--concept-ink) !important;
  background: transparent;
  font: inherit;
  text-align: left;
  text-decoration: none !important;
  cursor: pointer;
  transition: color 180ms ease, background-color 180ms ease;
}

.concept-link-row > span:not(.concept-link-row__tag) {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.concept-link-row strong {
  font-size: 18px;
  font-weight: 900;
}

.concept-link-row small {
  color: rgba(24, 28, 29, 0.68);
  font-size: 13px;
}

.concept-link-row:not(.concept-link-row--static):hover {
  color: var(--concept-white) !important;
  background: var(--concept-blue);
}

.concept-link-row:not(.concept-link-row--static):hover small {
  color: rgba(245, 246, 242, 0.8);
}

.concept-link-row__tag {
  color: var(--concept-red-dark);
  font-size: 11px;
  font-weight: 900;
}

.concept-action:focus-visible,
.concept-entry:focus-visible,
.concept-hero__footer a:focus-visible,
.concept-link-row:focus-visible,
.concept-table-wrap:focus-visible {
  outline: 3px solid var(--concept-yellow);
  outline-offset: 4px;
}

@media (max-width: 1000px) {
  .concept-hero {
    grid-template-columns: minmax(0, 1fr) 42%;
  }

  .concept-hero__content {
    width: calc(100% - 64px);
    margin-left: 32px;
  }

  .concept-hero__title {
    font-size: 68px;
  }

  .concept-machine {
    width: 560px;
    margin-right: -120px;
  }

  .concept-section-head h2,
  .concept-admission h2,
  .concept-statement h2 {
    font-size: 40px;
  }

  .concept-admission {
    grid-template-columns: 1fr;
    gap: 42px;
  }
}

@media (max-width: 720px) {
  .concept-hero {
    min-height: 720px;
    grid-template-columns: 1fr;
  }

  .concept-hero__red-plane {
    top: 43%;
    right: -32%;
    width: 118%;
    height: 68%;
    clip-path: polygon(24% 0, 100% 7%, 100% 100%, 0 100%, 13% 35%);
  }

  .concept-hero__blue-plane {
    top: 39%;
    right: 55%;
    width: 18%;
    height: 80%;
  }

  .concept-hero__sun {
    top: 48%;
    right: 8%;
    width: 76px;
  }

  .concept-hero__content {
    align-self: start;
    width: calc(100% - 40px);
    margin: 0 20px;
    padding: 52px 0 330px;
  }

  .concept-hero__brandline {
    align-items: flex-start;
    flex-direction: column;
    gap: 5px;
  }

  .concept-hero__title {
    margin-top: 26px;
    font-size: 52px;
  }

  .concept-hero__lede {
    font-size: 15px;
  }

  .concept-hero__actions {
    display: grid;
    grid-template-columns: 1fr 1fr;
    margin-top: 24px;
  }

  .concept-action {
    min-height: 46px;
    gap: 8px;
    padding: 10px 12px;
    font-size: 12px;
  }

  .concept-machine {
    position: absolute;
    right: -96px;
    bottom: 44px;
    width: 470px;
    height: 330px;
    margin: 0;
    opacity: 0.92;
  }

  .concept-machine figcaption {
    right: 86px;
    bottom: 4px;
    min-width: 212px;
    padding: 9px 12px;
    font-size: 10px;
  }

  .concept-machine figcaption strong {
    font-size: 13px;
  }

  .concept-hero__footer {
    grid-template-columns: 1fr 1fr;
    min-height: 54px;
    font-size: 10px;
  }

  .concept-hero__footer > * {
    padding: 10px 14px;
  }

  .concept-hero__footer a {
    display: none;
  }

  .concept-directory,
  .concept-participate {
    width: calc(100% - 40px);
    padding: 70px 0 82px;
  }

  .concept-section-head {
    grid-template-columns: 1fr;
    gap: 20px;
    margin-bottom: 32px;
  }

  .concept-section-head h2,
  .concept-admission h2,
  .concept-statement h2 {
    font-size: 34px;
  }

  .concept-entry {
    min-height: 162px;
    grid-template-columns: 58px minmax(0, 1fr) 28px;
    gap: 16px;
    padding-right: 12px;
  }

  .concept-entry__icon {
    width: 58px;
    min-height: 116px;
  }

  .concept-entry__body {
    grid-template-columns: 1fr;
    gap: 5px;
  }

  .concept-entry__body strong {
    font-size: 25px;
  }

  .concept-entry__body > span:last-child {
    font-size: 12px;
    line-height: 1.55;
  }

  .concept-admission {
    padding: 78px 20px 84px;
  }

  .concept-admission::before {
    top: -36px;
    width: 58%;
    height: 36px;
  }

  .concept-table-wrap {
    padding-bottom: 8px;
  }

  .concept-table {
    min-width: 100%;
    table-layout: fixed;
  }

  .concept-table th,
  .concept-table td {
    padding: 10px 5px;
    font-size: 10px;
    line-height: 1.35;
    overflow-wrap: anywhere;
  }

  .concept-table th:nth-child(1) { width: 14%; }
  .concept-table th:nth-child(2) { width: 17%; }
  .concept-table th:nth-child(3) { width: 31%; }
  .concept-table th:nth-child(4) { width: 16%; }
  .concept-table th:nth-child(5) { width: 22%; }

  .concept-table td strong {
    font-size: 14px;
  }

  .concept-statement {
    min-height: 560px;
    grid-template-columns: 1fr;
    gap: 46px;
    padding: 76px 40px;
  }

  .concept-statement__seal {
    width: 132px;
    justify-self: end;
  }

  .concept-link-list {
    grid-template-columns: 1fr;
  }

  .concept-link-row {
    min-height: 104px;
  }
}

/* Poster revision: full-bleed constructivism with an intentional dark theme. */
.VPContent:has(.concept-home),
.VPHome:has(.concept-home),
.VPHome:has(.concept-home) .VPHomeContent,
.VPHome:has(.concept-home) .VPHomeContent > div,
.VPHome:has(.concept-home) .vp-doc {
  width: 100%;
  max-width: none !important;
  margin: 0 !important;
  padding-right: 0 !important;
  padding-left: 0 !important;
}

body:has(.concept-home) {
  background: #ebe8de;
}

body:has(.concept-home) .VPNavBar {
  border-bottom-color: rgba(16, 18, 18, 0.24);
  background: rgba(235, 232, 222, 0.96);
}

body:has(.concept-home) .VPNavBar .content-body {
  background: transparent !important;
}

body:has(.concept-home) .VPFooter {
  border-top-color: rgba(16, 18, 18, 0.24);
  background: #ebe8de;
}

.concept-home {
  --concept-paper: #ebe8de;
  --concept-paper-deep: #d8d5ca;
  --concept-white: #f8f3e8;
  --concept-ink: #101212;
  --concept-red: #b9362a;
  --concept-red-dark: #8f241e;
  --concept-blue: #274d73;
  --concept-blue-dark: #18354f;
  --concept-yellow: #c99a32;
  --concept-muted: rgba(16, 18, 18, 0.72);
  --concept-line: rgba(16, 18, 18, 0.28);
  min-width: 0;
  background: var(--concept-paper);
}

.concept-hero {
  min-height: min(780px, calc(100svh - 56px));
  grid-template-columns: minmax(520px, 0.9fr) minmax(600px, 1.1fr);
  background: var(--concept-paper);
}

.concept-hero__red-plane {
  top: -16%;
  right: -10%;
  width: min(980px, 68vw);
  height: auto;
  aspect-ratio: 1;
  border-radius: 50%;
  background: var(--concept-red);
  clip-path: none;
}

.concept-hero__blue-plane {
  display: none;
}

.concept-hero__sun {
  top: 11%;
  right: 5.5%;
  width: clamp(92px, 7vw, 136px);
  border-color: var(--concept-yellow);
}

.concept-hero__axis {
  z-index: 1;
  width: 72%;
  height: clamp(44px, 4.2vw, 76px);
  background: var(--concept-ink);
}

.concept-hero__axis--a {
  top: 64%;
  right: -7%;
  transform: rotate(-7deg);
}

.concept-hero__axis--b {
  right: -12%;
  bottom: 12%;
  height: 2px;
  background: rgba(255, 253, 245, 0.72);
  transform: rotate(10deg);
}

.concept-machine__rays {
  position: absolute;
  z-index: 0;
  inset: 0;
  overflow: visible;
  pointer-events: none;
}

.concept-machine__visual {
  position: absolute;
  inset: 0;
}

.concept-hero__beam {
  --ray-width: 58%;
  --ray-opacity: 0.68;
  position: absolute;
  z-index: 0;
  top: 48.46%;
  right: 50%;
  width: var(--ray-width);
  height: 2px;
  opacity: var(--ray-opacity);
  background: linear-gradient(
    90deg,
    var(--concept-yellow) 0 7%,
    transparent 7% 14%,
    var(--concept-yellow) 14% 31%,
    transparent 31% 40%,
    var(--concept-yellow) 40% 63%,
    transparent 63% 73%,
    var(--concept-yellow) 73% 100%
  );
  transform-origin: right center;
}

.concept-hero__beam::before {
  content: "";
  position: absolute;
  top: 50%;
  left: -2px;
  width: 5px;
  height: 5px;
  background: var(--concept-yellow);
  transform: translateY(-50%) rotate(45deg);
}

.concept-hero__beam--1 { --ray-width: 58%; --ray-opacity: 0.48; transform: rotate(22deg); }
.concept-hero__beam--2 { --ray-width: 65%; --ray-opacity: 0.6; transform: rotate(11deg); }
.concept-hero__beam--3 { --ray-width: 72%; --ray-opacity: 0.78; }
.concept-hero__beam--4 { --ray-width: 65%; --ray-opacity: 0.6; transform: rotate(-11deg); }
.concept-hero__beam--5 { --ray-width: 58%; --ray-opacity: 0.48; transform: rotate(-22deg); }

.concept-hero__content {
  width: min(720px, calc(100% - 72px));
  margin-left: max(48px, calc((100vw - 1600px) / 2));
  padding: 82px 0 142px;
}

.concept-hero__brandline {
  max-width: 640px;
  font-size: 14px;
}

.concept-home .concept-hero__title {
  margin-top: 40px;
  font-size: clamp(88px, 6.7vw, 128px);
  line-height: 1.1;
  row-gap: 0.07em;
}

.concept-hero__join {
  color: var(--concept-red);
}

.concept-hero__lede {
  max-width: 620px;
  color: var(--concept-muted);
  font-size: clamp(18px, 1.15vw, 22px);
}

.concept-action--primary {
  border-color: var(--concept-ink);
  background: var(--concept-ink);
}

.concept-action--secondary {
  background: var(--concept-paper);
}

.concept-action--secondary:hover {
  background: var(--concept-red);
}

.concept-machine {
  width: min(760px, 96%);
  margin: 22px 1.5% 96px auto;
}

.concept-machine__crosshair {
  border-color: rgba(255, 253, 245, 0.48);
}

.concept-machine__art {
  filter: drop-shadow(0 18px 24px rgba(63, 15, 11, 0.26));
}

.concept-machine figcaption {
  right: 4%;
  bottom: 5%;
  min-width: 282px;
  padding: 12px 16px;
  border-left: 1px solid var(--concept-yellow);
  color: var(--concept-white);
  background: rgba(16, 18, 18, 0.9);
  font-size: 12px;
}

.concept-hero__footer {
  min-height: 62px;
  color: var(--concept-ink);
  background: color-mix(in srgb, var(--concept-paper) 94%, transparent);
}

.concept-hero__footer a {
  color: var(--concept-white) !important;
  background: var(--concept-ink);
}

.concept-directory,
.concept-participate {
  width: min(1600px, calc(100% - 96px));
  padding-top: 112px;
  padding-bottom: 124px;
}

.concept-section-head {
  grid-template-columns: minmax(0, 1.4fr) minmax(360px, 0.6fr);
  gap: clamp(56px, 8vw, 150px);
}

.concept-section-head h2,
.concept-admission h2,
.concept-statement h2 {
  font-size: clamp(48px, 3.7vw, 68px);
}

.concept-section-head p,
.concept-admission__head p,
.concept-statement__copy p {
  color: var(--concept-muted);
  font-size: 16px;
}

.concept-entry {
  min-height: 168px;
  grid-template-columns: 96px minmax(0, 1fr) 52px;
  gap: 34px;
}

.concept-entry__icon {
  width: 96px;
  min-height: 120px;
}

.concept-entry__body strong {
  font-size: clamp(30px, 2.1vw, 38px);
}

.concept-entry__body > span:last-child {
  color: var(--concept-muted);
  font-size: 15px;
}

.concept-admission {
  grid-template-columns: minmax(360px, 0.72fr) minmax(680px, 1.28fr);
  gap: clamp(72px, 9vw, 170px);
  padding: 118px max(48px, calc((100vw - 1600px) / 2));
}

.concept-admission__head p,
.concept-statement__copy p {
  color: rgba(255, 253, 245, 0.82);
}

.concept-table th,
.concept-table td {
  font-size: 14px;
}

.concept-statement {
  min-height: 480px;
  grid-template-columns: minmax(0, 1fr) 190px;
  padding: 96px max(48px, calc((100vw - 1400px) / 2));
  background: var(--concept-ink);
}

.concept-statement::before {
  border-color: rgba(228, 180, 63, 0.52);
}

.concept-statement__seal {
  aspect-ratio: auto;
  padding: 26px 18px;
  border: 2px solid var(--concept-red);
  border-radius: 0;
  color: var(--concept-yellow);
  transform: rotate(-7deg);
}

.concept-link-list {
  border-top-color: var(--concept-ink);
}

.concept-link-row:not(.concept-link-row--static):hover {
  background: var(--concept-red);
}

.dark body:has(.concept-home),
.dark body:has(.concept-home) .VPFooter {
  background: #0d0f10;
}

.dark body:has(.concept-home) .VPNavBar {
  border-bottom-color: rgba(242, 238, 224, 0.2);
  background: rgba(13, 15, 16, 0.96);
}

.dark body:has(.concept-home) .VPFooter .message,
.dark body:has(.concept-home) .VPFooter .copyright {
  color: rgba(242, 238, 224, 0.66);
}

.dark .concept-home {
  --concept-paper: #0d0f10;
  --concept-paper-deep: #171a1b;
  --concept-white: #f2eee0;
  --concept-ink: #f2eee0;
  --concept-red: #d64732;
  --concept-red-dark: #f06a54;
  --concept-blue: #315f86;
  --concept-blue-dark: #21445f;
  --concept-yellow: #edc454;
  --concept-muted: rgba(242, 238, 224, 0.72);
  --concept-line: rgba(242, 238, 224, 0.25);
}

.dark .concept-machine__art {
  filter: drop-shadow(0 18px 22px rgba(0, 0, 0, 0.3));
}

.dark .concept-hero__axis--a {
  background: #151718;
  box-shadow: inset 0 0 0 1px rgba(242, 238, 224, 0.18);
}

.dark .concept-entry--red .concept-entry__meta {
  color: #ef7764;
}

.dark .concept-entry--blue .concept-entry__meta {
  color: #83b4dd;
}

.dark .concept-entry--yellow .concept-entry__meta {
  color: #edc454;
}

.dark .concept-entry__body > span:last-child,
.dark .concept-link-row small {
  color: var(--concept-muted);
}

.dark .concept-action--primary,
.dark .concept-hero__footer a,
.dark .concept-statement {
  color: #0d0f10 !important;
  background: #f2eee0;
}

.dark .concept-statement__copy,
.dark .concept-statement__copy p {
  color: #0d0f10;
}

.dark .concept-statement__seal {
  color: #8d281f;
}

.dark .concept-statement::before {
  border-color: rgba(214, 71, 50, 0.5);
}

.dark .concept-entry:hover,
.dark .concept-link-row:not(.concept-link-row--static):hover {
  color: #f2eee0 !important;
}

@media (min-width: 1800px) {
  .concept-hero {
    grid-template-columns: minmax(720px, 0.92fr) minmax(820px, 1.08fr);
  }

  .concept-hero__content {
    width: 760px;
  }

  .concept-machine {
    width: min(850px, 96%);
  }
}

@media (max-width: 1100px) {
  .concept-hero {
    grid-template-columns: minmax(0, 1fr) 45%;
  }

  .concept-home .concept-hero__title {
    font-size: clamp(82px, 8vw, 96px);
  }

  .concept-machine {
    width: 620px;
    margin-right: -120px;
  }

  .concept-admission {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .concept-hero {
    min-height: clamp(970px, 255vw, 1020px);
    grid-template-columns: 1fr;
  }

  .concept-hero__red-plane {
    top: 56%;
    right: -52%;
    width: 146%;
    height: auto;
    border-radius: 50%;
    clip-path: none;
  }

  .concept-hero__axis--a {
    top: 75%;
    right: -16%;
    width: 132%;
    height: 34px;
  }

  .concept-hero__sun {
    top: 59%;
    right: 8%;
    width: 72px;
  }

  .concept-hero__content {
    width: calc(100% - 40px);
    margin: 0 20px;
    padding: 46px 0 430px;
  }

  .concept-home .concept-hero__title {
    margin-top: 28px;
    font-size: clamp(54px, 15vw, 62px);
    line-height: 1.12;
    row-gap: 0.08em;
  }

  .concept-hero__beam {
    height: 2px;
  }

  .concept-hero__beam--1 { --ray-width: 52%; }
  .concept-hero__beam--2 { --ray-width: 60%; }
  .concept-hero__beam--3 { --ray-width: 68%; }
  .concept-hero__beam--4 { --ray-width: 60%; }
  .concept-hero__beam--5 { --ray-width: 52%; }

  .concept-hero__lede {
    font-size: 16px;
  }

  .concept-machine {
    right: -58px;
    bottom: 58px;
    width: min(390px, 110vw);
    height: auto;
    aspect-ratio: auto;
    margin: 0;
  }

  .concept-machine__visual {
    position: relative;
    inset: auto;
    width: 100%;
    aspect-ratio: 1.08;
  }

  .concept-machine figcaption {
    position: relative;
    right: auto;
    bottom: auto;
    width: min(252px, calc(100vw - 40px));
    min-width: min(252px, calc(100vw - 40px));
    margin-right: 58px;
    margin-left: auto;
  }

  .concept-directory,
  .concept-participate {
    width: calc(100% - 40px);
    padding-top: 76px;
    padding-bottom: 88px;
  }

  .concept-section-head {
    grid-template-columns: minmax(0, 1fr);
    gap: 22px;
  }

  .concept-section-head h2,
  .concept-admission h2,
  .concept-statement h2 {
    width: 100%;
    font-size: 36px;
  }

  .concept-home .concept-section-head h2,
  .concept-home .concept-admission h2,
  .concept-home .concept-statement h2 {
    font-size: 36px;
  }

  .concept-entry {
    min-height: 164px;
    grid-template-columns: 60px minmax(0, 1fr) 28px;
    gap: 16px;
  }

  .concept-entry__icon {
    width: 60px;
    min-height: 118px;
  }

  .concept-admission {
    padding: 80px 20px 88px;
  }

  .concept-statement {
    min-height: 520px;
    grid-template-columns: minmax(0, 1fr);
    gap: 42px;
    padding: 76px 30px;
  }

  .concept-statement__seal {
    width: 126px;
  }
}

@media (max-width: 340px) {
  body:has(.concept-home) .VPNavBarTitle .title {
    font-size: 14px;
  }
}

@media (prefers-reduced-motion: reduce) {
  .concept-action,
  .concept-entry,
  .concept-entry__arrow,
  .concept-link-row {
    transition: none;
  }
}
</style>
