import { ref } from 'vue';

// Fallback Google Drive link in case the fetch fails or takes time
export const fallbackResumeUrl = 'https://drive.google.com/file/d/1eMyzv8wPggeHV0qzZ452yMOp2c50PLIj/view?usp=sharing';

// The URL of the raw resume link file.
// If you want to keep the source hidden, create a "Secret Gist" at gist.github.com,
// click "Raw", and paste that URL here instead.
export const resumeUrlSource = 'https://gist.github.com/ren276/0d1846671a4bdff1d82d7a1669885aaa';

export const resumeUrl = ref(fallbackResumeUrl);

export async function fetchResumeUrl() {
  try {
    let targetUrl = resumeUrlSource;
    // Map standard Gist URL to raw gistusercontent URL to prevent CORS redirect blocks in browser
    if (targetUrl.includes('gist.github.com')) {
      targetUrl = targetUrl.replace('gist.github.com', 'gist.githubusercontent.com');
      if (!targetUrl.endsWith('/raw')) {
        targetUrl = targetUrl.replace(/\/$/, '') + '/raw';
      }
    }

    const response = await fetch(targetUrl);
    if (response.ok) {
      const text = await response.text();
      const trimmed = text.trim();
      // Basic check to ensure it's a valid link format
      if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
        resumeUrl.value = trimmed;
        return trimmed;
      }
    }
  } catch (error) {
    console.warn('Failed to fetch dynamic resume link, using fallback:', error);
  }
  return fallbackResumeUrl;
}
