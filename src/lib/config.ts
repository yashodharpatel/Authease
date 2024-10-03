let config = {
  // apiKey: '',
  // projectId: '',
  // apiUrl: 'http://localhost:8080' // Default API URL, can be overridden
  owner: "",
  projectAssigned: "",
};

export const setConfig = (newConfig: Partial<typeof config>) => {
  config = { ...config, ...newConfig };
};

export const getConfig = () => config;
