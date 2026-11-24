import '../css/tailwind.css';
import '../css/reset.css';
import '../css/tokens.css';
import '../css/global.css';
import '../css/components.css';
import '../css/responsive.css';
import '../css/styles/style.css';
import { initLayout } from '../js/shared/layout.js';
import '../js/shared/toast.js';
async function bootstrap() {
  await initLayout();
}
void bootstrap();