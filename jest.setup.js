// Mock de expo-router
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
    replace: jest.fn(),
  }),
  useLocalSearchParams: () => ({}),
  router: {
    push: jest.fn(),
    back: jest.fn(),
    replace: jest.fn(),
  },
}));

// Mock de AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

// Mock de react-native-safe-area-context
jest.mock('react-native-safe-area-context', () => ({
  SafeAreaProvider: ({ children }) => children,
  SafeAreaView: ({ children }) => children,
  useSafeAreaInsets: () => ({ top: 0, bottom: 0, left: 0, right: 0 }),
}));

// Mock de expo-asset
jest.mock('expo-asset', () => ({}));

// Mock de @expo/vector-icons
jest.mock('@expo/vector-icons', () => ({
  Ionicons: ({ name, size, color, ...props }) => {
    const React = require('react');
    return React.createElement('Ionicons', { name, size, color, ...props });
  },
}));

// Mock de react-native (sin requireActual para evitar módulos nativos)
jest.mock('react-native', () => {
  const React = require('react');
  return {
    Platform: {
      OS: 'ios',
      select: jest.fn((obj) => obj.ios || obj.default),
    },
    StyleSheet: {
      create: (styles) => styles,
      flatten: jest.fn(),
    },
    View: ({ children, ...props }) => React.createElement('View', props, children),
    Text: ({ children, ...props }) => React.createElement('Text', props, children),
    Image: ({ source, ...props }) => React.createElement('Image', { ...props, source }),
    TextInput: ({ ...props }) => React.createElement('TextInput', props),
    TouchableOpacity: ({ children, onPress, ...props }) =>
      React.createElement('TouchableOpacity', { ...props, onPress }, children),
    ScrollView: ({ children, ...props }) => React.createElement('ScrollView', props, children),
    FlatList: ({ data, renderItem, keyExtractor, ...props }) =>
      React.createElement('FlatList', { ...props, data, renderItem, keyExtractor }),
    Alert: {
      alert: jest.fn(),
    },
    Dimensions: {
      get: jest.fn(() => ({ width: 375, height: 812 })),
    },
  };
});

// Mock de localStorage para web
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
};
global.localStorage = localStorageMock;

