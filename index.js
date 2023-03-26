// Import stylesheets
import './style.css';

// Write Javascript code!

class DomHelper {
  static clearEvenetListner(element) {
    const cloneElement = element.cloneNode(true);
    element.replaceWith(cloneElement);
    return cloneElement;
  }
  static moveElement(elementId, newDestinationSelector) {
    const element = document.getElementById(elementId);
    const destinationSelector = document.querySelector(newDestinationSelector);
    destinationSelector.append(element); //if it is already present then it will not create copy it will move that element
  }
}
class Componenet {
  constructor(hostElementId, insertBefore = false) {
    if (hostElementId) {
      this.hostElementId = document.getElementById(hostElementId);
    } else {
      this.hostElementId = document.body;
    }

    this.insertBefore = insertBefore;
  }
  detach() {
    if (this.element) {
      this.element.remove();
    }
  }
  attach() {
    // document.body.append(this.element);
    this.hostElementId.insertAdjacentElement(
      this.insertBefore ? 'afterbegin' : 'beforeend',
      this.element
    );
  }
}
class Tooltip extends Componenet {
  constructor(closeNotifieFunc) {
    super();
    this.closeNotifie = closeNotifieFunc;
    this.create();
  }
  closeTooltip = () => {
    this.detach();
    this.closeNotifie();
  };
  create() {
    const tooltipElement = document.createElement('div');
    tooltipElement.className = 'card';
    tooltipElement.textContent = 'Dummy!';
    tooltipElement.addEventListener('click', this.closeTooltip);
    this.element = tooltipElement;
  }
}
class ProjectItem {
  hasActiveTooltip = false;

  constructor(id, updateProjectFunction, type) {
    this.id = id;
    this.updateProjectHandler = updateProjectFunction;
    this.connectMoreInfoButton();
    this.connectSwitchButton(type);
  }
  hasActice() {
    this.hasActiveTooltip = false;
  }
  showMoreInfoHander() {
    if (this.hasActiveTooltip) {
      return;
    }
    const tooltip = new Tooltip(this.hasActice);
    tooltip.attach();
    this.hasActiveTooltip = true;
  }
  connectMoreInfoButton() {
    const projectEl = document.getElementById(this.id);
    let moreInfoBtn = projectEl.querySelector('button:first-of-type');
    moreInfoBtn.addEventListener('click', this.showMoreInfoHander);
  }
  connectSwitchButton(type) {
    const projectEl = document.getElementById(this.id);
    let switchbtn = projectEl.querySelector('button:last-of-type');
    switchbtn = DomHelper.clearEvenetListner(switchbtn);
    switchbtn.textContent = type === 'active' ? 'Finish' : 'Activate';
    switchbtn.addEventListener(
      'click',
      this.updateProjectHandler.bind(null, this.id)
    );
  }
  update(updateProjectListFn, type) {
    this.updateProjectHandler = updateProjectListFn;
    this.connectSwitchButton(type);
  }
}
class ProjectList {
  projects = [];
  constructor(type) {
    this.type = type;
    const projlsts = document.querySelectorAll(`#${type}-projects li`);
    for (const projlst of projlsts) {
      this.projects.push(
        new ProjectItem(projlst.id, this.switchProject.bind(this), this.type)
      );
    }
    console.log(this.projects);
  }

  setSwitchHandler(switchHandlerFunction) {
    this.switchHandler = switchHandlerFunction;
  }
  addProject(project) {
    this.projects.push(project);
    DomHelper.moveElement(project.id, `#${this.type}-projects ul`);
    project.update(this.switchProject.bind(this), this.type);
  }
  switchProject(projectId) {
    // const projectIndex = this.projects.findIndex(p => p.id === projectId);
    // this.projects.splice(projectIndex , 1);
    this.switchHandler(this.projects.find((p) => p.id === projectId));
    this.projects = this.projects.filter((p) => p.id !== projectId);
  }
}
class App {
  static init() {
    const activeProjectList = new ProjectList('active');
    const finishProjectList = new ProjectList('finished');
    activeProjectList.setSwitchHandler(
      finishProjectList.addProject.bind(finishProjectList)
    );
    finishProjectList.setSwitchHandler(
      activeProjectList.addProject.bind(activeProjectList)
    );
  }
}
App.init();
