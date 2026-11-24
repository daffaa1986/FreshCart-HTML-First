import '../css/tailwind.css';
import '../css/reset.css';
import '../css/tokens.css';
import '../css/global.css';
import '../css/components.css';
import '../css/responsive.css';
import '../css/styles/style.css';
import { initLayout } from '../js/shared/layout.js';
import '../js/shared/toast.js';
import { initHomeCountdown, initRecipeQuickAdd } from '../js/pages/home.js';
import '../react/mounts/mount-home-products.jsx';
async function bootstrap() {
  await initLayout();
  initHomeCountdown();
  initRecipeQuickAdd();
}
void bootstrap();