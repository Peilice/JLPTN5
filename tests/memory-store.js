// The page's store (localStorage, as JSON) kept in memory, optionally starting from saved values.
// A reload is a second module over the same store.
function memoryStore(init = {}) {
  const data = Object.fromEntries(Object.entries(init).map(([k, v]) => [k, JSON.stringify(v)]));
  return {
    get: key => key in data ? JSON.parse(data[key]) : null,
    set: (key, value) => { data[key] = JSON.stringify(value); },
  };
}

module.exports = { memoryStore };
