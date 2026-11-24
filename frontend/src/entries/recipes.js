import '../css/tailwind.css';
import '../css/reset.css';
import '../css/tokens.css';
import '../css/global.css';
import '../css/components.css';
import '../css/responsive.css';
import { initLayout } from '../js/shared/layout.js';
import '../css/styles/style.css';
import '../css/pages/recipes.css';
import '../js/shared/toast.js';
import '../react/mounts/mount-recipes.jsx';
async function bootstrap() {
  await initLayout();
}
void bootstrap();