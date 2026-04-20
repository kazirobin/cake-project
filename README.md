- Remove Category Layout..


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
