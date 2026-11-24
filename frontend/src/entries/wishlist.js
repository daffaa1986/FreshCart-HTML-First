import '../css/tailwind.css';
import '../css/reset.css';
import '../css/tokens.css';
import '../css/global.css';
import '../css/components.css';
import '../css/responsive.css';
import { initLayout } from '../js/shared/layout.js';
import '../css/pages/commerce.css';
import '../css/styles/style.css';
import '../js/shared/toast.js';
import '../react/mounts/mount-wishlist.jsx';
async function bootstrap() {
  await initLayout();
}
void bootstrap();