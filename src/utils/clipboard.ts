/**
 * Safe clipboard copying utility that works reliably inside iframes and across all browsers.
 * Handles cases where navigator.clipboard fails due to focus loss, iframe sandbox restrictions,
 * or permission issues by falling back gracefully to document.execCommand('copy').
 */
export async function copyTextToClipboard(text: string): Promise<boolean> {
  // Method 1: Try modern navigator.clipboard if window has focus and API is supported
  if (navigator.clipboard && typeof navigator.clipboard.writeText === 'function') {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Failed with 'Document is not focused' or security error, proceed to fallback below
    }
  }

  // Method 2: Robust textarea fallback (works even in unfocused iframe / permissions blocked)
  try {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    // Prevent scrolling to bottom of page in iOS/Safari
    textarea.style.top = '0';
    textarea.style.left = '0';
    textarea.style.position = 'fixed';
    textarea.style.width = '2em';
    textarea.style.height = '2em';
    textarea.style.padding = '0';
    textarea.style.border = 'none';
    textarea.style.outline = 'none';
    textarea.style.boxShadow = 'none';
    textarea.style.background = 'transparent';
    textarea.setAttribute('readonly', '');
    document.body.appendChild(textarea);

    textarea.focus();
    textarea.select();
    textarea.setSelectionRange(0, text.length);

    const successful = document.execCommand('copy');
    document.body.removeChild(textarea);
    return successful;
  } catch {
    return false;
  }
}
