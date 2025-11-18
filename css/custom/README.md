## 📁 文件说明

| 文件名                     | 用途         | 主要内容                      |
|-------------------------|------------|---------------------------|
| `global-background.css` | 全局统一背景     | 8个浮动色块动画、全局渐变背景           |
| `header-footer.css`     | 导航和页脚      | Header sticky导航、Footer玻璃态 |
| `about.css`             | About部分    | 头像、信息卡片、社交图标              |
| `projects.css`          | Projects部分 | 项目卡片、标签、"See all"链接       |
| `blogs.css`             | Blogs部分    | 博客卡片、背景图、标签               |
| `page-content.css`      | 文章详情页      | 内容容器、排版、代码块、表格            |
| `card.css`              | 基础卡片（旧）    | 被新样式覆盖，保留兼容性              |
| `image.css`             | 图片展示       | 单图、图片行、lightbox、头像        |

---

## 🎯 快速调整清单

### 最常用的调整

| 想要的效果           | 修改文件                    | 修改位置                        | 建议值                                |
|-----------------|-------------------------|-----------------------------|------------------------------------|
| **调整全局背景色块数量**  | `global-background.css` | 第50-120行                    | 增减 `.global-blob-X` 类              |
| **改变色块颜色**      | `global-background.css` | 第56、65、74等行                 | 修改 `background: linear-gradient()` |
| **调整色块移动速度**    | `global-background.css` | 第58、67、76等行                 | 修改 `animation: X秒` (8-25s)         |
| **调整卡片透明度**     | 各section的CSS            | 搜索 `rgba(255, 255, 255, X)` | 0.3-0.8之间                          |
| **调整模糊强度**      | 各section的CSS            | 搜索 `blur(Xpx)`              | 15-40px                            |
| **修改hover放大倍数** | 各section的CSS            | 搜索 `scale(X)`               | 1.02-1.1之间                         |
| **调整section间距** | 各section的CSS            | 搜索 `padding: X`             | 1rem-4rem                          |

---

## 🔧 详细调整指南

### 1️⃣ 全局背景调整

**文件：** `global-background.css`

#### 调整渐变背景

```css
/* 第13-18行 */
body {
    background: linear-gradient(135deg,
        #fafafa 0%,      /* 起始颜色 */
        #ffffff 25%,     /* 25%处颜色 */
        #f8f9fa 50%,     /* 中间颜色 */
        #ffffff 75%,     /* 75%处颜色 */
        #f5f5f5 100%);   /* 结束颜色 */
}
```

#### 调整色块（以blob-1为例）

```css
/* 第48-58行 */
.global-blob-1 {
    width: 600px;      /* 色块大小 */
    height: 600px;
    background: linear-gradient(135deg, #a8d8ea 0%, #d4a5f9 100%);  /* 渐变颜色 */
    top: -10%;         /* 垂直位置 */
    left: -8%;         /* 水平位置 */
    animation: global-float-1 20s;  /* 动画名称和速度 */
}

/* 第32-35行 - 色块通用设置 */
.global-blob {
    filter: blur(80px);   /* 模糊程度：60-120px */
    opacity: 0.35;        /* 透明度：0.2-0.5 */
}
```

#### 添加新色块

```css
/* 1. 添加HTML（在_layouts/home.html） */
<div class="global-blob global-blob-9"></div>

/* 2. 添加CSS样式 */
.global-blob-9 {
    width: 400px;
    height: 400px;
    background: linear-gradient(135deg, #yourcolor1 0%, #yourcolor2 100%);
    top: 60%;
    right: 15%;
    animation: global-float-9 22s;
}

/* 3. 添加动画 */
@keyframes global-float-9 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(30px, -40px) scale(1.05); }
    66% { transform: translate(-25px, 35px) scale(0.95); }
}
```

---

### 2️⃣ Header & Footer 调整

**文件：** `header-footer.css`

#### Header透明度和模糊
```css
/* 第7-10行 */
header.navbar {
    background: rgba(255, 255, 255, 0.7) !important;  /* 透明度：0.5-0.9 */
    backdrop-filter: blur(20px) saturate(180%);       /* 模糊：15-30px */
}
```

#### Footer高度
```css
/* 第61-62行 */
footer.navbar {
    padding: 0.75rem 0;  /* 垂直内边距：0.5-1.5rem */
}
```

---

### 3️⃣ About 部分调整

**文件：** `about.css`

#### 头像玻璃边框
```css
/* 第30行 */
.my-profile-picture {
    border: 12px solid rgba(255, 255, 255, 0.4);  /* 边框粗细和透明度 */
}

/* 第60-61行 - 头像光晕 */
.my-profile-picture::before {
    background: rgba(255, 255, 255, 0.3);  /* 光晕背景 */
    backdrop-filter: blur(10px);           /* 光晕模糊：5-20px */
}
```

#### 信息卡片
```css
/* 第84-87行 */
.about-info-card {
    background: rgba(255, 255, 255, 0.5);       /* 透明度：0.3-0.7 */
    backdrop-filter: blur(30px) saturate(180%); /* 模糊：20-40px */
    border-radius: 24px;                        /* 圆角：16-32px */
}

/* 第104-105行 - Hover效果 */
.about-info-card:hover {
    transform: scale(1.02);  /* 放大倍数：1.01-1.05 */
}
```

#### 社交图标
```css
/* 第140-141行 */
.social-icon-wrapper {
    width: 56px;   /* 图标大小：48-64px */
    height: 56px;
    background: rgba(255, 255, 255, 0.4);  /* 透明度：0.3-0.6 */
}

/* 第160-162行 - Hover效果 */
.social-icon-wrapper:hover {
    transform: scale(1.1);  /* 放大倍数：1.05-1.15 */
}
```

---

### 4️⃣ Projects 部分调整

**文件：** `projects.css`

#### 项目卡片
```css
/* 第18-21行 */
.project-card {
    background: rgba(255, 255, 255, 0.5);       /* 透明度：0.3-0.7 */
    backdrop-filter: blur(30px) saturate(180%); /* 模糊：20-40px */
    border-radius: 20px;                        /* 圆角：16-28px */
}

/* 第34-35行 - Hover效果 */
.project-card:hover {
    transform: scale(1.02);  /* 放大倍数：1.01-1.04 */
}
```

#### 项目图片
```css
/* 第48-53行 */
.project-card .project-image {
    max-height: 240px;  /* 图片最大高度：200-300px */
}

/* 第56-57行 - 图片Hover缩放 */
.project-card:hover .project-image {
    transform: scale(1.08);  /* 放大倍数：1.05-1.15 */
}
```

---

### 5️⃣ Blogs 部分调整

**文件：** `blogs.css`

#### 博客卡片
```css
/* 第18-21行 */
.blog-card {
    background: rgba(255, 255, 255, 0.5);       /* 透明度：0.3-0.7 */
    backdrop-filter: blur(20px) saturate(180%); /* 模糊：15-30px */
    border-radius: 20px;                        /* 圆角：16-28px */
}

/* 第34-35行 - Hover效果 */
.blog-card:hover {
    transform: scale(1.03);  /* 放大倍数：1.02-1.05 */
}
```

#### 博客背景图覆盖层
```css
/* 第55-61行 */
.blog-card .card-bg-overlay {
    background: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0.95) 0%,   /* 顶部不透明度 */
        rgba(255, 255, 255, 0.85) 50%,  /* 中间不透明度 */
        rgba(255, 255, 255, 0.75) 100%  /* 底部不透明度 */
    );
    backdrop-filter: blur(8px);  /* 额外模糊：5-15px */
}
```

---

### 6️⃣ 子页面内容调整

**文件：** `page-content.css`

#### 内容容器
```css
/* 第10-14行 */
.container.py-4 {
    background: rgba(255, 255, 255, 0.6);       /* 透明度：0.4-0.8 */
    backdrop-filter: blur(30px) saturate(180%); /* 模糊：20-40px */
    border-radius: 24px;                        /* 圆角：16-32px */
    padding: 3rem !important;                   /* 内边距：2-4rem */
}
```

#### 代码块样式
```css
/* 第122-126行 */
.container.py-4 pre {
    background: rgba(0, 0, 0, 0.03);  /* 代码块背景：0.02-0.06 */
    border-radius: 12px;              /* 圆角：8-16px */
    padding: 1.25rem;                 /* 内边距：1-2rem */
}
```

---

## 🎨 推荐配色方案

### Pastel 低饱和度配色表

| 色系 | 颜色名 | 十六进制 | 适用场景 |
|-----|--------|---------|---------|
| 蓝色系 | 浅蓝 | `#a8d8ea` | 全局色块、About |
| | 天蓝 | `#a1c4fd` | 全局色块、Blogs |
| | 浅青 | `#c2e9fb` | 全局色块 |
| 紫色系 | 浅紫 | `#d4a5f9` | About色块 |
| | 薰衣草 | `#e0c3fc` | Blogs色块 |
| | 薰衣草紫 | `#a18cd1` | Blogs色块 |
| 粉色系 | 浅粉 | `#fbc2eb` | 全局色块、Blogs |
| | 桃色 | `#ffb6c1` | Projects色块 |
| 暖色系 | 浅橙 | `#ffd89b` | Projects色块 |
| | 浅黄 | `#ffeaa7` | 全局色块、Projects |
| | 金黄 | `#fdcb6e` | Projects色块 |
| 绿色系 | 薄荷绿 | `#a8e6cf` | Projects色块 |
| | 嫩绿 | `#dcedc1` | Projects色块 |

### 使用建议
1. **同色系渐变**：在同一个色块中使用相邻的两个颜色（如 `#a8d8ea → #d4a5f9`）
2. **对比色搭配**：蓝紫系 vs 橙黄系，营造动态感
3. **透明度控制**：色块opacity保持在0.3-0.4，避免过于鲜艳
4. **模糊度平衡**：色块blur(80px)，卡片blur(20-30px)

---

## ⚡ 常见调整场景

### 场景1：想要更强的玻璃效果
```css
/* 1. 降低卡片背景不透明度 */
background: rgba(255, 255, 255, 0.3);  /* 从0.5改为0.3 */

/* 2. 增加模糊强度 */
backdrop-filter: blur(40px);  /* 从30px增加到40px */

/* 3. 降低头像/图标边框不透明度 */
border: 12px solid rgba(255, 255, 255, 0.2);  /* 从0.4改为0.2 */
```

### 场景2：想要更快的背景动画
```css
/* 修改所有global-blob的animation时间 */
.global-blob-1 { animation: global-float-1 12s; }  /* 从20s改为12s */
.global-blob-2 { animation: global-float-2 15s; }  /* 从25s改为15s */
/* ... 以此类推 */
```

### 场景3：想要更明显的hover效果
```css
/* 增大放大倍数 */
.project-card:hover { transform: scale(1.04); }    /* 从1.02改为1.04 */
.blog-card:hover { transform: scale(1.05); }       /* 从1.03改为1.05 */
.social-icon-wrapper:hover { transform: scale(1.15); }  /* 从1.1改为1.15 */
```

### 场景4：想要减小section间距
```css
/* 各section的CSS文件 */
.about-section { padding: 2rem 0 !important; }     /* 从4rem改为2rem */
.projects-section { padding: 0.5rem 0 !important; } /* 从1rem改为0.5rem */
.blogs-section { padding: 0.5rem 0 !important; }   /* 从1rem改为0.5rem */
```

### 场景5：想要更简约的设计
```css
/* 1. 减少色块数量（删除HTML中的global-blob-7和global-blob-8） */

/* 2. 增加卡片不透明度 */
background: rgba(255, 255, 255, 0.7);  /* 从0.5改为0.7 */

/* 3. 降低模糊度 */
backdrop-filter: blur(20px);  /* 从30px改为20px */

/* 4. 减小色块透明度 */
.global-blob { opacity: 0.25; }  /* 从0.35改为0.25 */
```

---

## 🔍 调试技巧

### 使用浏览器开发者工具
1. 按 `F12` 打开开发者工具
2. 点击左上角的选择工具（或 `Ctrl+Shift+C`）
3. 点击页面上想修改的元素
4. 在右侧 **Styles** 面板中：
   - 查看应用的CSS规则
   - 实时修改数值（点击数值即可编辑）
   - 勾选/取消勾选来启用/禁用某条规则
5. 满意后，将修改复制到对应的CSS文件

### 实时预览
```bash
# 启动Jekyll本地服务器
bundle exec jekyll serve

# 或使用WebStorm的运行配置
# .run/Server.run.xml
```

修改CSS后保存，浏览器会自动刷新（如果使用Live Reload）

### 检查玻璃效果兼容性
- **Safari**：完全支持 `backdrop-filter`
- **Chrome/Edge**：完全支持
- **Firefox**：需要在 `about:config` 中启用实验性功能
  - 搜索 `layout.css.backdrop-filter.enabled`
  - 设置为 `true`

---

## 📱 响应式断点

所有CSS文件都包含3个响应式断点：

| 断点名称 | 屏幕宽度 | 主要调整 |
|---------|---------|---------|
| 桌面端 | > 992px | 默认尺寸 |
| 平板端 | 577px - 992px | 色块缩小20%，卡片padding减小 |
| 手机端 | ≤ 576px | 色块缩小50%，模糊度降低，圆角减小 |

### 修改响应式样式
在各CSS文件末尾找到 `@media` 查询：
```css
@media (max-width: 992px) {
    /* 平板端样式 */
}

@media (max-width: 576px) {
    /* 手机端样式 */
}
```

---

## 🎯 性能优化建议

1. **色块数量**：8个是平衡点，不建议超过10个
2. **模糊强度**：`blur(80px)` 已经较高，不建议超过 `100px`
3. **动画速度**：不建议低于 `8s`，太快会分散注意力
4. **透明度**：`backdrop-filter` 在移动端性能消耗较大，保持适度

---

## ❓ 常见问题

**Q: 为什么看不到玻璃效果？**
A: 检查浏览器是否支持 `backdrop-filter`。Firefox需要手动启用。

**Q: 色块动画卡顿怎么办？**
A: 减少色块数量，或降低模糊度到 `blur(60px)`。

**Q: 如何改变整体色调？**
A: 修改 `global-background.css` 中的8个色块渐变色，建议保持低饱和度。

**Q: Header透明度太高看不清怎么办？**
A: 在 `header-footer.css` 中增加Header的background不透明度：
```css
background: rgba(255, 255, 255, 0.85) !important;  /* 从0.7改为0.85 */
```

**Q: 卡片hover效果太明显/不明显？**
A: 调整scale值：
- 更明显：`scale(1.04)` 或 `scale(1.05)`
- 更微妙：`scale(1.01)` 或不设置scale

---

## 📞 需要帮助？

- 查看 [CSS MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS)
- 使用浏览器开发者工具实时调试
- 修改前先备份CSS文件

---

**最后更新：** 2025-11-17
**设计风格：** Apple/iOS Glass Morphism
**主要技术：** CSS backdrop-filter, keyframes animation, rgba transparency, fixed positioning
