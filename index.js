// // Import stylesheets
// import './style.css';
// // Write Javascript code!

// class App {
//   static init() {
//     const activeProjectList = new ProjectList('active');
//     const finishProjectList = new ProjectList('finished');
//     activeProjectList.setSwitchHandler(
//       finishProjectList.addProject.bind(finishProjectList)
//     );
//     finishProjectList.setSwitchHandler(
//       activeProjectList.addProject.bind(activeProjectList)
//     );
//     // const timeId = setTimeout(function () {
//     //   (async () => {
//     //     try {
//     //       let { show } = await import('./analytics.js');
//     //       show();
//     //     } catch (err) {
//     //       console.log(err);
//     //     }
//     //   })();
//     // }, 3000);
//     // document.getElementById('analytic-btn').addEventListener('click', () => {
//     //   clearTimeout(timeId);
//     // });
//   }
//   static DomHelper() {
//     const DomHelperScript = document.createElement('script');
//     DomHelperScript.src = './Utility/DOMHelper.js';
//     DomHelperScript.defer = true;
//     document.head.append(DomHelperScript);
//   }
//   static Component() {
//     const ComponentScript = document.createElement('script');
//     ComponentScript.src = './App/Component.js';
//     ComponentScript.defer = true;
//     document.head.append(ComponentScript);
//   }
//   static Tooltip() {
//     const TooltipScript = document.createElement('script');
//     TooltipScript.src = './App/Tooltip.js';
//     TooltipScript.defer = true;
//     document.head.append(TooltipScript);
//   }
//   static ProjectItem() {
//     const ProjectItemScript = document.createElement('script');
//     ProjectItemScript.src = './App/ProjectItem.js';
//     ProjectItemScript.defer = true;
//     document.head.append(ProjectItemScript);
//   }
//   static ProjectList() {
//     const ProjectListScript = document.createElement('script');
//     ProjectListScript.src = './App/ProjectList.js';
//     ProjectListScript.defer = true;
//     document.head.append(ProjectListScript);
//   }
//   // static analytics() {
//   //   const analyticsScript = document.createElement('script');
//   //   analyticsScript.src = './analytics.js';
//   //   analyticsScript.defer = true;
//   //   document.head.append(analyticsScript);
//   // }
// }
// App.DomHelper();
// App.Component();
// App.ProjectItem();
// App.ProjectList();
// App.init();

// Import stylesheets
// import './style.css';

// class App {
//   static init() {
//     // Load scripts and wait for them to be loaded
//     Promise.all([
//       App.DomHelper(),
//       App.Component(),
//       App.Tooltip(),
//       App.ProjectItem(),
//       App.ProjectList(),
//     ]).then(() => {
//       // Once all scripts are loaded, proceed with initializing the app
//       const activeProjectList = new ProjectList('active');
//       const finishProjectList = new ProjectList('finished');
//       activeProjectList.setSwitchHandler(
//         finishProjectList.addProject.bind(finishProjectList)
//       );
//       finishProjectList.setSwitchHandler(
//         activeProjectList.addProject.bind(activeProjectList)
//       );
//     });

//   }

//     // static analytics() {
//   //   const analyticsScript = document.createElement('script');
//   //   analyticsScript.src = './analytics.js';
//   //   analyticsScript.defer = true;
//   //   document.head.append(analyticsScript);
//   // }

//   static DomHelper() {
//     return new Promise((resolve) => {
//       const DomHelperScript = document.createElement('script');
//       DomHelperScript.src = './Utility/DOMHelper.js';
//       DomHelperScript.defer = true;
//       DomHelperScript.onload = resolve;
//       document.head.append(DomHelperScript);
//     });
//   }

//   static Component() {
//     return new Promise((resolve) => {
//       const ComponentScript = document.createElement('script');
//       ComponentScript.src = './App/Component.js';
//       ComponentScript.defer = true;
//       ComponentScript.onload = resolve;
//       document.head.append(ComponentScript);
//     });
//   }

//   static Tooltip() {
//     return new Promise((resolve) => {
//       const TooltipScript = document.createElement('script');
//       TooltipScript.src = './App/Tooltip.js';
//       TooltipScript.defer = true;
//       TooltipScript.onload = resolve;
//       document.head.append(TooltipScript);
//     });
//   }

//   static ProjectItem() {
//     return new Promise((resolve) => {
//       const ProjectItemScript = document.createElement('script');
//       ProjectItemScript.src = './App/ProjectItem.js';
//       ProjectItemScript.defer = true;
//       ProjectItemScript.onload = resolve;
//       document.head.append(ProjectItemScript);
//     });
//   }

//   static ProjectList() {
//     return new Promise((resolve) => {
//       const ProjectListScript = document.createElement('script');
//       ProjectListScript.src = './App/ProjectList.js';
//       ProjectListScript.defer = true;
//       ProjectListScript.onload = resolve;
//       document.head.append(ProjectListScript);
//     });
//   }
// }

// // Call the init method to start the application
// App.init();

import './style.css';

class App {
  static async init() {
    await App.loadScript('./App/Component.js');
    await App.loadScript('./Utility/DOMHelper.js');
    await App.loadScript('./App/Tooltip.js');
    await App.loadScript('./App/ProjectItem.js');
    await App.loadScript('./App/ProjectList.js');

    // Once all scripts are loaded, proceed with initializing the app
    const activeProjectList = new ProjectList('active');
    const finishProjectList = new ProjectList('finished');
    activeProjectList.setSwitchHandler(
      finishProjectList.addProject.bind(finishProjectList)
    );
    finishProjectList.setSwitchHandler(
      activeProjectList.addProject.bind(activeProjectList)
    );
  }

  static loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.defer = true;
      script.onload = resolve;
      document.head.append(script);
    });
  }
}

// Call the init method to start the application
App.init();
