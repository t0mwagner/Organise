/* Layout */
import { Header } from './layout/Header'
import { Footer } from './layout/Footer'
import { Title } from './layout/Title'
import { Navigation } from './layout/Navigation'
import { Content } from './layout/Content'

/* Pages */
import { TaskList } from './pages/TaskList'
import { ProjectList } from './pages/ProjectList'
import { TasksByProject } from './pages/TasksByProject'

/* Authentication */
import { Login } from './pages/login/Login'

/* List columns */
import { DueTime } from './pages/atomic/DueTime'
import { ProjectName } from './pages/atomic/ProjectName'
import { ProjectColor } from './pages/atomic/ProjectColor'
import { TaskNumber } from './pages/atomic/TaskNumber'

/* Forms */
import { TaskForm } from './pages/forms/TaskForm'
import { ProjectForm } from './pages/forms/ProjectForm'

/* Modal */
import { Modal } from './pages/modal/Modal'

/* Title */
import { ProjectTitle } from './pages/title/ProjectTitle'

export { 
    Header,
    Footer,
    Title,
    Navigation,
    Content,
    DueTime,
    ProjectName,
    ProjectColor,
    TaskNumber,
    TaskList,
    ProjectList,
    Modal,
    TaskForm,
    ProjectForm,
    TasksByProject,
    ProjectTitle,
    Login
}