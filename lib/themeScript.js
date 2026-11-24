// Plain module (not "use client") so the server layout can inline it.
export const THEME_KEY = "reviewer:theme";

// Runs in <head> before paint so the saved theme never flashes.
export const themeBootScript = `try{var t=JSON.parse(localStorage.getItem("${THEME_KEY}"));if(t==="light"||t==="dark")document.documentElement.setAttribute("data-theme",t)}catch(e){}`;
