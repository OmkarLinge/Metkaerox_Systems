# Production Refactor Audit

## Keep

These files remain part of the production surface after the refactor:

- `app/layout.tsx`
- `app/page.tsx`
- `app/about/page.tsx`
- `app/products/page.tsx`
- `app/products/[slug]/page.tsx`
- `app/blog/page.tsx`
- `app/gallery/page.tsx`
- `app/careers/page.tsx`
- `app/contact/page.tsx`
- `app/api/careers/apply/route.ts`
- `app/error.tsx`
- `app/global-error.tsx`
- `app/not-found.tsx`
- `app/globals.css`
- `components/layout/*`
- `components/shared/*`
- `components/home/*`
- `components/about/*`
- `components/products/ProductCatalogHero.tsx`
- `components/products/ProductGrid.tsx`
- `components/products/ProductCard.tsx`
- `components/products/ProductDetailPage.tsx`
- `components/products/ProductDetailHero.tsx`
- `components/products/ProductSpecsSection.tsx`
- `components/products/ProductFeaturesSection.tsx`
- `components/products/ProductDetailCTA.tsx`
- `components/products/ProductsPage.tsx`
- `components/products/ProductsSection.tsx`
- `components/blog/BlogPageContent.tsx`
- `components/gallery/GalleryPageContent.tsx`
- `components/careers/CareersPageContent.tsx`
- `components/contact/*`
- `data/company.ts`
- `data/careers.ts`
- `data/blog.ts`
- `data/gallery.ts`
- `lib/utils.ts`
- `tailwind.config.ts`
- `next.config.js`

## Split

These large surfaces were split into reusable App Router components:

- Products catalog: hero, grid, card, and detail sections.
- Products detail: hero, specs, features/applications, and CTA.
- Careers: filters, job list, detail panel, benefits, application form, and submission state.
- Blog: page header, search, post cards, sidebar, and empty state.
- Shared UI: button, card, section, page header, breadcrumbs, form controls, file upload, and empty state.

## Replace

These surfaces were replaced with static-first, production-friendly versions:

- Framer Motion home scroll wrappers were replaced by normal section composition.
- Animated product carousel was replaced by an all-products catalog grid.
- Product detail route was replaced with a composition-only route and reusable detail components.
- Mission timeline was replaced with a lightweight CSS/state implementation.
- About 3D view now starts as a `next/image` fallback and only loads the 3D model on demand.
- Gallery image/video subroutes now redirect to `/gallery`.
- Global preloader and theme runtime were removed for dark-only first paint.

## Delete

These unused/demo/heavy files were removed from the production source tree:

- `components/layout/ClientLayout.tsx`
- `components/layout/Preloader.tsx`
- `components/layout/CustomCursor.tsx`
- `components/shared/ScrollSlideSection.tsx`
- `components/home/CommandCenter.tsx`
- `components/products/InteractiveProductStage.tsx`
- `components/products/ProductStagePanel.tsx`
- `components/products/productStageUtils.ts`

Unused package dependencies were removed from `package.json` and `package-lock.json`.
