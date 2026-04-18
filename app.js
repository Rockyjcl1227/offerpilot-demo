const DB_NAME = "offerpilot-db";
const DB_VERSION = 2;

const stages = [
  { key: "wishlist", label: "感兴趣" },
  { key: "applied", label: "已投递" },
  { key: "assessment", label: "测评 / 笔试" },
  { key: "interview", label: "面试中" },
  { key: "offer", label: "已 Offer" }
];

const navByRole = {
  user: [
    { key: "dashboard", label: "今日总览" },
    { key: "board", label: "申请看板" },
    { key: "calendar", label: "日历提醒" },
    { key: "materials", label: "个人中心" }
  ],
  manager: [{ key: "admin", label: "管理后台" }]
};

const state = {
  db: null,
  role: "user",
  activeView: "dashboard",
  search: "",
  statusFilter: "all",
  priorityFilter: "all",
  applications: [],
  reminders: [],
  materials: [],
  events: [],
  users: []
};

const seededData = {
  users: [
    {
      id: "user-001",
      role: "user",
      name: "贾长乐",
      englishName: "Rocky Jia",
      birth: "2003-12",
      grade: "27届",
      targetRole: "产品经理",
      phone: "18026568868",
      email: "1830644786@qq.com",
      wechat: "rockypersonal1227",
      education: [
        "香港大学 硕士｜电子商务与互联网计算｜2025.09 - 2027.01",
        "华南师范大学 / 阿伯丁大学 本科｜软件工程 / 计算机科学｜2021.09 - 2025.06"
      ],
      highlights: [
        "TME / Alibaba / Tencent 连续产品实习",
        "HKU GPA 3.92/5，专业前 8.1%",
        "英方一等一荣誉学位 First Class Honours"
      ],
      skills:
        "熟悉 Python、Java、HTML/CSS/JavaScript，熟练使用 Figma、Axure、Sketch，以及 Gemini、CodeX、豆包 等 AI 工具。",
      note:
        "长期篮球队经历带来了较强的抗压、协作和推进能力。"
    },
    {
      id: "manager-001",
      role: "manager",
      name: "招聘产品经理",
      team: "求职工具增长与运营"
    }
  ],
  applications: [
    {
      id: "mt-product",
      company: "美团",
      role: "产品经理实习生",
      city: "北京",
      stage: "interview",
      priority: "high",
      channel: "官网投递",
      deadline: "2026-04-20",
      appliedAt: "2026-04-08",
      tags: ["核心目标", "平台产品", "内推"],
      notes: "一面通过，二面重点准备商业化和履约链路案例。",
      materials: [
        { name: "简历", status: "submitted" },
        { name: "作品集", status: "submitted" },
        { name: "成绩单", status: "pending" }
      ],
      timeline: [
        "4/08 完成投递",
        "4/11 完成在线测评",
        "4/15 完成一面",
        "4/19 二面准备中"
      ]
    },
    {
      id: "bytedance-ops",
      company: "字节跳动",
      role: "商业化运营",
      city: "上海",
      stage: "assessment",
      priority: "high",
      channel: "牛客网",
      deadline: "2026-04-19",
      appliedAt: "2026-04-12",
      tags: ["急", "商业化"],
      notes: "测评截止前需要补齐英文简历版本。",
      materials: [
        { name: "简历", status: "submitted" },
        { name: "英文简历", status: "pending" },
        { name: "作品集", status: "ready" }
      ],
      timeline: ["4/12 投递完成", "4/16 收到测评邀请", "4/19 测评截止"]
    },
    {
      id: "xiaohongshu-research",
      company: "小红书",
      role: "用户研究实习生",
      city: "上海",
      stage: "applied",
      priority: "medium",
      channel: "官网投递",
      deadline: "2026-04-24",
      appliedAt: "2026-04-17",
      tags: ["研究", "内容社区"],
      notes: "等待筛选结果，后续准备定性研究项目案例。",
      materials: [
        { name: "简历", status: "submitted" },
        { name: "研究报告", status: "ready" }
      ],
      timeline: ["4/17 投递完成", "4/18 已同步到日历提醒"]
    },
    {
      id: "tencent-pm",
      company: "腾讯",
      role: "产品策划",
      city: "深圳",
      stage: "wishlist",
      priority: "medium",
      channel: "官网收藏",
      deadline: "2026-04-27",
      appliedAt: "",
      tags: ["待准备", "校招"],
      notes: "需要先针对游戏方向改一版简历。",
      materials: [
        { name: "简历", status: "ready" },
        { name: "作品集", status: "pending" }
      ],
      timeline: ["4/18 收藏岗位", "4/22 前完成定制化材料"]
    },
    {
      id: "bilibili-content",
      company: "哔哩哔哩",
      role: "内容运营实习生",
      city: "上海",
      stage: "offer",
      priority: "low",
      channel: "内推",
      deadline: "2026-04-10",
      appliedAt: "2026-03-28",
      tags: ["已拿 Offer"],
      notes: "待和其他岗位节奏对齐，再决定是否接受。",
      materials: [
        { name: "简历", status: "submitted" },
        { name: "作品集", status: "submitted" }
      ],
      timeline: ["3/28 投递", "4/03 一面", "4/06 二面", "4/10 Offer 发放"]
    }
  ],
  reminders: [
    {
      id: "rem-1",
      title: "距离字节跳动测评截止还有 1 天",
      detail: "建议先完成测评，再检查英文简历是否需要补交。",
      level: "high"
    },
    {
      id: "rem-2",
      title: "美团二面安排在 4 月 19 日 15:00",
      detail: "建议今天整理 3 个项目案例和 2 个业务判断题。",
      level: "medium"
    },
    {
      id: "rem-3",
      title: "腾讯岗位仍缺作品集",
      detail: "如果想保留这个机会，建议本周内完成一版针对性作品集。",
      level: "low"
    }
  ],
  materials: [
    { id: "mat-1", name: "中文简历", version: "v3.2", status: "latest", note: "适用于产品 / 运营岗位" },
    { id: "mat-2", name: "英文简历", version: "v1.1", status: "draft", note: "用于英文测评岗位" },
    { id: "mat-3", name: "作品集", version: "v2.4", status: "updating", note: "缺少商业分析和研究案例" },
    { id: "mat-4", name: "成绩单", version: "2025 秋季", status: "ready", note: "可直接提交 PDF" }
  ],
  events: [
    { id: "evt-1", event: "view_dashboard", label: "进入总览页", ts: "2026-04-18T09:10:00", role: "user" },
    { id: "evt-2", event: "open_application", label: "查看美团岗位详情", ts: "2026-04-18T09:12:00", role: "user" },
    { id: "evt-3", event: "change_stage", label: "将美团岗位改为面试中", ts: "2026-04-18T09:14:00", role: "user" }
  ]
};

function openDb() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = () => reject(request.error);
    request.onupgradeneeded = () => {
      const db = request.result;
      ["users", "applications", "events", "reminders", "materials", "meta"].forEach((name) => {
        if (db.objectStoreNames.contains(name)) {
          db.deleteObjectStore(name);
        }
      });
      ["users", "applications", "events", "reminders", "materials", "meta"].forEach((name) => {
        db.createObjectStore(name, { keyPath: "id" });
      });
    };
    request.onsuccess = () => resolve(request.result);
  });
}

function store(name, mode = "readonly") {
  return state.db.transaction(name, mode).objectStore(name);
}

function requestToPromise(request) {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

async function getAll(name) {
  return requestToPromise(store(name).getAll());
}

async function put(name, value) {
  return requestToPromise(store(name, "readwrite").put(value));
}

async function clear(name) {
  return requestToPromise(store(name, "readwrite").clear());
}

async function getMeta(key) {
  return requestToPromise(store("meta").get(key));
}

async function seedIfNeeded() {
  const seeded = await getMeta("seeded");
  if (seeded) return;
  for (const item of seededData.users) await put("users", item);
  for (const item of seededData.applications) await put("applications", item);
  for (const item of seededData.events) await put("events", item);
  for (const item of seededData.reminders) await put("reminders", item);
  for (const item of seededData.materials) await put("materials", item);
  await put("meta", { id: "seeded", value: true });
}

async function loadState() {
  state.users = await getAll("users");
  state.applications = await getAll("applications");
  state.events = (await getAll("events")).sort((a, b) => new Date(b.ts) - new Date(a.ts));
  state.reminders = await getAll("reminders");
  state.materials = await getAll("materials");
}

function formatDate(value) {
  return new Date(value).toLocaleDateString("zh-CN", { month: "short", day: "numeric" });
}

function daysUntil(dateString) {
  const oneDay = 1000 * 60 * 60 * 24;
  const today = new Date("2026-04-18T00:00:00");
  const target = new Date(`${dateString}T00:00:00`);
  return Math.round((target - today) / oneDay);
}

function stageLabel(key) {
  return stages.find((stage) => stage.key === key)?.label || key;
}

function priorityLabel(key) {
  return ({ high: "高优先级", medium: "中优先级", low: "低优先级" }[key] || key);
}

function getUser() {
  return state.users.find((item) => item.role === "user");
}

async function recordEvent(event, label, role = state.role) {
  const entry = {
    id: `evt-${Date.now()}-${Math.random().toString(16).slice(2, 6)}`,
    event,
    label,
    role,
    ts: new Date().toISOString()
  };
  await put("events", entry);
  state.events.unshift(entry);
  state.events = state.events.slice(0, 50);
}

function getFilteredApplications() {
  return state.applications.filter((app) => {
    const matchesSearch = `${app.company} ${app.role} ${app.city} ${app.tags.join(" ")}`
      .toLowerCase()
      .includes(state.search.toLowerCase());
    const matchesStage = state.statusFilter === "all" || app.stage === state.statusFilter;
    const matchesPriority = state.priorityFilter === "all" || app.priority === state.priorityFilter;
    return matchesSearch && matchesStage && matchesPriority;
  });
}

function buildActionHint(app) {
  if (app.stage === "wishlist") return "先确认是否值得投递，再补齐最缺的那份材料。";
  if (app.stage === "applied") return "保持跟进节奏，准备可能会出现的测评或面试。";
  if (app.stage === "assessment") return "优先完成测评，并检查是否还需要补材料。";
  if (app.stage === "interview") return "把准备重点放在项目案例和业务理解上。";
  return "这个岗位已到结果阶段，可以用于比较机会和节奏。";
}

function renderNav() {
  const nav = document.getElementById("nav-list");
  nav.innerHTML = navByRole[state.role]
    .map(
      (item) =>
        `<button class="nav-item ${state.activeView === item.key ? "active" : ""}" data-view="${item.key}">${item.label}</button>`
    )
    .join("");

  nav.querySelectorAll(".nav-item").forEach((button) => {
    button.addEventListener("click", async () => {
      state.activeView = button.dataset.view;
      await recordEvent(state.role === "user" ? "view_page" : "view_admin", `切换到 ${button.textContent.trim()}`, state.role);
      renderAll();
    });
  });
}

function renderSidebar() {
  const panel = document.getElementById("sidebar-panel");
  const user = getUser();
  panel.innerHTML =
    state.role === "user"
      ? `
        <p class="eyebrow">当前求职状态</p>
        <p>${user.name} ${user.englishName} · ${user.targetRole}</p>
        <p class="subtle" style="margin-top:8px;">${user.grade} · ${user.phone} · ${user.email}</p>
        <p class="subtle" style="margin-top:8px;">vx: ${user.wechat}</p>
        <ul class="compact-list" style="margin-top:14px;">
          <li>${user.education[0]}</li>
          <li>${user.education[1]}</li>
          <li>先处理 72 小时内的节点</li>
          <li>优先补齐会阻塞投递的材料</li>
        </ul>
      `
      : `
        <p class="eyebrow">管理者视角</p>
        <p>当前后台聚焦两个问题：</p>
        <ul class="compact-list" style="margin-top:14px;">
          <li>用户在哪个环节最容易停住</li>
          <li>哪些材料缺口最影响推进率</li>
          <li>什么行为说明功能真的被使用</li>
        </ul>
      `;
}

function renderTopbar() {
  document.querySelectorAll(".role-chip").forEach((chip) => {
    chip.classList.toggle("active", chip.dataset.role === state.role);
  });
  document.getElementById("view-title").textContent =
    navByRole[state.role].find((item) => item.key === state.activeView)?.label || "今日总览";
  document.getElementById("add-application-btn").textContent = state.role === "user" ? "新增申请" : "重置数据";
}

function renderViews() {
  document.querySelectorAll(".view").forEach((panel) => {
    const isAdmin = panel.dataset.viewPanel === "admin";
    const active = state.role === "manager" ? isAdmin : panel.dataset.viewPanel === state.activeView;
    panel.classList.toggle("active", active);
  });
}

function renderDashboard() {
  const apps = state.applications;
  const user = getUser();
  const urgentApps = apps.filter((item) => daysUntil(item.deadline) <= 3 && item.stage !== "offer");
  const pendingMaterials = apps.reduce(
    (count, app) => count + app.materials.filter((item) => item.status === "pending").length,
    0
  );
  const nextDeadline = [...apps]
    .filter((item) => item.stage !== "offer")
    .sort((a, b) => daysUntil(a.deadline) - daysUntil(b.deadline))[0];

  document.getElementById("hero-card").innerHTML = `
    <p class="eyebrow">Today Snapshot</p>
    <h3>你好${user.name}同学，今天又是 Offer 满满的一天~</h3>
    <p>你目前有 ${apps.length} 个岗位在管理，其中 ${urgentApps.length} 个需要优先处理。先看最紧急的截止和面试，再补齐会阻塞推进的材料。</p>
    <div class="tag-row" style="margin-top:12px;">
      <span class="tag">${user.englishName}</span>
      <span class="tag">${user.birth}</span>
      <span class="tag">${user.grade}</span>
      <span class="tag">${user.targetRole}</span>
    </div>
    <div class="hero-actions">
      <button class="ghost-button" data-jump="board">去推进看板</button>
      <button class="ghost-button" data-jump="materials">去补材料</button>
    </div>
  `;

  document.getElementById("deadline-card").innerHTML = `
    <p class="eyebrow">Most Urgent</p>
    <h3>${nextDeadline.company} · ${nextDeadline.role}</h3>
    <p>距离关键节点还有 ${daysUntil(nextDeadline.deadline)} 天，当前在 ${stageLabel(nextDeadline.stage)} 阶段。</p>
    <div class="detail-section" style="margin-top:18px;background:rgba(255,255,255,0.08);border-color:rgba(255,255,255,0.1);">
      <p>现在建议</p>
      <ul>
        <li>优先处理这个岗位的下一步动作</li>
        <li>检查材料是否完整</li>
        <li>把面试 / 测评准备拆成待办</li>
      </ul>
    </div>
  `;

  const metrics = [
    { title: "申请岗位", value: apps.length, detail: "集中管理中的岗位总数" },
    { title: "紧急节点", value: urgentApps.length, detail: "72 小时内需要处理" },
    { title: "面试中", value: apps.filter((item) => item.stage === "interview").length, detail: "已进入核心流程" },
    { title: "待补材料", value: pendingMaterials, detail: "会阻塞下一步推进" }
  ];

  document.getElementById("metric-grid").innerHTML = metrics
    .map(
      (metric) => `
        <article class="metric-card">
          <p class="eyebrow">${metric.title}</p>
          <strong>${metric.value}</strong>
          <span>${metric.detail}</span>
        </article>
      `
    )
    .join("");

  const sortedApps = [...apps].sort((a, b) => daysUntil(a.deadline) - daysUntil(b.deadline));
  document.getElementById("task-list").innerHTML = sortedApps
    .slice(0, 3)
    .map(
      (app, index) => `
        <article class="task-card">
          <div class="task-head">
            <div>
              <h3>${index + 1}. ${app.company} · ${app.role}</h3>
              <p>${app.city} · ${stageLabel(app.stage)} · 截止 ${formatDate(app.deadline)}</p>
            </div>
            <span class="tag ${app.priority}">${priorityLabel(app.priority)}</span>
          </div>
          <p>${buildActionHint(app)}</p>
          <div class="action-row">
            <button class="ghost-button" onclick="openDrawer('${app.id}')">查看详情</button>
          </div>
        </article>
      `
    )
    .join("");

  document.getElementById("upcoming-list").innerHTML = sortedApps
    .slice(0, 4)
    .map(
      (app) => `
        <article class="calendar-card">
          <div class="task-head">
            <strong>${formatDate(app.deadline)}</strong>
            <span class="tag">${daysUntil(app.deadline)} 天后</span>
          </div>
          <h3>${app.company} · ${app.role}</h3>
          <p>${buildActionHint(app)}</p>
        </article>
      `
    )
    .join("");

  document.querySelectorAll("[data-jump]").forEach((button) => {
    button.addEventListener("click", async () => {
      state.activeView = button.dataset.jump;
      await recordEvent("jump_from_dashboard", `从首页跳转到 ${state.activeView}`);
      renderAll();
    });
  });
}

function renderBoard() {
  const board = document.getElementById("kanban-board");
  const apps = getFilteredApplications();

  board.innerHTML = stages
    .map((stage) => {
      const items = apps.filter((app) => app.stage === stage.key);
      return `
        <section class="kanban-column">
          <div class="panel-head">
            <div>
              <h3>${stage.label}</h3>
              <p class="column-count">${items.length} 个岗位</p>
            </div>
          </div>
          <div class="kanban-stack">
            ${
              items.length
                ? items
                    .map(
                      (app) => `
                        <article class="kanban-card">
                          <div class="application-head">
                            <div>
                              <h3>${app.company}</h3>
                              <p>${app.role}</p>
                            </div>
                            <span class="tag ${app.priority}">${priorityLabel(app.priority)}</span>
                          </div>
                          <p>${app.city} · 截止 ${formatDate(app.deadline)} · ${app.channel}</p>
                          <div class="tag-row">
                            ${app.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")}
                          </div>
                          <select class="inline-select" onchange="updateStage('${app.id}', this.value)">
                            ${stages
                              .map(
                                (option) =>
                                  `<option value="${option.key}" ${
                                    option.key === app.stage ? "selected" : ""
                                  }>${option.label}</option>`
                              )
                              .join("")}
                          </select>
                          <div class="action-row">
                            <button class="ghost-button" onclick="openDrawer('${app.id}')">详情</button>
                          </div>
                        </article>
                      `
                    )
                    .join("")
                : `<article class="kanban-card"><p>当前筛选条件下没有岗位。</p></article>`
            }
          </div>
        </section>
      `;
    })
    .join("");
}

function renderCalendar() {
  const items = [...state.applications].sort((a, b) => daysUntil(a.deadline) - daysUntil(b.deadline));
  document.getElementById("calendar-grid").innerHTML = items
    .map(
      (app) => `
        <article class="calendar-card">
          <div class="task-head">
            <strong>${app.company} · ${app.role}</strong>
            <span class="tag ${app.priority}">${priorityLabel(app.priority)}</span>
          </div>
          <p>节点时间：${formatDate(app.deadline)} · 当前阶段：${stageLabel(app.stage)}</p>
          <p>${buildActionHint(app)}</p>
        </article>
      `
    )
    .join("");

  document.getElementById("reminder-list").innerHTML = state.reminders
    .map(
      (reminder) => `
        <article class="task-card">
          <div class="task-head">
            <h3>${reminder.title}</h3>
            <span class="tag ${reminder.level}">${priorityLabel(reminder.level)}</span>
          </div>
          <p>${reminder.detail}</p>
        </article>
      `
    )
    .join("");
}

function renderMaterials() {
  const user = getUser();
  const pendingApps = state.applications.filter((app) => app.materials.some((item) => item.status === "pending"));
  document.getElementById("ai-summary").innerHTML = `
    <div class="ai-summary-card">
      <p class="eyebrow">AI Resume Copilot</p>
      <h4>${user.name} · 简历工作台</h4>
      <p>${user.englishName}｜${user.targetRole}｜${user.phone}｜${user.email}</p>
      <p style="margin-top:8px;">当前有 ${pendingApps.length} 个岗位因为材料不完整而存在推进风险，最值得优先处理的是英文简历、作品集和成绩单。</p>
      <div class="tag-row" style="margin-top:12px;">
        ${user.highlights.map((item) => `<span class="tag">${item}</span>`).join("")}
      </div>
    </div>
  `;

  const promptCards = [
    {
      title: "产品经理版本简历摘要",
      detail: "突出 TME、闲鱼、ima 三段产品实习，强调策略设计、转化提升和 AI 产品理解。"
    },
    {
      title: "美团二面作品集建议",
      detail: "优先保留热点中心、闲鱼副业链路、AI 文档预读助手这三类业务案例。"
    },
    {
      title: "英文简历优化提示",
      detail: "把经历改成 action-result 结构，保留 46.3%、74.8%、16.11pct 等量化结果。"
    },
    {
      title: "HR 视角关键词检查",
      detail: "检查教育背景、产品实习、全栈项目和语言能力是否覆盖目标岗位筛选项。"
    }
  ];

  document.getElementById("ai-prompts").innerHTML = `
    <div class="prompt-grid">
      <article class="prompt-card">
        <h4>你的能力概览</h4>
        <p>${user.skills}</p>
      </article>
      <article class="prompt-card">
        <h4>你的个人标签</h4>
        <p>${user.note}</p>
      </article>
      ${promptCards
        .map(
          (prompt) => `
            <article class="prompt-card">
              <h4>${prompt.title}</h4>
              <p>${prompt.detail}</p>
            </article>
          `
        )
        .join("")}
    </div>
  `;

  document.getElementById("material-list").innerHTML = state.materials
    .map(
      (item) => `
        <article class="material-card">
          <div class="task-head">
            <h3>${item.name}</h3>
            <span class="tag">${item.version}</span>
          </div>
          <p>${item.note}</p>
          <div class="progress-bar">
            <div class="progress-fill" style="width: ${
              item.status === "latest" ? 100 : item.status === "ready" ? 86 : item.status === "updating" ? 60 : 42
            }%"></div>
          </div>
        </article>
      `
    )
    .join("");

  const gaps = pendingApps.map((app) => {
    const missing = app.materials.filter((item) => item.status === "pending").map((item) => item.name);
    return { ...app, missing };
  });

  document.getElementById("material-gap-list").innerHTML = gaps
    .map(
      (app) => `
        <article class="task-card">
          <div class="task-head">
            <div>
              <h3>${app.company} · ${app.role}</h3>
              <p>${stageLabel(app.stage)} · 截止 ${formatDate(app.deadline)}</p>
            </div>
            <span class="tag high">待补齐</span>
          </div>
          <p>缺失材料：${app.missing.join("、")}</p>
          <div class="action-row">
            <button class="ghost-button" onclick="openDrawer('${app.id}')">查看详情</button>
          </div>
        </article>
      `
    )
    .join("");
}

function renderAdmin() {
  const detailsOpened = state.events.filter((item) => item.event === "open_application").length;
  const stageChanged = state.events.filter((item) => item.event === "change_stage").length;
  const created = state.events.filter((item) => item.event === "create_application").length;
  const platformAssumption = {
    dau: 10000,
    newUsers: 1850,
    activeApplications: 28600,
    avgApplicationsPerUser: 2.86,
    reminderReach: 7420,
    reminderActionRate: 38.6,
    retention7d: 41.8,
    interviewConversion: 12.6,
    offerRate: 4.3
  };

  const metrics = [
    { title: "平台日活", value: "10,000", detail: "假设求职季稳定日活规模" },
    { title: "申请活跃率", value: "64.8%", detail: "当日有新增或推进动作的用户占比" },
    { title: "提醒触达率", value: "74.2%", detail: "收到提醒的用户占 DAU 比例" },
    { title: "状态推进率", value: "31.4%", detail: "查看岗位后继续推进状态的用户占比" }
  ];

  document.getElementById("admin-metrics").innerHTML = metrics
    .map(
      (metric) => `
        <article class="metric-card">
          <p class="eyebrow">${metric.title}</p>
          <strong>${metric.value}</strong>
          <span>${metric.detail}</span>
        </article>
      `
    )
    .join("");

  const businessOverview = [
    {
      title: "求职季峰值承载",
      value: "28,600",
      detail: "平台日均承载 2.86 万条活跃申请记录，说明用户不是来记录一个岗位，而是在管理一个完整求职组合。"
    },
    {
      title: "材料阻塞岗位占比",
      value: "23.4%",
      detail: "近四分之一岗位在推进中因作品集、英文简历或成绩单缺失而被阻塞。"
    },
    {
      title: "面试阶段岗位占比",
      value: "12.6%",
      detail: "进入面试阶段的岗位占整体申请池 12.6%，是最值得重点服务和提醒的高价值区间。"
    }
  ];

  document.getElementById("business-list").innerHTML = businessOverview
    .map(
      (item) => `
        <article class="list-card">
          <div class="task-head">
            <h3>${item.title}</h3>
            <strong>${item.value}</strong>
          </div>
          <p>${item.detail}</p>
        </article>
      `
    )
    .join("");

  const kpis = [
    {
      title: "当日新增用户",
      value: `${platformAssumption.newUsers}`,
      detail: "新用户占 DAU 的 18.5%，说明校招高峰期仍在持续拉新。"
    },
    {
      title: "活跃申请总量",
      value: `${platformAssumption.activeApplications.toLocaleString("zh-CN")}`,
      detail: `人均管理 ${platformAssumption.avgApplicationsPerUser} 个岗位，符合求职季多投场景。`
    },
    {
      title: "提醒覆盖人数",
      value: `${platformAssumption.reminderReach.toLocaleString("zh-CN")}`,
      detail: `提醒触达后有 ${platformAssumption.reminderActionRate}% 用户在 24 小时内发生后续动作。`
    }
  ];

  document.getElementById("kpi-list").innerHTML = kpis
    .map(
      (item) => `
        <article class="list-card">
          <div class="task-head">
            <h3>${item.title}</h3>
            <strong>${item.value}</strong>
          </div>
          <p>${item.detail}</p>
        </article>
      `
    )
    .join("");

  const processMetrics = [
    {
      name: "首页 -> 查看岗位详情",
      value: "58.3%",
      detail: "说明首页任务区能够把用户有效带到单个岗位处理。"
    },
    {
      name: "查看详情 -> 补材料",
      value: "42.7%",
      detail: "材料缺口提示对用户后续动作有明显承接作用。"
    },
    {
      name: "查看详情 -> 推进状态",
      value: "31.4%",
      detail: "这是当前最关键的过程转化，代表工具是否真的推动求职进展。"
    },
    {
      name: "收到提醒 -> 完成关键动作",
      value: "38.6%",
      detail: "提醒不是展示型功能，而是推动测评、面试准备和材料补齐的杠杆。"
    }
  ];

  document.getElementById("process-list").innerHTML = processMetrics
    .map(
      (item) => `
        <article class="funnel-row">
          <div class="task-head">
            <h3>${item.name}</h3>
            <strong>${item.value}</strong>
          </div>
          <div class="progress-bar"><div class="progress-fill" style="width:${item.value}"></div></div>
          <p>${item.detail}</p>
        </article>
      `
    )
    .join("");

  const journeyMap = [
    { title: "创建申请池", meta: "首页 / 搜索 / 收藏", detail: "用户开始集中收纳岗位机会" },
    { title: "识别紧急事项", meta: "总览 / 日历 / 提醒", detail: "用户确认今天最该处理什么" },
    { title: "处理单个岗位", meta: "详情 / 材料 / 测评", detail: "查看信息并补齐关键缺口" },
    { title: "推进申请阶段", meta: "改状态 / 准备面试", detail: "从收藏推进到投递、测评、面试" },
    { title: "获得结果沉淀", meta: "Offer / 复盘", detail: "结果回流到平台形成分析闭环" }
  ];

  document.getElementById("journey-map").innerHTML = `
    <div class="journey-flow">
      ${journeyMap
        .map(
          (item) => `
            <article class="journey-node">
              <p class="eyebrow">${item.meta}</p>
              <h3>${item.title}</h3>
              <p style="margin-top:8px;">${item.detail}</p>
            </article>
          `
        )
        .join("")}
    </div>
  `;

  const funnel = [
    ["查看总览", "10,000", "100% 用户从首页开始建立全局认知"],
    ["查看详情", "5,830", "58.3% 用户进入单个岗位处理阶段"],
    ["查看材料", "2,490", "24.9% 用户识别到材料阻塞并进入补齐链路"],
    ["推进状态", "1,830", "18.3% 用户产生真实流程推进动作"],
    ["新增申请", "960", "9.6% 用户在当天继续收纳新的岗位机会"]
  ];

  document.getElementById("funnel-list").innerHTML = funnel
    .map(
      ([name, value, detail], index) => `
        <article class="funnel-row">
          <div class="task-head">
            <h3>${name}</h3>
            <strong>${value}</strong>
          </div>
          <div class="progress-bar"><div class="progress-fill" style="width:${[100, 58.3, 24.9, 18.3, 9.6][index]}%"></div></div>
          <p>${detail}</p>
        </article>
      `
    )
    .join("");

  document.getElementById("event-list").innerHTML = state.events
    .filter((item) => !["switch_to_user", "switch_to_manager", "view_admin"].includes(item.event))
    .slice(0, 10)
    .map(
      (item) => `
        <article class="event-card">
          <div class="task-head">
            <strong>${item.event}</strong>
            <span class="tag">${new Date(item.ts).toLocaleString("zh-CN")}</span>
          </div>
          <p>${item.label}</p>
        </article>
      `
    )
    .join("");

  const insights = [
    {
      title: "材料缺口是当前最明显的流程阻塞点",
      detail:
        "从业务概览看，23.4% 的岗位存在材料阻塞；从过程指标看，查看详情到补材料的转化率为 42.7%。说明用户已经意识到问题，但仍需要更强的补齐承接，比如更明确的缺失项提示、材料模板和 AI 改写入口。"
    },
    {
      title: "首页任务区对链路启动有效，但详情页仍有推进空间",
      detail:
        "首页到查看详情的转化达到 58.3%，说明总览页已经能把用户带到单岗位处理阶段；但查看详情到推进状态只有 31.4%，说明详情页还可以增加更强的下一步动作入口，例如“立即完成测评”“去补作品集”“开始面试准备”。"
    },
    {
      title: "高价值用户主要集中在面试阶段，应提供更重的服务能力",
      detail:
        "面试阶段岗位占比为 12.6%，虽然比例不高，但这部分用户最接近结果。产品上建议对这部分人群强化面试准备清单、复盘记录、Offer 比较等能力，提高平台在关键阶段的使用深度。"
    },
    {
      title: "提醒系统已具备价值，但需要做更细的分层策略",
      detail:
        "提醒触达率为 74.2%，触达后的关键动作完成率为 38.6%，说明提醒不是装饰功能，而是核心增长杠杆。下一步应按场景拆分提醒：截止提醒、测评提醒、材料补齐提醒、面试准备提醒，不同提醒采用不同文案和触发时机。"
    }
  ];

  document.getElementById("insight-list").innerHTML = insights
    .map(
      (item) => `
        <article class="list-card">
          <h3>${item.title}</h3>
          <p style="margin-top: 10px;">${item.detail}</p>
        </article>
      `
    )
    .join("");
}

async function openDrawer(id) {
  const app = state.applications.find((item) => item.id === id);
  if (!app) return;
  await recordEvent("open_application", `查看 ${app.company} ${app.role} 详情`);
  document.getElementById("drawer-content").innerHTML = `
    <div class="detail-stack">
      <div>
        <p class="eyebrow">Application Detail</p>
        <h2>${app.company} · ${app.role}</h2>
        <p class="subtle">${app.city} · ${stageLabel(app.stage)} · ${app.channel}</p>
      </div>
      <section class="detail-section">
        <div class="task-head">
          <h3>关键节点</h3>
          <span class="tag ${app.priority}">${priorityLabel(app.priority)}</span>
        </div>
        <ul>
          <li>截止日期：${app.deadline}</li>
          <li>投递时间：${app.appliedAt || "尚未投递"}</li>
          <li>当前提醒：距离截止还有 ${daysUntil(app.deadline)} 天</li>
        </ul>
      </section>
      <section class="detail-section">
        <h3>材料清单</h3>
        <ul>
          ${app.materials.map((material) => `<li>${material.name} · ${material.status}</li>`).join("")}
        </ul>
      </section>
      <section class="detail-section">
        <h3>流程记录</h3>
        <ul>
          ${app.timeline.map((item) => `<li>${item}</li>`).join("")}
        </ul>
      </section>
      <section class="detail-section">
        <h3>下一步建议</h3>
        <p>${buildActionHint(app)}</p>
      </section>
    </div>
  `;
  document.getElementById("detail-drawer").classList.add("visible");
  renderAdmin();
}

function closeDrawer() {
  document.getElementById("detail-drawer").classList.remove("visible");
}

async function updateStage(id, nextStage) {
  const app = state.applications.find((item) => item.id === id);
  if (!app || app.stage === nextStage) return;
  app.stage = nextStage;
  await put("applications", app);
  await recordEvent("change_stage", `${app.company} ${app.role} 更新至 ${stageLabel(nextStage)}`);
  await loadState();
  renderAll();
}

async function switchRole(role) {
  if (state.role === role) return;
  state.role = role;
  state.activeView = role === "user" ? "dashboard" : "admin";
  await recordEvent(role === "user" ? "switch_to_user" : "switch_to_manager", "切换用户身份", role);
  renderAll();
}

function renderAll() {
  renderNav();
  renderSidebar();
  renderTopbar();
  renderViews();
  renderDashboard();
  renderBoard();
  renderCalendar();
  renderMaterials();
  renderAdmin();
}

async function resetDemo() {
  for (const name of ["users", "applications", "events", "reminders", "materials", "meta"]) {
    await clear(name);
  }
  await seedIfNeeded();
  await loadState();
  renderAll();
}

document.querySelector('select[name="stage"]').innerHTML = stages
  .map((stage) => `<option value="${stage.key}">${stage.label}</option>`)
  .join("");
document.getElementById("status-filter").innerHTML = `<option value="all">全部</option>${stages
  .map((stage) => `<option value="${stage.key}">${stage.label}</option>`)
  .join("")}`;

document.querySelectorAll(".role-chip").forEach((chip) => {
  chip.addEventListener("click", () => switchRole(chip.dataset.role));
});

document.getElementById("global-search").addEventListener("input", (event) => {
  state.search = event.target.value.trim();
  if (state.role === "user" && state.activeView === "board") renderBoard();
  if (state.role === "manager") renderAdmin();
});

document.getElementById("status-filter").addEventListener("change", (event) => {
  state.statusFilter = event.target.value;
  renderBoard();
});

document.getElementById("priority-filter").addEventListener("change", (event) => {
  state.priorityFilter = event.target.value;
  renderBoard();
});

document.getElementById("drawer-close").addEventListener("click", closeDrawer);
document.getElementById("detail-drawer").addEventListener("click", (event) => {
  if (event.target.id === "detail-drawer") closeDrawer();
});

const modal = document.getElementById("application-modal");

document.getElementById("add-application-btn").addEventListener("click", async () => {
  if (state.role === "manager") {
    await resetDemo();
    return;
  }
  modal.classList.remove("hidden");
  modal.classList.add("visible");
});

document.getElementById("modal-close").addEventListener("click", () => {
  modal.classList.add("hidden");
  modal.classList.remove("visible");
});

modal.addEventListener("click", (event) => {
  if (event.target.id === "application-modal") {
    modal.classList.add("hidden");
    modal.classList.remove("visible");
  }
});

document.getElementById("application-form").addEventListener("submit", async (event) => {
  event.preventDefault();
  const form = new FormData(event.currentTarget);
  const company = form.get("company").trim();
  const role = form.get("role").trim();
  const city = form.get("city").trim();
  const deadline = form.get("deadline");
  const priority = form.get("priority");
  const stage = form.get("stage");
  const notes = form.get("notes").trim() || "新建申请，待补充详细信息。";

  const newApp = {
    id: `${company}-${Date.now()}`.toLowerCase(),
    company,
    role,
    city,
    stage,
    priority,
    channel: "手动新增",
    deadline,
    appliedAt: stage === "wishlist" ? "" : "2026-04-18",
    tags: ["新建岗位"],
    notes,
    materials: [
      { name: "简历", status: "ready" },
      { name: "作品集", status: "pending" }
    ],
    timeline: ["4/18 新增岗位到看板"]
  };

  await put("applications", newApp);
  await recordEvent("create_application", `新增 ${company} ${role}`);
  await loadState();
  event.currentTarget.reset();
  modal.classList.add("hidden");
  modal.classList.remove("visible");
  state.activeView = "board";
  renderAll();
});

window.openDrawer = openDrawer;
window.updateStage = updateStage;

async function init() {
  state.db = await openDb();
  await seedIfNeeded();
  await loadState();
  await recordEvent("view_dashboard", "进入总览页");
  renderAll();
}

init();
