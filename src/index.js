import './styles/main.css';
import './styles/footer.css';
import './styles/sidebar.css';
import './styles/header.css';

import { Task } from './modules/internal/task.js';
import { getIndexProjectFromId, getIndexTaskFromId, getProjectFromId, getTaskFromId, insertTaskFromId, insertProjectFromId } from "./modules/internal/getInfo.js";


import { callerForm } from './modules/ui/ui';

console.log("TEST")
callerForm();