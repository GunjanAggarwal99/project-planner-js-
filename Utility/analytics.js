export function show() {
  const intervalId = setInterval(() => {
    console.log('showing analytics data');
  });
  document.getElementById('analytic-btn').addEventListener('click', () => {
    clearInterval(intervalId);
  });
}
