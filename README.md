- Remove Category Layout..
- [suny-webdevs-ugcake-server](https://github.com/suny-webdevs/ugcake-server)

```
├── .vite/
│   └── deps/
│       ├── _metadata.json
│       └── package.json
├── public/
│   ├── architecture/
│   │   └── README.md
│   ├── icons/
│   │   ├── agenda.png
│   │   ├── cake.png
│   │   ├── calendar.png
│   │   ├── card.png
│   │   ├── heart.png
│   │   ├── palette.png
│   │   ├── star.png
│   │   ├── tomorrow.png
│   │   └── truck.png
│   ├── img/
│   │   ├── long-logo-dark-sd.webp
│   │   └── valentines-day.webp
│   ├── fav.svg
│   ├── section.json
│   └── vite.svg
├── src/
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── admin-panel/
│   │   │   ├── LoadingUI/
│   │   │   │   ├── AddProductSkeleton.jsx
│   │   │   │   ├── AllProductsSkeleton.jsx
│   │   │   │   ├── DashboardSkeleton.jsx
│   │   │   │   └── OrdersSkeleton.jsx
│   │   │   ├── pages/
│   │   │   │   ├── AddProduct.jsx
│   │   │   │   ├── AllProducts.jsx
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── ManageCategory.jsx
│   │   │   │   ├── Moderators.jsx
│   │   │   │   ├── Orders.jsx
│   │   │   │   └── UpdateProduct.jsx
│   │   │   ├── shared/
│   │   │   │   ├── ProductRow.jsx
│   │   │   │   └── SectionCard.jsx
│   │   │   └── sidebar/
│   │   │       ├── AdminPanel.jsx
│   │   │       ├── AppSidebar.jsx
│   │   │       ├── NavMain.jsx
│   │   │       ├── NavUser.jsx
│   │   │       └── TeamSwitcher.jsx
│   │   ├── common/
│   │   │   ├── error/
│   │   │   │   └── NotFoundPage.jsx
│   │   │   ├── layouts/
│   │   │   │   ├── footer/
│   │   │   │   │   ├── AppSection.jsx
│   │   │   │   │   ├── BottomBar.jsx
│   │   │   │   │   ├── ContactSection.jsx
│   │   │   │   │   ├── Footer.jsx
│   │   │   │   │   ├── LogoSection.jsx
│   │   │   │   │   ├── Newsletter.jsx
│   │   │   │   │   ├── PaymentMethods.jsx
│   │   │   │   │   ├── QuickLinks.jsx
│   │   │   │   │   ├── SectionTitle.jsx
│   │   │   │   │   └── TrustBadges.jsx
│   │   │   │   ├── header/
│   │   │   │   │   ├── desktop/
│   │   │   │   │   │   ├── DesktopNavigateContent.jsx
│   │   │   │   │   │   ├── DesktopRightSection.jsx
│   │   │   │   │   │   └── DesktopSearch.jsx
│   │   │   │   │   ├── mobile/
│   │   │   │   │   │   ├── MobileBottomNav.jsx
│   │   │   │   │   │   ├── MobileLeftSheet.jsx
│   │   │   │   │   │   ├── MobileNavigateContent.jsx
│   │   │   │   │   │   ├── MobileRightIcons.jsx
│   │   │   │   │   │   └── MobileSearch.jsx
│   │   │   │   │   ├── navbar-with-navigation/
│   │   │   │   │   │   ├── index.jsx
│   │   │   │   │   │   ├── NavItem.jsx
│   │   │   │   │   │   ├── OfferBadge.jsx
│   │   │   │   │   │   ├── SearchSuggestions.jsx
│   │   │   │   │   │   └── ThemeToggle.jsx
│   │   │   │   │   ├── constants.js
│   │   │   │   │   └── LogoSection.jsx
│   │   │   │   ├── CategoryLayout.jsx
│   │   │   │   └── RootLayout.jsx
│   │   │   ├── Theme/
│   │   │   │   ├── index.jsx
│   │   │   │   └── ThemeProvider.jsx
│   │   │   ├── GoggleBTN.jsx
│   │   │   ├── Loading.jsx
│   │   │   ├── ProviderWrapper.jsx
│   │   │   ├── ReusableBreadcrumb.jsx
│   │   │   └── SliderBanner.jsx
│   │   ├── DynamicComponents/
│   │   │   ├── DyBread.jsx
│   │   │   ├── DyForm.jsx
│   │   │   ├── DyFormField.jsx
│   │   │   ├── DySelect.jsx
│   │   │   ├── PageHeader.jsx
│   │   │   └── ReusableBreadcrumb.jsx
│   │   ├── platform/
│   │   │   ├── admin/
│   │   │   │   ├── AddProduct.jsx
│   │   │   │   ├── AdminPanel.jsx
│   │   │   │   ├── AllProducts.jsx
│   │   │   │   ├── app-sidebar.jsx
│   │   │   │   ├── Dashboard.jsx
│   │   │   │   ├── ManageCategory.jsx
│   │   │   │   ├── Moderators.jsx
│   │   │   │   ├── nav-main.jsx
│   │   │   │   ├── nav-user.jsx
│   │   │   │   ├── Orders.jsx
│   │   │   │   ├── ProductRow.jsx
│   │   │   │   ├── section-cards.jsx
│   │   │   │   ├── team-switcher.jsx
│   │   │   │   └── UpdateProduct.jsx
│   │   │   ├── bakery-training/
│   │   │   │   └── bakery-training-page.jsx
│   │   │   ├── cart/
│   │   │   │   ├── cart-edit.jsx
│   │   │   │   ├── cart-item.jsx
│   │   │   │   ├── cart-page.jsx
│   │   │   │   ├── cart-sidebar.jsx
│   │   │   │   └── delivery-date-modal.jsx
│   │   │   ├── category/
│   │   │   │   ├── all-category.jsx
│   │   │   │   ├── category-card.jsx
│   │   │   │   ├── category-details.jsx
│   │   │   │   ├── category-features-bar.jsx
│   │   │   │   ├── category-hero.jsx
│   │   │   │   └── sort-dropdown.jsx
│   │   │   ├── checkout/
│   │   │   │   ├── checkout-form.jsx
│   │   │   │   ├── checkout.jsx
│   │   │   │   └── order-summary.jsx
│   │   │   ├── gifts/
│   │   │   │   └── gifts.jsx
│   │   │   ├── home/
│   │   │   │   ├── features.jsx
│   │   │   │   ├── home-page.jsx
│   │   │   │   ├── play-win-cake.jsx
│   │   │   │   └── service-highlights.jsx
│   │   │   ├── login/
│   │   │   │   └── login-page.jsx
│   │   │   ├── product/
│   │   │   │   ├── no-product-found.jsx
│   │   │   │   ├── product-card.jsx
│   │   │   │   ├── product-details-page.jsx
│   │   │   │   └── product-showcase.jsx
│   │   │   ├── register/
│   │   │   │   └── register-page.jsx
│   │   │   └── wish-generator/
│   │   │       └── wish-generator-page.jsx
│   │   └── ui/
│   │       ├── alert-dialog.jsx
│   │       ├── avatar.jsx
│   │       ├── badge.jsx
│   │       ├── breadcrumb.jsx
│   │       ├── button.jsx
│   │       ├── card.jsx
│   │       ├── checkbox.jsx
│   │       ├── collapsible.jsx
│   │       ├── command.jsx
│   │       ├── dialog.jsx
│   │       ├── dropdown-menu.jsx
│   │       ├── field.jsx
│   │       ├── form.jsx
│   │       ├── input.jsx
│   │       ├── item.jsx
│   │       ├── label.jsx
│   │       ├── popover.jsx
│   │       ├── radio-group.jsx
│   │       ├── select.jsx
│   │       ├── separator.jsx
│   │       ├── sheet.jsx
│   │       ├── sidebar.jsx
│   │       ├── skeleton.jsx
│   │       ├── slider.jsx
│   │       ├── sonner.jsx
│   │       ├── spinner.jsx
│   │       ├── switch.jsx
│   │       ├── tabs.jsx
│   │       ├── textarea.jsx
│   │       └── tooltip.jsx
│   ├── context/
│   │   ├── auth/
│   │   │   ├── auth-context.jsx
│   │   │   └── auth-provider.jsx
│   │   └── cart/
│   │       └── cart-context.jsx
│   ├── data/
│   │   └── data.json
│   ├── Hooks/
│   │   ├── use-auth.jsx
│   │   ├── use-axios.jsx
│   │   ├── use-local-storage.js
│   │   ├── use-mobile.js
│   │   ├── use-mobile.jsx
│   │   └── use-toast.js
│   ├── lib/
│   │   ├── firebase.init.js
│   │   └── utils.js
│   ├── Provider/
│   │   └── ProviderWrapper.jsx
│   ├── router/
│   │   ├── index.js
│   │   └── route.jsx
│   ├── services/
│   │   └── product-service.js
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── .prettierrc
├── components.json
├── eslint.config.js
├── index.html
├── jsconfig.json
├── package-lock.json
├── package.json
├── postcss.config.js
├── README.md
├── tailwind.config.js
├── vercel.json
└── vite.config.js
```



### Product Data Comparison Table

| No. | Property                  | Object 1 (Simple Cake)                                      | Object 2 (Advanced Cake) |
|-----|---------------------------|-------------------------------------------------------------|--------------------------|
| 1   | `id` / `_id`              | `"4c08e67d-949a-4d19-92c6-0cda72f3642e"`                   | `"prod3"` |
| 2   | `title`                   | `"Vanilla"`                                                 | `"Strawberry Topped Cake"` |
| 3   | `slug`                    | `"vanilla"`                                                 | `"strawberry-topped-cake"` |
| 4   | `price`                   | `"34"` (String)                                             | `{ regular: 17.99, discount: 14.99, currency: "USD" }` |
| 5   | `stock`                   | `1`                                                         | `15` |
| 6   | `type`                    | `"CAKE"`                                                    | `"bakery"` |
| 7   | `customizable`            | `false`                                                     | `true` (inside `attributes`) |
| 8   | `images`                  | `[]` (empty array)                                          | Array with 1 object (has `url`, `isPrimary`, `altText`) |
| 9   | `additionalImages`        | Not Present                                                 | `["url1", "url2", ...]` (4 images) |
| 10  | `categoryId`              | `"49a6f261-297e-4466-b912-6a3a071d8222"`                   | `"cat_birthday"` |
| 11  | `category`                | Full nested object                                          | Not Present (only `categoryId`) |
| 12  | `flavour`                 | `"Chokolate"`                                               | Not directly (inside `attributes.defaultFlavor`) |
| 13  | `size`                    | `"1lb"`                                                     | Not directly (inside `attributes.defaultSize`) |
| 14  | `description`             | `"Description"`                                             | Not Present |
| 15  | `rating`                  | Not Present                                                 | `{ average: 4.8, totalReviews: 95 }` |
| 16  | `ratings`                 | `[]`                                                        | Not Present |
| 17  | `attributes`              | Not Present                                                 | Full object (customizable, sizeOptions, flavorOptions, etc.) |
| 18  | `specifications`          | Not Present                                                 | `{ weight, serves, shelfLife, storage, calories }` |
| 19  | `features`                | Inside `cakeFeatures.features` (empty)                     | `["Personalized message", ...]` (Array) |
| 20  | `cakeFeatures`            | Full object (with empty arrays)                             | Not Present |
| 21  | `deliveryInfo`            | Not Present                                                 | `["Free delivery...", ...]` (Array) |
| 22  | `brand`                   | Not Present                                                 | `"UG Cakes"` |
| 23  | `shopId`                  | Not Present                                                 | `null` |
| 24  | `status`                  | Not Present                                                 | `"active"` |
| 25  | `isBestSeller`            | `false`                                                     | Not Present |
| 26  | `isDeleted`               | `false`                                                     | Not Present |
| 27  | `soldAmount`              | `0`                                                         | Not Present |
| 28  | `metaTitle`               | Not Present                                                 | `"Strawberry Topped Cake - Buy Online"` |
| 29  | `metaDescription`         | Not Present                                                 | Long description for SEO |
| 30  | `relatedProducts`         | Not Present                                                 | `[1, 3, 6, 7]` |
| 31  | `createdAt`               | `"2026-04-29T12:36:11.034Z"`                                | `"2026-02-15T00:00:00Z"` |
| 32  | `updatedAt`               | `"2026-04-29T12:36:11.034Z"`                                | `"2026-03-01T00:00:00Z"` |

### Summary:
- **Object 2 (Advanced Cake)** is much more complete and suitable for a real e-commerce application.
- **Object 1 (Simple Cake)** is minimal and good for testing or early development.