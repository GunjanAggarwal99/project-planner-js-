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
    switchbtn = DOMHelper.clearEvenetListner(switchbtn);
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
