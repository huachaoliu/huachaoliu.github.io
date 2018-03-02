export default {
  namespace: 'global',
  state: {
    collapsed: false,
  },
  reducers: {
    changeCollapsed(state) {
      return {
        ...state,
        collapsed: !state.collapsed,
      };
    }
  },
  effects: {

  }
}