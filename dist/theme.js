try {
  const savedTheme = localStorage.getItem('kast-archivo-theme');
  document.documentElement.dataset.theme = savedTheme === 'dark' || (savedTheme !== 'light' && matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
} catch {
  document.documentElement.dataset.theme = matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}
