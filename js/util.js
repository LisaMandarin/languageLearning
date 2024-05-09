// ----- select element -----
export function qs(selector) {
    return document.querySelector(selector);
  }
  // ----- end of select element -----
  
  // ----- toggle hint -----
  export function toggleHint(icon, div, jsonKey) {
      const iconElem = qs(icon);
      const divElem = qs(div);
      iconElem.addEventListener('click', async(e) => {
          if (divElem.style.display === 'block') {
              divElem.style.display = 'none';
          } else {
              divElem.style.display = 'block';
          }
          const hint = await fetchHint();
          if (hint) {
          return (divElem.innerHTML = hint[jsonKey]);
          } else {
          return (divElem.innerHTML = "Failed to show hints");
          }
      })
  }
  
  async function fetchHint() {
    const url = "../data/hint.json";
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error!  Status: ${response.status}`);
      }
      const result = await response.json();
      return result;
    } catch (error) {
      console.error("Fetch hint failure: ", error);
      return null;
    }
  }
  // ----- end of toggle hint -----
  