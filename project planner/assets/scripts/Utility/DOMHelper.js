class DOMHelper {
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
