# FreshCart architecture decision

## Decision
FreshCart uses **HTML First + Selective React**.

### HTML owns
- Page-level document structure and static sections.
- Customer storefront pages and admin page shells.
- Stitch-authored layout regions that do not need frequent dynamic updates.

### CSS/Tailwind owns
- FreshCart design tokens, typography, spacing, color palette and responsive layout.
- Reusable visual primitives.

### JavaScript ES modules own
- Shared partial loading (header/footer).
- Search navigation, toast notifications, countdown, currency formatting.
- A single cart store shared by React islands and plain JavaScript.

### React islands own
- Interactive Home Flash Sale product cards.
- Product Listing controls, product grid, sorting and pagination.
- Cart and Checkout demo widgets.

## Page plan
| Page | HTML shell | React island | Plain JavaScript |
|---|---|---|---|
| Home | Full Stitch Home | Flash Sale products | Header/footer, search, countdown, cart header updates |
| Product Listing | Breadcrumb and hero from Stitch | Filters, sorting, grid, pagination | Shared shell and cart header |
| Product Detail | Yes | Optional later | Navigation |
| Cart | Yes | Cart items and summary | Shared shell |
| Checkout | Yes | Form and order summary demo | Shared shell |
| Orders/Account/Auth | Placeholders | Decide when implementing | Shared shell |
| Admin | HTML placeholders | Decide per module | Admin shell later |

## Multi-page navigation
Use normal HTML links between `.html` routes. Vite is configured with multiple HTML build inputs. React Router is not required for this architecture.

## Shared data
- Product catalog: `frontend/src/js/data/products.js`.
- Cart state: `frontend/src/js/shared/cart-store.js`.
- Browser persistence: localStorage for the prototype only.

## Backend phase
FastAPI and PostgreSQL are scaffolded separately. Replace local demo data/cart behavior with API requests only after endpoint contracts, authentication and database schema are designed.
