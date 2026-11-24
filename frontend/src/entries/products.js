import '../css/tailwind.css';
import '../css/reset.css';
import '../css/tokens.css';
import '../css/global.css';
import '../css/components.css';
import '../css/responsive.css';
import { initLayout } from '../js/shared/layout.js';
import '../css/pages/catalog.css';
import '../css/styles/style.css';
import '../js/shared/toast.js';
import { initCatalogMeta } from '../js/pages/catalog-meta.js';
import '../react/mounts/mount-catalog.jsx';
async function bootstrap() {
  await initLayout();
  initCatalogMeta();
}
void bootstrap();