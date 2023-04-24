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
    element.scrollIntoView({ behavior: 'smooth' });
  }
}
class Componenet {
  constructor(hostElementId, insertBefore = false) {
    if (hostElementId) {
      this.hostElement = document.getElementById(hostElementId);
    } else {
      this.hostElement = document.body;
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
    this.hostElement.insertAdjacentElement(
      this.insertBefore ? 'afterbegin' : 'beforeend',
      this.element
    );
  }
}
class Tooltip extends Componenet {
  constructor(closeNotifieFunc, text, hostElementId) {
    super(hostElementId);
    this.closeNotifie = closeNotifieFunc;
    this.text = text;
    this.create();
  }
  closeTooltip = () => {
    this.detach();
    this.closeNotifie();
  };
  create() {
    const tooltipElement = document.createElement('div');
    tooltipElement.className = 'card';
    const tooltipTemplate = document.getElementById('tooltip');
    const tooltipBody = document.importNode(tooltipTemplate.content, true);
    tooltipBody.querySelector('p').textContent = this.text;
    tooltipElement.append(tooltipBody);

    const hostElPosLeft = this.hostElement.offsetLeft;
    const hostElPosTop = this.hostElement.offsetTop;
    const hostElHeight = this.hostElement.clientHeight;
    const parentElementScrolling = this.hostElement.parentElement.scrollTop;

    const x = hostElPosLeft + 20;
    const y = hostElPosTop + hostElHeight - parentElementScrolling - 10;

    tooltipElement.style.position = 'absolute';
    tooltipElement.style.left = x + 'px'; // 500px
    tooltipElement.style.top = y + 'px';

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
    this.connectDrag();
  }
  showMoreInfoHander() {
    if (this.hasActiveTooltip) {
      return;
    }
    const projectElement = document.getElementById(this.id);
    const tooltipText = projectElement.dataset.extraInfo;
    const tooltip = new Tooltip(
      () => {
        this.hasActiveTooltip = false;
      },
      tooltipText,
      this.id
    );
    tooltip.attach();
    this.hasActiveTooltip = true;
  }
  connectDrag() {
    const item = document.getElementById(this.id);
    item.addEventListener('dragstart', (event) => {
      event.dataTransfer.setData('text/plain', this.id);
      event.dataTransfer.effectAllowed = 'move';
    });
    item.addEventListener('dragend', (event) => {
      console.log(event);
    });
  }
  connectMoreInfoButton() {
    const projectEl = document.getElementById(this.id);
    const moreInfoBtn = projectEl.querySelector('button:first-of-type');
    moreInfoBtn.addEventListener('click', this.showMoreInfoHander.bind(this));
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
    this.connectDroppable();
  }

  connectDroppable() {
    const list = document.querySelector(`#${this.type}-projects ul`);
    list.addEventListener('dragenter', (event) => {
      if (event.dataTransfer.types[0] === 'text/plain') {
        event.preventDefault();
      }
      list.parentElement.classList.add('droppable');
    });
    list.addEventListener('dragover', (event) => {
      if (event.dataTransfer.types[0] === 'text/plain') {
        event.preventDefault();
      }
    });
    list.addEventListener('dragleave', (event) => {
      if (event.relatedTarget.closest(`#${this.type}-projects ul`) !== list) {
        list.parentElement.classList.remove('droppable');
      }
    });
    list.addEventListener('drop', (event) => {
      const prjId = event.dataTransfer.getData('text/plain');
      if (this.prjId.find((p) => p.id === prjId)) {
        return;
      }
      document
        .getElementById(prjId)
        .querySelector('button:last-of-type')
        .click();
      list.parentElement.classList.remove('droppable');
      event.preventDefault();
    });
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
    // const timeId = setTimeout(function () {
    //   (async () => {
    //     try {
    //       let { show } = await import('./analytics.js');
    //       show();
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   })();
    // }, 3000);
    // document.getElementById('analytic-btn').addEventListener('click', () => {
    //   clearTimeout(timeId);
    // });
  }
  // static analytics() {
  //   const analyticsScript = document.createElement('script');
  //   analyticsScript.src = './analytics.js';
  //   analyticsScript.defer = true;
  //   document.head.append(analyticsScript);
  // }
}
App.init();
