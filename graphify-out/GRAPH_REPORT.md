# Graph Report - AI-SDLC  (2026-09-14)

## Corpus Check
- Corpus is ~44,769 words - fits in a single context window. You may not need a graph.

## Summary
- 529 nodes · 746 edges · 45 communities (29 shown, 15 thin omitted)
- Extraction: 96% EXTRACTED · 4% INFERRED · 0% AMBIGUOUS · INFERRED: 29 edges (avg confidence: 0.81)
- Token cost: 246,267 input · 0 output

## Community Hubs (Navigation)
- Caveman Compress CLI
- API Route Handlers
- ESLint & Dependencies Config
- Badge Component & Stories
- Caveman Benchmark Tooling
- Dev Dependencies (Storybook/Playwright)
- Product Detail Page
- Cavecrew Subagent Skills
- TypeScript Config
- Button & Dialog Components
- Search Feature & Project Docs
- API Docs (Swagger)
- SQLite Bindings
- Test Report Generator
- SearchBox & SiteHeader
- Package Manifest A
- Package Manifest B
- Design System Style Guide Page
- Banner Component & Stories
- Caveman Skill Family
- Image Gallery Component
- Product Tabs Component
- Button Stories Variants
- Tabs Component
- Product Card Stories
- Lean Build / Verify-Stop Skills
- Signup Panel Component
- Investigate-First / Surgical-Patch Skills
- Skill File Tests
- Caveman Discover/Optimize Skills
- Skill Index Tests
- Migration Skill
- Safe Refactor Skill
- Caveman Compress Package Init
- Caveman Evidence-Review/Manage Skills
- Dangerous Bash Hook
- Caveman README/Instructions
- PostCSS Config
- Next.js Bootstrap Assets
- Mikelopster Writer Skill
- File Icon Asset
- Globe Icon Asset
- Vercel Logo Asset
- Window Icon Asset

## God Nodes (most connected - your core abstractions)
1. `_compress_file_locked()` - 18 edges
2. `@storybook/nextjs-vite` - 17 edges
3. `compilerOptions` - 16 edges
4. `validate()` - 14 edges
5. `react` - 13 edges
6. `Button()` - 10 edges
7. `CLAUDE.md Architecture Guide` - 10 edges
8. `detect_file_type()` - 9 edges
9. `scripts` - 9 edges
10. `backup_dir_for()` - 8 edges

## Surprising Connections (you probably didn't know these)
- `Keyword + category-filter search feature (roadmap)` --semantically_similar_to--> `Products API search/section/category/relatedTo query params`  [INFERRED] [semantically similar]
  PLAN.md → CLAUDE.md
- `SearchBox client component` --semantically_similar_to--> `search-bar design component`  [INFERRED] [semantically similar]
  CLAUDE.md → DESIGN.md
- `Search autocomplete/suggestion feature (roadmap, optional scope)` --semantically_similar_to--> `SearchBox client component`  [INFERRED] [semantically similar]
  PLAN.md → CLAUDE.md
- `Next.js Bootstrap README` --conceptually_related_to--> `Next.js wordmark logo asset`  [INFERRED]
  README.md → public/next.svg
- `cavecrew SKILL` --semantically_similar_to--> `caveman-explore SKILL (FastContext)`  [INFERRED] [semantically similar]
  .agents/skills/cavecrew/SKILL.md → .agents/skills/caveman-explore/SKILL.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **cavecrew locate -> fix -> verify chaining pattern** — agents_skills_cavecrew_investigator, agents_skills_cavecrew_builder, agents_skills_cavecrew_reviewer [EXTRACTED 0.95]
- **Caveman Cloud workflow-label -> evidence-review -> manage -> optimize pipeline** — agents_skills_caveman_discover_skill, agents_skills_caveman_evidence_review_skill, agents_skills_caveman_manage_skill, agents_skills_caveman_optimize_skill [EXTRACTED 0.85]
- **Caveman terse/compressed output format family** — agents_skills_caveman_commit_skill, agents_skills_caveman_review_readme, agents_skills_caveman_help_skill, agents_skills_cavecrew_skill [INFERRED 0.75]
- **SDLC Task-Mode Skill Family** — _agents_skills_investigate_first_skill, _agents_skills_lean_build_skill, _agents_skills_migration_skill, _agents_skills_safe_refactor_skill, _agents_skills_surgical_patch_skill, _agents_skills_verify_and_stop_skill [INFERRED 0.85]
- **Caveman Product Family** — _agents_skills_caveman_skill, _agents_skills_caveman_review_skill, _agents_skills_caveman_setup_skill, _agents_skills_caveman_stats_skill [INFERRED 0.80]
- **Search feature: roadmap, design tokens, API, and client component** — plan_search_keyword_filter, claude_products_search_api, design_search_bar_component, claude_searchbox_component [INFERRED 0.80]
- **Onboarding reference flow: skill, architecture doc, ER diagram, test report** — claude_skills_onboard_seed_data_skill_onboard_seed_data, claude_architecture, public_mermaid_er_diagram, public_test_report_summary [EXTRACTED 0.90]
- **Project meta-documentation set (agent rules, architecture, design system, roadmap)** — agents_nextjs_agent_rules, claude_architecture, design_farmart_design_system, plan_farmart_roadmap [INFERRED 0.75]

## Communities (45 total, 15 thin omitted)

### Community 0 - "Caveman Compress CLI"
Cohesion: 0.06
Nodes (61): main(), print_usage(), Caveman Compress CLI Usage: caveman <filepath>, backup_dir_for(), build_compress_prompt(), build_fix_prompt(), call_claude(), compress_file() (+53 more)

### Community 1 - "API Route Handlers"
Cohesion: 0.08
Nodes (33): GET(), GET(), GET(), GET(), GET(), parsePositiveInt(), SECTIONS, BRAND_TILE_BG (+25 more)

### Community 2 - "ESLint & Dependencies Config"
Cohesion: 0.05
Nodes (41): eslintConfig, dependencies, next, react, react-dom, swagger-ui-react, @types/swagger-ui-react, name (+33 more)

### Community 3 - "Badge Component & Stories"
Cohesion: 0.06
Nodes (26): CartCount, Coupon, meta, Sale, Story, Breadcrumb(), BreadcrumbItem, BreadcrumbProps (+18 more)

### Community 4 - "Caveman Benchmark Tooling"
Cohesion: 0.10
Nodes (28): benchmark_pair(), count_tokens(), main(), print_table(), Path, count_bullets(), extract_code_blocks(), extract_fenced_spans() (+20 more)

### Community 5 - "Dev Dependencies (Storybook/Playwright)"
Cohesion: 0.09
Nodes (23): devDependencies, @chromatic-com/storybook, eslint, eslint-config-next, eslint-plugin-storybook, playwright, storybook, @storybook/addon-a11y (+15 more)

### Community 6 - "Product Detail Page"
Cohesion: 0.13
Nodes (15): metadata, RELATED_PRODUCTS, RELATED_TABS, Badge(), BadgeProps, BadgeVariant, VARIANT_CLASSES, ProductCard() (+7 more)

### Community 7 - "Cavecrew Subagent Skills"
Cohesion: 0.14
Nodes (20): cavecrew-builder subagent, cavecrew-investigator subagent, cavecrew README, cavecrew-reviewer subagent, cavecrew SKILL, caveman-commit README, caveman-commit SKILL, caveman-compress README (+12 more)

### Community 8 - "TypeScript Config"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 9 - "Button & Dialog Components"
Cohesion: 0.19
Nodes (13): Button(), ButtonProps, ButtonVariant, VARIANT_CLASSES, Dialog(), DialogProps, Closed, meta (+5 more)

### Community 10 - "Search Feature & Project Docs"
Cohesion: 0.17
Nodes (16): Rationale: custom Next.js requires reading local docs, Next.js Agent Rules Block, CLAUDE.md Architecture Guide, Graphify knowledge-graph usage rules, Products API search/section/category/relatedTo query params, SearchBox client component, Onboard Seed Data Skill, Farmart Design System (DESIGN.md) (+8 more)

### Community 11 - "API Docs (Swagger)"
Cohesion: 0.13
Nodes (9): metadata, SwaggerDocs(), SwaggerUI, geistMono, geistSans, metadata, nextConfig, next (+1 more)

### Community 12 - "SQLite Bindings"
Cohesion: 0.15
Nodes (5): DatabaseSync, DatabaseSyncOptions, node:sqlite, StatementResultingChanges, StatementSync

### Community 13 - "Test Report Generator"
Cohesion: 0.23
Nodes (11): bySuite, escapeHtml(), files, generatedAt, jsonPath, outPath, renderFile(), renderSuite() (+3 more)

### Community 14 - "SearchBox & SiteHeader"
Cohesion: 0.22
Nodes (7): SearchBox(), SearchResponse, SearchResult, SiteHeader(), Default, meta, Story

### Community 15 - "Package Manifest A"
Cohesion: 0.20
Nodes (9): description, files, license, name, private, scripts, test, type (+1 more)

### Community 16 - "Package Manifest B"
Cohesion: 0.20
Nodes (9): description, files, license, name, private, scripts, test, type (+1 more)

### Community 17 - "Design System Style Guide Page"
Cohesion: 0.20
Nodes (6): COLORS, GRADIENT_SWATCH, metadata, RADIUS_SCALE, SPACING_SCALE, TYPE_SCALE

### Community 18 - "Banner Component & Stories"
Cohesion: 0.25
Nodes (7): Banner(), BannerProps, BannerVariant, Cool, meta, Story, Warm

### Community 19 - "Caveman Skill Family"
Cohesion: 0.29
Nodes (8): Caveman README, Caveman Review Skill, Caveman Cloud Gateway, Caveman Setup Skill, Caveman Skill (talk-mode), caveman-mode-tracker hook, Caveman Stats README, Caveman Stats Skill

### Community 20 - "Image Gallery Component"
Cohesion: 0.29
Nodes (6): ImageGallery(), ImageGalleryProps, Default, meta, SingleImage, Story

### Community 21 - "Product Tabs Component"
Cohesion: 0.29
Nodes (6): ProductTabItem, ProductTabs(), ProductTabsProps, Default, meta, Story

### Community 22 - "Button Stories Variants"
Cohesion: 0.29
Nodes (6): FullWidth, meta, Primary, Register, Secondary, Story

### Community 23 - "Tabs Component"
Cohesion: 0.33
Nodes (5): Default, meta, Story, Tabs(), TabsProps

### Community 24 - "Product Card Stories"
Cohesion: 0.33
Nodes (5): meta, OnSaleWithQty, Story, ThumbnailOnly, WithOldPrice

### Community 25 - "Lean Build / Verify-Stop Skills"
Cohesion: 0.40
Nodes (5): Lean Build Interface Config, Native Core (architecture-first philosophy), Lean Build Skill, Verify and Stop Interface Config, Verify and Stop Skill

### Community 26 - "Signup Panel Component"
Cohesion: 0.40
Nodes (4): SignupPanel(), Default, meta, Story

### Community 27 - "Investigate-First / Surgical-Patch Skills"
Cohesion: 0.50
Nodes (4): Investigate First Interface Config, Investigate First Skill, Surgical Patch Interface Config, Surgical Patch Skill

### Community 29 - "Caveman Discover/Optimize Skills"
Cohesion: 0.67
Nodes (3): caveman-setup skill (referenced), caveman-discover SKILL, caveman-optimize SKILL

## Knowledge Gaps
- **233 isolated node(s):** `name`, `version`, `license`, `private`, `type` (+228 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 300 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `@storybook/nextjs-vite` connect `Badge Component & Stories` to `ESLint & Dependencies Config`, `Product Detail Page`, `Button & Dialog Components`, `SearchBox & SiteHeader`, `Banner Component & Stories`, `Image Gallery Component`, `Product Tabs Component`, `Button Stories Variants`, `Tabs Component`, `Product Card Stories`, `Signup Panel Component`?**
  _High betweenness centrality (0.089) - this node is a cross-community bridge._
- **Why does `vitest` connect `API Route Handlers` to `ESLint & Dependencies Config`?**
  _High betweenness centrality (0.048) - this node is a cross-community bridge._
- **Why does `react` connect `Button & Dialog Components` to `API Route Handlers`, `ESLint & Dependencies Config`, `Product Detail Page`, `SearchBox & SiteHeader`, `Banner Component & Stories`, `Image Gallery Component`, `Product Tabs Component`?**
  _High betweenness centrality (0.047) - this node is a cross-community bridge._
- **What connects `name`, `version`, `license` to the rest of the system?**
  _233 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Caveman Compress CLI` be split into smaller, more focused modules?**
  _Cohesion score 0.05673076923076923 - nodes in this community are weakly interconnected._
- **Should `API Route Handlers` be split into smaller, more focused modules?**
  _Cohesion score 0.08144796380090498 - nodes in this community are weakly interconnected._
- **Should `ESLint & Dependencies Config` be split into smaller, more focused modules?**
  _Cohesion score 0.045454545454545456 - nodes in this community are weakly interconnected._