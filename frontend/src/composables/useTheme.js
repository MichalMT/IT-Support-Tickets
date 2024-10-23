import { ref, watchEffect } from 'vue';

export function useTheme() {
    const theme = ref(localStorage.getItem('ist_theme') || 'dark');

  // Toggle between 'light' and 'dark'
  const toggleTheme = () => {
    theme.value = theme.value === 'light' ? 'dark' : 'light';
    applyTheme();
  };

  // Apply the theme to the document's class
  const applyTheme = () => {
    if (theme.value === 'dark') {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.add('light');
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('ist_theme', theme.value);
  };

  // Automatically apply the theme when it's changed
  watchEffect(() => {
    applyTheme();
  });

  return {
    theme,
    toggleTheme,
  };
}