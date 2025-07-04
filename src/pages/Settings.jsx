import { useEffect, useState } from "react";

const SettingsPage = () => {
  const [settings, setSettings] = useState({
    theme: "auto",
    autoplay: true,
    notifications: false,
    language: "en"
  });

  useEffect(() => {
    const theme = localStorage.getItem("theme") || "auto";
    applyTheme(theme);
    setSettings({
      theme,
      autoplay: localStorage.getItem("autoplay") === "true",
      notifications: localStorage.getItem("notifications") === "true",
      language: localStorage.getItem("language") || "en"
    });
  }, []);

  const applyTheme = (theme) => {
    document.documentElement.classList.remove("light", "dark");
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else if (theme === "light") {
      document.documentElement.classList.add("light");
    }
  };

  const updateSetting = (key, value) => {
    const updated = { ...settings, [key]: value };
    setSettings(updated);
    localStorage.setItem(key, value);
    if (key === "theme") applyTheme(value);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#191414] via-black to-[#1db954] p-6 text-white space-y-6">
      <h2 className="text-2xl font-bold">Settings</h2>

      <div className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Theme</label>
          <select
            value={settings.theme}
            onChange={(e) => updateSetting("theme", e.target.value)}
            className="bg-black text-white p-2 rounded"
          >
            <option value="auto">Auto</option>
            <option value="dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </div>

        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.autoplay}
              onChange={() => updateSetting("autoplay", !settings.autoplay)}
            />
            Autoplay songs on start
          </label>
        </div>

        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={() => updateSetting("notifications", !settings.notifications)}
            />
            Enable push notifications
          </label>
        </div>

        <div>
          <label className="block mb-1 font-medium">Preferred Language</label>
          <select
            value={settings.language}
            onChange={(e) => updateSetting("language", e.target.value)}
            className="bg-black text-white p-2 rounded"
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="es">Spanish</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;